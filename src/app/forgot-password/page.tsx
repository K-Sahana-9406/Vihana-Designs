'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    success('Password reset instructions sent to your email.');
  };

  return (
    <div className="bg-[#F8F9FC] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-premium">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10 rounded-xl bg-white p-1 border border-[#E9E8F8] shadow-sm">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="font-serif text-lg font-bold text-[#18243B]">VIHANA DESIGNS</span>
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-[#18243B]">Reset Password</h1>
          <p className="text-xs text-[#6B88B3] mt-1">
            Enter your registered email and we&apos;ll dispatch a secure recovery link.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h3 className="font-semibold text-sm text-emerald-900">Check Your Inbox</h3>
            <p className="text-xs text-emerald-700 mt-1">
              We have sent password reset instructions to <strong>{email}</strong>.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-block text-xs font-semibold text-emerald-800 underline"
            >
              Back to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all duration-200"
            >
              Send Recovery Link
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#446294] hover:text-[#18243B]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

