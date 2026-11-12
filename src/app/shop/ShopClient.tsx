'use client';

import React, { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, Filter, SlidersHorizontal, Sparkles, Heart } from 'lucide-react';
import { useCart } from '@/components/CartContext';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string | null;
}

interface Product {
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
  salesCount?: number;
  createdAt: Date;
  categoryId: string;
  category: Category;
  tags?: string;
}

export default function ShopClient({
  categories,
  initialProducts,
}: {
  categories: Category[];
  initialProducts: any[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const { wishlist } = useCart();

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Category match
        if (selectedCategory !== 'all' && p.category?.slug !== selectedCategory) {
          return false;
        }
        // Search query match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.shortDesc.toLowerCase().includes(q);
          const matchCategory = p.category?.name.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCategory) return false;
        }
        // Wishlist only filter
        if (onlyWishlist && !wishlist.includes(p.id)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          const priceA = a.discountPricePaise ?? a.pricePaise;
          const priceB = b.discountPricePaise ?? b.pricePaise;
          return priceA - priceB;
        }
        if (sortBy === 'price-high') {
          const priceA = a.discountPricePaise ?? a.pricePaise;
          const priceB = b.discountPricePaise ?? b.pricePaise;
          return priceB - priceA;
        }
        if (sortBy === 'rating') {
          return (b.rating || 0) - (a.rating || 0);
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // default: 'featured' / bestseller
        return (b.salesCount || 0) - (a.salesCount || 0);
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy, onlyWishlist, wishlist]);

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            DIGITAL STORE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4">
            Tools & Systems Designed for High Performance
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-3 leading-relaxed">
            Instant digital access. Fully customizable files. Built for creators, founders, developers, and agency owners.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E9E8F8] shadow-soft mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="text"
                placeholder="Search templates, Notion, AI prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0] transition-colors"
              />
            </div>

            {/* Sort & Wishlist Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                onClick={() => setOnlyWishlist(!onlyWishlist)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  onlyWishlist
                    ? 'bg-[#18243B] text-white border-[#18243B]'
                    : 'bg-[#F8F9FC] text-[#446294] border-[#E9E8F8] hover:text-[#18243B]'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${onlyWishlist ? 'fill-current' : ''}`} />
                Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
              </button>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#6B88B3]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F8F9FC] border border-[#E9E8F8] text-[#18243B] text-xs font-medium rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#8DB9F0]"
                >
                  <option value="featured">Best Sellers</option>
                  <option value="newest">Newest Releases</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Categories Tab Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-4 mt-4 border-t border-[#E9E8F8] no-scrollbar">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-[#18243B] text-white shadow-soft'
                  : 'bg-[#F8F9FC] text-[#446294] hover:bg-[#E9E8F8] hover:text-[#18243B]'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat.slug
                    ? 'bg-[#18243B] text-white shadow-soft'
                    : 'bg-[#F8F9FC] text-[#446294] hover:bg-[#E9E8F8] hover:text-[#18243B]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Results */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E9E8F8] p-16 text-center shadow-soft">
            <div className="w-12 h-12 rounded-full bg-[#E9E8F8] text-[#18243B] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#18243B]">No digital products found</h3>
            <p className="text-xs text-[#6B88B3] mt-2 max-w-sm mx-auto">
              We couldn&apos;t find anything matching your search criteria. Try resetting the filters or searching for something else.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setOnlyWishlist(false);
              }}
              className="mt-6 px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold shadow-soft hover:bg-[#7baae6]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

