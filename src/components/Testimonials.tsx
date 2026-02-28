"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Adebayo Johnson",
    role: "Homeowner in Lekki",
    text: "Proptee.ng helped me find my dream home in Lagos within a week. The verification process gave me so much peace of mind. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Chinelo Okeke",
    role: "Real Estate Investor",
    text: "The investment advice from the team was top-notch. I've seen a 20% increase in my property value in just 6 months. A truly professional experience.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Musa Ibrahim",
    role: "International Client",
    text: "Managing property from abroad is difficult, but Proptee.ng made it seamless. They handled everything from search to closing with absolute transparency.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 4,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#1a1a1a] relative overflow-hidden">
      {/* Decorative luxury accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F3D2E]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F3D2E]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-[120px]"></div>
      
      <div className="container mx-auto px-4 lg:pl-24 relative z-10">
        <div className="max-w-3xl mb-20 lg:mb-32">
          <span className="text-[#0F3D2E] font-black tracking-[0.4em] uppercase text-xs mb-6 block text-left">Success Stories</span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] text-left">
              CLIENTS & <br/>
              <span className="text-[#0F3D2E]">CONVICTION</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative px-4 lg:px-20">
          {/* Controls */}
          <div className="absolute -left-12 lg:-left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
            <button 
                onClick={prev}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1F7A5C] hover:border-transparent transition-all duration-500 shadow-2xl backdrop-blur-xl"
            >
                <ChevronLeft size={24} />
            </button>
            <button 
                onClick={next}
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#1F7A5C] hover:border-transparent transition-all duration-500 shadow-2xl backdrop-blur-xl"
            >
                <ChevronRight size={24} />
            </button>
          </div>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-[1000ms] cubic-bezier(0.4, 0, 0.2, 1)" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full px-4">
                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <Quote className="absolute top-12 right-12 text-[#0F3D2E]/20 group-hover:text-[#0F3D2E]/40 transition-colors duration-700" size={120} />
                    
                    <div className="flex gap-1 mb-10">
                        {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={18} 
                            className={i < testimonial.rating ? "text-[#1F7A5C] fill-[#1F7A5C]" : "text-gray-600"} 
                        />
                        ))}
                    </div>
                    
                    <p className="text-2xl md:text-4xl text-white font-medium italic leading-[1.3] mb-12 tracking-tight">
                      &quot;{testimonial.text}&quot;
                    </p>
                    
                    <div className="flex items-center gap-6">
                       <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                       </div>
                       <div>
                          <h4 className="text-xl font-black text-white tracking-tight uppercase">{testimonial.name}</h4>
                          <p className="text-[#0F3D2E] font-black text-[10px] uppercase tracking-[0.2em]">{testimonial.role}</p>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-4 mt-16">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${activeIndex === i ? "w-16 bg-[#1F7A5C]" : "w-4 bg-white/10 hover:bg-white/20"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
