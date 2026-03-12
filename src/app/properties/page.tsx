"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, BedDouble, Bath, Maximize2, MapPin, ChevronDown, Grid, List as ListIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formatPrice = (price: number) => {
  if (!price) return "Price on Request";
  if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`;
  if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(0)}M`;
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
};

export default function PropertyListingPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        setProperties(data);
      }
      setLoading(false);
    };
    
    fetchProperties();
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
          <div className="container max-w-[1140px] mx-auto px-6 relative z-10 text-center">
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Find Properties</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Property Grid</h1>
            <p className="text-white/60 text-lg font-sans">
              Discover your perfect home across Nigeria's most prestigious locations.
            </p>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <section className="bg-white border-b border-gray-100 py-6 sticky top-20 z-40 shadow-sm">
          <div className="container max-w-[1140px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Search Pill */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                <div className="flex items-center gap-3 bg-[#f9f9f9] border border-gray-200 rounded-full px-5 py-3 w-full sm:w-80 group focus-within:border-brand-emerald transition-all">
                  <Search size={18} className="text-gray-400 group-focus-within:text-brand-emerald" />
                  <input 
                    type="text" 
                    placeholder="Search by location, title..." 
                    className="bg-transparent border-none outline-none text-brand-dark text-sm w-full placeholder:text-gray-400" 
                  />
                </div>

                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-brand-dark/60 hover:text-brand-emerald transition-colors text-sm font-bold uppercase tracking-wider">
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>
                  <div className="h-6 w-px bg-gray-200 hidden sm:block" />
                  <span className="text-brand-dark/40 text-sm font-sans">{loading ? '...' : properties.length} Results Found</span>
                </div>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setView('grid')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${view === 'grid' ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20' : 'bg-[#f9f9f9] text-gray-400 hover:text-brand-dark border border-gray-200'}`}
                >
                  <Grid size={20} />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${view === 'list' ? 'bg-brand-emerald text-white shadow-lg shadow-brand-emerald/20' : 'bg-[#f9f9f9] text-gray-400 hover:text-brand-dark border border-gray-200'}`}
                >
                  <ListIcon size={20} />
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ── Content Grid ── */}
        <section className="py-20 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="w-12 h-12 border-2 border-brand-emerald border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-brand-dark/40 font-sans font-bold uppercase tracking-widest text-xs">Loading Listings...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <h3 className="text-2xl font-serif text-brand-dark mb-2">No matching properties</h3>
                <p className="text-brand-dark/50 font-sans">Try adjusting your filters to find what you're looking for.</p>
              </div>
            ) : (
              <div className={`grid gap-8 ${view === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {properties.map((prop, i) => (
                  <div 
                    key={prop.id} 
                    className={`bg-white group overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl ${view === 'grid' ? 'rounded-2xl flex flex-col' : 'rounded-3xl flex flex-col md:flex-row'}`}
                  >
                    {/* Image Area */}
                    <Link 
                      href={`/properties/${prop.id}`} 
                      className={`relative overflow-hidden block ${view === 'grid' ? 'w-full aspect-[4/3]' : 'w-full md:w-[40%] aspect-[4/3] md:aspect-auto shrink-0'}`}
                    >
                      <Image 
                        src={prop.images?.[0] || "/hero_background.jpg"} 
                        alt={prop.title} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute top-4 left-4 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">
                        {prop.listing_type || 'For Sale'}
                      </div>
                    </Link>

                    {/* Content Area */}
                    <div className={`p-6 flex flex-col flex-1 ${view === 'list' ? 'md:p-10 justify-center' : ''}`}>
                      <div className="flex-1">
                        <p className="text-brand-emerald text-2xl font-serif font-medium mb-1">
                          {formatPrice(prop.price)}
                          <span className="text-brand-dark/40 text-base font-sans font-normal"> {prop.listing_type === "For Rent" ? "/month" : ""}</span>
                        </p>
                        <Link href={`/properties/${prop.id}`}>
                          <h3 className="text-brand-dark text-xl font-serif mb-2 hover:text-brand-emerald transition-colors line-clamp-1">
                            {prop.title}
                          </h3>
                        </Link>
                        <p className="text-brand-dark/50 text-sm font-sans mb-6 flex items-center gap-2">
                          <MapPin size={14} className="text-brand-emerald" />
                          {prop.address}
                        </p>

                        <div className="flex items-center gap-6 text-brand-dark/60">
                          <div className="flex items-center gap-2">
                            <BedDouble size={18} className="text-brand-emerald" />
                            <span className="text-sm font-medium">{prop.beds} bed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Bath size={18} className="text-brand-emerald" />
                            <span className="text-sm font-medium">{prop.baths} bath</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Maximize2 size={18} className="text-brand-emerald" />
                            <span className="text-sm font-medium">{prop.sqft} m²</span>
                          </div>
                        </div>
                      </div>

                      {view === 'list' && (
                        <div className="mt-8">
                          <Link 
                            href={`/properties/${prop.id}`}
                            className="bg-brand-dark text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-brand-emerald transition-colors inline-block"
                          >
                            View Details
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination / Load More */}
            {!loading && properties.length > 0 && (
              <div className="mt-16 flex justify-center">
                <button className="bg-white text-brand-dark border border-gray-200 px-10 py-5 rounded-xl font-bold hover:border-brand-emerald hover:text-brand-emerald transition-all shadow-sm">
                  Load More Properties
                </button>
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
