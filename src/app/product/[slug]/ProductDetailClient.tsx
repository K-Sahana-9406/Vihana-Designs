'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  ShoppingBag,
  Zap,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
  Layers,
  ArrowRight,
  Heart,
  Share2,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/components/Toast';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any[];
}) {
  const router = useRouter();
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const { success, info } = useToast();

  const previewImages: string[] = product.previewImages
    ? typeof product.previewImages === 'string'
      ? JSON.parse(product.previewImages)
      : product.previewImages
    : [product.coverImage];

  const whatsIncluded: string[] = product.whatsIncluded
    ? typeof product.whatsIncluded === 'string'
      ? JSON.parse(product.whatsIncluded)
      : product.whatsIncluded
    : [];

  const benefits: string[] = product.benefits
    ? typeof product.benefits === 'string'
      ? JSON.parse(product.benefits)
      : product.benefits
    : [];

  const [activeImage, setActiveImage] = useState(previewImages[0] || product.coverImage);
  const isFavorited = isInWishlist(product.id);

  const hasDiscount =
    product.discountPricePaise && product.discountPricePaise < product.pricePaise;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.pricePaise - product.discountPricePaise) / product.pricePaise) * 100
      )
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      pricePaise: product.pricePaise,
      discountPricePaise: product.discountPricePaise,
      coverImage: product.coverImage,
      format: product.format,
    });
    success(`"${product.title}" added to your cart.`);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      title: product.title,
      slug: product.slug,
      pricePaise: product.pricePaise,
      discountPricePaise: product.discountPricePaise,
      coverImage: product.coverImage,
      format: product.format,
    });
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      info('Product link copied to clipboard.');
    }
  };

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-[#6B88B3] mb-8">
          <Link href="/" className="hover:text-[#18243B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#18243B] transition-colors">
            Digital Store
          </Link>
          <span>/</span>
          {product.category && (
            <>
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="hover:text-[#18243B] transition-colors"
              >
                {product.category.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#18243B] font-medium truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Main Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Media & Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-[#E9E8F8] shadow-premium">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                className="object-cover transition-all duration-300"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#18243B] text-xs font-bold text-[#8DB9F0] shadow-sm">
                  {discountPercent}% SAVING
                </div>
              )}
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    isFavorited
                      ? 'bg-[#18243B] text-[#8DB9F0] shadow-md'
                      : 'bg-white/80 backdrop-blur-md text-[#446294] hover:bg-white hover:text-[#18243B]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#446294] hover:bg-white hover:text-[#18243B] flex items-center justify-center transition-all"
                  aria-label="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Switcher */}
            {previewImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {previewImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-[#8DB9F0] shadow-soft scale-105'
                        : 'border-[#E9E8F8] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* What's Included Accordion / Checklist */}
            <div className="mt-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft">
              <h3 className="font-serif text-xl font-semibold text-[#18243B] mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#8DB9F0]" /> What&apos;s Included In This Package
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {whatsIncluded.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#446294]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            {benefits.length > 0 && (
              <div className="bg-[#E9E8F8]/40 rounded-2xl p-6 sm:p-8 border border-[#E9E8F8]">
                <h3 className="font-serif text-xl font-semibold text-[#18243B] mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#8DB9F0]" /> Key Transformative Benefits
                </h3>
                <div className="space-y-3">
                  {benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#18243B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8DB9F0] mt-2 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Pricing, Buy Actions, & Technical Specs */}
          <div className="lg:col-span-5 sticky top-28 flex flex-col gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-premium">
              {/* Category & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-[#446294] uppercase tracking-wider bg-[#F8F9FC] px-3 py-1 rounded-full border border-[#E9E8F8]">
                  {product.category?.name || 'Digital Asset'}
                </span>
                <div className="flex items-center gap-1.5 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-xs font-bold text-[#18243B]">
                    {product.rating?.toFixed(1) || '4.95'}
                  </span>
                  <span className="text-xs text-[#9FB3D0]">
                    ({product.reviewCount || 36} verified purchases)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18243B] leading-snug">
                {product.title}
              </h1>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#6B88B3] mt-3 leading-relaxed">
                {product.shortDesc}
              </p>

              {/* Price Banner */}
              <div className="mt-6 pt-6 border-t border-[#E9E8F8] flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#9FB3D0] block font-medium">
                    One-time Investment
                  </span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B]">
                      {formatINR(product.discountPricePaise ?? product.pricePaise)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm sm:text-base text-[#9FB3D0] line-through">
                        {formatINR(product.pricePaise)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    <Zap className="w-3 h-3" /> Instant Download
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" /> Buy Now with Instant Access
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 rounded-xl bg-transparent border-2 border-[#18243B] text-[#18243B] font-semibold text-sm hover:bg-[#18243B] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#E9E8F8] space-y-2.5 text-xs text-[#6B88B3]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8DB9F0] shrink-0" />
                  <span>Razorpay 256-bit Encrypted Checkout (UPI, Cards, Netbanking)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#8DB9F0] shrink-0" />
                  <span>Lifetime Access & Free Cloud Updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8DB9F0] shrink-0" />
                  <span>Permanent Download Link Sent to Your Email</span>
                </div>
              </div>

              {/* Technical Compatibility Specs */}
              <div className="mt-6 p-4 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B88B3]">Format:</span>
                  <span className="font-medium text-[#18243B]">{product.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B88B3]">Compatibility:</span>
                  <span className="font-medium text-[#18243B]">{product.compatibility}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B88B3]">Deliverable:</span>
                  <span className="font-medium text-[#18243B]">Direct ZIP & Notion Link</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Full Description */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E8F8] shadow-soft">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#18243B] mb-6">
            Detailed Overview & Architecture
          </h2>
          <div className="prose max-w-none text-sm sm:text-base text-[#446294] leading-relaxed space-y-4">
            <p>{product.fullDesc}</p>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
                  RECOMMENDED FOR YOU
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#18243B] font-light mt-1">
                  Complementary Digital Assets
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] underline"
              >
                Browse Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

