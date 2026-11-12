import React from 'react';
import { prisma } from '@/lib/prisma';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'Frequently Asked Questions | VIHANA DESIGNS',
  description: 'Everything you need to know about purchasing digital products and commissioning website development projects from VIHANA DESIGNS.',
};

export const revalidate = 0;

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return <FaqClient initialFaqs={faqs} />;
}

