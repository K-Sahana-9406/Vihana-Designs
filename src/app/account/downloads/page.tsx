import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Download, ShieldCheck, Clock, FileCheck } from 'lucide-react';

export const revalidate = 0;

export default async function CustomerDownloadsPage() {
  const session = await getSession();
  if (!session) return null;

  const orders = await prisma.order.findMany({
    where: { userId: session.userId, status: 'PAID' },
    include: {
      entitlements: {
        include: { product: true },
      },
    },
  });

  const entitlements = orders.flatMap((o) => o.entitlements);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E8F8] shadow-soft">
      <div className="pb-6 border-b border-[#E9E8F8] mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#18243B]">
            Digital Downloads & Cloud Vault
          </h2>
          <p className="text-xs text-[#6B88B3] mt-1">
            Always download the newest revision of your templates and resources.
          </p>
        </div>
        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 hidden sm:inline-flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 256-bit Secure Tokens
        </span>
      </div>

      {entitlements.length === 0 ? (
        <div className="text-center py-12">
          <Download className="w-12 h-12 text-[#9FB3D0] mx-auto mb-3" />
          <h3 className="font-serif text-lg font-semibold text-[#18243B]">No Downloads Found</h3>
          <p className="text-xs text-[#6B88B3] mt-1">
            When you purchase a digital product, your secure download files appear here.
          </p>
          <Link
            href="/shop"
            className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold shadow-soft"
          >
            Explore Digital Store
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {entitlements.map((ent) => (
            <div
              key={ent.id}
              className="p-5 rounded-2xl bg-[#F8F9FC] border border-[#E9E8F8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#8DB9F0] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 border border-[#E9E8F8]">
                  <Image
                    src={ent.product.coverImage}
                    alt={ent.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-[#18243B]">
                    {ent.product.title}
                  </h4>
                  <p className="text-xs text-[#6B88B3] mt-0.5">
                    {ent.product.format} • Valid until {new Date(ent.expiresAt).toLocaleDateString()}
                  </p>
                  <span className="text-[11px] text-[#446294] block mt-1">
                    Download usage: {ent.downloadCount} of {ent.maxDownloads} available
                  </span>
                </div>
              </div>

              <a
                href={`/api/download/${ent.token}`}
                download
                className="px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-soft flex items-center justify-center gap-2 self-stretch sm:self-auto"
              >
                <Download className="w-4 h-4" /> Download Files (ZIP)
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

