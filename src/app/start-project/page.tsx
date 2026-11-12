'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  MessageCircle,
  FileCheck,
  Clock,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

function StartProjectForm() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || 'Business Websites';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [brandName, setBrandName] = useState('');
  const [serviceType, setServiceType] = useState(prefilledService);
  const [industry, setIndustry] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('₹30,000 - ₹60,000');
  const [timeline, setTimeline] = useState('2 - 4 Weeks');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'SEO Architecture',
    'Responsive Mobile Layout',
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const { success, error } = useToast();

  useEffect(() => {
    if (prefilledService) {
      setServiceType(prefilledService);
    }
  }, [prefilledService]);

  const availableFeatures = [
    'Next.js 14 / TypeScript Architecture',
    'Responsive Mobile Layout',
    'SEO Architecture & Schema',
    'Razorpay / UPI Payment Gateway',
    'Admin CMS / Content Editor',
    'User Accounts & Authentication',
    'Smooth Framer Motion Interactions',
    'Booking / Calendar Integration',
    'Analytics & Conversion Tracking',
    'Dark / Light Mode Toggle',
  ];

  const toggleFeature = (feat: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !projectDescription.trim()) {
      error('Please complete the required fields (Name, Email, and Project Description).');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          brandName,
          serviceType,
          industry,
          projectDescription,
          requiredFeatures: selectedFeatures,
          budgetRange,
          timeline,
          referenceLinks,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmittedRef(data.referenceId);
      success('Enquiry submitted successfully! We will get in touch shortly.');
    } catch (err: any) {
      error(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedRef) {
    return (
      <div className="bg-[#F8F9FC] min-h-[75vh] flex items-center justify-center py-20">
        <div className="max-w-xl w-full mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-soft">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wider border border-emerald-200">
            ENQUIRY RECORDED
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#18243B] mt-4">
            Thank You, {name}!
          </h1>
          <p className="text-sm text-[#446294] mt-3 leading-relaxed">
            Your project brief has been logged into our studio pipeline. Our lead architect is reviewing your specifications and will respond within <strong>24 business hours</strong>.
          </p>

          <div className="my-8 p-6 rounded-2xl bg-white border border-[#E9E8F8] shadow-soft text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8]">
              <span className="text-xs text-[#6B88B3]">Reference ID:</span>
              <span className="font-mono text-sm font-bold text-[#18243B] bg-[#E9E8F8] px-3 py-1 rounded-md">
                {submittedRef}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs text-[#446294]">
              <span>Selected Service:</span>
              <span className="font-semibold text-[#18243B]">{serviceType}</span>
            </div>
            <div className="flex items-center justify-between py-2 text-xs text-[#446294]">
              <span>Target Budget:</span>
              <span className="font-semibold text-[#18243B]">{budgetRange}</span>
            </div>
            <div className="flex items-center justify-between pt-2 text-xs text-[#446294]">
              <span>Estimated Discovery Call:</span>
              <span className="font-semibold text-emerald-600">Within 24 Hours</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`https://wa.me/919876543210?text=Hi%20Vihana%20Designs,%20I%20just%20submitted%20project%20enquiry%20${submittedRef}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Message Studio on WhatsApp
            </a>
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] font-semibold text-xs hover:bg-[#E9E8F8] transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            PROJECT INITIATION
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Start Your Custom Web Project
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-3 max-w-xl mx-auto leading-relaxed">
            Tell us about your company, vision, and timeline. We will analyze your requirements and return an actionable project scope within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E8F8] shadow-premium space-y-8">
          {/* Section 1: Contact Coordinates */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#18243B] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#18243B] text-white text-xs flex items-center justify-center">
                1
              </span>
              Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Work / Personal Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="vikram@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Business or Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mehta & Co. / Stealth Startup"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Project Classification */}
          <div className="pt-6 border-t border-[#E9E8F8]">
            <h3 className="font-serif text-lg font-semibold text-[#18243B] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#18243B] text-white text-xs flex items-center justify-center">
                2
              </span>
              Project Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Service Required *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                >
                  <option value="Business Websites">Business Corporate Website</option>
                  <option value="Landing Pages">High-Converting Landing Page</option>
                  <option value="Portfolio Websites">Creative Portfolio Showcase</option>
                  <option value="Personal Branding Websites">Personal Branding Platform</option>
                  <option value="Startup Websites">Startup Launch Website</option>
                  <option value="E-commerce Websites">Luxury E-commerce Flagship</option>
                  <option value="Custom Web Applications">Custom Full-Stack Web App</option>
                  <option value="Website Redesign and Modernization">Website Redesign & Modernization</option>
                  <option value="Custom Digital Solutions">Other Custom Digital Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Industry / Domain
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fintech, Healthcare, D2C, Consulting, Architecture"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Project Description & Primary Goals *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your project, target audience, core objectives, and any must-have functionality..."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-2">
                Features & Requirements (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-[#8DB9F0] bg-[#E9E8F8]/60 text-[#18243B] font-semibold'
                          : 'border-[#E9E8F8] bg-[#F8F9FC] text-[#446294] hover:bg-white'
                      }`}
                    >
                      <span className="truncate pr-1">{feat}</span>
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-[#8DB9F0] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Budget & Timeline */}
          <div className="pt-6 border-t border-[#E9E8F8]">
            <h3 className="font-serif text-lg font-semibold text-[#18243B] mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#18243B] text-white text-xs flex items-center justify-center">
                3
              </span>
              Scope & Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Estimated Budget Range
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                >
                  <option value="₹15,000 - ₹30,000">₹15,000 - ₹30,000 (Sprint / Landing Page)</option>
                  <option value="₹30,000 - ₹60,000">₹30,000 - ₹60,000 (Full Corporate / Portfolio)</option>
                  <option value="₹60,000 - ₹1,20,000">₹60,000 - ₹1,20,000 (E-commerce / Web App)</option>
                  <option value="₹1,20,000+">₹1,20,000+ (Full Platform / Custom Suite)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Preferred Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                >
                  <option value="Fast-track (1 - 2 Weeks)">Fast-track (1 - 2 Weeks)</option>
                  <option value="2 - 4 Weeks">Standard (2 - 4 Weeks)</option>
                  <option value="1 - 2 Months">Comprehensive (1 - 2 Months)</option>
                  <option value="Flexible">Flexible Timeline</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Reference Websites or Inspirations (Optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com, https://dribbble.com/..."
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-[#E9E8F8]">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium hover:shadow-glow transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#18243B] border-t-transparent rounded-full animate-spin" />
                  Analyzing & Submitting Project Brief...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Project Enquiry
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-[#9FB3D0] mt-3">
              Protected by studio confidentiality. We never sell or share your project details.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StartProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center text-sm text-gray-500">Loading enquiry form...</div>}>
      <StartProjectForm />
    </Suspense>
  );
}

