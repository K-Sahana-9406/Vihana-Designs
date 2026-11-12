import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateOrderNumber } from '@/lib/utils';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone, couponCode } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // 1. Fetch exact product records from DB (Server-Side Price Authority)
    const productIds = items.map((i: any) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds }, isPublished: true },
    });

    if (dbProducts.length === 0) {
      return NextResponse.json({ error: 'No valid products found' }, { status: 400 });
    }

    // 2. Compute accurate subtotal
    let subtotalPaise = 0;
    const orderItemsData: { productId: string; title: string; pricePaise: number }[] = [];

    for (const item of items) {
      const prod = dbProducts.find((p) => p.id === item.productId);
      if (!prod) continue;
      const effectivePrice = prod.discountPricePaise ?? prod.pricePaise;
      subtotalPaise += effectivePrice;
      orderItemsData.push({
        productId: prod.id,
        title: prod.title,
        pricePaise: effectivePrice,
      });
    }

    // 3. Compute discount
    let discountPaise = 0;
    let appliedCoupon = null;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (coupon && coupon.isActive) {
        const notExpired = !coupon.expiresAt || new Date(coupon.expiresAt) > new Date();
        const limitNotReached = !coupon.usageLimit || coupon.usageCount < coupon.usageLimit;
        const minMet = subtotalPaise >= coupon.minOrderValuePaise;

        if (notExpired && limitNotReached && minMet) {
          appliedCoupon = coupon;
          if (coupon.discountType === 'PERCENTAGE') {
            discountPaise = Math.round((subtotalPaise * coupon.discountValue) / 100);
            if (coupon.maxDiscountPaise && discountPaise > coupon.maxDiscountPaise) {
              discountPaise = coupon.maxDiscountPaise;
            }
          } else {
            discountPaise = Math.min(coupon.discountValue, subtotalPaise);
          }
        }
      }
    }

    const totalAmountPaise = Math.max(0, subtotalPaise - discountPaise);
    const orderNumber = generateOrderNumber();

    // 4. Create Order in Database
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.userId || null,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone ? customerPhone.trim() : null,
        totalAmountPaise,
        discountAmountPaise: discountPaise,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        status: 'PENDING',
        paymentGateway: process.env.PAYMENT_MODE === 'LIVE' ? 'RAZORPAY' : 'TEST_GATEWAY',
        items: {
          create: orderItemsData,
        },
      },
    });

    const paymentMode = process.env.PAYMENT_MODE || 'TEST';
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_vihana';

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmountPaise,
      paymentMode,
      razorpayKey,
    });
  } catch (err: any) {
    console.error('[CREATE ORDER ERROR]', err);
    return NextResponse.json({ error: err.message || 'Error creating order' }, { status: 500 });
  }
}

