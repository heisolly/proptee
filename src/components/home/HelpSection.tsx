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
    <section id="help" className="py-16 md:py-24 bg-white">
      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
              <Image
                src="/architectural_masterpiece_lagos_day_1773269982392.png"
                alt="Helping find homes"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-4 md:-bottom-6 md:-right-6 bg-brand-emerald text-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
              <div className="text-2xl md:text-4xl font-sans font-bold leading-none">10K+</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider mt-1 opacity-80">Happy Clients</div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-dark leading-tight mb-4 md:mb-6 tracking-tight">
              We Help People Find Their <span className="text-brand-emerald">Dream Homes</span>
            </h2>
            <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-sans">
              At Proptee, we go beyond listings. We're your trusted partner through every step of
              the property journey.
            </p>

            <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-brand-dark-muted font-sans">
                  <CheckCircle size={18} className="text-brand-emerald mt-0.5 shrink-0" />
                  <span className="text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="luxury-button"
            >
              Get In Touch
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
