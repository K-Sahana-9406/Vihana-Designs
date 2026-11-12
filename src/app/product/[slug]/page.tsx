import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailClient from './ProductDetailClient';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.title} | VIHANA DESIGNS`,
    description: product.shortDesc,
    openGraph: {
      title: product.title,
      description: product.shortDesc,
      images: [{ url: product.coverImage }],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      category: true,
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!product || !product.isPublished) {
    notFound();
  }

  // Related products from same category or featured
  const relatedProducts = await prisma.product.findMany({
    where: {
      id: { not: product.id },
      isPublished: true,
      OR: [{ categoryId: product.categoryId }, { isFeatured: true }],
    },
    take: 4,
    include: { category: true },
  });

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

