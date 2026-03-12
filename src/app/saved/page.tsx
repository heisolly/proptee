"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Maximize2, MapPin, Heart, ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formatPrice = (price: number) => {
  if (!price) return "N/A";
  if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`;
  if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(0)}M`;
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
};

export default function SavedPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
  }, []);

  const fetchSavedProperties = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: saves } = await supabase
        .from("saved_properties")
        .select("property_id")
        .eq("user_id", user.id);

      if (saves && saves.length > 0) {
        const propertyIds = saves.map(s => s.property_id);
        const { data: listings } = await supabase
          .from("listings")
          .select("*")
          .in("id", propertyIds);
        
        setProperties(listings || []);
      }
    }
    setLoading(false);
  };

  const handleRemove = async (propertyId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);
      
      if (!error) setProperties(properties.filter(p => p.id !== propertyId));
    }
  };

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
            <p className="text-brand-emerald font-black uppercase tracking-[0.4em] text-xs mb-4">Your Collection</p>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">Saved Properties</h1>
            <p className="text-white/60 text-lg font-sans">
              Manage your curated portfolio of pre-approved luxury listings.
            </p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-24 bg-[#f9f9f9]">
          <div className="container max-w-[1140px] mx-auto px-6">
            
            <div className="flex items-center justify-between mb-12">
               <Link href="/properties" className="group flex items-center gap-2 text-brand-dark/40 hover:text-brand-emerald transition-colors text-xs font-black uppercase tracking-widest">
                 <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                 Back to Search
               </Link>
               <span className="text-brand-dark/30 text-xs font-bold uppercase tracking-widest">{properties.length} Items</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="animate-spin text-brand-emerald mb-4" size={40} />
                <p className="text-brand-dark/40 font-black uppercase tracking-widest text-[10px]">Accessing Vault...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={32} className="text-gray-200" />
                </div>
                <h3 className="text-2xl font-serif text-brand-dark mb-4">Your collection is empty</h3>
                <p className="text-brand-dark/50 font-sans mb-10 max-w-sm mx-auto">Start exploring our inventory and heart the properties that catch your eye.</p>
                <Link href="/properties" className="bg-brand-emerald text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-brand-emerald/10 inline-block">
                  Start Exploring
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {properties.map((prop) => (
                  <div key={prop.id} className="bg-white group rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={prop.images?.[0] || "/hero_background.jpg"}
                        alt={prop.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <button 
                        onClick={() => handleRemove(prop.id)}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white text-brand-emerald flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all"
                        title="Remove from saved"
                      >
                        <Heart size={18} fill="currentColor" />
                      </button>
                      <div className="absolute top-4 left-4 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {prop.listing_type || 'Verified'}
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-brand-emerald text-2xl font-serif font-medium mb-1">{formatPrice(prop.price)}</p>
                      <Link href={`/properties/${prop.id}`}>
                        <h3 className="text-brand-dark text-xl font-serif mb-2 hover:text-brand-emerald transition-colors line-clamp-1">{prop.title}</h3>
                      </Link>
                      <p className="text-brand-dark/50 text-sm font-sans mb-6 flex items-center gap-2">
                        <MapPin size={14} className="text-brand-emerald" />
                        {prop.address}
                      </p>
                      
                      <div className="flex items-center gap-6 text-brand-dark/60 pb-8 border-b border-gray-50">
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

                      <div className="pt-6">
                        <Link href={`/properties/${prop.id}`} className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold flex items-center justify-center text-xs uppercase tracking-widest hover:bg-brand-emerald transition-colors">
                          View Property Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
