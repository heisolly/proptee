import React from "react";
import Image from "next/image";
import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <section className="py-32 overflow-hidden bg-white">
      <div className="container mx-auto px-4 lg:pl-24">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* Left: Image Side */}
          <div className="flex-1 relative">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] group">
              <Image
                src="https://proptee.ng/wp-content/uploads/2023/07/connecting-with-customers.jpg"
                alt="Connecting with customers"
                width={800}
                height={900}
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                style={{ height: "auto" }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F3D2E]/20 to-transparent pointer-events-none"></div>
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-12 -right-12 bg-[#0F3D2E] text-white p-12 rounded-[2rem] shadow-2xl z-20 hidden md:block max-w-[220px] text-center border-[12px] border-white">
              <div className="text-5xl font-black mb-2 tracking-tighter">10+</div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-90 leading-tight">Years of Architectural Mastery</div>
            </div>
            {/* Decorative background accent */}
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-[#0F3D2E]/5 rounded-full -z-10 blur-[100px]"></div>
          </div>

          {/* Right: Content Side */}
          <div className="flex-1">
            <span className="text-[#0F3D2E] font-black tracking-[0.4em] uppercase text-xs mb-8 block">Legacy of Excellence</span>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-10 tracking-tighter leading-[0.9]">
                CRAFTING <br/>
                <span className="text-[#0F3D2E]">FUTURE WEALTH</span>
            </h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed font-medium">
              At Proptee.ng, we don&apos;t just list properties; we engineer high-performance real estate portfolios. Our mission is to democratize institutional-grade wealth through precision, transparency, and verified excellence.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
              {[
                { icon: <Award size={24} />, title: "VERIFIED", desc: "Institutional Security" },
                { icon: <TrendingUp size={24} />, title: "GROWTH", desc: "Optimized Equity" },
                { icon: <Users size={24} />, title: "ADVISORY", desc: "Expert Leadership" },
                { icon: <CheckCircle2 size={24} />, title: "EXPOSURE", desc: "Strategic Network" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center text-[#1F7A5C] group-hover:bg-[#1F7A5C] group-hover:text-white transition-all duration-500 shadow-xl shadow-gray-100 group-hover:shadow-[#1F7A5C]/20">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-xs tracking-widest text-black mb-1 uppercase">{item.title}</h4>
                    <p className="text-sm text-gray-400 font-bold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="px-12 py-5 bg-[#0F3D2E] text-white font-black text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl shadow-[#0F3D2E]/30 hover:bg-black transition-all duration-500 active:scale-95">
              Explore Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
