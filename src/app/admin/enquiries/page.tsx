'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, RefreshCw, Mail, Phone, Calendar, CheckCircle2, ChevronDown, Save } from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNotes, setEditingNotes] = useState<{ [id: string]: string }>({});
  const { success, error } = useToast();

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/enquiries');
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.enquiries || []);
        const notesMap: any = {};
        (data.enquiries || []).forEach((e: any) => {
          notesMap[e.id] = e.internalNotes || '';
        });
        setEditingNotes(notesMap);
      }
    } catch (e) {
      error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        success(`Lead status updated to ${status}`);
        fetchEnquiries();
      }
    } catch (e) {
      error('Failed to update lead');
    }
  };

  const handleSaveNotes = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ internalNotes: editingNotes[id] }),
      });
      if (res.ok) {
        success('Internal CRM notes updated.');
      }
    } catch (e) {
      error('Failed to save notes');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E8F8] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
            CLIENT PIPELINE & CRM
          </span>
          <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
            Project Enquiries
          </h1>
          <p className="text-xs text-[#6B88B3] mt-0.5">
            Manage high-value custom website commissions, client briefs, and lead stages.
          </p>
        </div>

        <button
          onClick={fetchEnquiries}
          className="p-2.5 rounded-xl bg-white border border-[#E9E8F8] text-[#18243B] hover:bg-[#F8F9FC] self-start sm:self-auto"
          title="Refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Leads List */}
      {loading ? (
        <div className="p-12 text-center text-xs text-[#6B88B3]">Loading client leads...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-xs text-[#6B88B3] border border-[#E9E8F8]">
          No project enquiries logged yet.
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((enq) => {
            const features: string[] = enq.requiredFeatures
              ? typeof enq.requiredFeatures === 'string'
                ? JSON.parse(enq.requiredFeatures)
                : enq.requiredFeatures
              : [];

            return (
              <div
                key={enq.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E8F8] shadow-soft space-y-6"
              >
                {/* Top Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9E8F8] gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-lg font-bold text-[#18243B]">{enq.name}</h3>
                      <span className="font-mono text-xs text-[#446294] bg-[#F8F9FC] px-2.5 py-0.5 rounded border border-[#E9E8F8]">
                        {enq.referenceId}
                      </span>
                    </div>
                    <span className="text-xs text-[#6B88B3] block mt-0.5">
                      {enq.brandName ? `${enq.brandName} • ` : ''}
                      {enq.industry || 'General Industry'} • Submitted{' '}
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status Selector */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#6B88B3]">Pipeline Stage:</span>
                    <select
                      value={enq.status}
                      onChange={(e) => handleUpdateStatus(enq.id, e.target.value)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8F9FC] border border-[#E9E8F8] text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                    >
                      <option value="NEW">NEW LEAD</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="DISCUSSION">IN DISCUSSION</option>
                      <option value="CONVERTED">CONVERTED (WON)</option>
                      <option value="REJECTED">REJECTED / ARCHIVED</option>
                    </select>
                  </div>
                </div>

                {/* Brief Body */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-[#6B88B3] uppercase tracking-wider block font-semibold mb-1">
                      Service & Financials
                    </span>
                    <p className="font-medium text-[#18243B] text-sm">{enq.serviceType}</p>
                    <p className="text-[#446294] mt-1">Budget: {enq.budgetRange}</p>
                    <p className="text-[#446294]">Timeline: {enq.timeline}</p>
                  </div>

                  <div>
                    <span className="text-[#6B88B3] uppercase tracking-wider block font-semibold mb-1">
                      Contact Details
                    </span>
                    <p className="text-[#18243B] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-[#8DB9F0]" />
                      <a href={`mailto:${enq.email}`} className="hover:underline">
                        {enq.email}
                      </a>
                    </p>
                    {enq.phone && (
                      <p className="text-[#18243B] flex items-center gap-1.5 mt-1">
                        <Phone className="w-3.5 h-3.5 text-emerald-500" />
                        <a href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {enq.phone}
                        </a>
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="text-[#6B88B3] uppercase tracking-wider block font-semibold mb-1">
                      Inspirations & Links
                    </span>
                    <p className="text-[#446294] truncate">
                      {enq.referenceLinks ? (
                        <a href={enq.referenceLinks} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          {enq.referenceLinks}
                        </a>
                      ) : (
                        'No reference links specified.'
                      )}
                    </p>
                  </div>
                </div>

                {/* Project Description */}
                <div className="p-4 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#2F4671] leading-relaxed">
                  <span className="font-semibold text-[#18243B] block mb-1">Client Statement:</span>
                  {enq.projectDescription}
                </div>

                {/* Features Required */}
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {features.map((f, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-[#E9E8F8] text-[10px] font-semibold text-[#18243B]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Internal Notes */}
                <div className="pt-4 border-t border-[#E9E8F8] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    placeholder="Internal CRM notes (e.g. Discovery call scheduled on Friday, proposal sent...)"
                    value={editingNotes[enq.id] || ''}
                    onChange={(e) =>
                      setEditingNotes({ ...editingNotes, [enq.id]: e.target.value })
                    }
                    className="flex-1 px-3.5 py-2 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                  />
                  <button
                    onClick={() => handleSaveNotes(enq.id)}
                    className="px-4 py-2 rounded-xl bg-[#18243B] text-white text-xs font-semibold hover:bg-[#233352] flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Note
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

