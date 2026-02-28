'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Trash2, Tag, Layers } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState('listing');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('type', { ascending: false });
    
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    await supabase.from('categories').insert([{ name: newName, type: newType }]);
    setNewName('');
    fetchCategories();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await supabase.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm sticky top-24">
          <h3 className="text-lg font-bold text-[#000000] mb-6 flex items-center gap-2">
            <Plus size={20} className="text-[#0F3D2E]" /> Add Category
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#000000] mb-1">Category Name</label>
              <input 
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Luxury Villas"
                className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#000000] mb-1">System Type</label>
              <select 
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] outline-none focus:ring-2 focus:ring-[#0F3D2E]"
              >
                <option value="listing">Real Estate Listing</option>
                <option value="blog">Blog Category</option>
              </select>
            </div>
            <button 
              type="submit"
              className="w-full py-3 rounded-lg bg-[#0F3D2E] text-white font-bold hover:bg-[#1F7A5C] transition-colors shadow-lg"
            >
              Save Category
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E0E0E0] bg-[#F2F2F2]">
            <h3 className="font-bold text-[#000000] flex items-center gap-2">
              <Layers size={20} className="text-[#0F3D2E]" /> Listing Categories
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.filter(c => c.type === 'listing').map(category => (
                <div key={category.id} className="flex items-center justify-between p-4 rounded-lg bg-[#F2F2F2] border border-[#E0E0E0]">
                  <span className="font-medium text-[#000000]">{category.name}</span>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {categories.filter(c => c.type === 'listing').length === 0 && (
                <p className="text-[#6B7280] text-sm md:col-span-2 text-center py-4">No listing categories yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#E0E0E0] bg-[#F2F2F2]">
            <h3 className="font-bold text-[#000000] flex items-center gap-2">
              <Tag size={20} className="text-[#0F3D2E]" /> Blog Categories
            </h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.filter(c => c.type === 'blog').map(category => (
                <div key={category.id} className="flex items-center justify-between p-4 rounded-lg bg-[#F2F2F2] border border-[#E0E0E0]">
                  <span className="font-medium text-[#000000]">{category.name}</span>
                  <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
              {categories.filter(c => c.type === 'blog').length === 0 && (
                <p className="text-[#6B7280] text-sm md:col-span-2 text-center py-4">No blog categories yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
