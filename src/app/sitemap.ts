import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

// Force dynamic execution so database queries are never run during build-time static generation
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vihanadesigns.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/shop',
    '/services',
    '/portfolio',
    '/about',
    '/contact',
    '/start-project',
    '/faq',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    const [products, portfolio] = await Promise.all([
      prisma.product.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.portfolioProject.findMany({
        where: { isPublished: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/product/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'daily',
      priority: 0.9,
    }));

    const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((pr) => ({
      url: `${baseUrl}/portfolio/${pr.slug}`,
      lastModified: pr.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...productRoutes, ...portfolioRoutes];
  } catch (error) {
    // Handle database connection or unmigrated table failures gracefully at request time
    // Log safe error without exposing credentials or stack traces
    console.error(
      '[SITEMAP] Database query failed when fetching dynamic entities. Returning static routes fallback:',
      error instanceof Error ? error.message : 'Database error'
    );
    return staticRoutes;
  }
}

