import React from 'react';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'Frequently Asked Questions | VIHANA DESIGNS',
  description: 'Everything you need to know about purchasing digital products and commissioning website development projects from VIHANA DESIGNS.',
};

export const revalidate = 0;

export default async function FaqPage() {
  let faqs: any[] = [];

  try {
    faqs = await prisma.faq.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error(
      '[FAQ PAGE DB ERROR] Failed to fetch FAQs:',
      error instanceof Error ? error.message : 'Database error'
    );
  }

  return <FaqClient initialFaqs={faqs} />;
}

