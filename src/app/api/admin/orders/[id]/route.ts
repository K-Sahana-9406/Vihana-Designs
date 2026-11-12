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
    const { status } = await request.json();

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { entitlements: true },
    });

    // If marked refunded, revoke download entitlements
    if (status === 'REFUNDED') {
      await prisma.downloadEntitlement.updateMany({
        where: { orderId: id },
        data: { isRevoked: true },
      });
    }

    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}

