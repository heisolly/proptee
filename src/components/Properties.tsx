"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Square, MapPin, Heart, Share2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthModal from "./auth/AuthModal";

const PROPERTY_DATA = [
  {
    id: 1,
    title: "Ultra-Modern 4 Bedroom Duplex",
    location: "Lekki Phase 1, Lagos",
    price: "₦85,000,000",
    type: "Sale",
    city: "Lagos",
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7e009?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 4,
    baths: 4,
    sqft: 2800,
  },
  {
    id: 2,
    title: "Luxury Penthouse with Ocean View",
    location: "Victoria Island, Lagos",
    price: "₦120,000,000",
    type: "Sale",
    city: "Lagos",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 3,
    baths: 3,
    sqft: 3200,
  },
  {
    id: 3,
    title: "Contemporary 2 Bedroom Apartment",
    location: "Bodija, Ibadan",
    price: "₦4,500,000/yr",
    type: "Rent",
    city: "Ibadan",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 2,
    baths: 2,
    sqft: 1400,
  },
  {
    id: 4,
    title: "Investment Land in Epe",
    location: "Free Trade Zone, Epe",
    price: "₦15,000,000",
    type: "Investment",
    city: "Lagos",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 0,
    baths: 0,
    sqft: 6000,
  },
  {
    id: 5,
    title: "Prime Commercial Space",
    location: "Maitama, Abuja",
    price: "₦250,000,000",
    type: "Sale",
    city: "Abuja",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 0,
    baths: 4,
    sqft: 5000,
  },
  {
    id: 6,
    title: "Elegant Family Home",
    location: "Life Camp, Abuja",
    price: "₦55,000,000",
    type: "Sale",
    city: "Abuja",
    image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    beds: 5,
    baths: 5,
    sqft: 4000,
  },
];

