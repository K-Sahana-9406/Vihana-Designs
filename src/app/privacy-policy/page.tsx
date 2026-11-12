import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | VIHANA DESIGNS',
  description: 'Privacy Policy and Data Protection standards of VIHANA DESIGNS.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-[#E9E8F8] shadow-soft">
          <span className="text-xs uppercase tracking-widest text-[#446294] font-semibold">
            LEGAL COMPLIANCE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-2 mb-8">
            Privacy Policy
          </h1>

          <div className="prose max-w-none text-xs sm:text-sm text-[#446294] leading-relaxed space-y-6">
            <p>
              Last Updated: <strong>November 2026</strong>. At <strong>VIHANA DESIGNS</strong>, accessible from https://vihanadesigns.com, protecting your privacy and confidential project specifications is our fundamental duty.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">1. Information We Collect</h3>
            <p>
              When you purchase a digital product, create a customer account, or submit a custom project enquiry, we may collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Contact details: Name, email address, optional phone number, company/brand name.</li>
              <li>Transaction & billing data: Transaction reference IDs, invoice address, purchase date. Note: We never store credit/debit card numbers or UPI PINs. All payments are processed securely through certified PCI-DSS compliant gateways (Razorpay).</li>
              <li>Project brief data: Industry, budget estimates, technical requirements, and reference URLs.</li>
              <li>Technical diagnostics: IP addresses, browser user agent, download verification tokens to prevent fraud and unauthorized file sharing.</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">2. How We Utilize Your Information</h3>
            <p>We use your information strictly to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Fulfill digital deliveries and issue unique cryptographically verified download entitlements.</li>
              <li>Provide customer support, onboarding guidance, and warranty updates for your purchased templates.</li>
              <li>Prepare custom website development proposals and schedule discovery calls.</li>
              <li>Send periodic studio newsletters if you actively opted in (with 1-click unsubscribe).</li>
            </ul>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">3. Zero Data Sale Guarantee</h3>
            <p>
              VIHANA DESIGNS does not sell, rent, or trade your personal data to third-party data brokers or marketing agencies under any circumstances.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">4. Data Retention & Security</h3>
            <p>
              We implement industry-standard 256-bit encryption for data in transit and at rest. Download entitlement tokens expire after set windows, and private product files are stored on isolated, access-restricted cloud storage.
            </p>

            <h3 className="font-serif text-lg font-semibold text-[#18243B]">5. Contact Our Data Protection Officer</h3>
            <p>
              For any questions regarding your personal information or to request permanent account deletion, please email us directly at{' '}
              <a href="mailto:hello@vihanadesigns.com" className="text-[#18243B] underline font-semibold">
                hello@vihanadesigns.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

