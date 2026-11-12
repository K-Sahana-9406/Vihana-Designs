import React from 'react';
import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatINR } from '@/lib/utils';
import { ShoppingBag, Download, ArrowRight, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function CustomerOrdersPage() {
  const session = await getSession();
  if (!session) return null;

  const orders = await prisma.order.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: 'desc' },
    include: {
      items: { include: { product: true } },
      entitlements: true,
    },
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E8F8] shadow-soft">
      <div className="pb-6 border-b border-[#E9E8F8] mb-6">
        <h2 className="font-serif text-2xl font-semibold text-[#18243B]">Your Orders & Invoices</h2>
        <p className="text-xs text-[#6B88B3] mt-1">
          Detailed breakdown of all your digital product transactions.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 text-[#9FB3D0] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-[#18243B]">No Orders Yet</h3>
          <p className="text-xs text-[#6B88B3] mt-1">
            Browse our catalog of Notion templates and AI tools.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold shadow-soft"
          >
            Visit Digital Store
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9E8F8] gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-[#18243B]">
                    Order #{order.orderNumber}
                  </span>
                  <span className="text-[11px] text-[#6B88B3] block mt-0.5">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'PAID'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {order.status}
                  </span>
                  <span className="font-serif text-lg font-bold text-[#18243B]">
                    {formatINR(order.totalAmountPaise)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#18243B]">{item.title}</span>
                    <span className="text-[#6B88B3]">{formatINR(item.pricePaise)}</span>
                  </div>
                ))}
              </div>

              {/* Download action if paid */}
              {order.status === 'PAID' && order.entitlements.length > 0 && (
                <div className="pt-3 border-t border-[#E9E8F8] flex items-center justify-between">
                  <span className="text-[11px] text-[#6B88B3]">
                    Payment Gateway: {order.paymentGateway}
                  </span>
                  <Link
                    href="/account/downloads"
                    className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] underline flex items-center gap-1"
                  >
                    Access Download Files <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

