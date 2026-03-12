"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  FileText, 
  Trash2, 
  Eye, 
  Globe, 
  Lock,
  Calendar,
  ChevronRight,
  Monitor
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BlogDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*, categories(name)")
      .order("created_at", { ascending: false });
    
    if (!error) setPosts(data || []);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Permanently remove this editorial asset from the public domain?")) {
      await supabase.from("blog_posts").delete().eq("id", id);
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* ── Control Bar ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div className="relative w-full md:w-[400px] group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-emerald transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search editorial assets..."
            className="w-full pl-14 pr-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-emerald/20 outline-none transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Link 
          href="/admin/blog/new"
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-dark text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 group active:scale-95"
        >
          <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
          Draft New Article
        </Link>
      </div>

      {/* ── Editorial Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          [1, 2].map(i => (
            <div key={i} className="bg-white h-[280px] rounded-[3rem] border border-gray-100 animate-pulse" />
          ))
        ) : filteredPosts.length === 0 ? (
          <div className="col-span-full py-20 text-center text-brand-dark/30 font-serif italic text-2xl">
            No editorial content found in the current archive.
          </div>
        ) : (
          filteredPosts.map((post) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] transition-all overflow-hidden group flex flex-col sm:flex-row"
            >
              <div className="w-full sm:w-[240px] h-[200px] sm:h-auto bg-gray-50 relative overflow-hidden">
                {post.image_url ? (
                  <img src={post.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-emerald/20">
                    <FileText size={64} />
                  </div>
                )}
                <div className="absolute top-6 left-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${
                    post.is_published ? "bg-emerald-500/10 text-emerald-600" : "bg-white/80 text-gray-500"
                  }`}>
                    {post.is_published ? <Globe size={12} /> : <Lock size={12} />}
                    {post.is_published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>

              <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-brand-emerald mb-4">
                    <Calendar size={12} /> {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <h3 className="text-2xl font-serif text-brand-dark mb-3 line-clamp-2 leading-tight group-hover:text-brand-emerald transition-colors">{post.title}</h3>
                  <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-[0.2em] mb-6 italic">{post.categories?.name || "Uncategorized Domain"}</p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-50 pt-8">
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/blog/${post.id}`} 
                      target="_blank"
                      className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-dark hover:bg-white hover:shadow-md transition-all"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      href={`/admin/blog/${post.id}`}
                      className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-brand-dark hover:bg-white hover:shadow-md transition-all"
                    >
                      <Monitor size={18} />
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="w-10 h-10 rounded-xl text-gray-200 hover:text-red-500 transition-colors flex items-center justify-center"
                    >
                      <Trash2 size={18} />
                    </button>
                    <Link 
                      href={`/admin/blog/${post.id}`}
                      className="w-10 h-10 rounded-xl bg-brand-emerald/5 text-brand-emerald flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-all shadow-brand-emerald/20"
                    >
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
