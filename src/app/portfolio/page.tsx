import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { ArrowUpRight, ArrowRight, Sparkles, Layers, Globe } from 'lucide-react';

export const metadata = {
  title: 'Portfolio & Case Studies | VIHANA DESIGNS',
  description: 'Explore selected web development and digital architecture case studies by VIHANA DESIGNS.',
};

export const revalidate = 0;

export default async function PortfolioPage() {
  const projects = await prisma.portfolioProject.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            SELECTED WORKS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Digital Craftsmanship in Production
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-3 leading-relaxed">
            Every project represents our devotion to typographic hierarchy, rapid Next.js engineering, and measurable commercial results.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project) => {
            const techList: string[] = project.technologies
              ? typeof project.technologies === 'string'
                ? JSON.parse(project.technologies)
                : project.technologies
              : [];

            const metrics: { label: string; value: string }[] = project.metrics
              ? typeof project.metrics === 'string'
                ? JSON.parse(project.metrics)
                : project.metrics
              : [];

            return (
              <div
                key={project.id}
                className="group bg-white rounded-3xl border border-[#E9E8F8] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-semibold text-[#18243B] shadow-sm">
                      {project.category}
                    </span>
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#18243B] hover:bg-[#8DB9F0] flex items-center justify-center transition-colors shadow-sm"
                      title="Visit Live Preview"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#6B88B3] font-medium block">
                      Client: {project.client}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-[#18243B] mt-1 group-hover:text-[#2F4671] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#446294] mt-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Metrics highlights */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 pt-6 border-t border-[#E9E8F8]">
                        {metrics.map((m, i) => (
                          <div key={i} className="p-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-center">
                            <span className="font-serif text-base font-bold text-[#18243B] block">
                              {m.value}
                            </span>
                            <span className="text-[10px] text-[#6B88B3] uppercase tracking-wider">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-[#E9E8F8] flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {techList.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-[#F8F9FC] text-[11px] font-mono text-[#2F4671] border border-[#E9E8F8]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="text-xs font-semibold text-[#18243B] hover:text-[#2F4671] flex items-center gap-1 group-hover:underline"
                    >
                      Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all"
          >
            Start Your Project With Us <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

