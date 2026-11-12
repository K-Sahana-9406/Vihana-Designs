# VIHANA DESIGNS — Production Deployment Guide

This guide provides instructions to successfully deploy **VIHANA DESIGNS** to **Vercel** with **Prisma Postgres**, **Razorpay**, and **Brevo (Sendinblue)**.

---

## 1. Architecture & Vercel Overview

- **Framework**: Next.js 14 (App Router)
- **Database**: Hosted PostgreSQL via **Prisma Postgres** (Vercel Integration)
- **ORM**: Prisma Client v5.22
- **Payments**: Razorpay (Dual-Mode: `TEST` or `LIVE`)
- **Email**: Brevo (SMTP Relay) via `nodemailer`
- **Authentication**: JWT with secure HTTP-only cookies

---

## 2. Vercel Deployment & Prisma Postgres Setup

### Step A: Connect Repository & Add Prisma Postgres
1. Import your GitHub repository into **Vercel**.
2. In the Vercel Project Dashboard, navigate to the **Storage** tab and select **Prisma Postgres** (or connect via the Integrations marketplace).
3. Vercel automatically attaches the integration and sets `DATABASE_URL` (as well as `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING`) in your project environment variables.

### Step B: Database Schema Migration
Vercel's build process runs `npm run build` (`prisma generate && next build`), which generates the client but does **not** alter remote database tables.
To initialize the tables on your fresh Prisma Postgres instance:

**Option 1 — Run locally against your Vercel connection string:**
1. Retrieve your `DATABASE_URL` from the Vercel Storage dashboard.
2. In your local terminal, run:
   ```bash
   # Push the PostgreSQL schema to create all tables and indexes:
   npx prisma db push

   # Seed default categories, products, portfolio projects, and admin user:
   node prisma/seed.js
   ```

**Option 2 — Use Prisma Migrate Deploy:**
```bash
npx prisma migrate deploy
```

---

## 3. Environment Variables Reference

Configure these in **Vercel Settings -> Environment Variables**:

| Variable Name | Required | Description / Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | **Yes** | Automatically injected by Vercel Prisma Postgres |
| `JWT_SECRET` | **Yes** | 32+ character random secret string for session tokens |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Your deployed URL, e.g. `https://vihanadesigns.vercel.app` |
| `PAYMENT_MODE` | **Yes** | `"TEST"` initially; change to `"LIVE"` once Razorpay is set up |
| `RAZORPAY_KEY_ID` | Optional until Live | Server-side Razorpay Key ID (`rzp_live_...` or `rzp_test_...`) |
| `RAZORPAY_KEY_SECRET` | Optional until Live | Server-side Razorpay Secret |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Optional until Live | Client-side Razorpay Key ID |
| `RAZORPAY_WEBHOOK_SECRET` | Optional until Live | Webhook secret for payment signature verification |
| `SMTP_HOST` | Optional until Email | Brevo host: `smtp-relay.brevo.com` |
| `SMTP_PORT` | Optional until Email | `587` |
| `SMTP_USER` | Optional until Email | Your Brevo account email address |
| `SMTP_PASS` | Optional until Email | Your Brevo SMTP master key |
| `EMAIL_FROM` | Optional | e.g. `"VIHANA DESIGNS" <hello@vihanadesigns.com>` |
| `CONTACT_EMAIL` | Optional | Recipient for contact form & lead notifications |
| `ADMIN_SECRET_KEY` | Optional | Admin account registration safety key |

> [!NOTE]
> The application is engineered to build cleanly without Razorpay and Brevo credentials configured. If credentials are missing, payment checkouts and contact forms will return explicit configuration messages rather than failing the build or creating unverified transactions.

---

## 4. Brevo (Sendinblue) Configuration

Once your site is deployed, set up Brevo:
1. Log in to [Brevo.com](https://app.brevo.com).
2. Go to **Settings** -> **SMTP & API** -> **SMTP**.
3. Generate a new SMTP key.
4. Copy the credentials into your Vercel Environment Variables:
   - `SMTP_HOST`: `smtp-relay.brevo.com`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `<Your Brevo login email>`
   - `SMTP_PASS`: `<Your generated SMTP master key>`
   - `EMAIL_FROM`: `"VIHANA DESIGNS" <hello@vihanadesigns.com>`
   - `CONTACT_EMAIL`: `"hello@vihanadesigns.com"`
5. Redeploy or restart the deployment in Vercel to load the new variables.

---

## 5. Razorpay Live Payments Configuration

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com).
2. Toggle from **Test Mode** to **Live Mode**.
3. Go to **Account & Settings** -> **API Keys** -> **Generate Live Key**.
4. Set the following in Vercel:
   - `PAYMENT_MODE`: `LIVE`
   - `RAZORPAY_KEY_ID`: `rzp_live_...`
   - `RAZORPAY_KEY_SECRET`: `...`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`: `rzp_live_...`
5. Configure Webhooks:
   - **Webhook URL**: `https://<your-domain>.vercel.app/api/checkout/verify-payment`
   - **Active Events**: `payment.captured`, `order.paid`, `payment.failed`
   - **Secret**: Set a random secret and copy it into `RAZORPAY_WEBHOOK_SECRET`.

---

## 6. Verification Checklist

- [x] **Zero Build Errors**: Next.js compiles all routes cleanly (`npm run build`).
- [x] **Dynamic Sitemap**: `/sitemap.xml` renders dynamically on demand with graceful static fallback if the database is cold or unmigrated.
- [x] **Database Safety**: PostgreSQL schema with all 14 models, relational constraints, and indexes pre-generated in `prisma/migrations/0_init/migration.sql`.
- [x] **Missing Credentials Safety**: Payment endpoints validate presence of keys in `LIVE` mode; email delivery reports configuration state without masking failures.
- [x] **Secret Isolation**: Local credentials in `.env` are excluded by `.gitignore`; `.env.example` contains safe placeholders only.
