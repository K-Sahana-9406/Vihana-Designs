'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, ShieldCheck, Sparkles, CreditCard } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    site_title: 'VIHANA DESIGNS — Premium Digital Products & Creative Technology Studio',
    brand_tagline: 'Digital Creativity. Thoughtful Design. Limitless Possibilities.',
    contact_email: 'hello@vihanadesigns.com',
    contact_phone: '+91 98765 43210',
    whatsapp_number: '919876543210',
    instagram_url: 'https://instagram.com/vihanadesigns',
    linkedin_url: 'https://linkedin.com/company/vihanadesigns',
    announcement_bar: 'Special Studio Launch: Use code LAUNCH20 for 20% off all digital products.',
    announcement_enabled: 'true',
    payment_mode: 'TEST',
  });

  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSettings((prev: any) => ({ ...prev, ...data.settings }));
        }
      });
  }, []);

  const handleChange = (key: string, val: string) => {
    setSettings((prev: any) => ({ ...prev, [key]: val }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Settings saved successfully');
      } else {
        error(data.error || 'Failed to save settings');
      }
    } catch (err) {
      error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#E9E8F8]">
        <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
          STUDIO CONFIGURATION
        </span>
        <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
          Website & Gateway Settings
        </h1>
        <p className="text-xs text-[#6B88B3] mt-0.5">
          Configure site identity, contact endpoints, payment modes, and announcement banners.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Brand & Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#18243B]">
            Brand Identity & SEO Title
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Site Title (Default Document Title)
            </label>
            <input
              type="text"
              value={settings.site_title || ''}
              onChange={(e) => handleChange('site_title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Brand Headline Tagline
            </label>
            <input
              type="text"
              value={settings.brand_tagline || ''}
              onChange={(e) => handleChange('brand_tagline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
            />
          </div>
        </div>

        {/* Studio Channels */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#18243B]">
            Studio Contact & Social Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Public Studio Email
              </label>
              <input
                type="email"
                value={settings.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Studio Phone / WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsapp_number || ''}
                onChange={(e) => handleChange('whatsapp_number', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                Instagram Profile URL
              </label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => handleChange('instagram_url', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
                LinkedIn Company URL
              </label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft space-y-4">
          <h3 className="font-serif text-lg font-semibold text-[#18243B]">
            Header Announcement Bar
          </h3>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Announcement Message
            </label>
            <input
              type="text"
              value={settings.announcement_bar || ''}
              onChange={(e) => handleChange('announcement_bar', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
            />
          </div>
        </div>

        {/* Payment Gateway Configuration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#8DB9F0]" />
            <h3 className="font-serif text-lg font-semibold text-[#18243B]">
              Payment Gateway Mode (India - Razorpay)
            </h3>
          </div>
          <p className="text-xs text-[#6B88B3]">
            Currently operating with simulated frictionless sandbox checkout for instant verification. Switch to LIVE when ready to accept real customer payments with your Razorpay Key ID & Key Secret.
          </p>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#18243B]">
              <input
                type="radio"
                name="payment_mode"
                value="TEST"
                checked={settings.payment_mode === 'TEST'}
                onChange={(e) => handleChange('payment_mode', e.target.value)}
              />
              Test / Sandbox Simulator (Instant 1-Click Verification)
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#18243B]">
              <input
                type="radio"
                name="payment_mode"
                value="LIVE"
                checked={settings.payment_mode === 'LIVE'}
                onChange={(e) => handleChange('payment_mode', e.target.value)}
              />
              Live Production Gateway (Requires Razorpay Secret)
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6] shadow-premium transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving Settings...' : 'Save All Settings'}
        </button>
      </form>
    </div>
  );
}

