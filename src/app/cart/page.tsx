'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/Toast';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeItem,
    clearCart,
    subtotalPaise,
    discountPaise,
    totalPaise,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { success, error } = useToast();

  const [couponInput, setCouponInput] = useState('');
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplying(true);
    const result = await applyCoupon(couponInput.trim().toUpperCase());
    setApplying(false);
    if (result.success) {
      success(result.message);
      setCouponInput('');
    } else {
      error(result.message);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#F8F9FC] min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-3xl bg-[#E9E8F8] text-[#18243B] flex items-center justify-center mx-auto mb-6 shadow-soft">
            <ShoppingBag className="w-7 h-7 text-[#8DB9F0]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#18243B]">Your Cart is Empty</h1>
          <p className="text-sm text-[#446294] mt-3 leading-relaxed">
            Looks like you haven&apos;t added any digital products or Notion workspaces yet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-soft transition-all"
            >
              Explore Digital Store
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] font-semibold text-sm hover:bg-[#E9E8F8] transition-all"
            >
              Web Studio Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#E9E8F8] gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
              YOUR SELECTION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-1">
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-700 font-medium self-start sm:self-auto transition-colors"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {items.map(({ product }) => {
              const effectivePrice = product.discountPricePaise ?? product.pricePaise;
              const hasDiscount =
                product.discountPricePaise && product.discountPricePaise < product.pricePaise;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E9E8F8] shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F8F9FC] shrink-0 border border-[#E9E8F8]">
                      <Image
                        src={product.coverImage}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-serif text-base font-semibold text-[#18243B] hover:text-[#2F4671] transition-colors line-clamp-1"
                      >
                        {product.title}
                      </Link>
                      <span className="text-xs text-[#6B88B3] block mt-0.5">
                        {product.format || 'Digital Download'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 mt-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" /> Instant Delivery
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E9E8F8]">
                    <div className="text-right">
                      <span className="font-serif text-lg font-bold text-[#18243B]">
                        {formatINR(effectivePrice)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-[#9FB3D0] line-through block">
                          {formatINR(product.pricePaise)}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Information Banner */}
            <div className="p-4 rounded-xl bg-[#E9E8F8]/50 border border-[#C5B8E8] flex items-center gap-3 text-xs text-[#18243B]">
              <Sparkles className="w-4 h-4 text-[#8DB9F0] shrink-0" />
              <span>
                <strong>Digital Product Delivery:</strong> No shipping address or physical delivery required. Your download link and access keys will be generated automatically upon payment.
              </span>
            </div>
          </div>

          {/* Order Summary & Coupon */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-premium">
              <h2 className="font-serif text-xl font-semibold text-[#18243B] mb-6">
                Order Summary
              </h2>

              {/* Coupon Form */}
              <div className="mb-6 pb-6 border-b border-[#E9E8F8]">
                {appliedCoupon ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-[11px] text-emerald-600 block">
                          Coupon applied successfully!
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-rose-500 hover:underline font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code (try LAUNCH20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] uppercase placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                    />
                    <button
                      type="submit"
                      disabled={applying || !couponInput.trim()}
                      className="px-5 py-2.5 rounded-xl bg-[#18243B] text-white text-xs font-semibold hover:bg-[#233352] transition-colors disabled:opacity-50"
                    >
                      {applying ? 'Checking...' : 'Apply'}
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#446294]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#18243B]">{formatINR(subtotalPaise)}</span>
                </div>

                {discountPaise > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-medium">-{formatINR(discountPaise)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#446294]">
                  <span>Taxes (GST Inclusive)</span>
                  <span className="font-medium text-[#18243B]">₹0.00</span>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E9E8F8] flex justify-between items-baseline">
                  <div>
                    <span className="font-serif text-lg font-bold text-[#18243B]">Total Payable</span>
                    <span className="text-[11px] text-[#6B88B3] block">INR (Indian Rupee)</span>
                  </div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#18243B]">
                    {formatINR(totalPaise)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={() => router.push('/checkout')}
                className="mt-8 w-full py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-6 pt-6 border-t border-[#E9E8F8] flex items-center justify-center gap-2 text-xs text-[#6B88B3]">
                <ShieldCheck className="w-4 h-4 text-[#8DB9F0]" />
                <span>256-bit Secure Gateway • Instant Download</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

