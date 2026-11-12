import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AccountTabs from './AccountTabs';

export const revalidate = 0;

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: {
      profile: true,
      orders: {
        include: {
          items: { include: { product: true } },
          entitlements: { include: { product: true } },
        },
      },
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Customer Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#E9E8F8] text-[#18243B] font-serif text-2xl font-bold flex items-center justify-center border border-[#C5B8E8]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-semibold text-[#18243B]">{user.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                  Verified Client
                </span>
              </div>
              <p className="text-xs text-[#6B88B3] mt-0.5">{user.email}</p>
            </div>
          </div>

          <AccountTabs />
        </div>

        {/* Child Pages */}
        {children}
      </div>
    </div>
  );
}

