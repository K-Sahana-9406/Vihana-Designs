import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'hello@vihanadesigns.com';

    await sendEmail({
      to: contactEmail,
      subject: `[STUDIO INQUIRY] ${subject || 'New Contact Message'} from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || 'General'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. We will reply within 24 hours.',
    });
  } catch (err: any) {
    console.error('[CONTACT ERROR]', err);
    return NextResponse.json({ error: 'Failed to deliver message.' }, { status: 500 });
  }
}

