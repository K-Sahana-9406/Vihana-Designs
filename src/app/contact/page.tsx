'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Mail,
  MessageCircle,
  Instagram,
  Linkedin,
  Clock,
  Send,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      error('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Message sent! We will reply within 24 hours.');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        error(data.error || 'Failed to send message.');
      }
    } catch (err) {
      error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8F9FC] min-h-screen py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#E9E8F8] text-[#18243B] text-xs font-semibold tracking-widest uppercase border border-[#C5B8E8]">
            GET IN TOUCH
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#18243B] mt-4 leading-tight">
            Connect With Our Studio
          </h1>
          <p className="text-sm sm:text-base text-[#446294] mt-3 leading-relaxed">
            Have a question about our digital products, custom website development, or partnership opportunities? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Studio Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#E9E8F8] shadow-soft space-y-6">
              <h3 className="font-serif text-xl font-semibold text-[#18243B]">
                Direct Studio Coordinates
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#446294]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E9E8F8] flex items-center justify-center text-[#18243B] shrink-0">
                    <Mail className="w-4 h-4 text-[#8DB9F0]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#18243B] block">Email Inquiries</span>
                    <a href="mailto:hello@vihanadesigns.com" className="hover:underline text-[#446294]">
                      hello@vihanadesigns.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#18243B] block">WhatsApp Concierge</span>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#446294]"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] flex items-center justify-center text-[#18243B] shrink-0">
                    <Clock className="w-4 h-4 text-[#8DB9F0]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#18243B] block">Studio Operating Hours</span>
                    <p className="text-xs text-[#6B88B3] mt-0.5">
                      Monday to Saturday: 10:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] flex items-center justify-center text-[#18243B] shrink-0">
                    <MapPin className="w-4 h-4 text-[#8DB9F0]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#18243B] block">Locations</span>
                    <p className="text-xs text-[#6B88B3] mt-0.5">
                      Bengaluru & Mumbai, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[#E9E8F8]">
                <span className="text-xs font-semibold text-[#18243B] block mb-3">
                  Follow Our Design Journey
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://instagram.com/vihanadesigns"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-[#18243B] hover:bg-[#8DB9F0] hover:text-[#18243B] transition-colors flex items-center gap-2 text-xs font-medium"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                  <a
                    href="https://linkedin.com/company/vihanadesigns"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-[#18243B] hover:bg-[#8DB9F0] hover:text-[#18243B] transition-colors flex items-center gap-2 text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Link Card */}
            <div className="bg-[#18243B] text-white rounded-3xl p-6 sm:p-8">
              <h4 className="font-serif text-lg font-semibold text-white">
                Looking to start a bespoke website project?
              </h4>
              <p className="text-xs text-[#9FB3D0] mt-2 leading-relaxed">
                Skip the general inbox and use our structured Project Brief Questionnaire for priority quotation.
              </p>
              <Link
                href="/start-project"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#8DB9F0] hover:underline"
              >
                Launch Project Questionnaire →
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-[#E9E8F8] shadow-premium">
            <h3 className="font-serif text-2xl font-semibold text-[#18243B] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-[#6B88B3] mb-8">
              We respond to every query within 24 business hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Roy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Digital Product Question, Collaboration, Custom Order"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="How can our studio assist you?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-sm text-[#18243B] placeholder-[#9FB3D0] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-sm hover:bg-[#7baae6] shadow-premium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#18243B] border-t-transparent rounded-full animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Studio Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

