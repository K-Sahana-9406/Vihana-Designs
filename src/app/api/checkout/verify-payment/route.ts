import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, getOrderConfirmationEmailHtml } from '@/lib/email';
import { formatINR } from '@/lib/utils';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature, testSimulation } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.status === 'PAID') {
      return NextResponse.json({
        success: true,
        alreadyProcessed: true,
        orderNumber: order.orderNumber,
      });
    }

    // 1. Signature Verification if Live Razorpay
    if (process.env.PAYMENT_MODE === 'LIVE') {
      if (testSimulation) {
        return NextResponse.json(
          {
            error:
              'Test simulation is rejected when PAYMENT_MODE is set to LIVE. Real Razorpay payment confirmation is required.',
          },
          { status: 400 }
        );
      }

      const secret = process.env.RAZORPAY_KEY_SECRET;
      if (!secret) {
        return NextResponse.json(
          {
            error:
              'Payment gateway unconfigured: RAZORPAY_KEY_SECRET is not configured in environment variables. Please add your Razorpay credentials in Vercel.',
          },
          { status: 503 }
        );
      }

      if (!signature || !paymentId) {
        return NextResponse.json(
          { error: 'Payment signature and payment ID are required for LIVE payment verification.' },
          { status: 400 }
        );
      }

      const orderRef = order.gatewayOrderId || order.orderNumber;
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderRef}|${paymentId}`)
        .digest('hex');

      if (generatedSignature !== signature) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'FAILED' },
        });
        return NextResponse.json({ error: 'Payment signature verification failed' }, { status: 400 });
      }
    }

    // 2. Mark order as PAID & record transaction
    const finalPaymentId = paymentId || `pay_test_${Math.random().toString(36).substring(2, 10)}`;
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        paymentId: finalPaymentId,
        signature: signature || 'test_verified_signature',
      },
    });

    // 3. Generate Secure Download Entitlements
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30); // 30-day download window

    const entitlements = [];
    for (const item of order.items) {
      const token = crypto.randomBytes(24).toString('hex');
      const entitlement = await prisma.downloadEntitlement.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          token,
          downloadCount: 0,
          maxDownloads: 10,
          expiresAt: expiryDate,
        },
      });
      entitlements.push(entitlement);

      // Increment sales count
      await prisma.product.update({
        where: { id: item.productId },
        data: { salesCount: { increment: 1 } },
      });
    }

    // 4. Update coupon usage count if applied
    if (order.couponCode) {
      await prisma.coupon.updateMany({
        where: { code: order.couponCode },
        data: { usageCount: { increment: 1 } },
      });
    }

    // 5. Trigger Confirmation Email
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const firstToken = entitlements[0]?.token;
    const downloadPageUrl = `${appUrl}/thank-you?order=${order.orderNumber}&token=${firstToken}`;

    const itemsSummary = order.items.map((i) => ({
      title: i.title,
      priceINR: formatINR(i.pricePaise),
    }));

    const emailHtml = getOrderConfirmationEmailHtml({
      customerName: order.customerName,
      orderNumber: order.orderNumber,
      totalINR: formatINR(order.totalAmountPaise),
      items: itemsSummary,
      downloadUrl: downloadPageUrl,
    });

    const emailResult = await sendEmail({
      to: order.customerEmail,
      subject: `Your Digital Files are Ready — VIHANA DESIGNS Order #${order.orderNumber}`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      downloadTokens: entitlements.map((e) => ({ productId: e.productId, token: e.token })),
      redirectUrl: `/thank-you?order=${order.orderNumber}&token=${firstToken}`,
      emailSent: emailResult.success,
      emailNotice: emailResult.success ? undefined : emailResult.error,
    });
  } catch (err: any) {
    console.error('[VERIFY PAYMENT ERROR]', err);
    return NextResponse.json({ error: err.message || 'Payment verification failed' }, { status: 500 });
  }
}

