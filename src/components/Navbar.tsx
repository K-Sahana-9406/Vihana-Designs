'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, ArrowUpRight, User, Heart } from 'lucide-react';
import { useCart } from './CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Store', href: '/shop' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null; // Admin has its own dedicated dashboard layout

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F8F9FC]/90 backdrop-blur-md border-b border-[#E9E8F8] shadow-soft py-3'
          : 'bg-[#F8F9FC] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white shadow-soft p-1 border border-[#E9E8F8] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="VIHANA DESIGNS Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#18243B] leading-none">
                VIHANA
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#6B88B3] font-sans font-medium">
                DESIGNS
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#18243B] font-semibold'
                      : 'text-[#446294] hover:text-[#18243B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8DB9F0] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Link */}
            <Link
              href="/shop"
              className="relative p-2 text-[#446294] hover:text-[#18243B] transition-colors rounded-lg hover:bg-[#E9E8F8]/60"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8DB9F0]" />
              )}
            </Link>

            {/* Account Link */}
            <Link
              href="/account"
              className="p-2 text-[#446294] hover:text-[#18243B] transition-colors rounded-lg hover:bg-[#E9E8F8]/60"
              title="Customer Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Shopping Bag Button */}
            <Link
              href="/cart"
              className="relative p-2 text-[#18243B] hover:text-[#2F4671] transition-colors rounded-lg hover:bg-[#E9E8F8]/60"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#18243B] text-[#8DB9F0] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Start a Project Primary CTA */}
            <Link
              href="/start-project"
              className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8DB9F0] hover:bg-[#7baae6] text-[#18243B] text-sm font-semibold shadow-soft hover:shadow-glow transition-all duration-300"
            >
              Start Project <ArrowUpRight className="w-4 h-4" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#18243B] hover:bg-[#E9E8F8]/60 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-[#E9E8F8] mt-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#18243B] hover:bg-[#E9E8F8]"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#18243B] hover:bg-[#E9E8F8]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-[#E9E8F8] flex flex-col gap-2">
                <Link
                  href="/account"
                  className="px-4 py-2.5 rounded-lg text-sm font-medium text-[#446294] hover:bg-[#E9E8F8] flex items-center gap-2"
                >
                  <User className="w-4 h-4" /> My Account & Purchases
                </Link>
                <Link
                  href="/start-project"
                  className="mx-3 mt-2 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] text-center text-sm font-semibold shadow-soft flex items-center justify-center gap-2"
                >
                  Start Your Project <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

