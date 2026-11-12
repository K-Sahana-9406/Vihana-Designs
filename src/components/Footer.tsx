'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight, Mail, Instagram, Linkedin, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { useToast } from './Toast';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();
  const pathname = usePathname();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      error('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Subscribed! Check your inbox for exclusive studio updates.');
        setEmail('');
      } else {
        error(data.error || 'Failed to subscribe');
      }
    } catch (err) {
      error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  return (
    <footer className="bg-[#18243B] text-white pt-20 pb-12 border-t border-[#233352]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Promise Section */}
        <div className="pb-16 border-b border-[#233352] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-[#8DB9F0] font-semibold">
              VIHANA CREATIVE DISPATCH
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-2 font-light leading-tight">
              Curated digital tools, agency blueprints, and early product drops.
            </h3>
            <p className="text-[#9FB3D0] text-sm mt-3 leading-relaxed max-w-lg">
              Join 4,500+ ambitious founders, creators, and developers across India and worldwide. Zero spam. Unsubscribe anytime.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal or work email..."
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0F1726] border border-[#2F4671] text-white placeholder-[#6B88B3] text-sm focus:outline-none focus:border-[#8DB9F0] transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-soft disabled:opacity-50"
              >
                {loading ? 'Subscribing...' : 'Get Updates'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-1">
                <Image
                  src="/logo.png"
                  alt="VIHANA DESIGNS"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-white leading-none">
                  VIHANA
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-[#8DB9F0] font-sans font-medium">
                  DESIGNS
                </span>
              </div>
            </Link>
            <p className="text-[#9FB3D0] text-sm mt-4 leading-relaxed max-w-sm">
              A premium digital products and creative technology studio crafting thoughtful digital assets and high-converting websites for the modern internet.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com/vihanadesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#233352] text-[#8DB9F0] hover:text-white hover:bg-[#2F4671] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/company/vihanadesigns"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#233352] text-[#8DB9F0] hover:text-white hover:bg-[#2F4671] flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#233352] text-[#8DB9F0] hover:text-white hover:bg-[#2F4671] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Digital Products */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#8DB9F0] font-semibold mb-4">
              Digital Products
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9FB3D0]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop?category=notion-templates" className="hover:text-white transition-colors">
                  Notion Workspaces
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ai-tools-resources" className="hover:text-white transition-colors">
                  AI Prompt Vaults
                </Link>
              </li>
              <li>
                <Link href="/shop?category=business-templates" className="hover:text-white transition-colors">
                  Business Pitch Decks
                </Link>
              </li>
              <li>
                <Link href="/shop?category=ebooks-guides" className="hover:text-white transition-colors">
                  Agency Ebooks & SOPs
                </Link>
              </li>
            </ul>
          </div>

          {/* Web Studio Services */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#8DB9F0] font-semibold mb-4">
              Web Development
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9FB3D0]">
              <li>
                <Link href="/services#business-websites" className="hover:text-white transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/services#landing-pages" className="hover:text-white transition-colors">
                  High-Converting Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/services#portfolio-websites" className="hover:text-white transition-colors">
                  Creative Portfolios
                </Link>
              </li>
              <li>
                <Link href="/services#web-applications" className="hover:text-white transition-colors">
                  Custom Web Applications
                </Link>
              </li>
              <li>
                <Link href="/start-project" className="text-[#8DB9F0] hover:underline font-medium">
                  Request a Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#8DB9F0] font-semibold mb-4">
              Studio & Trust
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9FB3D0]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Vihana
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  Client Case Studies
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Studio Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#233352] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B88B3] gap-4">
          <p>© {new Date().getFullYear()} VIHANA DESIGNS. All rights reserved. Crafted with care in India.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#9FB3D0]">
              <ShieldCheck className="w-4 h-4 text-[#8DB9F0]" />
              Secure 256-bit Encrypted Checkout
            </span>
            <Link href="/admin/login" className="hover:text-[#8DB9F0] transition-colors">
              Studio Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

