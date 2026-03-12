"use client";

import React from "react";
import { ArrowRight, BadgeCheck, FileText, ShieldCheck, Timer } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Affordable Property Taxes",
      description: "We help you find a new home by offering a smart real estate experience",
      icon: <FileText size={40} className="stroke-[1.5]" />,
      highlight: true,
    },
    {
      title: "Guaranteed Quality Homes",
      description: "We help you find a new home by offering a smart real estate experience",
      icon: <BadgeCheck size={40} className="stroke-[1.5]" />,
      highlight: false,
    },
    {
      title: "Fast and Easy Process",
      description: "We help you find a new home by offering a smart real estate experience",
      icon: <Timer size={40} className="stroke-[1.5]" />,
      highlight: false,
    },
    {
      title: "Property Insurance",
      description: "We help you find a new home by offering a smart real estate experience",
      icon: <ShieldCheck size={40} className="stroke-[1.5]" />,
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-6 lg:px-12 container mx-auto max-w-7xl">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold font-sans text-gray-900 mb-6">Our Services</h2>
        <p className="text-gray-500 font-medium">
          Enhance your property listings and videos with accurate and engaging subtitles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`p-10 rounded-[32px] flex flex-col md:flex-row items-start gap-6 transition-all hover:-translate-y-1 ${
              service.highlight ? "bg-[#2F348B] text-white shadow-xl shadow-blue-900/10" : "bg-[#F3F4FB] text-gray-900"
            }`}
          >
            <div className={`p-3 rounded-xl flex items-center justify-center shrink-0 ${service.highlight ? "text-white" : "text-[#2F348B]"}`}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className={`font-medium leading-relaxed ${service.highlight ? "text-white/80" : "text-gray-500"}`}>
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-end">
        <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-[#2F348B] hover:bg-[#20246D] text-white font-medium transition-colors shadow-lg">
          Explore <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
