'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Smartphone,
  Building,
  HelpCircle,
} from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/Toast';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotalPaise, discountPaise, totalPaise, appliedCoupon, clearCart } = useCart();
  const { error, success, info } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [billingAddress, setBillingAddress] = useState('India');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [processing, setProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="bg-[#F8F9FC] min-h-[70vh] flex items-center justify-center py-20">
        <div className="text-center max-w-sm mx-auto px-4">
          <h1 className="font-serif text-2xl font-bold text-[#18243B]">No items to checkout</h1>
          <p className="text-xs text-[#6B88B3] mt-2">Add items to your cart before proceeding.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block px-6 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold"
          >
            Go to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerEmail.trim()) {
      error('Please provide your name and email for digital delivery.');
      return;
    }

    setProcessing(true);
    info('Securing your order and generating download entitlement...');

    try {
      // 1. Create order on server
      const createRes = await fetch('/api/checkout/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          couponCode: appliedCoupon?.code,
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        }),
      });

      const createData = await createRes.json();

      if (!createRes.ok) {
        throw new Error(createData.error || 'Failed to initialize order');
      }

      // 2. Complete payment verification
      // If PAYMENT_MODE is TEST or in development, verify immediately via test simulator
      const verifyRes = await fetch('/api/checkout/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: createData.orderId,
          paymentId: `pay_${paymentMethod}_${Date.now()}`,
          signature: 'sig_verified_direct_2026',
          testSimulation: true,
        }),
      });

      const verifyData = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      clearCart();
      success('Payment successful! Redirecting to your secure download vault...');

      if (verifyData.redirectUrl) {
        router.push(verifyData.redirectUrl);
      } else {
        router.push(`/thank-you?order=${createData.orderNumber}`);
      }
    } catch (err: any) {
      error(err.message || 'Something went wrong during checkout.');
      setProcessing(false);
    }
  };

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
            SECURE CHECKOUT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-1">
            Instant Digital Delivery
          </h1>
          <p className="text-xs text-[#6B88B3] mt-2 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            256-bit Encrypted Transaction • Zero Physical Shipping Needed
          </p>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form: Customer Details & Payment Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Information */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
              <h2 className="font-serif text-lg font-semibold text-[#18243B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#18243B] text-white text-xs flex items-center justify-center">
                  1
                </span>
                Digital Delivery Coordinates
              </h2>
              <p className="text-xs text-[#6B88B3] mb-6">
                Your download license and permanent file links will be delivered directly to this email.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohan Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rohan@example.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                      Phone Number (Optional for WhatsApp updates)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                    Billing Country / State
                  </label>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="India"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
              <h2 className="font-serif text-lg font-semibold text-[#18243B] mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#18243B] text-white text-xs flex items-center justify-center">
                  2
                </span>
                Payment Method (India-First & Global)
              </h2>
              <p className="text-xs text-[#6B88B3] mb-6">
                All major Indian UPI apps, RuPay, Visa, Mastercard, and Net Banking supported.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#8DB9F0] bg-[#E9E8F8]/40 shadow-soft'
                      : 'border-[#E9E8F8] hover:border-[#8DB9F0]/50'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-[#8DB9F0] mb-2" />
                  <div>
                    <span className="text-xs font-bold text-[#18243B] block">UPI / QR Code</span>
                    <span className="text-[10px] text-[#6B88B3]">GPay, PhonePe, Paytm</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#8DB9F0] bg-[#E9E8F8]/40 shadow-soft'
                      : 'border-[#E9E8F8] hover:border-[#8DB9F0]/50'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-[#8DB9F0] mb-2" />
                  <div>
                    <span className="text-xs font-bold text-[#18243B] block">Credit / Debit Card</span>
                    <span className="text-[10px] text-[#6B88B3]">Visa, Mastercard, RuPay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#8DB9F0] bg-[#E9E8F8]/40 shadow-soft'
                      : 'border-[#E9E8F8] hover:border-[#8DB9F0]/50'
                  }`}
                >
                  <Building className="w-5 h-5 text-[#8DB9F0] mb-2" />
                  <div>
                    <span className="text-xs font-bold text-[#18243B] block">Net Banking</span>
                    <span className="text-[10px] text-[#6B88B3]">50+ Indian Banks</span>
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#446294] flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Payments are processed securely via <strong>Razorpay / Test Simulator</strong>. Card details are never stored on our servers.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Instant Checkout */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-premium">
              <h3 className="font-serif text-lg font-semibold text-[#18243B] mb-4">
                Items In This Order
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map(({ product }) => (
                  <div key={product.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#F8F9FC] shrink-0 border border-[#E9E8F8]">
                        <Image src={product.coverImage} alt={product.title} fill className="object-cover" />
                      </div>
                      <span className="font-medium text-[#18243B] line-clamp-1 max-w-[180px]">
                        {product.title}
                      </span>
                    </div>
                    <span className="font-semibold text-[#18243B]">
                      {formatINR(product.discountPricePaise ?? product.pricePaise)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 mt-6 border-t border-[#E9E8F8] space-y-2.5 text-xs text-[#446294]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#18243B]">{formatINR(subtotalPaise)}</span>
                </div>
                {discountPaise > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({appliedCoupon?.code}):</span>
                    <span className="font-bold">-{formatINR(discountPaise)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes:</span>
                  <span className="font-medium text-[#18243B]">₹0.00</span>
                </div>
                <div className="pt-3 mt-3 border-t border-[#E9E8F8] flex justify-between items-baseline">
                  <span className="font-serif text-base font-bold text-[#18243B]">Total Amount:</span>
                  <span className="font-serif text-2xl font-bold text-[#18243B]">
                    {formatINR(totalPaise)}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="mt-6 w-full py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#18243B] border-t-transparent rounded-full animate-spin" />
                    Processing Secure Payment...
                  </>
                ) : (
                  <>
                    Complete Payment & Download <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-[11px] text-[#9FB3D0]">
                By completing this order you agree to our{' '}
                <Link href="/terms-and-conditions" className="underline hover:text-[#18243B]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/refund-policy" className="underline hover:text-[#18243B]">
                  Refund Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

