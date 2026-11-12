import nodemailer from 'nodemailer';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
      console.log(`[EMAIL SIMULATED] To: ${to} | Subject: ${subject}`);
      return { success: true, messageId: 'simulated-' + Date.now() };
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"VIHANA DESIGNS" <hello@vihanadesigns.com>',
      to,
      subject,
      html,
    });

    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[EMAIL ERROR]', err.message);
    // Never throw to avoid failing checkout
    return { success: false, error: err.message };
  }
}

export function getOrderConfirmationEmailHtml(params: {
  customerName: string;
  orderNumber: string;
  totalINR: string;
  items: { title: string; priceINR: string }[];
  downloadUrl: string;
}) {
  const itemsHtml = params.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #E9E8F8; color: #18243B; font-size: 14px; font-weight: 500;">${item.title}</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #E9E8F8; color: #18243B; font-size: 14px; text-align: right; font-weight: 600;">${item.priceINR}</td>
      </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Vihana Designs Purchase</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F9FC; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F9FC; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(24, 36, 59, 0.06); border: 1px solid #E9E8F8;">
          <!-- Header -->
          <tr>
            <td style="background-color: #18243B; padding: 36px 40px; text-align: center;">
              <h1 style="margin: 0; font-family: 'Georgia', serif; font-size: 26px; color: #F8F9FC; letter-spacing: 2px;">VIHANA DESIGNS</h1>
              <p style="margin: 6px 0 0 0; color: #8DB9F0; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase;">Premium Digital Products & Creative Studio</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="color: #6B88B3; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin: 0;">Order Confirmed</p>
              <h2 style="color: #18243B; font-size: 22px; margin: 8px 0 20px 0; font-weight: 600;">Thank you, ${params.customerName}</h2>
              <p style="color: #2F4671; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                Your order <strong>#${params.orderNumber}</strong> has been successfully processed. Your digital product files and licenses are ready for download.
              </p>

              <!-- CTA -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${params.downloadUrl}" style="background-color: #8DB9F0; color: #18243B; font-weight: 600; font-size: 15px; padding: 14px 32px; border-radius: 8px; text-decoration: none; display: inline-block;">Access & Download Your Files</a>
                  </td>
                </tr>
              </table>

              <!-- Order Summary -->
              <div style="background-color: #F8F9FC; border-radius: 12px; padding: 20px; border: 1px solid #E9E8F8; margin-top: 30px;">
                <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #18243B;">Order Summary</h3>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  ${itemsHtml}
                  <tr>
                    <td style="padding: 16px 0 0 0; color: #18243B; font-size: 16px; font-weight: 700;">Total Paid</td>
                    <td style="padding: 16px 0 0 0; color: #18243B; font-size: 18px; text-align: right; font-weight: 700;">${params.totalINR}</td>
                  </tr>
                </table>
              </div>

              <p style="margin: 32px 0 0 0; color: #6B88B3; font-size: 13px; line-height: 1.6;">
                If you have any questions or need custom modifications, reply directly to this email or visit our <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/contact" style="color: #18243B; text-decoration: underline;">Support Studio</a>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #F8F9FC; border-top: 1px solid #E9E8F8; padding: 24px 40px; text-align: center; color: #9FB3D0; font-size: 12px;">
              © ${new Date().getFullYear()} VIHANA DESIGNS. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export function getEnquiryConfirmationEmailHtml(params: {
  clientName: string;
  referenceId: string;
  serviceType: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; background: #F8F9FC; padding: 40px 20px; color: #18243B;">
  <div style="max-width: 580px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 36px; border: 1px solid #E9E8F8;">
    <h1 style="color: #18243B; font-size: 22px; font-family: serif; margin-top: 0;">VIHANA DESIGNS</h1>
    <p style="color: #446294; font-size: 14px;">Project Reference: <strong>${params.referenceId}</strong></p>
    <h2 style="font-size: 18px; margin: 16px 0;">Hello ${params.clientName},</h2>
    <p style="line-height: 1.6; font-size: 14px;">
      Thank you for choosing Vihana Designs. We have received your project enquiry for <strong>${params.serviceType}</strong>.
    </p>
    <p style="line-height: 1.6; font-size: 14px;">
      Our creative director and engineering lead are reviewing your requirements. We will prepare an initial project estimate, timeline projection, and schedule a discovery call within <strong>24 business hours</strong>.
    </p>
    <div style="background: #E9E8F8; border-radius: 8px; padding: 14px 18px; margin: 24px 0; font-size: 13px;">
      Reference ID: <strong>${params.referenceId}</strong><br/>
      Studio Direct Line: +91 98765 43210<br/>
      Email: hello@vihanadesigns.com
    </div>
    <p style="font-size: 12px; color: #9FB3D0; margin-top: 30px;">
      VIHANA DESIGNS — Digital Creativity. Thoughtful Design. Limitless Possibilities.
    </p>
  </div>
</body>
</html>
  `;
}

