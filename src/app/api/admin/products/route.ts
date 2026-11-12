import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const products = await prisma.product.findMany({
      include: { category: true, _count: { select: { orderItems: true } } },
      orderBy: { createdAt: 'desc' },
    });

    const categories = await prisma.productCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json({ products, categories });
  } catch (err: any) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      shortDesc,
      fullDesc,
      priceRupees,
      discountPriceRupees,
      coverImage,
      categoryId,
      format,
      compatibility,
      isFeatured,
      isPublished,
      downloadFileUrl,
    } = body;

    if (!title || !shortDesc || !priceRupees || !categoryId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = slugify(title) + '-' + Math.random().toString(36).substring(2, 6);
    const pricePaise = Math.round(Number(priceRupees) * 100);
    const discountPricePaise = discountPriceRupees
      ? Math.round(Number(discountPriceRupees) * 100)
      : null;

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        slug,
        shortDesc: shortDesc.trim(),
        fullDesc: fullDesc ? fullDesc.trim() : shortDesc.trim(),
        pricePaise,
        discountPricePaise,
        coverImage:
          coverImage ||
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&auto=format&fit=crop&q=80',
        categoryId,
        format: format || 'Digital Download (ZIP / PDF)',
        compatibility: compatibility || 'Web / Mobile / Notion',
        isFeatured: Boolean(isFeatured),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        downloadFileUrl: downloadFileUrl || '/downloads/sample.zip',
        whatsIncluded: JSON.stringify(['Digital Package Files', 'Step-by-step Setup Guide']),
        benefits: JSON.stringify(['Instant Implementation', 'Lifetime Cloud Updates']),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    console.error('[CREATE PRODUCT ERROR]', err);
    return NextResponse.json({ error: err.message || 'Failed to create product' }, { status: 500 });
  }
}

