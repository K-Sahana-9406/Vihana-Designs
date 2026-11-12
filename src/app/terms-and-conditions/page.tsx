import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | VIHANA DESIGNS',
  description: 'Terms of Service and Digital Product License terms for VIHANA DESIGNS.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
            TERMS OF SERVICE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-2 mb-8">
            Terms & Conditions
          </h1>

          <div className="prose max-w-none text-xs sm:text-sm text-[#446294] leading-relaxed space-y-6">
            <p>
              Welcome to <strong>VIHANA DESIGNS</strong>. By browsing this website, purchasing digital products, or engaging our custom web development services, you agree to be bound by these Terms and Conditions.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              1. Digital Product Licensing (Single Commercial & Personal Use)
            </h3>
            <p>
              When you purchase a digital template, Notion workspace, Canva deck, or AI resource:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>You Are Granted:</strong> A perpetual, worldwide, non-exclusive license to use, modify, customize, and deploy the template for your personal brand or client projects.
              </li>
              <li>
                <strong>You Are Strictly Prohibited From:</strong> Reselling, sub-licensing, redistributing, sharing the master Notion or Figma link publicly, or claiming original authorship of the standalone template file.
              </li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              2. Custom Website Development Engagements
            </h3>
            <p>
              All bespoke website and web application development contracts are governed by an official Statement of Work (SOW) defining sprint milestones, deliverables, and payment schedules.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Code Ownership: Upon 100% receipt of final project payments, all source code, Figma design files, and deployment accounts are transferred completely to the client.</li>
              <li>Warranty: Vihana Designs provides a 30-day technical warranty against bugs and browser display errors post-launch.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              3. Intellectual Property
            </h3>
            <p>
              All trademarks, logos, visual brand assets, and custom design tokens displayed on this website remain the exclusive intellectual property of VIHANA DESIGNS.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              4. Governing Law & Jurisdiction
            </h3>
            <p>
              These terms are governed by the laws of India. Any disputes arising from transactions or service contracts shall be subject to the exclusive jurisdiction of the competent courts in Bengaluru / Mumbai, India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

