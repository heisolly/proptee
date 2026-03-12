"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-20 md:py-32"
      style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60" />

      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight tracking-tight">
              Let's Simply Begin the Search.
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-white/70 text-base md:text-lg mb-6 md:mb-8 font-sans leading-relaxed">
              Whether you're buying, renting, or investing — Proptee puts Nigeria's finest properties at your fingertips.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 luxury-button min-h-[52px] text-sm"
            >
              Get Started
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
