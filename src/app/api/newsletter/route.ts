import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    await prisma.newsletterSubscriber.upsert({
      where: { email: cleanEmail },
      update: { status: 'SUBSCRIBED' },
      create: { email: cleanEmail },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to Vihana Creative Dispatch!',
    });
  } catch (err: any) {
    console.error('[NEWSLETTER ERROR]', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

