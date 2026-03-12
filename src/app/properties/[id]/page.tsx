"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2, 
  CheckCircle, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  X
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const formatPrice = (price: number) => {
  if (!price) return "Price on Request";
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
};

export default function SinglePropertyPage({ params }: { params: { id: string } }) {
  const [showGallery, setShowGallery] = useState(false);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*, agents(*)')
        .eq('id', params.id)
        .single();
        
      if (!error && data) {
        setProperty(data);
      }
      setLoading(false);
    };
    
    if (params.id) fetchProperty();
  }, [params.id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-40 pb-32 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-brand-emerald border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-brand-dark/40 font-sans font-bold uppercase tracking-widest text-xs">Fetching Details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="bg-white min-h-screen pt-40 pb-32 flex flex-col items-center">
        <h1 className="text-brand-dark font-serif text-4xl mb-6">Property Not Found</h1>
        <Link href="/properties" className="bg-brand-emerald text-white px-8 py-3 rounded-xl font-bold">Return to Portfolio</Link>
      </div>
    );
  }

  const images = property.images?.length > 0 ? property.images : ["/hero_background.jpg"];
  const agent = property.agents || {
    name: "Luxury Specialist",
    bio: "Dedicated brand advisor.",
    phone: "+234 800 000 0000",
    email: "concierge@proptee.ng",
    image_url: "/hero_background.jpg"
  };

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen pt-28">

        {/* ── Action bar ── */}
        <div className="container max-w-[1140px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/properties" className="group flex items-center gap-2 text-brand-dark/50 hover:text-brand-emerald transition-colors text-sm font-bold uppercase tracking-wider">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Feed
          </Link>
          <div className="flex items-center gap-3">
             <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-brand-emerald hover:border-brand-emerald transition-all shadow-sm">
               <Share2 size={18} />
             </button>
             <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500 transition-all shadow-sm">
               <Heart size={18} />
             </button>
          </div>
        </div>

        {/* ── Gallery Grid ── */}
        <section className="container max-w-[1140px] mx-auto px-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative">
            <div className="md:col-span-2 md:row-span-2 relative cursor-pointer group" onClick={() => setShowGallery(true)}>
              <Image src={images[0]} alt="Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative cursor-pointer group" onClick={() => setShowGallery(true)}>
              <Image src={images[1] || images[0]} alt="Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative cursor-pointer group" onClick={() => setShowGallery(true)}>
              <Image src={images[2] || images[0]} alt="Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative cursor-pointer group" onClick={() => setShowGallery(true)}>
              <Image src={images[3] || images[0]} alt="Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="hidden md:block relative cursor-pointer group" onClick={() => setShowGallery(true)}>
              <Image src={images[4] || images[0]} alt="Property" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <button 
              onClick={() => setShowGallery(true)}
              className="absolute bottom-6 right-6 bg-white border border-gray-100 px-6 py-2.5 rounded-xl text-brand-dark text-xs font-black uppercase tracking-widest shadow-xl hover:bg-brand-emerald hover:text-white transition-all"
            >
              View All Photos
            </button>
          </div>
        </section>

        {/* ── Content Layout ── */}
        <section className="container max-w-[1140px] mx-auto px-6 pb-24">
          <div className="flex flex-col lg:flex-row gap-16">

            {/* Left: Info */}
            <div className="flex-1">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {property.listing_type || 'For Sale'}
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-dark/40 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-brand-emerald" /> Verified Listing
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4 leading-tight">{property.title}</h1>
                <p className="text-brand-dark/50 text-lg flex items-center gap-2 mb-10 font-sans">
                  <MapPin size={20} className="text-brand-emerald shrink-0" />
                  {property.address}, {property.city}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 px-10 bg-[#f9f9f9] border border-gray-100 rounded-3xl">
                  <div className="text-center">
                    <BedDouble size={24} className="text-brand-emerald mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xl font-serif text-brand-dark font-bold leading-none">{property.beds || 0}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-1">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath size={24} className="text-brand-emerald mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xl font-serif text-brand-dark font-bold leading-none">{property.baths || 0}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-1">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Maximize2 size={24} className="text-brand-emerald mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xl font-serif text-brand-dark font-bold leading-none">{property.sqft || 0}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-1">Square Meters</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp size={24} className="text-brand-emerald mx-auto mb-2" strokeWidth={1.5} />
                    <p className="text-xl font-serif text-brand-dark font-bold leading-none">High</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/30 mt-1">Yield Potential</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-16">
                <h3 className="text-2xl font-serif text-brand-dark mb-6">Architectural Description</h3>
                <p className="text-brand-dark/60 text-lg leading-relaxed font-sans whitespace-pre-wrap">
                  {property.description || "An exceptional residence offering unparalleled luxury and sophisticated design."}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="mb-16">
                  <h3 className="text-2xl font-serif text-brand-dark mb-8">Premium Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                    {property.amenities.map((amenity: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 text-brand-dark/70 font-sans">
                        <CheckCircle size={18} className="text-brand-emerald" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Sidebar */}
            <div className="w-full lg:w-[400px] shrink-0">
               <div className="sticky top-32 flex flex-col gap-6">

                  {/* Booking Card */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-xl shadow-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2">Price Guide</p>
                    <h2 className="text-3xl font-serif text-brand-dark mb-8">
                      {formatPrice(property.price)}
                      {property.listing_type === "For Rent" && <span className="text-lg text-brand-dark/30 italic font-sans font-normal"> / month</span>}
                    </h2>

                    <button className="w-full bg-brand-emerald text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-brand-emerald/10 hover:bg-brand-emerald-muted transition-all mb-4">
                      Request Private Viewing
                    </button>
                    <button className="w-full bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark/90 transition-all flex items-center justify-center gap-2">
                       <Calendar size={18} /> Schedule Tour
                    </button>
                    
                    <div className="mt-8 pt-8 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-100 border-2 border-brand-emerald/10">
                          <Image src={agent.image_url || "/hero_background.jpg"} alt={agent.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif text-brand-dark font-bold">{agent.name}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">{agent.bio}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-6">
                        <a href={`tel:${agent.phone}`} className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg text-xs font-bold text-brand-dark hover:border-brand-emerald hover:text-brand-emerald transition-all">
                          <Phone size={14} /> Call
                        </a>
                        <a href={`mailto:${agent.email}`} className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg text-xs font-bold text-brand-dark hover:border-brand-emerald hover:text-brand-emerald transition-all">
                          <Mail size={14} /> Email
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Safety / Compliance */}
                  <div className="bg-[#f9f9f9] rounded-2xl p-6 border border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-4 flex items-center gap-2">
                      <ShieldCheck size={14} className="text-brand-emerald" /> Proptee Protection
                    </p>
                    <p className="text-xs text-brand-dark/50 leading-relaxed">
                      Every transaction on Proptee is secured by our escrow verification system. 
                      Never pay any fees outside of the Proptee platform.
                    </p>
                  </div>

               </div>
            </div>

          </div>
        </section>

        {/* ── Gallery Modal ── */}
        {showGallery && (
          <div className="fixed inset-0 z-[1000] bg-brand-dark flex flex-col p-6 overflow-y-auto">
            <button 
              onClick={() => setShowGallery(false)}
              className="fixed top-8 right-8 z-[1100] w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-dark shadow-2xl hover:scale-110 transition-transform"
            >
              <X size={24} />
            </button>
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-6 pt-12">
              {images.map((img: string, i: number) => (
                <div key={i} className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl">
                  <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}
