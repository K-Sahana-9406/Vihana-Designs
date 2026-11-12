'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Download,
  FileCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function ThankYouClient({
  order,
  fallbackToken,
}: {
  order: any;
  fallbackToken?: string;
}) {
  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8DB9F0', '#C5B8E8', '#18243B', '#E9E8F8'],
      });
    } catch (e) {}
  }, []);

  if (!order) {
    return (
      <div className="bg-[#F8F9FC] min-h-[70vh] flex items-center justify-center py-20">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#18243B]">Order Confirmed</h1>
          <p className="text-xs text-[#6B88B3] mt-2">
            Your payment has been successfully recorded. Please check your email inbox for your direct download credentials.
          </p>
          {fallbackToken && (
            <a
              href={`/api/download/${fallbackToken}`}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs shadow-soft"
            >
              <Download className="w-4 h-4" /> Download Files Now
            </a>
          )}
          <div className="mt-4">
            <Link href="/shop" className="text-xs text-[#18243B] underline">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Success Banner */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-soft">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide border border-emerald-200">
            Payment Verified & Delivered
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-3">
            Thank you, {order.customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-[#446294] mt-2">
            Order Reference: <strong className="text-[#18243B]">#{order.orderNumber}</strong> • A confirmation email has been dispatched to <strong>{order.customerEmail}</strong>.
          </p>
        </div>

        {/* Digital Product Download Center */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E8F8] shadow-premium mb-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#E9E8F8] mb-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#18243B]">
                Your Download Vault
              </h2>
              <p className="text-xs text-[#6B88B3] mt-1">
                Your private files and Notion workspaces are ready for immediate export.
              </p>
            </div>
            <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Virus Scanned
            </span>
          </div>

          <div className="space-y-4">
            {order.entitlements && order.entitlements.length > 0 ? (
              order.entitlements.map((ent: any) => (
                <div
                  key={ent.id}
                  className="p-5 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#8DB9F0] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E9E8F8]">
                      <Image
                        src={ent.product.coverImage}
                        alt={ent.product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-[#18243B]">
                        {ent.product.title}
                      </h4>
                      <p className="text-xs text-[#6B88B3] mt-0.5">
                        {ent.product.format} • Valid until {new Date(ent.expiresAt).toLocaleDateString()}
                      </p>
                      <span className="text-[11px] text-[#446294] block mt-1">
                        Downloads: {ent.downloadCount} / {ent.maxDownloads} used
                      </span>
                    </div>
                  </div>

                  <a
                    href={`/api/download/${ent.token}`}
                    download
                    className="px-5 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-soft transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap self-stretch sm:self-auto"
                  >
                    <Download className="w-4 h-4" /> Download Files (ZIP)
                  </a>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#6B88B3]">Your entitlements are being processed.</p>
            )}
          </div>

          {/* Quick Notice */}
          <div className="mt-8 p-4 rounded-xl bg-[#E9E8F8]/60 border border-[#C5B8E8] text-xs text-[#18243B] flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#8DB9F0] shrink-0 mt-0.5" />
            <div>
              <strong>Lifetime Access:</strong> You can re-download these files at any time by logging into your{' '}
              <Link href="/account" className="underline font-semibold">
                Customer Account
              </Link>
              . If you need any assistance, reach out to our studio concierge at{' '}
              <a href="mailto:hello@vihanadesigns.com" className="underline font-semibold">
                hello@vihanadesigns.com
              </a>
              .
            </div>
          </div>
        </div>

        {/* Order Details Receipt Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
          <h3 className="font-serif text-lg font-semibold text-[#18243B] mb-4">
            Payment & Receipt Summary
          </h3>
          <div className="space-y-3 text-xs text-[#446294]">
            <div className="flex justify-between pb-2 border-b border-[#E9E8F8]">
              <span>Payment Reference:</span>
              <span className="font-mono font-medium text-[#18243B]">{order.paymentId}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E9E8F8]">
              <span>Payment Gateway:</span>
              <span className="font-medium text-[#18243B]">{order.paymentGateway}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-[#E9E8F8]">
              <span>Total Paid:</span>
              <span className="font-serif text-base font-bold text-[#18243B]">
                {formatINR(order.totalAmountPaise)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E9E8F8]">
            <Link
              href="/account"
              className="text-xs font-semibold text-[#18243B] hover:underline flex items-center gap-1.5"
            >
              View In Customer Portal <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#446294] hover:text-[#18243B]"
            >
              Continue Browsing Digital Store →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

