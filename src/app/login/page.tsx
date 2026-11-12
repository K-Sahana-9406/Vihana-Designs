'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function LoginPage() {
  const router = useRouter();
  const { success, error } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      error('Please enter your email and password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }

      success(`Welcome back, ${data.user.name}!`);

      if (data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    } catch (err: any) {
      error(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (type: 'admin' | 'customer') => {
    if (type === 'admin') {
      setEmail('admin@vihanadesigns.com');
      setPassword('AdminPassword2026!');
    } else {
      setEmail('client@example.com');
      setPassword('CustomerPass2026!');
    }
  };

  return (
    <div className="bg-[#F8F9FC] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-premium">
        {/* Logo & Heading */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10 rounded-xl bg-white p-1 border border-[#E9E8F8] shadow-sm">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <span className="font-serif text-lg font-bold text-[#18243B]">VIHANA DESIGNS</span>
          </Link>
          <h1 className="font-serif text-2xl font-semibold text-[#18243B]">Sign In</h1>
          <p className="text-xs text-[#6B88B3] mt-1">
            Access your purchased digital products, downloads & studio invoices.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#18243B]">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#446294] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Fill Buttons */}
        <div className="mt-6 pt-6 border-t border-[#E9E8F8] text-center">
          <span className="text-[11px] text-[#9FB3D0] block mb-2 font-medium">
            Demo Credentials (1-Click Fill)
          </span>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('customer')}
              className="px-3 py-1.5 rounded-lg bg-[#F8F9FC] border border-[#E9E8F8] text-[11px] font-medium text-[#446294] hover:bg-[#E9E8F8]"
            >
              Demo Client
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('admin')}
              className="px-3 py-1.5 rounded-lg bg-[#18243B] text-[11px] font-medium text-[#8DB9F0] hover:bg-[#233352]"
            >
              Studio Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#6B88B3] mt-6">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-[#18243B] font-semibold underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

