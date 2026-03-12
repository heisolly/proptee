"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BedDouble, Bath, Maximize2 } from "lucide-react";
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
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Only run on desktop
    let ctx = gsap.context(() => {
      const scrollWidth = triggerRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;
      const amountToScroll = scrollWidth - windowWidth;

      if (amountToScroll > 0) {
        gsap.to(triggerRef.current, {
          x: -amountToScroll,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${amountToScroll}`,
            pin: true,
            scrub: 1,
            // markers: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [displayProperties]);

  return (
    <section ref={sectionRef} className="bg-[#f9f9f9] overflow-hidden">
      <div className="min-h-screen flex flex-col justify-center py-20 lg:py-0">
        <div className="container max-w-[1440px] mx-auto px-6 mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-brand-dark uppercase tracking-tight" 
            style={{ fontFamily: "var(--font-bold)" }}
          >
            Popular Properties
          </motion.h2>
        </div>

        {/* Horizontal Slider */}
        <div className="relative overflow-x-auto md:overflow-visible pb-10 scrollbar-hide snap-x md:snap-none">
          <div 
            ref={triggerRef}
            className="flex gap-6 md:gap-10 px-6 md:px-24"
          >
            {displayProperties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-[450px] snap-center bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100"
              >
                {/* Image */}
                <Link href={`/properties/${prop.id}`} className="block relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={prop.images?.[0] || "/hero_background.jpg"}
                    alt={prop.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)"
                  />
                  <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-6 left-6 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    {prop.listing_type || "For Sale"}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <p className="text-brand-emerald text-2xl font-bold" style={{ fontFamily: "var(--font-bold)" }}>
                      {formatPrice(prop.price)}
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-1 h-1 rounded-full bg-brand-emerald/30" />
                      ))}
                    </div>
                  </div>

                  <Link href={`/properties/${prop.id}`}>
                    <h3 className="text-brand-dark text-xl font-bold mb-2 hover:text-brand-emerald transition-colors line-clamp-1" style={{ fontFamily: "var(--font-bold)" }}>
                      {prop.title}
                    </h3>
                  </Link>
                  <div className="text-brand-dark/50 text-xs font-sans mb-8 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-emerald" />
                    {prop.address}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-50">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-brand-dark/30 font-bold">Beds</span>
                      <div className="flex items-center gap-2">
                        <BedDouble size={16} className="text-brand-emerald" />
                        <span className="text-sm font-bold text-brand-dark">{prop.beds}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 border-x border-gray-50 px-4">
                      <span className="text-[10px] uppercase tracking-widest text-brand-dark/30 font-bold">Baths</span>
                      <div className="flex items-center gap-2">
                        <Bath size={16} className="text-brand-emerald" />
                        <span className="text-sm font-bold text-brand-dark">{prop.baths}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[10px] uppercase tracking-widest text-brand-dark/30 font-bold">Area</span>
                      <div className="flex items-center gap-2">
                        <Maximize2 size={16} className="text-brand-emerald" />
                        <span className="text-sm font-bold text-brand-dark">{prop.sqft}m²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Card */}
            <div className="min-w-[85vw] md:min-w-[400px] flex items-center justify-center pr-12 md:pr-24">
               <Link 
                 href="/properties"
                 className="group flex flex-col items-center gap-6"
               >
                 <div className="w-24 h-24 rounded-full border border-brand-dark/5 group-hover:bg-brand-emerald group-hover:border-brand-emerald text-brand-dark group-hover:text-white flex items-center justify-center transition-all duration-500 shadow-xl">
                    <Maximize2 size={32} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-dark/40 group-hover:text-brand-emerald transition-all">Explore All Listings</span>
               </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
