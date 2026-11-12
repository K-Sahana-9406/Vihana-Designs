'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Package, Plus, Trash2, Edit, Star, Eye, EyeOff, Check, X } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { useToast } from '@/components/Toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const { success, error } = useToast();

  // Form states
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [priceRupees, setPriceRupees] = useState('');
  const [discountPriceRupees, setDiscountPriceRupees] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [format, setFormat] = useState('Digital Download (ZIP / PDF)');
  const [compatibility, setCompatibility] = useState('Web / Mobile / Notion');
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
        if (data.categories?.length > 0 && !categoryId) {
          setCategoryId(data.categories[0].id);
        }
      }
    } catch (e) {
      error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleTogglePublish = async (id: string, currentVal: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !currentVal }),
      });
      if (res.ok) {
        success('Product visibility updated');
        fetchProducts();
      }
    } catch (e) {
      error('Error updating product');
    }
  };

  const handleToggleFeatured = async (id: string, currentVal: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFeatured: !currentVal }),
      });
      if (res.ok) {
        success('Featured status updated');
        fetchProducts();
      }
    } catch (e) {
      error('Error updating product');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete or archive this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (res.ok) {
        success(data.message || 'Product removed');
        fetchProducts();
      } else {
        error(data.error);
      }
    } catch (e) {
      error('Error deleting product');
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !priceRupees || !shortDesc || !categoryId) {
      error('Please fill required fields.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          categoryId,
          priceRupees,
          discountPriceRupees,
          shortDesc,
          fullDesc,
          coverImage,
          format,
          compatibility,
          isFeatured,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        success('Product created successfully!');
        setShowAddModal(false);
        // Reset form
        setTitle('');
        setPriceRupees('');
        setDiscountPriceRupees('');
        setShortDesc('');
        setFullDesc('');
        setCoverImage('');
        fetchProducts();
      } else {
        error(data.error || 'Failed to create product');
      }
    } catch (err) {
      error('Error creating product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E9E8F8] gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-widest text-[#446294] font-semibold">
            CATALOG MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl font-light text-[#18243B] mt-1">
            Digital Products Store
          </h1>
          <p className="text-xs text-[#6B88B3] mt-0.5">
            Manage templates, pricing, discounts, and digital file delivery packages.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6] shadow-soft flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Digital Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E9E8F8] shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#6B88B3]">No products found in catalog.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FC] border-b border-[#E9E8F8] text-[#6B88B3] font-medium uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Sales</th>
                  <th className="py-4 px-4">Featured</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E8F8]">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#F8F9FC]/60 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-[#F8F9FC] shrink-0 border border-[#E9E8F8]">
                          <Image src={prod.coverImage} alt={prod.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#18243B] block max-w-xs truncate">
                            {prod.title}
                          </span>
                          <span className="text-[10px] text-[#6B88B3]">{prod.format}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-[#446294] font-medium">
                      {prod.category?.name || 'Uncategorized'}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#18243B]">
                        {formatINR(prod.discountPricePaise ?? prod.pricePaise)}
                      </div>
                      {prod.discountPricePaise && (
                        <span className="text-[10px] text-[#9FB3D0] line-through block">
                          {formatINR(prod.pricePaise)}
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#18243B]">
                      {prod.salesCount} sold
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggleFeatured(prod.id, prod.isFeatured)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          prod.isFeatured
                            ? 'bg-amber-50 text-amber-500 border-amber-200'
                            : 'text-gray-300 border-gray-200 hover:text-amber-400'
                        }`}
                        title="Toggle Featured"
                      >
                        <Star className={`w-4 h-4 ${prod.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleTogglePublish(prod.id, prod.isPublished)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                          prod.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-gray-100 text-gray-500 border-gray-300'
                        }`}
                      >
                        {prod.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {prod.isPublished ? 'Published' : 'Draft'}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#18243B]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-[#E9E8F8] shadow-premium max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E8F8] mb-6">
              <h3 className="font-serif text-xl font-semibold text-[#18243B]">
                Create Digital Product
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Notion OS for Creators"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B] focus:outline-none focus:border-[#8DB9F0]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Category *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Standard Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="1499"
                    value={priceRupees}
                    onChange={(e) => setPriceRupees(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Discount Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="999"
                    value={discountPriceRupees}
                    onChange={(e) => setDiscountPriceRupees(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  required
                  placeholder="One or two compelling sentences..."
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#18243B] mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Detailed breakdown of system architecture, features, and target use cases..."
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#18243B] mb-1">
                    Format
                  </label>
                  <input
                    type="text"
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FC] border border-[#E9E8F8] text-xs text-[#18243B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded text-[#8DB9F0]"
                />
                <label htmlFor="featured" className="text-xs font-semibold text-[#18243B]">
                  Mark as Featured on Homepage & Top of Store
                </label>
              </div>

              <div className="pt-4 border-t border-[#E9E8F8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6B88B3] hover:text-[#18243B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#8DB9F0] text-[#18243B] text-xs font-semibold hover:bg-[#7baae6] shadow-soft disabled:opacity-50"
                >
                  {saving ? 'Creating...' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

