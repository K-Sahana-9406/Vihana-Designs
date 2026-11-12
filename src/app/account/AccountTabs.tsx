'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Download, User, LogOut } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AccountTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { success } = useToast();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    success('Logged out successfully');
    router.push('/login');
    router.refresh();
  };

  const tabs = [
    { label: 'Overview', href: '/account', icon: LayoutDashboard },
    { label: 'Orders', href: '/account/orders', icon: ShoppingBag },
    { label: 'Downloads', href: '/account/downloads', icon: Download },
    { label: 'Profile', href: '/account/profile', icon: User },
  ];

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isActive
                ? 'bg-[#18243B] text-white shadow-soft'
                : 'bg-[#F8F9FC] text-[#446294] hover:bg-[#E9E8F8] hover:text-[#18243B]'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-1"
        title="Sign Out"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </div>
  );
}

