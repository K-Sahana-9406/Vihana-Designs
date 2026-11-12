import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;

    if (!token) {
      return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
    }

    const entitlement = await prisma.downloadEntitlement.findUnique({
      where: { token },
      include: {
        product: true,
        order: true,
      },
    });

    if (!entitlement) {
      return NextResponse.json(
        { error: 'Invalid or unrecognized download token' },
        { status: 404 }
      );
    }

    if (entitlement.isRevoked) {
      return NextResponse.json(
        { error: 'This download access has been revoked by administration' },
        { status: 403 }
      );
    }

    if (new Date(entitlement.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'This download link has expired. Access your files via your customer account portal.' },
        { status: 410 }
      );
    }

    if (entitlement.downloadCount >= entitlement.maxDownloads) {
      return NextResponse.json(
        { error: 'Download limit exceeded (10/10). Please contact studio support.' },
        { status: 429 }
      );
    }

    // Capture request audit headers
    const reqHeaders = headers();
    const ip = reqHeaders.get('x-forwarded-for') || reqHeaders.get('x-real-ip') || '127.0.0.1';
    const userAgent = reqHeaders.get('user-agent') || 'Unknown';

    // Record download log
    await prisma.downloadLog.create({
      data: {
        entitlementId: entitlement.id,
        ipAddress: ip,
        userAgent,
      },
    });

    // Increment download count
    await prisma.downloadEntitlement.update({
      where: { id: entitlement.id },
      data: {
        downloadCount: { increment: 1 },
      },
    });

    // Generate secure simulated digital package payload with manifest and license
    const productTitle = entitlement.product.title;
    const orderNum = entitlement.order.orderNumber;
    const customer = entitlement.order.customerName;

    const packageContent = `=====================================================
VIHANA DESIGNS — PREMIUM DIGITAL PRODUCT DELIVERABLE
=====================================================
Product: ${productTitle}
Order Number: #${orderNum}
Licensed To: ${customer}
Delivery Date: ${new Date().toISOString()}
License: Single Commercial & Personal Use License
Format: Digital Architecture System
=====================================================

THANK YOU FOR INVESTING IN VIHANA DESIGNS.

YOUR PACKAGE CONTENTS:
1. Master Notion Workspace Setup URL:
   https://vihanadesigns.notion.site/access-workspace?ref=${token}

2. Design System Components (Figma Community Token):
   https://figma.com/@vihanadesigns/verified-token-${token.slice(0, 8)}

3. High-Resolution Documentation & Video Walkthrough:
   https://vihanadesigns.com/onboarding/guide-${token.slice(0, 6)}

4. VIP Studio Community Discord / WhatsApp Channel:
   https://vihanadesigns.com/community/vip-access

=====================================================
SUPPORT & BESPOKE CUSTOMIZATION:
Email: hello@vihanadesigns.com
WhatsApp Concierge: +91 98765 43210
Instagram: @vihanadesigns
=====================================================
© ${new Date().getFullYear()} VIHANA DESIGNS. All Rights Reserved.`;

    const fileName =
      entitlement.product.fileName ||
      `${entitlement.product.slug || 'vihana-package'}.txt`;

    return new Response(packageContent, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('[DOWNLOAD ERROR]', err);
    return NextResponse.json({ error: 'Server error delivering file' }, { status: 500 });
  }
}

