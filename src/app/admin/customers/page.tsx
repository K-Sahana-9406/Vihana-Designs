import React from 'react';
import { prisma } from '@/lib/prisma';
import { formatINR } from '@/lib/utils';
import { Users, Mail, Phone, ShoppingBag } from 'lucide-react';

export const revalidate = 0;

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    where: { role: 'USER' },
    include: {
      profile: true,
      orders: {
        where: { status: 'PAID' },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-[#E9E8F8]">
        <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
          CLIENT DATABASE
        </span>
        <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
          Registered Customers
        </h1>
        <p className="text-xs text-[#6B88B3] mt-0.5">
          Directory of registered clients, purchasing histories, and contact coordinates.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E9E8F8] shadow-soft overflow-hidden">
        {customers.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">No registered customers yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FC] border-b border-[#E9E8F8] text-[#6B88B3] font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-4">Contact</th>
                  <th className="py-4 px-4">Company</th>
                  <th className="py-4 px-4">Orders</th>
                  <th className="py-4 px-6 text-right">Lifetime Value (LTV)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E8F8]">
                {customers.map((c) => {
                  const spendPaise = c.orders.reduce((sum, o) => sum + o.totalAmountPaise, 0);

                  return (
                    <tr key={c.id} className="hover:bg-[#F8F9FC]/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#E9E8F8] text-[#18243B] font-bold flex items-center justify-center shrink-0">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-[#18243B] block">{c.name}</span>
                            <span className="text-[10px] text-[#6B88B3]">
                              Joined {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[#446294] block">{c.email}</span>
                        {c.profile?.phone && (
                          <span className="text-[11px] text-[#6B88B3] block">
                            {c.profile.phone}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-[#446294]">
                        {c.profile?.company || 'Individual'}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#18243B]">
                        {c.orders.length} order(s)
                      </td>
                      <td className="py-4 px-6 text-right font-serif font-bold text-sm text-[#18243B]">
                        {formatINR(spendPaise)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

