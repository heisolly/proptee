"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const points = [
  "We list over 10,000 verified properties across Lagos, Abuja, and major Nigerian cities.",
  "Our licensed agents guide you through every step — from search to signed agreement.",
  "Transparent pricing, no hidden fees, and escrow-secured transactions for your safety.",
  "Dedicated 24/7 concierge support to answer every question along your journey.",
  "Smart search tools powered by AI to match you with your perfect property faster.",
];

export default function HelpSection() {
  return (
    <section id="help" className="py-24 bg-white">
      <div className="container max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/architectural_masterpiece_lagos_day_1773269982392.png"
                alt="Helping find homes"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-brand-emerald text-white p-6 rounded-2xl shadow-xl">
              <div className="text-4xl font-serif font-bold leading-none">10K+</div>
              <div className="text-xs font-black uppercase tracking-widest mt-1 opacity-80">Happy Clients</div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark leading-tight mb-6">
              We Help People Find Their <span className="text-brand-emerald">Dream Homes</span>
            </h2>
            <p className="text-brand-dark/60 text-lg leading-relaxed mb-8 font-sans">
              At Proptee, we go beyond listings. We're your trusted partner through every step of
              the property journey — from that first search to the final handshake.
            </p>

            <ul className="space-y-4 mb-10">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-brand-dark/70 font-sans">
                  <CheckCircle size={20} className="text-brand-emerald mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="bg-brand-emerald text-white px-10 py-4 rounded-lg font-bold hover:bg-brand-emerald-muted transition-all inline-block shadow-lg shadow-brand-emerald/10"
            >
              Get In Touch
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
