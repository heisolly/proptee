"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Proptee made finding our family home in Lekki an absolute breeze. Their team was responsive, professional, and went above and beyond to understand exactly what we were looking for.",
    name: "Adaeze Obi",
    role: "Home Buyer, Lagos",
  },
  {
    quote: "I listed my Ikoyi property on Proptee and within two weeks had serious offers from verified buyers. The platform's credibility is unmatched in Nigeria's real estate space.",
    name: "Emeka Nwosu",
    role: "Property Seller, Lagos",
  },
  {
    quote: "As an investor, I needed a reliable partner to help me identify high-yield assets in Abuja. Proptee's data insights and agent network exceeded every expectation I had.",
    name: "Tunde Fashola",
    role: "Real Estate Investor, Abuja",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-16 md:py-24 bg-brand-bg">
      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto">
        <div className="max-w-3xl mx-auto text-center">

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-center mb-4 md:mb-6">
                <Quote size={48} className="text-brand-emerald opacity-15 md:w-20 md:h-20" strokeWidth={1} />
              </div>

              <p className="text-brand-dark/70 text-lg md:text-xl leading-relaxed font-sans italic mb-8 md:mb-10 px-2">
                "{testimonials[current].quote}"
              </p>

              <div>
                <p className="font-semibold text-brand-dark font-sans">{testimonials[current].name}</p>
                <p className="text-brand-emerald text-sm font-medium">{testimonials[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls — thumb-friendly 48px targets */}
          <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] hover:border-brand-emerald hover:bg-brand-emerald hover:text-white text-brand-dark flex items-center justify-center transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all rounded-full min-w-[12px] min-h-[12px] ${i === current ? "w-8 h-3 bg-brand-emerald" : "w-3 h-3 bg-gray-200"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] hover:border-brand-emerald hover:bg-brand-emerald hover:text-white text-brand-dark flex items-center justify-center transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