const PropertyCard = ({ property, onSaveToggle }: { property: any, onSaveToggle: () => void }) => (
  <div className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 border border-gray-100 flex flex-col">
    <div className="relative h-72 overflow-hidden">
      <Image
        src={property.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6199f7e009?auto=format&fit=crop&w=800&q=80"}
        alt={property.title}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-1000"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute top-5 left-5 z-10">
         <span className={`px-5 py-2 rounded-full text-[10px] font-black text-white uppercase tracking-[0.2em] shadow-lg ${
           property.type === 'sell' ? 'bg-[#0F3D2E]' : 
           property.type === 'rent' ? 'bg-black' : 'bg-[#1F7A5C]'
         }`}>
           {property.type === 'sell' ? 'For Sale' : property.type === 'rent' ? 'For Rent' : property.type}
         </span>
      </div>
      <div className="absolute top-5 right-5 z-10 flex flex-col gap-3">
          <button 
            onClick={onSaveToggle}
            className={`w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 ${
              property.is_saved ? 'text-red-500 bg-red-50' : 'text-black/60 hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={property.is_saved ? "currentColor" : "none"} />
          </button>
          <button className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-black/60 hover:bg-[#1F7A5C] hover:text-white transition-all shadow-xl">
            <Share2 size={18} />
          </button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
         <Link href={`/properties/${property.id}`} className="w-full py-4 bg-[#0F3D2E] text-white text-center font-bold text-sm uppercase tracking-widest rounded-2xl active:scale-95 transition-all shadow-2xl">
           Explore Details
         </Link>
      </div>
    </div>
    
    <div className="p-8 flex flex-col flex-1">
      <div className="text-3xl font-black text-[#0F3D2E] mb-3 tracking-tighter">{property.price}</div>
      <Link href={`/properties/${property.id}`}>
        <h3 className="text-xl font-bold text-black mb-3 line-clamp-1 hover:text-[#0F3D2E] transition-colors leading-tight">{property.title}</h3>
      </Link>
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-8 font-medium">
        <MapPin size={16} className="text-[#1F7A5C]" />
        {property.location}
      </div>
      
      <div className="mt-auto pt-8 border-t border-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-6">
            {property.beds > 0 && (
            <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 uppercase font-black tracking-tighter">Beds</span>
                <div className="flex items-center gap-2">
                    <BedDouble size={18} className="text-[#1F7A5C]" />
                    <span className="font-bold text-black">{property.beds}</span>
                </div>
            </div>
            )}
            {property.baths > 0 && (
            <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 uppercase font-black tracking-tighter">Baths</span>
                <div className="flex items-center gap-2">
                    <Bath size={18} className="text-[#1F7A5C]" />
                    <span className="font-bold text-black">{property.baths}</span>
                </div>
            </div>
            )}
        </div>
        <div className="flex flex-col gap-1 items-end">
            <span className="text-xs text-gray-400 uppercase font-black tracking-tighter">SqFt</span>
            <div className="flex items-center gap-2">
                <Square size={16} className="text-[#1F7A5C]" />
                <span className="font-bold text-black">{property.sqft.toLocaleString()}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
);

const Properties = () => {
  const [filter, setFilter] = useState("All");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: approvedListings } = await supabase
      .from("listings")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (approvedListings) {
      if (user) {
        const { data: saves } = await supabase
          .from("saved_properties")
          .select("property_id")
          .eq("user_id", user.id);
        
        const saveIds = new Set(saves?.map(s => s.property_id));
        setProperties(approvedListings.map(p => ({
          ...p,
          is_saved: saveIds.has(p.id)
        })));
      } else {
        setProperties(approvedListings.map(p => ({ ...p, is_saved: false })));
      }
    }
    setLoading(false);
  };

  const handleSaveToggle = async (propertyId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const property = properties.find(p => p.id === propertyId);
    if (property.is_saved) {
      await supabase.from("saved_properties").delete().eq("user_id", user.id).eq("property_id", propertyId);
    } else {
      await supabase.from("saved_properties").insert([{ user_id: user.id, property_id: propertyId }]);
    }
    
    // Optimistic update
    setProperties(properties.map(p => p.id === propertyId ? { ...p, is_saved: !p.is_saved } : p));
  };

  const filteredProperties = filter === "All" 
    ? properties 
    : properties.filter(p => p.city === filter);

  return (
    <section id="properties" className="py-32 bg-gray-50/30">
      <div className="container mx-auto px-4 lg:pl-24">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 
              className="text-4xl md:text-5xl lg:text-[56px] font-medium text-[#0F3D2E] mb-4 tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Best Luxury Listings in Lagos
            </h2>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed font-light italic">
              Some of the finest luxury listings in the market, handpicked just for you
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 p-2 bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
            {["All", "Lagos", "Ibadan", "Abuja"].map((city) => (
              <button
                key={city}
                onClick={() => setFilter(city)}
                className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all duration-500 ${
                  filter === city 
                    ? "bg-[#0F3D2E] text-white shadow-2xl shadow-[#0F3D2E]/30 ring-4 ring-[#0F3D2E]/10" 
                    : "bg-transparent text-black/60 hover:bg-gray-50 hover:text-[#0F3D2E]"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 min-h-[400px]">
          {loading ? (
             <div className="col-span-full flex items-center justify-center p-20">
                <Loader2 className="animate-spin text-[#0F3D2E]" size={48} />
             </div>
          ) : filteredProperties.length === 0 ? (
            <div className="col-span-full text-center p-20 bg-white rounded-3xl border border-dashed border-gray-200">
               <p className="text-gray-400 italic">No approved luxury listings found matching your criteria.</p>
            </div>
          ) : (
            filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                onSaveToggle={() => handleSaveToggle(property.id)} 
              />
            ))
          )}
        </div>
        
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        
        <div className="mt-24 text-center">
          <Link href="/properties" className="inline-flex items-center gap-4 px-16 py-5 bg-black text-white font-black text-sm uppercase tracking-[0.3em] rounded-2xl hover:bg-[#0F3D2E] transition-all duration-500 shadow-2xl hover:shadow-[#0F3D2E]/30 active:scale-95 group">
            Browse All Collections
            <Share2 className="group-hover:translate-x-2 transition-transform" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Properties;
