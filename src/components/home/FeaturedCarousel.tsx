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
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto">

        <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-8 md:mb-12 tracking-tight">Popular Properties</h2>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-5 px-5 md:mx-0 md:px-0">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
            {displayProperties.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="card-base overflow-hidden group snap-start min-w-[280px] w-[85vw] md:w-auto md:min-w-0 flex-shrink-0 md:flex-shrink-initial"
              >
                {/* Image */}
                <Link href={`/properties/${prop.id}`} className="block relative aspect-[4/3] overflow-hidden min-h-0">
                  <Image
                    src={prop.images?.[0] || "/hero_background.jpg"}
                    alt={prop.title}
                    fill
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 bg-brand-emerald text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                    {prop.listing_type || "For Sale"}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-4 md:p-5">
                  <p className="text-brand-emerald text-xl md:text-2xl font-semibold font-sans mb-1">
                    {formatPrice(prop.price)}
                    <span className="text-brand-muted text-sm font-normal"> {prop.listing_type === "For Rent" ? "/mo" : ""}</span>
                  </p>
                  <Link href={`/properties/${prop.id}`}>
                    <h3 className="text-brand-dark text-lg font-sans font-semibold mb-1 hover:text-brand-emerald transition-colors line-clamp-1">
                      {prop.title}
                    </h3>
                  </Link>
                  <p className="text-brand-muted text-sm font-sans mb-4 line-clamp-1">{prop.address}</p>

                  {/* Specs */}
                  <div className="border-t border-[#e2e8f0] pt-3 flex items-center gap-4 md:gap-6">
                    <div className="flex items-center gap-1.5 text-brand-dark-muted">
                      <BedDouble size={16} className="text-brand-emerald" />
                      <span className="text-sm font-medium">{prop.beds}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-dark-muted">
                      <Bath size={16} className="text-brand-emerald" />
                      <span className="text-sm font-medium">{prop.baths}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-brand-dark-muted">
                      <Maximize2 size={16} className="text-brand-emerald" />
                      <span className="text-sm font-medium">{prop.sqft} m²</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All */}
        <div className="text-center mt-10 md:mt-16">
          <Link
            href="/properties"
            className="luxury-button"
          >
            View All Properties
          </Link>
        </div>

      </div>
    </section>
  );
}
