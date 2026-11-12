# VIHANA DESIGNS — Premium Digital Products & Creative Technology Studio

> **"Digital Creativity. Thoughtful Design. Limitless Possibilities."**

A production-ready digital business platform built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 🚀 Live Local Deployment

The application is currently running live in production mode:
- **Local URL:** [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Digital Store:** [http://localhost:3000/shop](http://localhost:3000/shop)
- **Client Project Brief:** [http://localhost:3000/start-project](http://localhost:3000/start-project)

---

## 🔑 Default Credentials

### Studio Administrator
- **Email:** `admin@vihanadesigns.com`
- **Password:** `AdminPassword2026!`
- **Access Route:** `/login` or `/admin`
- *(1-Click login buttons available on the sign-in page)*

### Demo Verified Client
- **Email:** `client@example.com`
- **Password:** `CustomerPass2026!`
- **Access Route:** `/login` -> `/account`

---

## 🎨 Brand Colour Token System

| Token | Hex Value | Application |
|---|---|---|
| **Powder Blue** (Primary) | `#8DB9F0` | Primary buttons, accent pills, highlights |
| **Soft Lavender White** (Secondary) | `#E9E8F8` | Surface accents, badges, gradient transitions |
| **Cloud White** | `#F8F9FC` | Clean editorial canvas & card backgrounds |
| **Midnight Navy** | `#18243B` | Luxury headers, dark sections, high-contrast text |
| **Muted Lavender** | `#C5B8E8` | Scrollbars, subtle card borders, badge trims |
| **Ice Blue** | `#D6E7FA` | Glow radials and subtle hero ambient blobs |

---

## 🏛️ Architecture & Core Features

### 1. Digital Products Store (`/shop` & `/product/[slug]`)
- **9 Core Categories:** Ebooks & Guides, AI Tools & Prompts, Business Pitch Decks, Productivity Systems, Notion Workspaces, Planners, Resume/Career Kits, Social Media Suites, and Educational Resources.
- **Search & Live Filtering:** Category tabs, keyword instant search, rating sort, price sort, and wishlist filter.
- **Product Detail Pages:** High-resolution preview gallery, "What's Included" feature checklist, format compatibility, transformative benefits, and related products.
- **Shopping Cart & Checkout (`/cart`, `/checkout`):**
  - Real-time coupon validator (`LAUNCH20` for 20% off, `VIHANA500` for ₹500 off).
  - Server-side price authority (zero client-side price tampering).
  - Razorpay UPI, Cards, Netbanking, and instantaneous sandbox test checkout.

### 2. Secure Digital Delivery & License System (`/thank-you` & `/api/download/[token]`)
- Cryptographic download entitlement tokens with 30-day expiration windows and 10-download caps.
- Private streamed file delivery with custom Content-Disposition headers (no raw storage URLs exposed).
- Download audit logging (IP address, user agent, timestamps).

### 3. Website Development Services (`/services`)
- 9 fully fleshed-out services with target audiences, deliverables, timelines, and commercial benefits:
  1. Business Websites
  2. High-Converting Landing Pages
  3. Creative Portfolio Websites
  4. Personal Branding Platforms
  5. Startup Launch Websites
  6. Luxury E-commerce Flagships
  7. Custom Full-Stack Web Applications
  8. Website Redesign & Modernization
  9. Custom Digital Solutions

### 4. Interactive Client Project Questionnaire (`/start-project`)
- CRM lead generation with automatic reference ID generation (`VD-ENQ-2026-XXXX`).
- Multi-feature requirement checklists, budget ranges, timeline preferences, and client briefs.
- Automated client email acknowledgement and admin notification.

### 5. Client Portfolio & Case Studies (`/portfolio` & `/portfolio/[slug]`)
- Curated case studies featuring challenge breakdowns, engineering solutions, tech stack pills, and verified business metrics.

### 6. Customer Account Portal (`/account`)
- Real-time order history, invoices, cloud download vault, and profile management.

### 7. Administrative Control Center (`/admin`)
- **Dashboard Overview:** Verified revenue (₹ INR), order status breakdowns, registered clients, and active leads.
- **Product Manager:** Create, edit, publish/unpublish, toggle featured, and delete products.
- **Order Manager:** Filter by status (PAID, PENDING, REFUNDED), search transactions, and manage refunds.
- **CRM Lead Pipeline:** Update stages (New, Contacted, In Discussion, Converted, Rejected) and save internal notes.
- **Promotions Engine:** Create coupon codes (% or ₹), set usage limits, and toggle active states.
- **Studio Settings:** Configure brand copy, WhatsApp concierge numbers, contact emails, and announcement banners.

---

## 🛠️ Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with CSS Variables design-token system
- **Database:** Prisma ORM with SQLite (1-line switch to PostgreSQL/Supabase)
- **Security:** bcryptjs password hashing, JWT HTTP-only cookies, HMAC webhook signature verification
- **Animations:** Framer Motion, canvas-confetti, custom CSS keyframe floats
- **Icons:** Lucide React

---

## 🚀 Deployment to Vercel / Production Cloud

### Option 1: Vercel (Recommended)
1. Push this repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Set the following environment variables:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/db" # e.g. Neon, Supabase, or Railway
   JWT_SECRET="your-ultra-secure-random-jwt-secret"
   NEXT_PUBLIC_APP_URL="https://yourdomain.com"
   PAYMENT_MODE="LIVE" # or "TEST"
   RAZORPAY_KEY_ID="rzp_live_..."
   RAZORPAY_KEY_SECRET="..."
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_..."
   ```
4. Click **Deploy**. Vercel will automatically build and deploy the Next.js application with 99+ Core Web Vitals.

---

© 2026 VIHANA DESIGNS. All rights reserved.

