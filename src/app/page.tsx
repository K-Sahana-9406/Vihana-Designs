import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import ProductCard from '@/components/ProductCard';
import HeroGraphic from '@/components/HeroGraphic';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layout,
  Layers,
  Zap,
  Globe2,
  Palette,
  Terminal,
  Clock,
  Star,
  Users,
  Compass,
} from 'lucide-react';

export const revalidate = 0; // Fresh data

export default async function HomePage() {
  // Fetch featured products, projects, testimonials, faqs with safe fallback
  let featuredProducts: any[] = [];
  let portfolioProjects: any[] = [];
  let testimonials: any[] = [];
  let faqs: any[] = [];

  try {
    [featuredProducts, portfolioProjects, testimonials, faqs] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true, isFeatured: true },
        take: 4,
        include: { category: true },
        orderBy: { salesCount: 'desc' },
      }),
      prisma.portfolioProject.findMany({
        where: { isPublished: true, isFeatured: true },
        take: 3,
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.testimonial.findMany({
        where: { isFeatured: true },
        take: 3,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.faq.findMany({
        take: 4,
        orderBy: { sortOrder: 'asc' },
      }),
    ]);
  } catch (error) {
    console.error(
      '[HOME PAGE DB ERROR] Failed to fetch dynamic database records (tables uninitialized or connection down):',
      error instanceof Error ? error.message : 'Database error'
    );
  }

  const studioServices = [
    {
      title: 'Business Websites',
      desc: 'High-credibility corporate digital platforms engineered to turn traffic into pipeline and authority.',
      icon: Globe2,
      href: '/services#business-websites',
      badge: 'Core Service',
    },
    {
      title: 'Landing Pages',
      desc: 'Conversion-engineered launch pads tailored for SaaS products, books, campaigns, and high-ticket offers.',
      icon: Zap,
      href: '/services#landing-pages',
      badge: 'Rapid 7-Day',
    },
    {
      title: 'Portfolio & Personal Brand',
      desc: 'Editorial visual portfolios for executives, consultants, doctors, architects, and top creators.',
      icon: Palette,
      href: '/services#portfolio-websites',
      badge: 'Luxury Editorial',
    },
    {
      title: 'Custom Web Applications',
      desc: 'Full-stack Next.js and TypeScript web applications with secure databases, auth, and automated workflows.',
      icon: Terminal,
      href: '/services#web-applications',
      badge: 'Enterprise Architecture',
    },
    {
      title: 'Modern E-commerce',
      desc: 'Blazing-fast digital stores and physical retail flagships with seamless Razorpay checkout and zero bloat.',
      icon: Layout,
      href: '/services#ecommerce-websites',
      badge: 'High Conversion',
    },
    {
      title: 'Website Modernization',
      desc: 'Transform outdated WordPress and slow legacy sites into state-of-the-art, lightning-fast digital assets.',
      icon: Layers,
      href: '/services#website-redesign',
      badge: 'Performance Upgrade',
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Strategic Alignment',
      desc: 'We unpack your brand positioning, target audience, and precise commercial goals before writing a single line of code.',
    },
    {
      number: '02',
      title: 'Bespoke Design Architecture',
      desc: 'We craft high-fidelity interactive wireframes and design systems in Figma utilizing our signature editorial typography and color harmony.',
    },
    {
      number: '03',
      title: 'Modern Full-Stack Development',
      desc: 'Built cleanly in Next.js, TypeScript, and Tailwind CSS. Optimized for 99+ Core Web Vitals, bulletproof SEO, and fluid responsive motion.',
    },
    {
      number: '04',
      title: 'Rigorous Testing & Launch',
      desc: 'End-to-end performance audits, analytics wiring, payment testing, domain configuration, and 30 days of complimentary support.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden hero-gradient border-b border-[#E9E8F8]">
        {/* Subtle Background Radial Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#8DB9F0]/20 via-[#E9E8F8]/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Studio Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E9E8F8] shadow-soft mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-[#8DB9F0]" />
                <span className="text-xs font-semibold tracking-wider uppercase text-[#18243B]">
                  VIHANA DESIGNS STUDIO
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DB9F0]" />
                <span className="text-xs text-[#6B88B3]">India & Worldwide</span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#18243B] leading-[1.12] tracking-tight">
                Digital Creativity.{' '}
                <span className="italic font-normal text-[#2F4671]">
                  Thoughtful Design.
                </span>{' '}
                Limitless Possibilities.
              </h1>

              {/* Supporting Subtext */}
              <p className="mt-6 text-base sm:text-lg text-[#446294] leading-relaxed max-w-xl font-normal">
                We create digital experiences, thoughtful resources, Notion workspaces, and beautiful websites that help ideas become reality.
              </p>

              {/* Dual Primary CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  href="/shop"
                  className="px-7 py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Explore Digital Products
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/start-project"
                  className="px-7 py-4 rounded-xl bg-transparent border-2 border-[#18243B] text-[#18243B] font-semibold text-sm hover:bg-[#18243B] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Social Proof Mini Bar */}
              <div className="mt-12 pt-8 border-t border-[#E9E8F8] flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-[#6B88B3]">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-[#8DB9F0] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#18243B]">
                      VS
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#C5B8E8] border-2 border-white flex items-center justify-center text-[10px] font-bold text-[#18243B]">
                      AS
                    </div>
                    <div className="w-7 h-7 rounded-full bg-[#18243B] border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                      +
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-[#18243B] block">2,800+ Digital Builders</span>
                    <span>Using Vihana Templates & Assets</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#18243B]">4.95 / 5</span>
                  <span className="text-[#9FB3D0]">(180+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Right Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST METRICS TICKER */}
      <section className="bg-white py-12 border-b border-[#E9E8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#E9E8F8]">
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B]">100%</p>
              <p className="text-xs uppercase tracking-wider text-[#6B88B3] mt-1 font-medium">
                Production-Ready Code
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B]">7 - 10 Days</p>
              <p className="text-xs uppercase tracking-wider text-[#6B88B3] mt-1 font-medium">
                Rapid Website Turnaround
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B]">₹0 Setup Glitches</p>
              <p className="text-xs uppercase tracking-wider text-[#6B88B3] mt-1 font-medium">
                Instant Digital Delivery
              </p>
            </div>
            <div className="pt-4 md:pt-0">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B]">24h Support</p>
              <p className="text-xs uppercase tracking-wider text-[#6B88B3] mt-1 font-medium">
                Direct Studio Concierge
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DIGITAL PRODUCTS */}
      <section className="py-24 bg-[#F8F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
                THE DIGITAL MARKETPLACE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#18243B] font-light mt-2">
                Curated Digital Assets for Ambitious Creators
              </h2>
              <p className="text-[#6B88B3] text-sm mt-3 max-w-xl">
                Every template, Notion system, and AI prompt kit is battle-tested in actual production environments before release.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18243B] hover:text-[#2F4671] pb-1 border-b-2 border-[#8DB9F0] self-start md:self-auto transition-colors"
            >
              Browse All Products ({featuredProducts.length}+ available) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WEBSITE DEVELOPMENT SERVICES OVERVIEW */}
      <section className="py-24 bg-[#18243B] text-white relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#8DB9F0]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5B8E8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="px-3 py-1 rounded-full bg-[#8DB9F0]/20 text-[#8DB9F0] text-xs font-semibold tracking-widest uppercase">
              BESPOKE WEB DEVELOPMENT
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light mt-4">
              We Build Websites That Elevate Brands Into Industry Leaders
            </h2>
            <p className="text-[#9FB3D0] text-base mt-4 leading-relaxed">
              From high-converting landing pages to complex full-stack web applications, we combine luxury visual art direction with rock-solid Next.js engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studioServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-[#233352]/50 border border-[#2F4671] rounded-2xl p-8 hover:bg-[#233352] hover:border-[#8DB9F0]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#18243B] border border-[#2F4671] flex items-center justify-center text-[#8DB9F0] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#8DB9F0] px-2.5 py-1 rounded-full bg-[#18243B]/60 border border-[#2F4671]">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-white group-hover:text-[#8DB9F0] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#9FB3D0] mt-3 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#2F4671]/70 flex items-center justify-between">
                    <Link
                      href={service.href}
                      className="text-xs font-semibold text-[#8DB9F0] hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/start-project?service=${encodeURIComponent(service.title)}`}
                      className="text-xs text-[#9FB3D0] hover:text-white transition-colors"
                    >
                      Request Quote →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all duration-200"
            >
              Explore All 9 Web Development Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. SELECTED PORTFOLIO SHOWCASE */}
      <section className="py-24 bg-white border-b border-[#E9E8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
                SELECTED WORK
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#18243B] font-light mt-2">
                Crafted for Discerning Clients & High-Growth Startups
              </h2>
              <p className="text-[#6B88B3] text-sm mt-3 max-w-xl">
                Every project is designed from scratch without generic templates. Pure editorial aesthetics meets sub-second response times.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#18243B] hover:text-[#2F4671] pb-1 border-b-2 border-[#8DB9F0] self-start md:self-auto transition-colors"
            >
              View Full Portfolio Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => {
              const techList: string[] = project.technologies
                ? typeof project.technologies === 'string'
                  ? JSON.parse(project.technologies)
                  : project.technologies
                : [];

              return (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-[#E9E8F8] bg-[#F8F9FC] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-[#18243B] shadow-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#6B88B3] font-medium uppercase tracking-wider">
                        Client: {project.client}
                      </span>
                      <h3 className="font-serif text-xl font-semibold text-[#18243B] mt-1 group-hover:text-[#2F4671] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#446294] mt-2 line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#E9E8F8]">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techList.slice(0, 3).map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white text-[11px] font-mono text-[#2F4671] border border-[#E9E8F8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] flex items-center justify-between group-hover:underline"
                      >
                        Read In-Depth Case Study <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. HOW WE WORK (4-STEP PROCESS) */}
      <section className="py-24 bg-[#E9E8F8]/40 border-b border-[#E9E8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
              THE STUDIO METHODOLOGY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#18243B] font-light mt-3">
              How We Turn Ambition Into Flawless Reality
            </h2>
            <p className="text-[#6B88B3] text-sm mt-3">
              A transparent, high-cadence development sprint designed to launch your website on schedule with zero compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-[#E9E8F8] shadow-soft relative flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-bold text-[#8DB9F0] block mb-4">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#18243B] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#6B88B3] mt-3 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E9E8F8]/60 flex items-center gap-1.5 text-[11px] font-medium text-[#446294]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8DB9F0]" /> Guaranteed Standard
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="py-24 bg-white border-b border-[#E9E8F8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
              TESTIMONIALS & TRUST
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#18243B] font-light mt-2">
              Endorsed by Visionary Founders & Creators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="p-8 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-amber-400 gap-1 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="font-serif italic text-sm text-[#18243B] leading-relaxed">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-[#E9E8F8]">
                  {test.avatarUrl && (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#8DB9F0]">
                      <Image
                        src={test.avatarUrl}
                        alt={test.authorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="text-sm font-bold text-[#18243B]">{test.authorName}</h4>
                    <p className="text-xs text-[#6B88B3]">
                      {test.authorRole}, <span className="text-[#18243B]">{test.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ PREVIEW */}
      <section className="py-20 bg-[#F8F9FC] border-b border-[#E9E8F8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#446294]">
              TRANSPARENCY & CLARITY
            </span>
            <h2 className="font-serif text-3xl text-[#18243B] font-light mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group p-6 rounded-2xl bg-white border border-[#E9E8F8] shadow-soft transition-all duration-200"
              >
                <summary className="font-serif text-base sm:text-lg font-semibold text-[#18243B] cursor-pointer list-none flex items-center justify-between">
                  <span>{faq.question}</span>
                  <span className="ml-4 w-6 h-6 rounded-full bg-[#E9E8F8] text-[#18243B] flex items-center justify-center text-sm font-mono group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-[#446294] leading-relaxed border-t border-[#E9E8F8] pt-4">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/faq"
              className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] underline underline-offset-4"
            >
              View All Frequently Asked Questions →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FINAL HIGH-CONVERTING CTA BANNER */}
      <section className="py-20 bg-[#18243B] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="px-3 py-1 rounded-full bg-[#8DB9F0]/20 text-[#8DB9F0] text-xs font-semibold tracking-widest uppercase">
            LET&apos;S BUILD SOMETHING EXTRAORDINARY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light mt-6 leading-tight">
            Ready to Elevate Your Digital Presence?
          </h2>
          <p className="text-[#9FB3D0] text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Whether you need a high-impact website developed in Next.js or premium digital resources to power your workflow, Vihana Designs is ready to deliver.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Your Custom Project <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border border-[#8DB9F0]/50 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Browse Digital Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

