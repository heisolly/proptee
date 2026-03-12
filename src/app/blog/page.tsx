"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const fallbackPosts = [
  { id: "1", title: "Why Lekki is Nigeria's fastest-growing real estate market", excerpt: "Discover the driving forces behind Lekki's explosive property demand and what it means for investors in 2025.", banner_image: "/hero_background.jpg", created_at: "2025-01-12", categories: { name: "Investment" } },
  { id: "2", title: "5 things to check before signing any property agreement", excerpt: "Protect yourself from common pitfalls — our legal team outlines the most critical due diligence steps.", banner_image: "/hero_background.jpg", created_at: "2025-02-05", categories: { name: "Buying Guide" } },
  { id: "3", title: "Modern vibes: today's most sought-after interior design trends", excerpt: "From open-plan living to rooftop terraces — the architectural must-haves dominating high-end Nigerian homes.", banner_image: "/hero_background.jpg", created_at: "2025-02-22", categories: { name: "Design" } },
  { id: "4", title: "Understanding the difference between C of O and R of O in Nigeria", excerpt: "A comprehensive guide to property ownership documents and what each means for your investment security.", banner_image: "/hero_background.jpg", created_at: "2025-03-01", categories: { name: "Legal" } },
  { id: "5", title: "Abuja vs Lagos: which city offers better ROI on real estate?", excerpt: "We analyze transaction data, infrastructure growth, and demand signals across both capital cities.", banner_image: "/hero_background.jpg", created_at: "2025-03-08", categories: { name: "Investment" } },
  { id: "6", title: "The complete guide to renting in Lagos for new professionals", excerpt: "Navigating the Lagos rental market is tough. Here's everything you need to know as a first-time renter.", banner_image: "/hero_background.jpg", created_at: "2025-03-10", categories: { name: "Rent" } },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: postsData } = await supabase
        .from("blog_posts")
        .select("*, categories(name)")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      const { data: recentData } = await supabase
        .from("blog_posts")
        .select("id, title, created_at, banner_image")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(4);

      const { data: catsData } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "blog");

      if (postsData && postsData.length > 0) setPosts(postsData);
      else setPosts(fallbackPosts);

      if (recentData && recentData.length > 0) setRecentPosts(recentData);
      else setRecentPosts(fallbackPosts.slice(0, 4));

      if (catsData) setCategories(catsData);
      
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">

        {/* ── Page Banner ── */}
        <section
          className="relative pt-40 pb-24 flex items-center"
          style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
        >
          <div className="absolute inset-0 bg-brand-dark/70" />
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10">
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Our Journal</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Latest Articles</h1>
            <p className="text-white/60 text-lg font-sans">
              Trends, insights, and stories from Nigeria's property market.
            </p>
          </div>
        </section>

        {/* ── Blog Layout: Posts + Sidebar ── */}
        <section className="py-20 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="animate-spin text-brand-emerald mb-4" size={40} />
                <p className="text-brand-dark/40 font-black uppercase tracking-widest text-[10px]">Loading Journal...</p>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-12">

                {/* ── Left: Post Grid ── */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post: any) => (
                      <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-lg transition-all duration-500 flex flex-col">
                        {/* Image */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          {post.banner_image ? (
                            <Image
                              src={post.banner_image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                              <Tag size={28} className="text-gray-300" />
                            </div>
                          )}
                          <div className="absolute top-4 left-4 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                            {post.categories?.name || "News"}
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-2 text-brand-dark/40 text-xs font-bold uppercase tracking-wider mb-4">
                            <Calendar size={14} />
                            {new Date(post.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                          </div>
                          <h2 className="text-brand-dark font-serif text-xl mb-3 leading-snug group-hover:text-brand-emerald transition-colors line-clamp-2 flex-1">
                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                          </h2>
                          <p className="text-brand-dark/50 text-sm font-sans leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                          <Link
                            href={`/blog/${post.id}`}
                            className="inline-flex items-center gap-2 text-brand-emerald text-xs font-black uppercase tracking-widest hover:gap-3 transition-all"
                          >
                            Read Article <ArrowRight size={14} />
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                {/* ── Right Sidebar ── */}
                <div className="lg:w-1/3 flex flex-col gap-8">

                  {/* Recent Posts */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-serif text-brand-dark mb-6 pb-4 border-b border-gray-100">Recent Posts</h3>
                    <div className="flex flex-col gap-6">
                      {recentPosts.map((post: any) => (
                        <Link key={post.id} href={`/blog/${post.id}`} className="flex items-start gap-4 group">
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                            {post.banner_image && (
                              <Image src={post.banner_image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            )}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <span className="text-brand-emerald text-[10px] font-black uppercase tracking-widest">
                              {new Date(post.created_at).toLocaleDateString()}
                            </span>
                            <h4 className="text-sm font-bold text-brand-dark group-hover:text-brand-emerald transition-colors leading-snug line-clamp-2 font-sans">
                              {post.title}
                            </h4>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                    <h3 className="text-xl font-serif text-brand-dark mb-6 pb-4 border-b border-gray-100">Categories</h3>
                    <div className="flex flex-wrap gap-3">
                      {(categories && categories.length > 0
                        ? categories
                        : [{ id: "1", name: "Investment" }, { id: "2", name: "Buying Guide" }, { id: "3", name: "Design" }, { id: "4", name: "Legal" }, { id: "5", name: "Rent" }]
                      ).map((cat: any) => (
                        <Link
                          key={cat.id}
                          href={`/blog?category=${cat.id}`}
                          className="bg-[#f9f9f9] text-brand-dark text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg border border-gray-200 hover:bg-brand-emerald hover:text-white hover:border-brand-emerald transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-brand-dark rounded-2xl p-8">
                    <h3 className="text-xl font-serif text-white mb-2">Property Updates</h3>
                    <p className="text-white/40 text-sm font-sans mb-6">Get off-market opportunities bi-weekly.</p>
                    <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-brand-emerald transition-colors"
                      />
                      <button className="bg-brand-emerald text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-emerald-muted transition-all">
                        Subscribe
                      </button>
                    </form>
                  </div>

                </div>
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
