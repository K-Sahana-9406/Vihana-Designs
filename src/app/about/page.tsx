import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Compass,
  CheckCircle2,
  Code2,
  Heart,
  Palette,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | VIHANA DESIGNS',
  description:
    'Discover the philosophy and craft behind VIHANA DESIGNS — an emerging digital products and creative technology studio based in India.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Craftsmanship Over Templates',
      desc: 'We reject generic website templates and bloated page builders. Every line of code, typography choice, and design token is thoughtfully constructed from zero.',
      icon: Palette,
    },
    {
      title: 'Performance Is a Feature',
      desc: 'Visual beauty means nothing if a website takes 6 seconds to load. We engineer for 99+ Core Web Vitals, sub-second TTFB, and instant client gratification.',
      icon: Zap,
    },
    {
      title: 'Radical Transparency',
      desc: 'No hidden agency retainer traps or vague milestones. We provide clear deliverables, honest timelines, and full ownership of your digital assets.',
      icon: ShieldCheck,
    },
    {
      title: 'Human-Centered Utility',
      desc: 'Our digital products, Notion templates, and prompts are built to solve real operational bottlenecks for independent creators and modern founders.',
      icon: Heart,
    },
  ];

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            OUR STORY & PHILOSOPHY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Digital Creativity. Thoughtful Design. Limitless Possibilities.
          </h1>
          <p className="text-base text-[#446294] mt-4 leading-relaxed">
            VIHANA DESIGNS was founded with a singular conviction: that emerging entrepreneurs, creators, and businesses deserve the same visual sophistication and engineering rigor as billion-dollar global tech leaders.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E9E8F8] shadow-premium mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#446294] leading-relaxed">
              <span className="text-xs uppercase tracking-widest text-[#8DB9F0] font-bold block">
                THE STUDIO ESSENCE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18243B] leading-snug">
                Where Design Meets Disciplined Software Engineering
              </h2>
              <p>
                In an era crowded with generic website builders and cookie-cutter templates, the internet has become visually homogenous. Websites look identical, load sluggishly, and fail to inspire genuine commercial trust.
              </p>
              <p>
                <strong>VIHANA DESIGNS</strong> operates at the exact intersection of luxury editorial design, behavioral conversion strategy, and high-performance full-stack web engineering.
              </p>
              <p>
                We build two core offerings with uncompromising attention to detail:
              </p>
              <ul className="space-y-2.5 text-sm text-[#18243B]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DB9F0] shrink-0" />
                  <strong>High-Utility Digital Products:</strong> Notion systems, AI prompt vaults, and business toolkits designed to save hundreds of operational hours.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DB9F0] shrink-0" />
                  <strong>Bespoke Web Development:</strong> Lightning-fast corporate platforms, landing pages, and web applications built in Next.js and TypeScript.
                </li>
              </ul>
            </div>

            {/* Brand Logo Card */}
            <div className="lg:col-span-5 bg-[#18243B] rounded-2xl p-8 text-white text-center relative overflow-hidden">
              <div className="relative w-24 h-24 mx-auto mb-6 bg-white rounded-2xl p-2 shadow-glow">
                <Image src="/logo.png" alt="VIHANA DESIGNS" fill className="object-contain p-1" />
              </div>
              <h3 className="font-serif text-2xl font-bold tracking-tight text-white">VIHANA DESIGNS</h3>
              <p className="text-xs text-[#8DB9F0] uppercase tracking-widest mt-1">
                Studio Headquarters • India
              </p>
              <p className="text-xs text-[#9FB3D0] mt-4 leading-relaxed">
                Operating with agility across Bengaluru and Mumbai, serving creators, ambitious founders, and clients globally.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-soft">
            <span className="w-10 h-10 rounded-xl bg-[#E9E8F8] text-[#18243B] flex items-center justify-center mb-4">
              <Compass className="w-5 h-5 text-[#8DB9F0]" />
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#18243B] mb-3">Our Mission</h3>
            <p className="text-sm text-[#446294] leading-relaxed">
              To democratize access to world-class digital craftsmanship. We empower individuals, entrepreneurs, and modern businesses with digital products and websites that inspire pride, earn customer trust, and generate tangible commercial growth.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-soft">
            <span className="w-10 h-10 rounded-xl bg-[#E9E8F8] text-[#18243B] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-[#8DB9F0]" />
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#18243B] mb-3">Our Vision</h3>
            <p className="text-sm text-[#446294] leading-relaxed">
              To grow into India&apos;s premier boutique creative technology studio, known globally for redefining digital products, aesthetic software interfaces, and thoughtful human-first digital experiences.
            </p>
          </div>
        </div>

        {/* Studio Core Values */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
              WHAT GUIDES OUR WORK
            </span>
            <h2 className="font-serif text-3xl text-[#18243B] font-light mt-2">
              Our Core Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-[#E9E8F8] shadow-soft hover:border-[#8DB9F0] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] flex items-center justify-center text-[#8DB9F0] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#18243B]">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#6B88B3] mt-2 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-[#18243B] rounded-3xl p-8 sm:p-14 text-center text-white">
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            Let&apos;s Build Something Meaningful Together
          </h2>
          <p className="text-xs sm:text-sm text-[#9FB3D0] mt-3 max-w-lg mx-auto leading-relaxed">
            Whether you&apos;re an entrepreneur launching a venture or someone looking for high-impact digital templates, Vihana Designs is here to elevate your path.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-premium transition-all flex items-center justify-center gap-2"
            >
              Start a Project <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-xs hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              Explore Digital Store <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

