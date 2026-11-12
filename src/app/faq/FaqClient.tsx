'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

export default function FaqClient({ initialFaqs }: { initialFaqs: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Digital Products', 'Services & Development', 'Payments & Delivery'];

  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      if (activeCategory !== 'All' && faq.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [initialFaqs, activeCategory, searchQuery]);

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            KNOWLEDGE BASE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-3">
            Clear, transparent answers about our digital products, deliverables, and development sprints.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mt-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
            <input
              type="text"
              placeholder="Search questions by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] shadow-soft focus:outline-none focus:border-[#8DB9F0]"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#18243B] text-white shadow-soft'
                    : 'bg-white text-[#446294] border border-[#E9E8F8] hover:bg-[#E9E8F8]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-[#E9E8F8]">
              <HelpCircle className="w-8 h-8 text-[#9FB3D0] mx-auto mb-2" />
              <p className="text-xs text-[#6B88B3]">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <details
                key={faq.id}
                className="group p-6 rounded-2xl bg-white border border-[#E9E8F8] shadow-soft transition-all duration-200"
              >
                <summary className="font-serif text-base sm:text-lg font-semibold text-[#18243B] cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="ml-4 w-6 h-6 rounded-full bg-[#E9E8F8] text-[#18243B] flex items-center justify-center text-sm font-mono group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <div className="mt-4 text-xs sm:text-sm text-[#446294] leading-relaxed border-t border-[#E9E8F8] pt-4 space-y-2">
                  <p>{faq.answer}</p>
                  <span className="inline-block text-[10px] uppercase font-bold text-[#8DB9F0] bg-[#18243B] px-2 py-0.5 rounded">
                    Category: {faq.category}
                  </span>
                </div>
              </details>
            ))
          )}
        </div>

        {/* Still have questions? */}
        <div className="mt-16 bg-[#18243B] text-white rounded-3xl p-8 sm:p-10 text-center">
          <h3 className="font-serif text-xl sm:text-2xl font-light">
            Didn&apos;t find what you&apos;re looking for?
          </h3>
          <p className="text-xs sm:text-sm text-[#9FB3D0] mt-2 max-w-md mx-auto">
            Our studio team is available on WhatsApp and email to assist with any custom queries.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6]"
            >
              Contact Studio Concierge
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#233352] text-white font-semibold text-xs hover:bg-[#2F4671] flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" /> WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

