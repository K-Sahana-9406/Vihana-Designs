'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingBag, Heart, Check } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { useCart, CartProduct } from './CartContext';
import { useToast } from './Toast';

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    slug: string;
    shortDesc: string;
    pricePaise: number;
    discountPricePaise?: number | null;
    coverImage: string;
    format?: string;
    rating?: number;
    reviewCount?: number;
    category?: { name: string; slug: string };
    tags?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, items, toggleWishlist, isInWishlist } = useCart();
  const { success } = useToast();

  const isAlreadyInCart = items.some((item) => item.product.id === product.id);
  const isFavorited = isInWishlist(product.id);

  const parsedTags: string[] = product.tags
    ? typeof product.tags === 'string'
      ? JSON.parse(product.tags)
      : product.tags
    : [];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const hasDiscount =
    product.discountPricePaise && product.discountPricePaise < product.pricePaise;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.pricePaise - product.discountPricePaise!) / product.pricePaise) * 100
      )
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E9E8F8] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col h-full">
      {/* Top Media Container */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-[#F8F9FC]">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.category && (
            <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#18243B] border border-[#E9E8F8] shadow-sm">
              {product.category.name}
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full bg-[#18243B] text-[11px] font-bold text-[#8DB9F0] shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-[#18243B] text-[#8DB9F0] shadow-md'
              : 'bg-white/80 backdrop-blur-md text-[#446294] hover:bg-white hover:text-[#18243B]'
          }`}
          aria-label="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Format Badge Bottom Left */}
        {product.format && (
          <div className="absolute bottom-2.5 left-3 text-[10px] uppercase font-semibold text-[#18243B] tracking-wider px-2 py-0.5 rounded-md bg-white/85 backdrop-blur-sm border border-[#E9E8F8]/60">
            {product.format.split('+')[0].trim()}
          </div>
        )}
      </Link>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#18243B]">
              {product.rating?.toFixed(1) || '4.9'}
            </span>
            <span className="text-xs text-[#9FB3D0]">
              ({product.reviewCount || 24})
            </span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-[#18243B] group-hover:text-[#2F4671] transition-colors line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-[#6B88B3] mt-2 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        {/* Footer: Price & Add to Cart */}
        <div className="pt-4 mt-4 border-t border-[#E9E8F8] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#9FB3D0] font-medium">
              Instant Access
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#18243B]">
                {formatINR(product.discountPricePaise ?? product.pricePaise)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-[#9FB3D0] line-through">
                  {formatINR(product.pricePaise)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
              isAlreadyInCart
                ? 'bg-[#E9E8F8] text-[#18243B] border border-[#C5B8E8]'
                : 'bg-[#8DB9F0] text-[#18243B] hover:bg-[#7baae6] shadow-soft'
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

