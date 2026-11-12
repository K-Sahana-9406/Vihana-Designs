import React from 'react';
import Link from 'next/link';
import {
  Globe2,
  Zap,
  Palette,
  UserCheck,
  Rocket,
  ShoppingBag,
  Terminal,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Code2,
} from 'lucide-react';

export const metadata = {
  title: 'Website Development Services | Next.js & TypeScript Studio',
  description:
    'Bespoke web development services by VIHANA DESIGNS: High-converting landing pages, corporate websites, e-commerce stores, and custom web applications.',
};

export default function ServicesPage() {
  const services = [
    {
      id: 'business-websites',
      title: 'Business Websites',
      tagline: 'High-credibility corporate platforms designed to win enterprise trust.',
      desc: 'We engineer bespoke corporate digital platforms that reflect institutional excellence. Built with Next.js, headless CMS architectures, and lightning-fast global edge caching.',
      whoNeedsIt: 'B2B enterprises, professional consultancy firms, law practices, clinics, and growth-stage companies.',
      startingPrice: 'From ₹35,000',
      timeline: '10 - 14 Days',
      features: [
        'Custom editorial typography and design-token systems',
        'SEO-optimized architecture with 99+ Core Web Vitals',
        'Lead capture integrations (HubSpot, Zoho, WhatsApp)',
        'Full administrative content dashboard',
        'Multi-language & regional localization support',
      ],
      benefits: 'Elevates your company above competitors, shortens sales cycles, and drives high-value inbound enterprise leads.',
      icon: Globe2,
    },
    {
      id: 'landing-pages',
      title: 'High-Converting Landing Pages',
      tagline: 'Precision-engineered for product launches, paid ad campaigns, and books.',
      desc: 'Single-page conversion powerhouses designed to maximize return on ad spend (ROAS). Every headline, visual hierarchy element, and button trigger is meticulously crafted to eliminate friction.',
      whoNeedsIt: 'SaaS companies, author launches, digital course creators, coaching programs, and mobile apps.',
      startingPrice: 'From ₹18,000',
      timeline: '5 - 7 Days',
      features: [
        'Conversion-first visual storytelling flow',
        'Scroll-triggered micro-interactions and smooth reveals',
        'A/B test-ready component architecture',
        'Instant Razorpay / Stripe checkout integrations',
        'Sub-second first contentful paint (FCP)',
      ],
      benefits: 'Reduces cost-per-acquisition (CPA) and turns cold paid traffic into paying customers.',
      icon: Zap,
    },
    {
      id: 'portfolio-websites',
      title: 'Creative Portfolio Websites',
      tagline: 'Monolithic digital showcases for architects, designers, and visual studios.',
      desc: 'An immersive digital exhibition that lets your creative work speak with unmatched clarity. Fluid image transitions, masonry case study layouts, and smooth magnetic cursor physics.',
      whoNeedsIt: 'Architects, interior designers, film directors, photographers, fashion ateliers, and boutique agencies.',
      startingPrice: 'From ₹25,000',
      timeline: '8 - 12 Days',
      features: [
        'Interactive fullscreen case study presentations',
        'High-density media optimization without lag',
        'Fluid drag-to-scroll galleries and modal lightbox views',
        'Client inquiry and project scoping forms',
        'Discreet brand watermarking and custom domain setup',
      ],
      benefits: 'Positions your craft at the pinnacle of luxury, commanding premium fees from discerning clients.',
      icon: Palette,
    },
    {
      id: 'personal-branding',
      title: 'Personal Branding Websites',
      tagline: 'Establish undeniable digital authority for visionary founders and speakers.',
      desc: 'A unified digital home for your ideas, podcasts, keynote speaking reels, press mentions, and published writings.',
      whoNeedsIt: 'Startup CEOs, keynote speakers, thought leaders, venture capitalists, and top consultants.',
      startingPrice: 'From ₹22,000',
      timeline: '7 - 10 Days',
      features: [
        'Speaker one-sheet & downloadable media kit press room',
        'Substack & newsletter subscription integration',
        'Interactive podcast & video appearances player',
        'Direct calendar consultation booking (Calendly, Cal.com)',
        'Personal manifesto & editorial blog architecture',
      ],
      benefits: 'Consolidates your social media followers into an owned audience and unlocks speaking engagements.',
      icon: UserCheck,
    },
    {
      id: 'startup-websites',
      title: 'Startup Launch Websites',
      tagline: 'Modern tech aesthetics designed to win investors, talent, and early adopters.',
      desc: 'Modeled after high-growth Y Combinator and global venture-backed startups. High-energy micro-animations, feature tour cards, and interactive interactive pricing calculators.',
      whoNeedsIt: 'Pre-seed to Series B tech startups, AI startups, fintech platforms, and developer tooling teams.',
      startingPrice: 'From ₹30,000',
      timeline: '7 - 12 Days',
      features: [
        'Interactive product feature walkthrough modules',
        'Waitlist capture with viral referral mechanisms',
        'Investor deck portal with password protection',
        'Interactive pricing toggle (Monthly vs Annual)',
        'Dark mode toggle with luxury color accents',
      ],
      benefits: 'Projects the technical maturity of a decacorn from day one, winning investor trust.',
      icon: Rocket,
    },
    {
      id: 'ecommerce-websites',
      title: 'Luxury E-commerce Flagships',
      tagline: 'Ultra-fast storefronts with friction-free Razorpay checkout.',
      desc: 'Say goodbye to bloated Shopify apps. We build custom headless e-commerce storefronts that load instantly, handle thousands of simultaneous shoppers, and maximize average order value (AOV).',
      whoNeedsIt: 'Direct-to-consumer (D2C) brands, jewelry ateliers, artisanal fashion labels, and gourmet products.',
      startingPrice: 'From ₹45,000',
      timeline: '14 - 21 Days',
      features: [
        'Instant Razorpay UPI, Cards, Net Banking checkout',
        'Fluid product variants (size, color, finish) with zero delay',
        'Cart drawer with automated cross-sell product suggestions',
        'Order tracking & automated WhatsApp notifications',
        'Admin inventory, order, and coupon control dashboard',
      ],
      benefits: 'Eliminates 90% of mobile checkout abandonment and delivers an app-like purchasing experience.',
      icon: ShoppingBag,
    },
    {
      id: 'web-applications',
      title: 'Custom Web Applications',
      tagline: 'Enterprise-grade full-stack SaaS and bespoke internal operating tools.',
      desc: 'End-to-end web applications built on Next.js, Node.js, PostgreSQL, and secure role-based access control. From client portals to workflow automation dashboards.',
      whoNeedsIt: 'Tech startups, workflow automation companies, financial brokerages, and logistics operators.',
      startingPrice: 'From ₹65,000',
      timeline: '3 - 5 Sprints',
      features: [
        'Relational database architecture with automated migrations',
        'Role-Based Access Control (RBAC) & secure session cookies',
        'Real-time data visualization charts & export to PDF/Excel',
        'Transactional email, SMS, and WhatsApp webhooks',
        'Automated CI/CD deployment pipelines on Vercel or AWS',
      ],
      benefits: 'Automates manual internal operations, reduces headcount costs, and delivers a scalable product.',
      icon: Terminal,
    },
    {
      id: 'website-redesign',
      title: 'Website Redesign & Modernization',
      tagline: 'Upgrade outdated legacy websites into modern, high-speed digital engines.',
      desc: 'Is your current website slow, bloated, or embarrassing to share with high-value clients? We migrate you away from clunky page builders into a modern, bespoke Next.js codebase.',
      whoNeedsIt: 'Businesses with 3+ year old websites experiencing declining traffic or poor mobile conversions.',
      startingPrice: 'From ₹28,000',
      timeline: '7 - 12 Days',
      features: [
        'Complete visual re-architecture matching modern aesthetics',
        'SEO-preserving 301 redirect mapping so rankings never drop',
        'Mobile UX overhaul for seamless touch devices',
        'Page speed boost from 30/100 to 95+/100',
        'Clean, maintainable source code handed over to you',
      ],
      benefits: 'Revitalizes brand perception, recovers lost search rankings, and doubles conversion rates.',
      icon: Layers,
    },
    {
      id: 'custom-solutions',
      title: 'Custom Digital Solutions',
      tagline: 'Bespoke creative technology tailored to your exact operational vision.',
      desc: 'Have a unique digital requirement that doesn&apos;t fit into a standard box? We design and build custom calculators, interactive 3D configurators, members-only digital vaults, and API integrations.',
      whoNeedsIt: 'Innovative ventures, research organizations, luxury hospitality brands, and creative technologists.',
      startingPrice: 'Custom Scope',
      timeline: 'Milestone-based',
      features: [
        'Tailored algorithmic calculations and interactive tools',
        'Third-party API & CRM integrations (Salesforce, Stripe, Razorpay)',
        'Custom members-only gated content architectures',
        'Bespoke digital design tokens and Figma libraries',
        'Comprehensive technical documentation and team handoff',
      ],
      benefits: 'Delivers a competitive moat that off-the-shelf software cannot replicate.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            STUDIO WEB DEVELOPMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Engineering Websites That Command Authority & Conversion
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-4 leading-relaxed">
            We partner with ambitious founders, emerging brands, and creators to build production-grade web platforms. Zero generic templates. Pure craftsmanship.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/start-project"
              className="px-7 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all flex items-center gap-2"
            >
              Start Your Custom Project <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="px-7 py-3.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] font-semibold text-sm hover:bg-[#E9E8F8] transition-all"
            >
              View Client Work
            </Link>
          </div>
        </div>

        {/* 9 Services Detailed Grid */}
        <div className="space-y-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E8F8] shadow-soft hover:shadow-premium transition-all duration-300 scroll-mt-28"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  {/* Left Column: Title & Overview */}
                  <div className="lg:col-span-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#E9E8F8] text-[#18243B] flex items-center justify-center mb-6 shadow-sm">
                      <Icon className="w-6 h-6 text-[#18243B]" />
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18243B]">
                      {service.title}
                    </h2>
                    <p className="text-xs uppercase tracking-wider text-[#8DB9F0] font-semibold mt-1">
                      {service.tagline}
                    </p>

                    <p className="text-sm text-[#446294] mt-4 leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="mt-6 pt-6 border-t border-[#E9E8F8] space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-[#18243B]">
                        <Clock className="w-4 h-4 text-[#8DB9F0]" />
                        <span>Timeline: <strong>{service.timeline}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-[#18243B]">
                        <Code2 className="w-4 h-4 text-[#8DB9F0]" />
                        <span>Investment: <strong>{service.startingPrice}</strong></span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link
                        href={`/start-project?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18243B] text-white text-xs font-semibold hover:bg-[#233352] transition-colors"
                      >
                        Enquire for this Service <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Features, Who Needs It, Benefits */}
                  <div className="lg:col-span-7 bg-[#F8F9FC] rounded-2xl p-6 sm:p-8 border border-[#E9E8F8] space-y-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#18243B] mb-2">
                        Who This Is Built For
                      </h4>
                      <p className="text-xs sm:text-sm text-[#446294] leading-relaxed">
                        {service.whoNeedsIt}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#18243B] mb-3">
                        Included Key Architecture & Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#2F4671]">
                            <CheckCircle2 className="w-4 h-4 text-[#8DB9F0] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#E9E8F8]">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#18243B] mb-1">
                        Commercial Impact
                      </h4>
                      <p className="text-xs text-[#6B88B3] leading-relaxed">
                        {service.benefits}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 bg-[#18243B] rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden">
          <h2 className="font-serif text-3xl sm:text-4xl font-light">
            Have a Specific Project in Mind?
          </h2>
          <p className="text-[#9FB3D0] text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Fill out our comprehensive project enquiry questionnaire. We will analyze your requirements and return a detailed architectural roadmap within 24 hours.
          </p>
          <div className="mt-8">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all"
            >
              Start Your Project Questionnaire <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

