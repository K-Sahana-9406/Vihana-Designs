# VIHANA DESIGNS — Deployment & Production Setup Guide

This document outlines the step-by-step procedures to deploy **VIHANA DESIGNS** to cloud production platforms (Vercel, Railway, Render, or AWS) with a managed PostgreSQL database (Supabase / Neon / AWS RDS) and live Razorpay payments.

---

## 1. Managed PostgreSQL Setup (Supabase / Neon)

1. Create a free PostgreSQL project at [Supabase](https://supabase.com) or [Neon](https://neon.tech).
2. Copy your connection URI:
   ```env
   DATABASE_URL="postgresql://postgres.[project-ref]:[password]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```
3. In `prisma/schema.prisma`, update the datasource provider from `sqlite` to `postgresql`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Push the schema to your remote database:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

---

## 2. Razorpay Live Payment Gateway Setup

1. Sign in to your [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Navigate to **Account & Settings** -> **API Keys**.
3. Generate your **Key ID** (`rzp_live_...`) and **Key Secret**.
4. Set the environment variables in your hosting provider:
   ```env
   PAYMENT_MODE="LIVE"
   RAZORPAY_KEY_ID="rzp_live_your_key_id"
   RAZORPAY_KEY_SECRET="your_live_key_secret"
   NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_live_your_key_id"
   RAZORPAY_WEBHOOK_SECRET="your_generated_webhook_secret"
   ```
5. In Razorpay Webhooks settings, configure:
   - **Webhook URL:** `https://yourdomain.com/api/checkout/verify-payment`
   - **Secret:** The same secret string you entered in `RAZORPAY_WEBHOOK_SECRET`.
   - **Active Events:** `order.paid`, `payment.captured`, `payment.failed`.

---

## 3. Transactional Email Setup (SMTP)

Configure any standard transactional SMTP provider (Resend, Brevo, AWS SES, Mailgun, or SendGrid):
```env
SMTP_HOST="smtp.resend.com"
SMTP_PORT="587"
SMTP_USER="resend"
SMTP_PASS="re_your_api_key"
EMAIL_FROM="VIHANA DESIGNS <hello@yourdomain.com>"
CONTACT_EMAIL="hello@yourdomain.com"
```

---

## 4. Production Checklist

- [x] Responsive layout verified on mobile, tablet, and widescreen.
- [x] Logo preserved from root directory (`public/logo.png`).
- [x] Exact brand colors implemented (`#8DB9F0`, `#E9E8F8`, `#F8F9FC`, `#18243B`, `#C5B8E8`, `#D6E7FA`).
- [x] Password hashing using salt rounds (bcrypt).
- [x] HTTP-only session cookies with secure flag.
- [x] Dynamic sitemap.xml and robots.txt generated.
- [x] Zero-warning production build compiled.

