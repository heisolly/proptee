"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Building2, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroCinematic() {
  const [purpose, setPurpose] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-dark/65" />

      <div className="container max-w-[1140px] mx-auto px-6 relative z-10 w-full">
        <div className="max-w-3xl mx-auto text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-8xl text-white leading-[1.15] mb-6 px-4"
            style={{ fontFamily: "var(--font-handwriting), 'Dancing Script', cursive" }}
          >
            Find Your Dream Home With Ease
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/90 text-base md:text-lg mb-10 leading-relaxed font-sans px-4"
          >
            Experience seamless property transactions with our expert team. We provide comprehensive support for buying and selling, ensuring your real estate journey is smooth and successful.
          </motion.p>

          {/* Search Bar — Resido Style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-[2rem] md:rounded-full flex flex-col md:flex-row items-stretch mx-4 md:mx-0 shadow-2xl"
          >
            {/* Purpose */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 flex items-center pl-2 md:pl-0">
              <SlidersHorizontal size={18} className="ml-6 text-gray-400 shrink-0" />
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-full px-4 py-5 md:py-6 text-brand-dark text-sm font-medium bg-transparent border-none focus:ring-0 appearance-none cursor-pointer"
              >
                <option value="">Purpose</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="sell">Sell</option>
              </select>
            </div>

            {/* Location */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 flex items-center pl-2 md:pl-0">
              <MapPin size={18} className="ml-6 text-gray-400 shrink-0" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-full px-4 py-5 md:py-6 text-brand-dark text-sm font-medium bg-transparent border-none focus:ring-0 appearance-none cursor-pointer"
              >
                <option value="">Location</option>
                <option value="lekki">Lekki</option>
                <option value="ikoyi">Ikoyi</option>
                <option value="vi">Victoria Island</option>
                <option value="banana">Banana Island</option>
                <option value="abuja">Abuja</option>
              </select>
            </div>

            {/* Type */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-100 flex items-center pl-2 md:pl-0">
              <Building2 size={18} className="ml-6 text-gray-400 shrink-0" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full h-full px-4 py-5 md:py-6 text-brand-dark text-sm font-medium bg-transparent border-none focus:ring-0 appearance-none cursor-pointer"
              >
                <option value="">Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="land">Land</option>
              </select>
            </div>

            {/* Search Button */}
            <Link
              href={`/properties?purpose=${purpose}&location=${location}&type=${type}`}
              className="bg-brand-emerald text-white flex items-center justify-center gap-3 px-10 py-5 font-bold text-sm hover:bg-brand-emerald-muted transition-all rounded-[2rem] md:rounded-l-none md:rounded-r-full m-2 md:m-0 shadow-lg md:shadow-none"
            >
              <Search size={20} />
              <span>Search</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
