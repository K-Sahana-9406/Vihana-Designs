'use client';

import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, CheckCircle2, X } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { success, error } = useToast();

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountValue, setDiscountValue] = useState('');
  const [usageLimit, setUsageLimit] = useState('100');
  const [saving, setSaving] = useState(false);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (res.ok) setCoupons(data.coupons || []);
    } catch (e) {
      error('Failed to load coupons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleToggleActive = async (id: string, currentVal: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentVal }),
      });
      if (res.ok) {
        success('Coupon status updated');
        fetchCoupons();
      }
    } catch (e) {
      error('Error updating coupon');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this coupon code?')) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        success('Coupon deleted');
        fetchCoupons();
      }
    } catch (e) {
      error('Failed to delete coupon');
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !discountValue) return;

    setSaving(true);
    try {
      const value =
        discountType === 'FIXED'
          ? Math.round(Number(discountValue) * 100) // convert to paise
          : Number(discountValue);

      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code.trim(),
          discountType,
          discountValue: value,
          usageLimit,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        success(`Coupon ${code} created!`);
        setShowModal(false);
        setCode('');
        setDiscountValue('');
        fetchCoupons();
      } else {
        error(data.error || 'Failed to create coupon');
      }
    } catch (err) {
      error('Error creating coupon');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E8F8] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
            PROMOTION ENGINE
          </span>
          <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
            Coupons & Discounts
          </h1>
          <p className="text-xs text-[#6B88B3] mt-0.5">
            Configure promotional discount codes for marketing campaigns and influencer drops.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6] shadow-soft flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#E9E8F8] shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">Loading coupons...</div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">No coupons created yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FC] border-b border-[#E9E8F8] text-[#6B88B3] font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Coupon Code</th>
                  <th className="py-4 px-4">Type</th>
                  <th className="py-4 px-4">Discount</th>
                  <th className="py-4 px-4">Usage</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E8F8]">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F8F9FC]/60 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-sm text-[#18243B]">
                      {c.code}
                    </td>
                    <td className="py-4 px-4 text-[#446294] font-medium">{c.discountType}</td>
                    <td className="py-4 px-4 font-bold text-[#18243B]">
                      {c.discountType === 'PERCENTAGE'
                        ? `${c.discountValue}%`
                        : `₹${(c.discountValue / 100).toFixed(0)}`}
                    </td>
                    <td className="py-4 px-4 text-[#446294]">
                      {c.usageCount} / {c.usageLimit}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleActive(c.id, c.isActive)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          c.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Disabled'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#18243B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-[#E9E8F8] shadow-premium">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
              <h3 className="font-serif text-xl font-semibold text-[#18243B]">
                Create Discount Coupon
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1">
                  Coupon Code (e.g. VIP25) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="SUMMER20"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-mono font-bold uppercase text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  >
                    <option value="PERCENTAGE">Percentage (%)</option>
                    <option value="FIXED">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Value *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder={discountType === 'PERCENTAGE' ? '20' : '500'}
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1">
                  Maximum Usages
                </label>
                <input
                  type="number"
                  value={usageLimit}
                  onChange={(e) => setUsageLimit(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                />
              </div>

              <div className="pt-4 border-t border-[#E9E8F8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B88B3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6]"
                >
                  {saving ? 'Creating...' : 'Create Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

