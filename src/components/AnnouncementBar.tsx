'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, X, ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="relative bg-[#18243B] text-white py-2.5 px-4 text-xs sm:text-sm font-medium border-b border-[#8DB9F0]/20 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#8DB9F0]/20 text-[#8DB9F0] text-[11px] font-semibold tracking-wide uppercase">
            <Sparkles className="w-3 h-3" /> Studio Launch
          </span>
          <span className="text-[#E9E8F8]">
            Use code <strong className="text-[#8DB9F0] tracking-wider">LAUNCH20</strong> for 20% off all digital products.
          </span>
          <Link
            href="/shop"
            className="hidden sm:inline-flex items-center gap-1 text-[#8DB9F0] hover:text-white underline underline-offset-4 ml-1 transition-colors"
          >
            Explore Store <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/60 hover:text-white p-1 rounded-md transition-colors ml-4"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

