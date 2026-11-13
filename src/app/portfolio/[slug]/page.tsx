import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Globe, Shield, Terminal } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const project = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
    });

    if (!project) return { title: 'Case Study Not Found' };

    return {
      title: `${project.title} — Case Study | VIHANA DESIGNS`,
      description: project.description,
    };
  } catch (error) {
    return { title: 'Case Study | VIHANA DESIGNS' };
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  let project: any = null;

  try {
    project = await prisma.portfolioProject.findUnique({
      where: { slug: params.slug },
    });
  } catch (error) {
    console.error('[PORTFOLIO CASE STUDY ERROR]', error instanceof Error ? error.message : error);
  }

  if (!project || !project.isPublished) {
    notFound();
  }

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

  const galleryImages: string[] = project.galleryImages
    ? typeof project.galleryImages === 'string'
      ? JSON.parse(project.galleryImages)
      : project.galleryImages
    : [project.coverImage];

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B88B3] hover:text-[#18243B] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Portfolio Projects
        </Link>

        {/* Hero Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-xs text-[#6B88B3]">Client: {project.client}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-[#446294] mt-4 leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {project.liveUrl && (
            <div className="mt-6">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#18243B] text-white text-xs font-semibold hover:bg-[#233352] transition-colors"
              >
                <Globe className="w-4 h-4" /> Open Live Concept Demo <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-white border border-[#E9E8F8] shadow-premium mb-16">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Metrics Grid */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-[#E9E8F8] shadow-soft text-center"
              >
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#18243B] block">
                  {m.value}
                </span>
                <span className="text-xs uppercase tracking-wider text-[#6B88B3] mt-1 block font-medium">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Deep Dive: The Challenge & The Architectural Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-soft">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 block mb-2">
              01 / The Challenge
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#18243B] mb-4">
              Strategic Bottlenecks
            </h3>
            <p className="text-sm text-[#446294] leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-soft">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 block mb-2">
              02 / The Engineering Solution
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#18243B] mb-4">
              Production Architecture
            </h3>
            <p className="text-sm text-[#446294] leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Technologies Applied */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E9E8F8] shadow-soft mb-16">
          <h3 className="font-serif text-xl font-semibold text-[#18243B] mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-[#8DB9F0]" /> Technologies & Stack Deployed
          </h3>
          <div className="flex flex-wrap gap-2">
            {techList.map((t, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-[#F8F9FC] text-xs font-mono font-medium text-[#18243B] border border-[#E9E8F8]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery Showcase */}
        {galleryImages.length > 1 && (
          <div className="space-y-8 mb-16">
            <h3 className="font-serif text-2xl font-semibold text-[#18243B]">
              Interface & Design System Previews
            </h3>
            <div className="grid grid-cols-1 gap-8">
              {galleryImages.slice(1).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-[#E9E8F8] shadow-soft"
                >
                  <Image src={img} alt="Gallery view" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-[#18243B] text-white rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-light">
            Want to build a platform with this level of craftsmanship?
          </h3>
          <p className="text-xs sm:text-sm text-[#9FB3D0] mt-3 max-w-lg mx-auto">
            Let&apos;s discuss your goals, tech stack, and timeline during a 20-minute discovery consultation.
          </p>
          <div className="mt-6">
            <Link
              href={`/start-project?service=${encodeURIComponent(project.category)}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-premium transition-all"
            >
              Start a Project Like This <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

