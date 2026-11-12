'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/Toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { success, error } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/orders?status=${statusFilter}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        success(`Order status updated to ${newStatus}`);
        fetchOrders();
      }
    } catch (e) {
      error('Error updating status');
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E8F8] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
            TRANSACTIONS & FULFILLMENT
          </span>
          <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
            Order Management
          </h1>
          <p className="text-xs text-[#6B88B3] mt-0.5">
            Real-time transaction tracking, digital license entitlements, and status updates.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="p-2.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] hover:bg-[#F8F9FC] self-start sm:self-auto"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#E9E8F8] shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
          <input
            type="text"
            placeholder="Search by order #, name, email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PAID', 'PENDING', 'REFUNDED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-[#18243B] text-white shadow-sm'
                  : 'bg-[#F8F9FC] text-[#446294] hover:bg-[#E9E8F8]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E9E8F8] shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">No orders match the filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FC] border-b border-[#E9E8F8] text-[#6B88B3] font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-4">Customer</th>
                  <th className="py-4 px-4">Items</th>
                  <th className="py-4 px-4">Amount</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E8F8]">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#F8F9FC]/60 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-mono font-bold text-[#18243B] block">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-[10px] text-[#6B88B3]">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-[#18243B] block">{ord.customerName}</span>
                      <span className="text-[11px] text-[#446294]">{ord.customerEmail}</span>
                    </td>
                    <td className="py-4 px-4 text-[#446294]">
                      {ord.items.map((i: any) => i.title).join(', ')}
                    </td>
                    <td className="py-4 px-4 font-serif font-bold text-sm text-[#18243B]">
                      {formatINR(ord.totalAmountPaise)}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          ord.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : ord.status === 'PENDING'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.id, e.target.value)}
                        className="bg-[#F8F9FC] border border-[#E9E8F8] text-[11px] font-medium rounded-lg px-2.5 py-1 text-[#18243B]"
                      >
                        <option value="PAID">PAID</option>
                        <option value="PENDING">PENDING</option>
                        <option value="REFUNDED">REFUNDED</option>
                        <option value="FAILED">FAILED</option>
                      </select>
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

