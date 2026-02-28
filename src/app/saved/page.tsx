"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Square, MapPin, Heart, Share2, Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
      const { data: saves, error } = await supabase
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
      
      if (!error) {
        setProperties(properties.filter(p => p.id !== propertyId));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      
      <main className="pt-32 pb-20 container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#0F3D2E] transition-colors mb-4 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Back to Explore</span>
              </Link>
              <h1 className="text-4xl font-black text-[#0F3D2E] tracking-tight">Saved Properties</h1>
              <p className="text-gray-500 font-medium italic mt-2">Manage your collection of pre-approved luxury listings.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-xl border border-gray-100">
              <Loader2 className="animate-spin text-[#0F3D2E] mb-4" size={48} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Curating your collection...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-xl border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">No saved properties yet</h3>
              <p className="text-gray-400 mb-8 font-medium">Start exploring our luxury listings and heart your favorites.</p>
              <Link href="/#properties" className="inline-flex px-8 py-4 bg-[#0F3D2E] text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-[#1F7A5C] transition-all shadow-xl">
                Explore Properties
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {properties.map((property) => (
                <div key={property.id} className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-700">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&w=800&q=80"}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute top-5 right-5 z-10">
                      <button 
                        onClick={() => handleRemove(property.id)}
                        className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
                      >
                        <Heart size={18} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-black text-[#0F3D2E] leading-tight line-clamp-1">{property.title}</h3>
                      <p className="text-lg font-black text-[#1F7A5C]">₦{property.price?.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 mb-6 group/loc">
                      <MapPin size={14} className="group-hover/loc:text-[#1F7A5C] transition-colors" />
                      <span className="text-[11px] font-bold tracking-wide">{property.address}, {property.city}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-50 mb-8">
                        <div className="flex items-center gap-2">
                            <BedDouble size={16} className="text-gray-300" />
                            <span className="text-[11px] font-black text-[#0F3D2E]">{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Bath size={16} className="text-gray-300" />
                            <span className="text-[11px] font-black text-[#0F3D2E]">{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Square size={16} className="text-gray-300" />
                            <span className="text-[11px] font-black text-[#0F3D2E]">{property.sqft}</span>
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gray-50 text-[#4d4d4d] font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[#0F3D2E] hover:text-white transition-all">
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
