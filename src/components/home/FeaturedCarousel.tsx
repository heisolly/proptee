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

  return (
    <section className="py-24 bg-[#f9f9f9]">
      <div className="container max-w-[1140px] mx-auto px-6">

        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-12 uppercase tracking-tight" style={{ fontFamily: "var(--font-bold)" }}>Popular Properties</h2>

        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 -mx-6 px-6 md:mx-0 md:px-0">
          {displayProperties.map((prop, i) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="min-w-[85vw] md:min-w-0 snap-center bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group"
            >
              {/* Image */}
              <Link href={`/properties/${prop.id}`} className="block relative aspect-[4/3] overflow-hidden">
                <Image
                  src={prop.images?.[0] || "/hero_background.jpg"}
                  alt={prop.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-brand-emerald text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  {prop.listing_type || "For Sale"}
                </div>
              </Link>

              {/* Info */}
              <div className="p-6">
                <p className="text-brand-emerald text-2xl font-serif font-medium mb-1">
                  {formatPrice(prop.price)}
                  <span className="text-brand-dark/40 text-base font-sans font-normal"> {prop.listing_type === "For Rent" ? "/month" : ""}</span>
                </p>
                <Link href={`/properties/${prop.id}`}>
                  <h3 className="text-brand-dark text-lg font-serif mb-2 hover:text-brand-emerald transition-colors line-clamp-1">
                    {prop.title}
                  </h3>
                </Link>
                <p className="text-brand-dark/50 text-xs font-sans mb-5 line-clamp-1">{prop.address}</p>

                {/* Specs */}
                <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-dark/60">
                    <BedDouble size={16} className="text-brand-emerald" />
                    <span className="text-xs font-medium">{prop.beds} bed</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-dark/60">
                    <Bath size={16} className="text-brand-emerald" />
                    <span className="text-xs font-medium">{prop.baths} bath</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-dark/60">
                    <Maximize2 size={16} className="text-brand-emerald" />
                    <span className="text-xs font-medium">{prop.sqft} m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-16">
          <Link
            href="/properties"
            className="bg-brand-emerald text-white px-10 py-5 rounded-lg text-sm font-bold hover:bg-brand-emerald-muted transition-all inline-block shadow-lg shadow-brand-emerald/10"
          >
            View All Properties
          </Link>
        </div>

      </div>
    </section>
  );
}
