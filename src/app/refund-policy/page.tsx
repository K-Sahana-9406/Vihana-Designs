import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund Policy | VIHANA DESIGNS',
  description: 'Refund Policy for Digital Products and Website Development Services.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
            STORE POLICIES
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-2 mb-8">
            Refund & Cancellation Policy
          </h1>

          <div className="prose max-w-none text-xs sm:text-sm text-[#446294] leading-relaxed space-y-6">
            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              1. Digital Products Policy (Non-Tangible Irrevocable Goods)
            </h3>
            <p>
              Due to the digital and instant-access nature of our products (Notion workspaces, PDF ebooks, Canva templates, AI prompt files), sales are generally considered final once download credentials or workspace clone links have been generated and dispatched.
            </p>
            <p>
              However, we prioritize customer happiness above all else. You are entitled to a full refund or replacement under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Defective File: The downloaded file is corrupt, incomplete, or technically unusable and our engineering team is unable to provide a functional replacement within 48 hours.</li>
              <li>Accidental Duplicate Purchase: You accidentally purchased the identical product twice within 24 hours (we will refund the duplicate charge immediately).</li>
              <li>Significant Discrepancy: The product fundamentally deviates from the description and feature list published on the product detail page.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              2. Custom Website Development Projects
            </h3>
            <p>
              For bespoke website development sprints:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Deposit Stage: Project kickoff deposits are refundable within 48 hours of payment, provided no discovery work or wireframing has commenced.</li>
              <li>Milestone Reviews: Payments tied to completed sprint milestones (e.g. Design Approval, Staging Environment Build) are non-refundable once the milestone is signed off.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              3. Requesting a Refund
            </h3>
            <p>
              To submit a claim, email{' '}
              <a href="mailto:hello@vihanadesigns.com" className="text-[#18243B] underline font-semibold">
                hello@vihanadesigns.com
              </a>{' '}
              with your <strong>Order Number (#VD-ORD-XXXX)</strong> and reason for the request. We review and process valid refunds via Razorpay back to your original payment method within 5 to 7 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

