import React from 'react';
import { prisma } from '@/lib/prisma';
import ThankYouClient from './ThankYouClient';

export const metadata = {
  title: 'Order Confirmed & Secure Downloads | VIHANA DESIGNS',
  description: 'Your purchase has been confirmed. Download your digital products and assets.',
};

export const revalidate = 0;

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: { order?: string; token?: string };
}) {
  const orderNumber = searchParams.order;

  let orderData = null;
  if (orderNumber) {
    orderData = await prisma.order.findUnique({
      where: { orderNumber },
      include: {
        items: {
          include: { product: true },
        },
        entitlements: {
          include: { product: true },
        },
      },
    });
  }

  return <ThankYouClient order={orderData} fallbackToken={searchParams.token} />;
}

