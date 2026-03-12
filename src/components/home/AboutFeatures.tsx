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
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center group"
            >
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-brand-emerald/5 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-white transition-all duration-500">
                  <item.icon size={36} className="text-brand-emerald group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-2xl font-serif text-brand-dark mb-4">{item.title}</h3>
              <p className="text-brand-dark/50 leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
