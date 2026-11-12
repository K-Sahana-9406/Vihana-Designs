import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 403 });
    }

    const [
      totalOrders,
      paidOrders,
      pendingOrders,
      failedOrders,
      totalCustomers,
      totalProducts,
      totalEnquiries,
      recentOrders,
      recentEnquiries,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: 'PAID' } }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.order.count({ where: { status: 'FAILED' } }),
      prisma.user.count({ where: { role: 'USER' } }),
      prisma.product.count(),
      prisma.enquiry.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
      prisma.enquiry.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    // Calculate total revenue in paise
    const revenueAggregate = await prisma.order.aggregate({
      _sum: { totalAmountPaise: true },
      where: { status: 'PAID' },
    });

    const totalRevenuePaise = revenueAggregate._sum.totalAmountPaise || 0;

    return NextResponse.json({
      totalRevenuePaise,
      totalOrders,
      paidOrders,
      pendingOrders,
      failedOrders,
      totalCustomers,
      totalProducts,
      totalEnquiries,
      recentOrders,
      recentEnquiries,
    });
  } catch (err: any) {
    console.error('[ADMIN STATS ERROR]', err);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}

