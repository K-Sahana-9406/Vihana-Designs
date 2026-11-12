import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();

    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title.trim();
    if (body.shortDesc !== undefined) updateData.shortDesc = body.shortDesc.trim();
    if (body.fullDesc !== undefined) updateData.fullDesc = body.fullDesc.trim();
    if (body.coverImage !== undefined) updateData.coverImage = body.coverImage;
    if (body.format !== undefined) updateData.format = body.format;
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.isPublished !== undefined) updateData.isPublished = Boolean(body.isPublished);

    if (body.priceRupees !== undefined) {
      updateData.pricePaise = Math.round(Number(body.priceRupees) * 100);
    }
    if (body.discountPriceRupees !== undefined) {
      updateData.discountPricePaise = body.discountPriceRupees
        ? Math.round(Number(body.discountPriceRupees) * 100)
        : null;
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = params;

    // Check if product is in orders before deleting or soft-unpublishing
    const orderCount = await prisma.orderItem.count({ where: { productId: id } });
    if (orderCount > 0) {
      // Soft unpublish to protect purchase history
      await prisma.product.update({
        where: { id },
        data: { isPublished: false },
      });
      return NextResponse.json({
        success: true,
        message: 'Product has active orders; archived & unpublished to protect client download history.',
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product permanently deleted' });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

