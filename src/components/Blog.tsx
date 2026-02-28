import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "Invest in Real Estate on a Budget",
    excerpt: "Discover how to enter the Nigerian property market with strategic low-capital entry points...",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "May 12, 2024",
    author: "Tobi Adeyemi",
    category: "Investment",
  },
  {
    id: 2,
    title: "Top 5 Cities for High Returns in 2024",
    excerpt: "Analyzing the emerging real estate hotspots in Nigeria that are set to boom this decade...",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Jun 05, 2024",
    author: "Sarah Okon",
    category: "Market Trends",
  },
  {
    id: 3,
    title: "The Ultimate Guide to Selling Your Property",
    excerpt: "Expert staging tips and marketing strategies to ensure a fast and profitable property sale...",
    image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "Jul 20, 2024",
    author: "David Chukwu",
    category: "Selling Guide",
  },
];

const BlogCard = ({ post }: { post: typeof BLOG_POSTS[0] }) => (
  <div className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 h-full flex flex-col">
    <div className="relative h-64 md:h-80 overflow-hidden">
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-1000"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-6 left-6 z-10">
        <span className="bg-[#0F3D2E] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl border border-white/20">
          {post.category}
        </span>
      </div>
    </div>
    
    <div className="p-10 flex flex-col flex-1">
      <div className="flex items-center gap-8 text-[11px] text-gray-400 mb-6 font-black tracking-widest uppercase">
        <div className="flex items-center gap-2 group/meta">
          <Calendar size={14} className="text-[#1F7A5C]" />
          {post.date}
        </div>
        <div className="flex items-center gap-2 group/meta">
          <User size={14} className="text-[#1F7A5C]" />
          {post.author}
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-black mb-5 group-hover:text-[#0F3D2E] transition-colors leading-tight tracking-tight">
        <Link href={`/blog/${post.id}`}>{post.title}</Link>
      </h3>
      
      <p className="text-gray-500 mb-10 line-clamp-2 leading-relaxed font-medium text-sm">
        {post.excerpt}
      </p>
      
      <div className="mt-auto">
        <Link 
          href={`/blog/${post.id}`} 
          className="inline-flex items-center gap-4 text-black font-black text-xs uppercase tracking-[0.3em] group-hover:text-[#0F3D2E] transition-all"
        >
          Read Article <ArrowRight size={18} className="translate-y-px group-hover:translate-x-3 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  </div>
);

const Blog = ({ hideHeader = false }: { hideHeader?: boolean }) => {
  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-4 lg:pl-24">
        
        {!hideHeader && (
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
            <div className="max-w-2xl">
              <span className="text-[#0F3D2E] font-black tracking-[0.4em] uppercase text-xs mb-6 block">EDITORIAL HUB</span>
              <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter leading-[0.9]">
                  LUXURY <br/>
                  <span className="text-[#0F3D2E]">INSIGHTS</span>
              </h2>
              <p className="text-gray-500 text-lg max-w-lg leading-relaxed font-medium">
                  Stay updated with institutional-grade market analysis and lifestyle perspectives from Nigeria's top real estate minds.
              </p>
            </div>
            <Link href="/blog" className="hidden lg:flex items-center gap-4 text-black font-black text-xs uppercase tracking-[0.3em] hover:text-[#0F3D2E] transition-all bg-gray-50 px-10 py-5 rounded-2xl">
              Explore Magazine <ArrowRight size={18} />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {!hideHeader && (
          <Link href="/blog" className="lg:hidden flex items-center justify-center gap-2 text-black font-black text-xs uppercase mt-16 bg-gray-50 py-6 rounded-3xl tracking-[0.3em]">
            All Posts <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </section>
  );
};

export default Blog;
