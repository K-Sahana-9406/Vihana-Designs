'use client';

import React, { useState, useEffect } from 'react';
import { User, Phone, Building, MapPin, Lock, Save } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const { success, error } = useToast();

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          if (data.user.profile) {
            setPhone(data.user.profile.phone || '');
            setCompany(data.user.profile.company || '');
            setAddress(data.user.profile.address || '');
          }
        }
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/account/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, company, address, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Profile saved.');
        setNewPassword('');
      } else {
        error(data.error || 'Failed to save');
      }
    } catch (err) {
      error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#E9E8F8] shadow-soft max-w-3xl">
      <div className="pb-6 border-b border-[#E9E8F8] mb-6">
        <h2 className="font-serif text-2xl font-semibold text-[#18243B]">Profile & Security</h2>
        <p className="text-xs text-[#6B88B3] mt-1">
          Manage your personal details and account credentials.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Email Address (Read-only)
            </label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full px-4 py-2.5 rounded-xl bg-[#F2F5F9] border border-[#E9E8F8] text-xs text-[#9FB3D0] cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
              Company / Brand Name
            </label>
            <div className="relative">
              <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Studio / Startup"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#18243B] mb-1.5">
            Billing Address / City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Bengaluru, Karnataka, India"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs font-medium text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E9E8F8]">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#18243B] mb-2">
            Change Password
          </h4>
          <div className="max-w-xs">
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B88B3]" />
              <input
                type="password"
                placeholder="Leave blank to keep current"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-[#8DB9F0] text-[#18243B] font-semibold text-xs hover:bg-[#7baae6] shadow-soft transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Profile Changes'}
        </button>
      </form>
    </div>
  );
}

