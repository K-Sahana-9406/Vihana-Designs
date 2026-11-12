import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  MessageSquare,
  Tag,
  Settings,
  ExternalLink,
  Shield,
  Layers,
} from 'lucide-react';
import AdminNav from './AdminNav';

export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If not logged in or not admin, redirect to login
  if (!session || session.role !== 'ADMIN') {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col md:flex-row">
      {/* Dark Studio Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#18243B] text-white flex flex-col shrink-0 border-r border-[#233352]">
        {/* Brand Header */}
        <div className="p-6 border-b border-[#233352] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-white p-1">
              <Image src="/logo.png" alt="Logo" fill className="object-contain p-0.5" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-white tracking-wider block leading-none">
                VIHANA
              </span>
              <span className="text-[10px] text-[#8DB9F0] uppercase tracking-widest font-mono">
                STUDIO ADMIN
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <AdminNav />

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#233352] mt-auto">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#0F1726] text-xs font-semibold text-[#8DB9F0] hover:text-white transition-colors"
          >
            <span>Preview Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Admin View Container */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

