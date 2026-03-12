"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      className="relative py-32"
      style={{ background: "url('/hero_background.jpg') center center / cover no-repeat" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-dark/70" />

      <div className="container max-w-[1140px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight uppercase tracking-tighter" style={{ fontFamily: "var(--font-bold)" }}>
              Let's Simply Begin the Search.
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-lg mb-8 font-sans leading-relaxed">
              Whether you're buying, renting, or investing — Proptee puts Nigeria's finest properties at your fingertips. Start your journey today with zero commitment.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand-emerald text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-emerald-muted transition-all shadow-xl group"
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
