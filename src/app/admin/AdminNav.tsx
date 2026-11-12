'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Tag,
  Settings,
  LogOut,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { success } = useToast();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    success('Admin session ended');
    router.push('/login');
    router.refresh();
  };

  const links = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Enquiries / Leads', href: '/admin/enquiries', icon: MessageSquare },
    { label: 'Customers', href: '/admin/customers', icon: Users },
    { label: 'Coupons & Promos', href: '/admin/coupons', icon: Tag },
    { label: 'Studio Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <nav className="p-4 space-y-1.5 flex-1">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              isActive
                ? 'bg-[#8DB9F0] text-[#18243B] shadow-soft'
                : 'text-[#9FB3D0] hover:bg-[#233352] hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{link.label}</span>
          </Link>
        );
      })}

      <div className="pt-4 mt-4 border-t border-[#233352]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Admin</span>
        </button>
      </div>
    </nav>
  );
}

