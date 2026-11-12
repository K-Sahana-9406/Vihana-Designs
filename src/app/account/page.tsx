import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { formatINR } from '@/lib/utils';
import { Download, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const revalidate = 0;

export default async function AccountOverviewPage() {
  const session = await getSession();
  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      orders: {
        orderBy: { createdAt: 'desc' },
        include: {
          items: { include: { product: true } },
          entitlements: { include: { product: true } },
        },
      },
    },
  });

  if (!user) return null;

  const totalOrders = user.orders.length;
  const totalSpendPaise = user.orders
    .filter((o) => o.status === 'PAID')
    .reduce((sum, o) => sum + o.totalAmountPaise, 0);

  const allEntitlements = user.orders.flatMap((o) => o.entitlements);

  return (
    <div className="space-y-8">
      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium block">
            Total Orders
          </span>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-1">{totalOrders}</p>
          <span className="text-[11px] text-emerald-600 mt-1 block">Account in Good Standing</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium block">
            Total Invested
          </span>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-1">
            {formatINR(totalSpendPaise)}
          </p>
          <span className="text-[11px] text-[#6B88B3] mt-1 block">Digital Products & Templates</span>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium block">
            Digital Downloads Available
          </span>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-1">
            {allEntitlements.length}
          </p>
          <span className="text-[11px] text-[#8DB9F0] mt-1 block">Lifetime Cloud Storage</span>
        </div>
      </div>

      {/* Instant Download Vault Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#18243B]">
              Your Purchased Downloads
            </h2>
            <p className="text-xs text-[#6B88B3] mt-0.5">
              Access latest versions of your Notion workspaces, books, and templates.
            </p>
          </div>
          <Link
            href="/account/downloads"
            className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] underline"
          >
            All Downloads ({allEntitlements.length}) →
          </Link>
        </div>

        {allEntitlements.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-[#6B88B3]">You haven&apos;t purchased any digital products yet.</p>
            <Link
              href="/shop"
              className="mt-3 inline-block px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold"
            >
              Browse Digital Store
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {allEntitlements.slice(0, 3).map((ent) => (
              <div
                key={ent.id}
                className="p-4 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E9E8F8]">
                    <Image
                      src={ent.product.coverImage}
                      alt={ent.product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-[#18243B]">
                      {ent.product.title}
                    </h3>
                    <span className="text-[11px] text-[#6B88B3] block">
                      Downloads: {ent.downloadCount} / {ent.maxDownloads} used
                    </span>
                  </div>
                </div>

                <a
                  href={`/api/download/${ent.token}`}
                  download
                  className="px-4 py-2 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-soft flex items-center justify-center gap-1.5 self-stretch sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" /> Download ZIP
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
        <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
          <div>
            <h2 className="font-serif text-xl font-semibold text-[#18243B]">Recent Orders</h2>
            <p className="text-xs text-[#6B88B3] mt-0.5">Order invoices and payment receipts.</p>
          </div>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] underline"
          >
            View All ({totalOrders}) →
          </Link>
        </div>

        {user.orders.length === 0 ? (
          <p className="text-xs text-[#6B88B3] text-center py-6">No order records yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E9E8F8] text-[#6B88B3] font-medium pb-2">
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Items</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E8F8]">
                {user.orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="text-[#18243B]">
                    <td className="py-3.5 font-mono font-medium">#{order.orderNumber}</td>
                    <td className="py-3.5 text-[#446294]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5">{order.items.length} product(s)</td>
                    <td className="py-3.5 font-bold">{formatINR(order.totalAmountPaise)}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          order.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : order.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

