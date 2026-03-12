"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Tag, Timer } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Easy to Find",
    desc: "Browse thousands of verified listings across Nigeria's top neighbourhoods — find exactly what you need, fast.",
  },
  {
    icon: Tag,
    title: "Affordable Prices",
    desc: "Our transparent pricing model ensures you get the best value on every property, with no hidden fees.",
  },
  {
    icon: Timer,
    title: "Quickly Process",
    desc: "From search to keys in hand — our streamlined process gets your deal done faster than anyone else.",
  },
];

export default function AboutFeatures() {
  return (
    <section className="py-14 md:py-24 bg-white border-t border-[#e2e8f0]">
      <div className="px-5 md:px-8 lg:max-w-[1140px] lg:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex md:flex-col items-center md:text-center gap-4 md:gap-0 group"
            >
              <div className="flex-shrink-0 md:mb-5">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-full bg-brand-emerald/5 flex items-center justify-center group-hover:bg-brand-emerald transition-colors duration-300">
                  <item.icon size={24} className="text-brand-emerald group-hover:text-white transition-colors md:w-9 md:h-9" strokeWidth={1.5} />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-sans font-semibold text-brand-dark mb-1 md:mb-3 tracking-tight">{item.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
