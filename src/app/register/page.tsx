'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function RegisterPage() {
  const router = useRouter();
  const { success, error } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      error('Please complete all fields.');
      return;
    }

    if (password.length < 6) {
      error('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      success(`Account created! Welcome to Vihana Designs, ${name}.`);
      router.push('/account');
    } catch (err: any) {
      error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
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
          <h1 className="font-serif text-2xl font-semibold text-[#18243B]">Create an Account</h1>
          <p className="text-xs text-[#6B88B3] mt-1">
            Track your digital product orders and access permanent download links.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rohan Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

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
                placeholder="rohan@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Password (min 6 characters)
            </label>
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
            {loading ? 'Creating Account...' : 'Create Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-[#6B88B3] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#18243B] font-semibold underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

