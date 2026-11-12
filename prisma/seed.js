const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Seed for VIHANA DESIGNS ---');

  // 1. Admin User
  const passwordHash = await bcrypt.hash('AdminPassword2026!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vihanadesigns.com' },
    update: {},
    create: {
      email: 'admin@vihanadesigns.com',
      name: 'Vihana Admin',
      passwordHash,
      role: 'ADMIN',
      profile: {
        create: {
          phone: '+91 98765 43210',
          company: 'VIHANA DESIGNS',
          address: 'Bengaluru / Mumbai, India',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        },
      },
    },
  });
  console.log('Admin user initialized:', admin.email);

  // Demo Customer
  const demoCustomerHash = await bcrypt.hash('CustomerPass2026!', 10);
  await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      name: 'Rohan Sharma',
      passwordHash: demoCustomerHash,
      role: 'USER',
      profile: {
        create: {
          phone: '+91 98111 22334',
          company: 'Sharma Ventures',
          address: 'New Delhi, India',
        },
      },
    },
  });

  // 2. Categories
  const categoriesData = [
    { name: 'Ebooks and Guides', slug: 'ebooks-guides', description: 'Actionable handbooks and deep-dive roadmaps for digital builders.', icon: 'BookOpen', sortOrder: 1 },
    { name: 'AI Tools and Resources', slug: 'ai-tools-resources', description: 'Curated prompt libraries, AI workflows, and automation swipe files.', icon: 'Sparkles', sortOrder: 2 },
    { name: 'Business Templates', slug: 'business-templates', description: 'Executive decks, proposals, contract kits, and client operating files.', icon: 'Briefcase', sortOrder: 3 },
    { name: 'Productivity Trackers', slug: 'productivity-trackers', description: 'Goal architectures, KPI dashboards, and high-performance habits.', icon: 'CheckSquare', sortOrder: 4 },
    { name: 'Notion Templates', slug: 'notion-templates', description: 'Architected Notion workspaces for creators, freelancers, and startups.', icon: 'Layout', sortOrder: 5 },
    { name: 'Planners and Journals', slug: 'planners-journals', description: 'Reflective digital planners, bullet journals, and quarterly roadmaps.', icon: 'Calendar', sortOrder: 6 },
    { name: 'Resume and Career Resources', slug: 'resume-career', description: 'ATS-proof modern executive resumes and portfolio layouts.', icon: 'FileText', sortOrder: 7 },
    { name: 'Social Media Templates', slug: 'social-media-templates', description: 'Aesthetic carousel systems, viral reel scripts, and visual grids.', icon: 'Share2', sortOrder: 8 },
    { name: 'Educational Resources', slug: 'educational-resources', description: 'Structured study systems, research logs, and learning trackers.', icon: 'GraduationCap', sortOrder: 9 },
  ];

  const categories = {};
  for (const cat of categoriesData) {
    const record = await prisma.productCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categories[cat.slug] = record;
  }
  console.log('Categories seeded:', Object.keys(categories).length);

  // 3. Products
  const productsData = [
    {
      title: 'The Ultimate Freelancer OS (Notion Workspace)',
      slug: 'ultimate-freelancer-os-notion',
      shortDesc: 'A complete all-in-one operating system to manage client pipelines, contracts, deliverables, invoicing, and revenue.',
      fullDesc: 'Transform how you run your independent business. Built specifically for creative technology specialists, designers, developers, and consultants, the Freelancer OS centralizes your entire business operations into an elegant, friction-free Notion workspace. From lead qualification to automated invoice generation and client portals, this is the exact system used by 6-figure modern agencies.',
      pricePaise: 149900, // ₹1,499
      discountPricePaise: 99900, // ₹999
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Notion Template + Video Onboarding Walkthrough',
      compatibility: 'Desktop & Mobile Notion (Free or Plus Plan)',
      whatsIncluded: JSON.stringify([
        'Full Client CRM with automated status stages',
        'Project & Sprint Planner with Gantt & Kanban views',
        'Proposals, Contracts & SOW templates with legal-friendly clauses',
        'Financial & Invoice Tracker with tax breakdown',
        'Sharable Client Portal Dashboard template',
        '18-minute 4K Video Setup Tutorial',
      ]),
      benefits: JSON.stringify([
        'Save 15+ hours weekly on admin and follow-ups',
        'Eliminate client miscommunication with dedicated portals',
        'Look 10x more professional to high-ticket clients',
        'Never lose track of unpaid invoices or milestones',
      ]),
      tags: JSON.stringify(['Notion', 'Freelance', 'Agency', 'Bestseller']),
      isFeatured: true,
      categoryId: categories['notion-templates'].id,
      downloadFileUrl: '/downloads/vihana-freelancer-os-v2.zip',
      fileName: 'vihana-freelancer-os-v2.zip',
      salesCount: 384,
      rating: 4.95,
      reviewCount: 42,
    },
    {
      title: 'AI Prompt Engineering Master Vault (2,500+ Curated Prompts)',
      slug: 'ai-prompt-engineering-master-vault',
      shortDesc: 'Supercharge ChatGPT, Claude & Midjourney with precision-crafted, tested prompts for marketing, coding, copy, and growth.',
      fullDesc: 'Stop getting generic AI outputs. This master vault is an exhaustive compilation of battle-tested prompt architectures developed across 1,000+ hours of testing. Categorized into distinct departments: web development, visual design direction, conversion copywriting, SEO content strategy, financial modeling, and strategic marketing.',
      pricePaise: 129900, // ₹1,299
      discountPricePaise: 79900, // ₹799
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Searchable Notion Database + Interactive Web Dashboard + PDF Sheet',
      compatibility: 'ChatGPT-4o, Claude 3.5 Sonnet, Midjourney v6, Gemini 1.5/2.0',
      whatsIncluded: JSON.stringify([
        '2,500+ prompt templates with placeholder variables',
        'Chain-of-thought system prompts for complex problem solving',
        'Midjourney photorealistic UI mockup & digital render styles',
        'Conversion copy swipe files for landing pages',
        'Lifetime updates via cloud sync',
      ]),
      benefits: JSON.stringify([
        'Extract 10x higher quality results on the first attempt',
        'Accelerate writing and coding workflows by 50%',
        'Organized in seconds with instant search and tag filters',
      ]),
      tags: JSON.stringify(['AI', 'ChatGPT', 'Claude', 'Midjourney', 'Featured']),
      isFeatured: true,
      categoryId: categories['ai-tools-resources'].id,
      downloadFileUrl: '/downloads/vihana-ai-prompt-vault.zip',
      fileName: 'vihana-ai-prompt-vault.zip',
      salesCount: 612,
      rating: 4.98,
      reviewCount: 88,
    },
    {
      title: 'SaaS & Startup Pitch Deck Kit (Keynote, Canva, Figma)',
      slug: 'saas-startup-pitch-deck-kit',
      shortDesc: 'A luxury 65-slide investor presentation framework designed to raise pre-seed and seed funding with clarity.',
      fullDesc: 'Modeled after successful venture rounds raised by top YC and Indian tech startups. Features high-impact typographic hierarchy, subtle data visualization cards, traction graphs, market sizing models, and competitive matrix matrices with Vihana Designs’ signature aesthetic.',
      pricePaise: 249900, // ₹2,499
      discountPricePaise: 149900, // ₹1,499
      coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Figma Components (.fig), Canva Template Link, Apple Keynote (.key), PPTX',
      compatibility: 'Figma, Canva, Microsoft PowerPoint, Apple Keynote',
      whatsIncluded: JSON.stringify([
        '65 customizable master slides (16:9 widescreen)',
        '30+ editable financial chart & metric cards',
        'Device mockups (iPhone, MacBook, Browser window)',
        'Free curated typography pairing guide',
        'Slide-by-slide storytelling script guide',
      ]),
      benefits: JSON.stringify([
        'Captivate investors with world-class visual polish',
        'Save weeks of design trial-and-error',
        'Seamlessly edit brand colours with Figma design tokens',
      ]),
      tags: JSON.stringify(['Pitch Deck', 'Startup', 'Figma', 'Canva']),
      isFeatured: true,
      categoryId: categories['business-templates'].id,
      downloadFileUrl: '/downloads/vihana-pitch-deck-kit.zip',
      fileName: 'vihana-pitch-deck-kit.zip',
      salesCount: 228,
      rating: 4.92,
      reviewCount: 31,
    },
    {
      title: 'Modern Minimalist Resume & Portfolio System',
      slug: 'modern-minimalist-resume-portfolio',
      shortDesc: 'ATS-optimized, recruiter-approved resume templates with matched Notion portfolio and cover letter suite.',
      fullDesc: 'Stand out in competitive tech and creative applicant pools. Crafted in collaboration with senior tech recruiters in India and the US, this package pairs high ATS compatibility with clean editorial typography.',
      pricePaise: 89900, // ₹899
      discountPricePaise: 49900, // ₹499
      coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Google Docs, Microsoft Word (.docx), Figma & Notion Portfolio',
      compatibility: 'MS Word, Google Docs, Figma, Notion',
      whatsIncluded: JSON.stringify([
        '1-page and 2-page ATS resume formats',
        'Matching cover letter template',
        'Interactive Notion web portfolio template',
        '150+ high-impact action verbs and bullet point formulas',
        'Recruiter review checklist PDF',
      ]),
      benefits: JSON.stringify([
        'Pass automated ATS screening with 98%+ readability',
        'Impress hiring managers with refined typography',
        'Quickly customize for different job roles',
      ]),
      tags: JSON.stringify(['Resume', 'Career', 'ATS', 'Notion']),
      isFeatured: true,
      categoryId: categories['resume-career'].id,
      downloadFileUrl: '/downloads/vihana-resume-system.zip',
      fileName: 'vihana-resume-system.zip',
      salesCount: 479,
      rating: 4.88,
      reviewCount: 54,
    },
    {
      title: 'Creator Media Kit & Brand Sponsorship Tracker',
      slug: 'creator-media-kit-sponsorship-tracker',
      shortDesc: 'Negotiate premium 5-figure sponsorships with an editorial media kit and Notion brand partnership CRM.',
      fullDesc: 'Designed for YouTubers, Instagram creators, newsletter authors, and podcast hosts. Present your audience analytics, demographics, case studies, and rate cards with effortless authority.',
      pricePaise: 119900, // ₹1,199
      discountPricePaise: 69900, // ₹699
      coverImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Canva Pro/Free Template + Notion Sponsorship CRM',
      compatibility: 'Canva, Notion, PDF Export',
      whatsIncluded: JSON.stringify([
        '8-page customizable Canva Media Kit',
        'Automated rate calculator spreadsheet',
        'Brand deal pipeline tracker in Notion',
        'Cold email pitch templates to brand PR managers',
      ]),
      benefits: JSON.stringify([
        'Charge higher rates by demonstrating transparent ROI',
        'Pitch brands in minutes with ready-to-fill case studies',
      ]),
      tags: JSON.stringify(['Creator', 'Canva', 'Instagram', 'Media Kit']),
      isFeatured: false,
      categoryId: categories['social-media-templates'].id,
      downloadFileUrl: '/downloads/vihana-creator-media-kit.zip',
      fileName: 'vihana-creator-media-kit.zip',
      salesCount: 194,
      rating: 4.91,
      reviewCount: 23,
    },
    {
      title: 'Zero to One: Modern Web Agency Blueprint (Ebook + SOPs)',
      slug: 'zero-to-one-web-agency-blueprint',
      shortDesc: 'A practical, zero-fluff playbook on launching, pricing, and scaling a high-margin digital studio in India & globally.',
      fullDesc: 'A 140-page master guide distilled from building modern web development and design systems. Includes exact pricing strategies (fixed vs retainer vs value pricing), lead acquisition tactics, proposal templates, and tech stack recommendations.',
      pricePaise: 199900, // ₹1,999
      discountPricePaise: 119900, // ₹1,199
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Interactive PDF + EPUB + Notion Resource Index',
      compatibility: 'Any PDF reader, iPad, Kindle, Notion',
      whatsIncluded: JSON.stringify([
        '140-page comprehensive digital book',
        '12 standard operating procedure (SOP) templates',
        'Client onboarding email sequences',
        'Scope creep prevention clauses',
      ]),
      benefits: JSON.stringify([
        'Avoid years of painful freelance underpricing',
        'Transition from low-cost gigs to high-value studio contracts',
      ]),
      tags: JSON.stringify(['Ebook', 'Agency', 'Business', 'Guide']),
      isFeatured: true,
      categoryId: categories['ebooks-guides'].id,
      downloadFileUrl: '/downloads/vihana-agency-blueprint.zip',
      fileName: 'vihana-agency-blueprint.zip',
      salesCount: 310,
      rating: 4.96,
      reviewCount: 47,
    },
    {
      title: 'Ultimate Financial Tracker & Wealth Planner',
      slug: 'ultimate-financial-tracker-wealth-planner',
      shortDesc: 'Automated personal and business finance tracker with net worth projections, cashflow forecasting, and tax planning.',
      fullDesc: 'Take command of your financial future. Pre-formulated with intuitive currency switching (INR / USD), monthly cashflow breakdowns, investment asset allocation, and debt payoff calculators.',
      pricePaise: 99900, // ₹999
      discountPricePaise: 59900, // ₹599
      coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Google Sheets (Cloud sync) & Microsoft Excel (.xlsx)',
      compatibility: 'Google Sheets, MS Excel',
      whatsIncluded: JSON.stringify([
        'Annual & monthly financial dashboards',
        'Automated expense categorization',
        'Net worth trajectory chart',
        'Emergency fund and SIP goal calculators',
      ]),
      benefits: JSON.stringify([
        'Know your exact burn rate and savings percentage',
        'Zero manual formula writing required',
      ]),
      tags: JSON.stringify(['Finance', 'Sheets', 'Excel', 'Productivity']),
      isFeatured: false,
      categoryId: categories['productivity-trackers'].id,
      downloadFileUrl: '/downloads/vihana-finance-tracker.zip',
      fileName: 'vihana-finance-tracker.zip',
      salesCount: 260,
      rating: 4.89,
      reviewCount: 29,
    },
    {
      title: 'High-Converting Instagram & Social Grid Suite (Canva)',
      slug: 'instagram-social-grid-suite',
      shortDesc: '120+ modular, luxury social media posts, carousel frameworks, and reel cover layouts designed in Soft Lavender & Navy.',
      fullDesc: 'Curated precisely to match modern minimalist branding aesthetics. Elevate your brand presence on Instagram, LinkedIn, and X with cohesive visual storytelling.',
      pricePaise: 149900, // ₹1,499
      discountPricePaise: 89900, // ₹899
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      previewImages: JSON.stringify([
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      ]),
      format: 'Canva Pro & Free Template Access Links',
      compatibility: 'Canva (Web, iOS, Android)',
      whatsIncluded: JSON.stringify([
        '50 carousel slide templates with high-retention structure',
        '40 single post graphics for quotes and charts',
        '30 vertical video story / reel cover backgrounds',
        'Color palette swap guide',
      ]),
      benefits: JSON.stringify([
        'Create a full month of content in under 2 hours',
        'Establish an instantly recognizable, luxury aesthetic',
      ]),
      tags: JSON.stringify(['Social Media', 'Canva', 'Instagram', 'Design']),
      isFeatured: false,
      categoryId: categories['social-media-templates'].id,
      downloadFileUrl: '/downloads/vihana-social-suite.zip',
      fileName: 'vihana-social-suite.zip',
      salesCount: 188,
      rating: 4.93,
      reviewCount: 19,
    },
  ];

  for (const prod of productsData) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log('Products seeded:', productsData.length);

  // 4. Portfolio Projects
  const portfolioData = [
    {
      title: 'Aura Longevity & Preventive Health',
      slug: 'aura-longevity-health',
      category: 'Business Websites',
      client: 'Aura Health Ventures',
      description: 'A high-converting, clinical yet deeply comforting digital presence for an advanced longevity and diagnostics clinic.',
      challenge: 'The client needed a digital experience that bridged deep medical science with warm, accessible luxury for high-net-worth wellness seekers.',
      solution: 'Crafted a bespoke digital experience featuring interactive biomarker tour modules, streamlined doctor consultation booking, and high-performance editorial typography.',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL']),
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1000&auto=format&fit=crop&q=80',
      ]),
      liveUrl: 'https://aura-health.example.com',
      metrics: JSON.stringify([
        { label: 'Consultation Conversion', value: '+142%' },
        { label: 'Average Session Time', value: '3m 48s' },
        { label: 'PageSpeed Score', value: '99/100' },
      ]),
      isFeatured: true,
      sortOrder: 1,
    },
    {
      title: 'Kavya Fine Jewelry & Solitaires',
      slug: 'kavya-fine-jewelry',
      category: 'E-commerce Websites',
      client: 'Kavya Atelier',
      description: 'Luxury digital flagship for a heritage diamond and gold atelier with interactive 3D ring visualizers and private appointment concierges.',
      challenge: 'Replicating the tactile, intimate experience of a bespoke jewelry salon on mobile screens while handling complex gemstone customization.',
      solution: 'Engineered an ultra-fast headless storefront with fluid diamond grading comparisons, gold weight calculators, and secure WhatsApp concierge handoff.',
      technologies: JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Razorpay', 'Supabase']),
      coverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1000&auto=format&fit=crop&q=80',
      ]),
      liveUrl: 'https://kavya-jewels.example.com',
      metrics: JSON.stringify([
        { label: 'Online Sales Growth', value: '2.8x' },
        { label: 'Mobile Checkout Drop-off', value: '-38%' },
      ]),
      isFeatured: true,
      sortOrder: 2,
    },
    {
      title: 'NexaFlow Enterprise Workflow Engine',
      slug: 'nexaflow-enterprise-workflow',
      category: 'Web Applications',
      client: 'NexaFlow Technologies',
      description: 'B2B SaaS application interface and marketing portal for complex enterprise supply chain automation.',
      challenge: 'Simplifying multi-tiered approval trees, real-time logistics telemetry, and ERP syncing into an intuitive UI.',
      solution: 'Developed an ergonomic dashboard with customizable pipeline nodes, role-based controls, and sub-100ms response states.',
      technologies: JSON.stringify(['Next.js 14', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']),
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      ]),
      liveUrl: 'https://nexaflow.example.com',
      metrics: JSON.stringify([
        { label: 'Demo Requests', value: '+210%' },
        { label: 'User Onboarding Time', value: '-65%' },
      ]),
      isFeatured: true,
      sortOrder: 3,
    },
    {
      title: 'Vanguard Architecture & Urbanism',
      slug: 'vanguard-architecture-urbanism',
      category: 'Portfolio Websites',
      client: 'Vanguard Studios',
      description: 'Monolithic, minimalist portfolio for an architectural firm highlighting sustainable luxury villas and institutional projects.',
      challenge: 'Letting expansive structural photography take center stage while preserving lightning-fast load times and seamless navigation.',
      solution: 'Implemented progressive image blurring, smooth magnetic cursor interactions, and curated editorial grid choreography.',
      technologies: JSON.stringify(['Next.js', 'Tailwind CSS', 'Framer Motion']),
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      galleryImages: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
      ]),
      liveUrl: 'https://vanguard-arch.example.com',
      metrics: JSON.stringify([
        { label: 'Global Press Inquiries', value: '+85%' },
        { label: 'Bounce Rate', value: '22%' },
      ]),
      isFeatured: true,
      sortOrder: 4,
    },
  ];

  for (const proj of portfolioData) {
    await prisma.portfolioProject.upsert({
      where: { slug: proj.slug },
      update: proj,
      create: proj,
    });
  }
  console.log('Portfolio seeded:', portfolioData.length);

  // 5. Testimonials
  const testimonialsData = [
    {
      authorName: 'Aditya Singhania',
      authorRole: 'Founder & CEO',
      company: 'Zenith Logistics',
      quote: 'Vihana Designs rebuilt our core corporate website from the ground up. Their eye for subtle luxury and engineering precision is unmatched. We saw inbound client inquiries double within the first 45 days.',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      authorName: 'Meera Nambiar',
      authorRole: 'Creative Director',
      company: 'Studio Nambiar',
      quote: 'The Freelancer OS Notion template transformed how I run my design practice. It feels like an expensive custom-built software platform. Everything Vihana creates exudes craftsmanship.',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
    {
      authorName: 'Vikram Mehta',
      authorRole: 'Co-founder',
      company: 'Pulse Health Technologies',
      quote: 'Working with Vihana on our startup landing page was an absolute joy. They communicated transparently, delivered on time, and delivered clean, maintainable code that our in-house team loves.',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      rating: 5,
    },
  ];

  for (const test of testimonialsData) {
    await prisma.testimonial.create({ data: test });
  }
  console.log('Testimonials seeded');

  // 6. FAQs
  const faqsData = [
    {
      question: 'How do I receive my digital products after purchase?',
      answer: 'Immediately upon successful payment, your download link is activated on the order confirmation screen. You will also receive an instant confirmation email with your secure download credentials, and you can access your purchased files at any time via your customer account dashboard.',
      category: 'Digital Products',
      sortOrder: 1,
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We support all major Indian and international payment methods via our secure Razorpay integration — including UPI (Google Pay, PhonePe, Paytm, BHIM), all major Credit & Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, and popular mobile wallets.',
      category: 'Payments & Delivery',
      sortOrder: 2,
    },
    {
      question: 'Can I request custom adjustments or installation for templates?',
      answer: 'Yes! While all our digital products come with step-by-step video guides and documentation, our studio team offers bespoke implementation and customization packages. Simply reach out via our Start a Project page.',
      category: 'Services & Development',
      sortOrder: 3,
    },
    {
      question: 'What is your typical timeline for custom website development?',
      answer: 'A high-converting landing page is typically designed, developed, and launched in 7 to 10 business days. Full corporate websites and portfolio platforms usually take 2 to 3 weeks. Custom web applications are scoped on a sprint milestone basis.',
      category: 'Services & Development',
      sortOrder: 4,
    },
    {
      question: 'Do you offer refunds on digital products?',
      answer: 'Because digital products grant instant access and irrevocable download of intellectual property files, standard sales are non-refundable. However, if you encounter any technical glitch or corruption in the files, our support team will resolve it or provide an alternate file within 24 hours.',
      category: 'Payments & Delivery',
      sortOrder: 5,
    },
    {
      question: 'Do you provide ongoing maintenance after a website is launched?',
      answer: 'Yes, we provide 30 days of complimentary post-launch support and technical warranty with every custom website. We also offer quarterly and annual maintenance retainers covering security updates, performance monitoring, and content additions.',
      category: 'Services & Development',
      sortOrder: 6,
    },
  ];

  for (const faq of faqsData) {
    await prisma.faq.create({ data: faq });
  }
  console.log('FAQs seeded');

  // 7. Coupons
  const couponsData = [
    { code: 'LAUNCH20', discountType: 'PERCENTAGE', discountValue: 20, minOrderValuePaise: 0, maxDiscountPaise: 100000, usageLimit: 500 },
    { code: 'VIHANA500', discountType: 'FIXED', discountValue: 50000, minOrderValuePaise: 120000, usageLimit: 200 }, // ₹500 off on ₹1200+
    { code: 'WELCOME10', discountType: 'PERCENTAGE', discountValue: 10, minOrderValuePaise: 0, usageLimit: 1000 },
  ];

  for (const c of couponsData) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log('Coupons seeded');

  // 8. Site Settings
  const defaultSettings = [
    { key: 'site_title', value: 'VIHANA DESIGNS — Premium Digital Products & Creative Technology Studio' },
    { key: 'brand_tagline', value: 'Digital Creativity. Thoughtful Design. Limitless Possibilities.' },
    { key: 'contact_email', value: 'hello@vihanadesigns.com' },
    { key: 'contact_phone', value: '+91 98765 43210' },
    { key: 'whatsapp_number', value: '919876543210' },
    { key: 'instagram_url', value: 'https://instagram.com/vihanadesigns' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/vihanadesigns' },
    { key: 'currency_symbol', value: '₹' },
    { key: 'announcement_bar', value: 'Special Studio Launch: Use code LAUNCH20 for 20% off all digital products.' },
    { key: 'announcement_enabled', value: 'true' },
    { key: 'maintenance_mode', value: 'false' },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
  console.log('Site settings initialized');

  console.log('--- Seed Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

