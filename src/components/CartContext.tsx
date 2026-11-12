'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartProduct {
  id: string;
  title: string;
  slug: string;
  pricePaise: number;
  discountPricePaise?: number | null;
  coverImage: string;
  format?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export interface AppliedCoupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number; // percentage or paise
  maxDiscountPaise?: number | null;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalPaise: number;
  discountPaise: number;
  totalPaise: number;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('vihana_cart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      const storedCoupon = localStorage.getItem('vihana_coupon');
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
      const storedWishlist = localStorage.getItem('vihana_wishlist');
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
    setIsHydrated(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('vihana_cart', JSON.stringify(items));
    } catch (e) {}
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem('vihana_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('vihana_coupon');
      }
    } catch (e) {}
  }, [appliedCoupon, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem('vihana_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist, isHydrated]);

  const addItem = (product: CartProduct) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.product.id === product.id);
      if (exists) {
        // For digital products, quantity is usually 1, but we ensure it's in the cart
        return prev;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Calculate pricing
  const subtotalPaise = items.reduce((sum, item) => {
    const effectivePrice = item.product.discountPricePaise ?? item.product.pricePaise;
    return sum + effectivePrice * item.quantity;
  }, 0);

  let discountPaise = 0;
  if (appliedCoupon && subtotalPaise > 0) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discountPaise = Math.round((subtotalPaise * appliedCoupon.discountValue) / 100);
      if (appliedCoupon.maxDiscountPaise && discountPaise > appliedCoupon.maxDiscountPaise) {
        discountPaise = appliedCoupon.maxDiscountPaise;
      }
    } else {
      discountPaise = Math.min(appliedCoupon.discountValue, subtotalPaise);
    }
  }

  const totalPaise = Math.max(0, subtotalPaise - discountPaise);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, orderValuePaise: subtotalPaise }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Invalid coupon code' };
      }
      setAppliedCoupon({
        code: data.coupon.code,
        discountType: data.coupon.discountType,
        discountValue: data.coupon.discountValue,
        maxDiscountPaise: data.coupon.maxDiscountPaise,
      });
      return { success: true, message: data.message || `Coupon "${data.coupon.code}" applied!` };
    } catch (err: any) {
      return { success: false, message: 'Failed to apply coupon' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        itemCount,
        subtotalPaise,
        discountPaise,
        totalPaise,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

