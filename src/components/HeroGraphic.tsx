'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ArrowUpRight, CheckCircle2, Shield, Zap, Layers, Laptop } from 'lucide-react';

export default function HeroGraphic() {
  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Decorative Glow Blobs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#8DB9F0]/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-[#C5B8E8]/35 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Main Glass Studio Card Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white/90 to-[#F8F9FC]/95 p-3 sm:p-5 border border-[#E9E8F8] shadow-premium backdrop-blur-xl">
        {/* Mockup Browser Window Header */}
        <div className="bg-[#18243B] rounded-2xl overflow-hidden shadow-card border border-[#233352]">
          <div className="px-4 py-3 bg-[#0F1726] border-b border-[#233352] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#18243B] text-[11px] text-[#9FB3D0] font-mono">
              <span className="text-[#8DB9F0]">https://</span>vihanadesigns.com/studio
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>

          {/* Browser Inner Body Displaying Luxury Studio Preview */}
          <div className="p-6 relative overflow-hidden bg-gradient-to-b from-[#18243B] to-[#0F1726] text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white p-1 relative">
                  <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-white">VIHANA DESIGNS</h4>
                  <p className="text-[10px] text-[#8DB9F0] uppercase tracking-wider">Design Token Engine v2.4</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#8DB9F0]/20 text-[#8DB9F0] text-[11px] font-medium border border-[#8DB9F0]/30">
                Core Web Vitals: 99
              </span>
            </div>

            {/* Inner Grid Preview */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 rounded-xl bg-[#233352]/70 border border-[#2F4671]">
                <span className="text-[10px] uppercase tracking-wider text-[#9FB3D0]">Digital Deliveries</span>
                <p className="text-xl font-serif text-white font-semibold mt-1">2,840+</p>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
                  Instant Vault Access
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#233352]/70 border border-[#2F4671]">
                <span className="text-[10px] uppercase tracking-wider text-[#9FB3D0]">Studio Retention</span>
                <p className="text-xl font-serif text-white font-semibold mt-1">98.4%</p>
                <span className="text-[10px] text-[#8DB9F0] flex items-center gap-1 mt-0.5">
                  High-ticket Clients
                </span>
              </div>
            </div>

            {/* Mini Color Swatch Bar showcasing exact brand colors */}
            <div className="p-3 rounded-xl bg-[#090E17]/80 border border-[#233352] flex items-center justify-between">
              <span className="text-[11px] text-[#9FB3D0]">Brand Swatches</span>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-[#8DB9F0] border border-white/20" title="Powder Blue #8DB9F0" />
                <div className="w-5 h-5 rounded-full bg-[#E9E8F8] border border-white/20" title="Soft Lavender #E9E8F8" />
                <div className="w-5 h-5 rounded-full bg-[#F8F9FC] border border-white/20" title="Cloud White #F8F9FC" />
                <div className="w-5 h-5 rounded-full bg-[#C5B8E8] border border-white/20" title="Muted Lavender #C5B8E8" />
                <div className="w-5 h-5 rounded-full bg-[#18243B] border border-white/30" title="Midnight Navy #18243B" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Card 1: Top Right - Verified Purchase */}
        <div className="absolute -top-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-premium border border-[#E9E8F8] flex items-center gap-3 animate-float max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-[#E9E8F8] flex items-center justify-center text-[#18243B] shrink-0">
            <Zap className="w-5 h-5 text-[#8DB9F0]" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[11px] text-[#6B88B3]">
              <span>Instant Download</span>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            </div>
            <p className="text-xs font-semibold text-[#18243B] leading-tight mt-0.5">
              Freelancer OS Notion Workspace
            </p>
          </div>
        </div>

        {/* Floating Card 2: Bottom Left - Bespoke Website Status */}
        <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#18243B]/95 text-white backdrop-blur-md p-3.5 rounded-2xl shadow-premium border border-[#8DB9F0]/30 flex items-center gap-3 animate-float-delayed max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-[#8DB9F0] text-[#18243B] flex items-center justify-center shrink-0 font-bold">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] text-[#8DB9F0] font-medium">Bespoke Next.js Build</p>
            <p className="text-xs font-semibold text-white leading-tight mt-0.5">
              Deployed in 7 Days • Production-Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

