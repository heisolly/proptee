"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, Loader2 } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <section className="py-32 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:pl-24">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Left Column: Info */}
          <div className="flex-1">
            <span className="text-[#0F3D2E] font-black tracking-[0.4em] uppercase text-xs mb-8 block">Connect With Us</span>
            <h2 className="text-5xl md:text-7xl font-black text-black mb-10 tracking-tighter leading-[0.9]">
                START YOUR <br/>
                <span className="text-[#0F3D2E]">JOURNEY</span>
            </h2>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed font-medium max-w-lg">
                Our advisors are prepared to assist you with bespoke property acquisitions and strategic market entries.
            </p>

            <div className="space-y-10">
              {[
                { icon: <Phone size={24} />, label: "DIRECT ENQUIRIES", value: "07073817578" },
                { icon: <Mail size={24} />, label: "SPECIALIST SUPPORT", value: "info@proptee.ng" },
                { icon: <MapPin size={24} />, label: "HEADQUARTERS", value: "Lagos, Nigeria" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-8 group">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center text-black group-hover:bg-[#0F3D2E] group-hover:text-white transition-all duration-500 border border-gray-100">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-[#0F3D2E] font-black uppercase tracking-[0.2em] mb-1">{item.label}</div>
                    <div className="text-black text-xl font-black tracking-tight">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 p-10 rounded-[2rem] bg-black text-white border border-black shadow-2xl">
               <h4 className="font-black text-xs tracking-widest uppercase mb-4 text-[#1F7A5C]">24/7 CONCIERGE</h4>
               <p className="text-gray-300 font-medium leading-relaxed">Connect with our digital desk for instant portfolio briefings via encrypted channels.</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="flex-1">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-gray-100">
              <h3 className="text-3xl font-black text-black mb-10 tracking-tighter">SECURE BRIEFING</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">FULL NAME</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:bg-white transition-all font-bold text-black"
                      placeholder="e.g. Tunde Johnson"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:bg-white transition-all font-bold text-black"
                      placeholder="name@email.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">PORTFOLIO INTEREST</label>
                  <select className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:bg-white transition-all font-bold text-black appearance-none">
                    <option>INSTITUTIONAL INVESTMENTS</option>
                    <option>ESTATE ACQUISITIONS</option>
                    <option>VERIFIED RENTALS</option>
                    <option>LISTING SERVICES</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">EXECUTIVE BRIEF</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-6 py-5 bg-gray-50/50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0F3D2E]/20 focus:bg-white transition-all font-bold text-black"
                    placeholder="Describe your requirements..."
                  ></textarea>
                </div>

                <button 
                  disabled={loading}
                  className="w-full py-6 bg-[#0F3D2E] text-white rounded-2xl text-xs font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 relative overflow-hidden group shadow-2xl shadow-[#0F3D2E]/30 active:scale-95 transition-all outline-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      PROCESSING
                    </>
                  ) : (
                    <>
                      <span>SUBMIT BRIEF</span>
                      <Send size={18} className="translate-y-px group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
