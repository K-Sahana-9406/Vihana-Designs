import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, ShoppingBag, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-[#F8F9FC] min-h-[75vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <span className="font-serif text-8xl font-light text-[#8DB9F0] tracking-tight block">
          404
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18243B] mt-2">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#446294] mt-3 leading-relaxed">
          The page or digital resource you are attempting to reach might have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Homepage
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] font-semibold text-xs hover:bg-[#E9E8F8] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" /> Explore Digital Store
          </Link>
        </div>
      </div>
    </div>
  );
}

