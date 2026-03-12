"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, Maximize2, ArrowRight, MapPin } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

const formatPrice = (price: number) => {
  if (!price) return "Price on Request";
  if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`;
  if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(0)}M`;
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(price);
};

const fallback = [
  { id: "f1", title: "Skyline Luxury Apartments", address: "Banana Island, Lagos", price: 1_800_000_000, beds: 5, baths: 6, sqft: 980, listing_type: "For Sale", images: ["/hero_background.jpg"] },
  { id: "f2", title: "Waterfront Villa, Lekki", address: "Lekki Phase 1, Lagos", price: 650_000_000, beds: 4, baths: 5, sqft: 720, listing_type: "For Rent", images: ["/hero_background.jpg"] },
  { id: "f3", title: "Modern Duplex, Asokoro", address: "Asokoro, Abuja", price: 350_000_000, beds: 3, baths: 4, sqft: 480, listing_type: "For Sale", images: ["/hero_background.jpg"] },
  { id: "f4", title: "Governor's Hill Estate", address: "Maitama, Abuja", price: 520_000_000, beds: 4, baths: 4, sqft: 610, listing_type: "For Rent", images: ["/hero_background.jpg"] },
  { id: "f5", title: "Eko Atlantic Penthouse", address: "Victoria Island, Lagos", price: 2_200_000_000, beds: 6, baths: 7, sqft: 1200, listing_type: "For Sale", images: ["/hero_background.jpg"] },
  { id: "f6", title: "Garden Court Residence", address: "Ikoyi, Lagos", price: 480_000_000, beds: 3, baths: 3, sqft: 550, listing_type: "For Rent", images: ["/hero_background.jpg"] },
  { id: "f7", title: "Hilltop Smart Home", address: "Jabi, Abuja", price: 290_000_000, beds: 4, baths: 3, sqft: 420, listing_type: "For Sale", images: ["/hero_background.jpg"] },
  { id: "f8", title: "Lakefront Bungalow", address: "Lekki Phase 2, Lagos", price: 180_000_000, beds: 3, baths: 2, sqft: 380, listing_type: "For Rent", images: ["/hero_background.jpg"] },
  { id: "f9", title: "Presidential Quarter", address: "Maitama, Abuja", price: 1_500_000_000, beds: 7, baths: 8, sqft: 1100, listing_type: "For Sale", images: ["/hero_background.jpg"] },
];

export default function FeaturedCarousel({ properties = [] }: { properties: any[] }) {
  const displayProperties = properties.length > 0 ? properties : fallback;

  return (
    <section className="py-16 md:py-32 bg-brand-bg overflow-hidden">
      <div className="px-5 md:px-8 lg:max-w-[1440px] lg:mx-auto">
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div className="space-y-3">
            <span className="text-brand-emerald text-xs font-black uppercase tracking-[0.4em]">Curated Inventory</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-dark tracking-tighter">Popular Properties</h2>
          </div>
          
          <Link 
            href="/properties" 
            className="hidden md:flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-brand-dark hover:text-brand-emerald transition-colors"
          >
            Explore All 
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center">
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        {/* Horizontal scroll on all devices */}
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 md:mx-0 md:px-0">
            {displayProperties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="snap-start min-w-[300px] w-[85vw] md:w-[400px] lg:w-[480px] flex-shrink-0"
              >
                <div className="card-base group overflow-hidden border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-[2rem]">
                  {/* Image */}
                  <Link href={`/properties/${prop.id}`} className="block relative aspect-[5/4] overflow-hidden">
                    <Image
                      src={prop.images?.[0] || "/hero_background.jpg"}
                      alt={prop.title}
                      fill
                      sizes="(max-width: 768px) 85vw, 480px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Type Badge */}
                    <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-sm text-brand-dark text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-sm">
                      {prop.listing_type || "For Sale"}
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-6 md:p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-brand-dark text-xl md:text-2xl font-serif font-bold mb-1 hover:text-brand-emerald transition-colors line-clamp-1">
                          {prop.title}
                        </h3>
                        <p className="text-brand-muted text-[13px] font-medium flex items-center gap-2">
                          <MapPin size={14} className="text-brand-emerald" />
                          {prop.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-brand-emerald text-xl md:text-2xl font-bold">
                          {formatPrice(prop.price)}
                        </p>
                        <p className="text-[10px] text-brand-muted font-black uppercase tracking-widest">
                          {prop.listing_type === "For Rent" ? "Per Month" : "Asking Price"}
                        </p>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-brand-dark">
                          <BedDouble size={18} className="text-brand-emerald opacity-60" />
                          <span className="text-sm font-bold">{prop.beds}</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-dark">
                          <Bath size={18} className="text-brand-emerald opacity-60" />
                          <span className="text-sm font-bold">{prop.baths}</span>
                        </div>
                        <div className="flex items-center gap-2 text-brand-dark">
                          <Maximize2 size={18} className="text-brand-emerald opacity-60" />
                          <span className="text-sm font-bold">{prop.sqft}</span>
                        </div>
                      </div>
                      
                      <Link href={`/properties/${prop.id}`} className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-all">
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden">
          <Link
            href="/properties"
            className="w-full flex items-center justify-center gap-3 py-4 bg-white border border-gray-100 rounded-2xl text-[13px] font-bold uppercase tracking-widest text-brand-dark"
          >
            Explore All Inventory
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
