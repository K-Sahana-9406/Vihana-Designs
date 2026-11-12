import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, orderValuePaise } = await request.json();

    if (!code) {
      return NextResponse.json({ error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon || !coupon.isActive) {
      return NextResponse.json({ error: 'Invalid or inactive coupon code' }, { status: 404 });
    }

    // Check expiration
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: 'This coupon has expired' }, { status: 400 });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return NextResponse.json({ error: 'This coupon has reached its usage limit' }, { status: 400 });
    }

    // Check minimum order value
    if (orderValuePaise !== undefined && orderValuePaise < coupon.minOrderValuePaise) {
      return NextResponse.json(
        {
          error: `Minimum order amount of ₹${(coupon.minOrderValuePaise / 100).toFixed(0)} required for this coupon`,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      valid: true,
      message: `Coupon "${coupon.code}" applied!`,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        maxDiscountPaise: coupon.maxDiscountPaise,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error validating coupon' }, { status: 500 });
  }
}

