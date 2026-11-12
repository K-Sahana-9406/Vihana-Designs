import React from 'react';
import { prisma } from '@/lib/prisma';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Digital Products Store | Premium Templates, Notion & AI Tools',
  description:
    'Explore curated digital products by VIHANA DESIGNS — high-converting Notion workspaces, investor pitch decks, AI prompt vaults, and agency blueprints.',
};

export const revalidate = 0;

export default async function ShopPage() {
  const [categories, products] = await Promise.all([
    prisma.productCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    }),
    prisma.product.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { salesCount: 'desc' },
    }),
  ]);

  return <ShopClient categories={categories} initialProducts={products} />;
}

