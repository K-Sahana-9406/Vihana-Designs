import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatINR } from '@/lib/utils';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
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
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    }),
    prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  const revenueAgg = await prisma.order.aggregate({
    _sum: { totalAmountPaise: true },
    where: { status: 'PAID' },
  });

  const totalRevenuePaise = revenueAgg._sum.totalAmountPaise || 0;

  return (
    <div className="space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E8F8] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
            BUSINESS INTELLIGENCE
          </span>
          <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
            Studio Performance Overview
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6] shadow-soft"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 rounded-xl bg-[#18243B] text-white text-xs font-semibold hover:bg-[#233352]"
          >
            View Leads ({totalEnquiries})
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium">
              Verified Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-2">
            {formatINR(totalRevenuePaise)}
          </p>
          <span className="text-[11px] text-emerald-600 mt-1 block">
            {paidOrders} paid transactions
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E9E8F8] text-[#18243B] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-2">{totalOrders}</p>
          <span className="text-[11px] text-[#446294] mt-1 block">
            {pendingOrders} pending • {failedOrders} failed
          </span>
        </div>

        {/* Web Enquiries / Leads */}
        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium">
              Client Enquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E9E8F8] text-[#18243B] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-2">{totalEnquiries}</p>
          <span className="text-[11px] text-[#8DB9F0] mt-1 block">
            Custom website project leads
          </span>
        </div>

        {/* Total Customers */}
        <div className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium">
              Registered Clients
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E9E8F8] text-[#18243B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="font-serif text-3xl font-bold text-[#18243B] mt-2">{totalCustomers}</p>
          <span className="text-[11px] text-[#446294] mt-1 block">
            {totalProducts} active digital products
          </span>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Recent Project Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Orders */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              Recent Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-[#18243B] hover:underline"
            >
              All Orders →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-[#6B88B3] text-center py-8">No orders yet.</p>
          ) : (
            <div className="divide-y divide-[#E9E8F8]">
              {recentOrders.map((ord) => (
                <div key={ord.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#18243B] block">
                      #{ord.orderNumber}
                    </span>
                    <span className="text-[#6B88B3]">{ord.customerName} ({ord.customerEmail})</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-sm text-[#18243B] block">
                      {formatINR(ord.totalAmountPaise)}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 ${
                        ord.status === 'PAID'
                          ? 'bg-emerald-50 text-emerald-700'
                          : ord.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Enquiries / CRM Leads */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
          <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              New Project Leads
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-xs font-semibold text-[#18243B] hover:underline"
            >
              All Leads →
            </Link>
          </div>

          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-[#6B88B3] text-center py-8">No enquiries yet.</p>
          ) : (
            <div className="divide-y divide-[#E9E8F8]">
              {recentEnquiries.map((enq) => (
                <div key={enq.id} className="py-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#18243B]">{enq.name}</span>
                    <span className="font-mono text-[10px] text-[#6B88B3]">{enq.referenceId}</span>
                  </div>
                  <p className="text-[#446294] mt-0.5 font-medium">{enq.serviceType}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E9E8F8]/60 text-[11px]">
                    <span className="text-[#6B88B3]">Budget: {enq.budgetRange}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        enq.status === 'NEW'
                          ? 'bg-blue-50 text-blue-700'
                          : enq.status === 'CONTACTED'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

