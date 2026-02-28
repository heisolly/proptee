import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Search, Tag, ChevronRight, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, categories(name)')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('type', 'blog');

  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, created_at, banner_image')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <main className="min-h-screen font-sans bg-[#f7f7f7]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex flex-col justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 text-[#0F3D2E]">
          <div className="absolute inset-0 bg-[#0F3D2E]"></div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-24 relative z-10">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
                Proptee Journal
            </h1>
            <p className="text-[#1F7A5C] font-bold text-lg uppercase tracking-[0.2em]">Trends, Insights & Luxury Living</p>
        </div>
      </section>

      {/* Main Blog Layout */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-12 flex flex-col lg:flex-row gap-16">
           
           {/* Left Content: Post Grid */}
           <div className="lg:w-2/3">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {posts?.map((post) => (
                  <article key={post.id} className="group bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#E0E0E0]/50 flex flex-col hover:shadow-xl transition-all duration-500">
                     <div className="relative h-64 overflow-hidden p-3">
                        <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                             {post.banner_image ? (
                               <Image 
                                 src={post.banner_image} 
                                 alt={post.title} 
                                 fill 
                                 className="object-cover group-hover:scale-105 transition-transform duration-1000"
                               />
                             ) : (
                               <div className="w-full h-full bg-[#F2F2F2] flex items-center justify-center text-[#0F3D2E]">
                                 <Tag size={32} />
                               </div>
                             )}
                             <div className="absolute top-4 left-4 z-10 bg-[#0F3D2E] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                               {post.categories?.name || 'News'}
                             </div>
                        </div>
                     </div>

                     <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-[#6B7280] text-xs font-bold uppercase tracking-widest mb-4">
                           <Calendar size={14} /> {new Date(post.created_at).toLocaleDateString()}
                        </div>
                        
                        <h2 className="font-bold text-[#000000] mb-4 text-2xl leading-tight">
                           <Link href={`/blog/${post.id}`} className="hover:text-[#0F3D2E] transition-colors line-clamp-2">
                             {post.title}
                           </Link>
                        </h2>
                        
                        <p className="text-[#6B7280] text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                           {post.excerpt}
                        </p>
                        
                        <Link href={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-[#000000] font-black text-xs uppercase tracking-widest hover:text-[#0F3D2E] transition-colors mt-auto group/btn">
                           Explore Post <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                     </div>
                  </article>
                ))}
                {(!posts || posts.length === 0) && (
                  <div className="md:col-span-2 text-center py-20 bg-white rounded-3xl border border-dashed border-[#E0E0E0]">
                    <p className="text-[#6B7280] font-bold">No articles published yet.</p>
                  </div>
                )}
             </div>
           </div>

           {/* Right Sidebar */}
           <div className="lg:w-1/3 flex flex-col gap-12">
             <div className="bg-white p-8 rounded-[32px] border border-[#E0E0E0] shadow-sm">
                <h3 className="text-xl font-bold text-[#000000] mb-8">Recent Stories</h3>
                <div className="flex flex-col gap-8">
                   {recentPosts?.map(post => (
                      <Link href={`/blog/${post.id}`} key={post.id} className="flex items-center gap-4 group">
                         <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-[#F2F2F2]">
                            {post.banner_image && <Image src={post.banner_image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />}
                         </div>
                         <div className="flex flex-col gap-1">
                            <span className="text-[#0F3D2E] font-bold text-[10px] uppercase tracking-widest">{new Date(post.created_at).toLocaleDateString()}</span>
                            <h4 className="text-sm font-bold text-[#000000] group-hover:text-[#0F3D2E] transition-colors leading-tight line-clamp-2">
                               {post.title}
                            </h4>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>

             <div className="bg-white p-8 rounded-[32px] border border-[#E0E0E0] shadow-sm">
                <h3 className="text-xl font-bold text-[#000000] mb-6">Categories</h3>
                <div className="flex flex-wrap gap-3">
                   {categories?.map(cat => (
                      <Link href={`/blog?category=${cat.id}`} key={cat.id} className="bg-[#F2F2F2] text-[#000000] px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0F3D2E] hover:text-white transition-all">
                         {cat.name}
                      </Link>
                   ))}
                </div>
             </div>
           </div>
           
        </div>
      </div>

      <Footer />
    </main>
  );
}
