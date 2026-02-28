'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { Plus, Search, FileText, Edit, Trash2, Eye, Globe, Lock } from 'lucide-react';

export default function BlogDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });
    
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await supabase.from('blog_posts').delete().eq('id', id);
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl border border-[#E0E0E0] shadow-sm">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" size={18} />
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E0E0E0] focus:ring-2 focus:ring-[#0F3D2E] focus:border-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link 
          href="/admin/blog/new"
          className="bg-[#0F3D2E] text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#1F7A5C] transition-colors"
        >
          <Plus size={18} /> Create New Post
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[#E0E0E0] shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#F2F2F2] border-b border-[#E0E0E0]">
            <tr>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Title</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Category</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Status</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000]">Date</th>
              <th className="px-6 py-4 text-sm font-bold text-[#000000] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F2F2]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">Loading posts...</td>
              </tr>
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">No blog posts found.</td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-[#F2F2F2]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-[#0F3D2E]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#000000]">{post.title}</p>
                        <p className="text-xs text-[#6B7280]">/{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#000000]">
                    {post.categories?.name || 'Uncategorized'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      post.is_published ? 'bg-[#1F7A5C]/10 text-[#1F7A5C]' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {post.is_published ? <Globe size={14} /> : <Lock size={14} />}
                      {post.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                       <Link 
                        href={`/blog/${post.id}`} 
                        target="_blank"
                        className="p-2 text-[#6B7280] hover:bg-[#F2F2F2] rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link 
                        href={`/admin/blog/${post.id}`}
                        className="p-2 text-[#0F3D2E] hover:bg-[#0F3D2E]/10 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
