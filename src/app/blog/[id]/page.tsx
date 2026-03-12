"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import BlogRenderer from "@/components/blog/BlogRenderer";

// Fallback metadata generation (handled by Next.js metadata API usually, but keeping it simple)
export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, categories(name)')
        .eq('id', params.id)
        .single();
      
      if (!error && data) setPost(data);
      setLoading(false);
    };
    if (params.id) fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-40 pb-32 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-brand-emerald border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-brand-dark/40 font-sans font-bold uppercase tracking-widest text-xs">Opening Journal...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <div className="container mx-auto px-6 py-40 text-center">
          <h1 className="text-3xl font-serif text-brand-dark mb-4">Article Not Found</h1>
          <Link href="/blog" className="text-brand-emerald font-bold hover:underline">Back to Journal</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        
        {/* ── Page Banner (Post specific) ── */}
        <section
          className="relative pt-48 pb-32 flex items-center"
          style={{ background: `url('${post.banner_image || '/hero_background.jpg'}') center center / cover no-repeat` }}
        >
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-[2px]" />
          <div className="container max-w-[900px] mx-auto px-6 relative z-10 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-brand-emerald text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full">
                {post.categories?.name || "Insight"}
              </span>
              <span className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] flex items-center gap-1.5">
                <Calendar size={12} className="text-brand-emerald" />
                {new Date(post.created_at).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-emerald/20 flex items-center justify-center border border-white/10">
                <User size={18} className="text-brand-emerald" />
              </div>
              <span className="text-white font-sans text-sm font-medium tracking-wide">Proptee Editorial Team</span>
            </div>
          </div>
        </section>

        {/* ── Article Content ── */}
        <section className="py-20 bg-white">
          <div className="container max-w-[1140px] mx-auto px-6">
             <div className="max-w-[800px] mx-auto">
               <BlogRenderer post={post} />
             </div>
          </div>
        </section>

        {/* ── Footer Nav ── */}
        <section className="pb-24 bg-white border-t border-gray-100 pt-12">
          <div className="container max-w-[800px] mx-auto px-6 flex items-center justify-between">
            <Link href="/blog" className="group flex items-center gap-2 text-brand-dark/40 hover:text-brand-emerald transition-colors text-xs font-black uppercase tracking-widest">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
            <div className="flex items-center gap-4">
               {/* Could add social shares here */}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
