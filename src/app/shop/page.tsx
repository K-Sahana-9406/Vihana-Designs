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
  let categories: any[] = [];
  let products: any[] = [];

  try {
    [categories, products] = await Promise.all([
      prisma.productCategory.findMany({
        orderBy: { sortOrder: 'asc' },
      }),
      prisma.product.findMany({
        where: { isPublished: true },
        include: { category: true },
        orderBy: { salesCount: 'desc' },
      }),
    ]);
  } catch (error) {
    console.error(
      '[SHOP PAGE DB ERROR] Failed to fetch shop products:',
      error instanceof Error ? error.message : 'Database error'
    );
  }

  return <ShopClient categories={categories} initialProducts={products} />;
}

