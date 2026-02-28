"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin,
  ArrowUp,
  Mail,
  Phone,
  ArrowRight,
  MapPin
} from "lucide-react";

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.294 19.497h2.039L6.486 3.24H4.298l13.309 17.41z" />
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navGroups = [
    {
      title: "Discover",
      links: [
        { name: "Luxury Properties", href: "/properties?type=luxury" },
        { name: "Urban Living", href: "/properties?type=urban" },
        { name: "New Developments", href: "/properties?status=new" },
        { name: "Elite Agents", href: "/agents" },
        { name: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Accessibility", href: "/accessibility" },
        { name: "Career", href: "/career" }
      ]
    }
  ];

  return (
    <footer className="bg-[#000000] text-white pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Subtle Brand Pattern */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0F3D2E] opacity-[0.05] pointer-events-none skew-x-[-20deg] origin-top translate-x-12"></div>

      <div className="container mx-auto px-6 lg:px-12 xl:px-24 relative z-10">
        
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-32 items-start mb-24">
          
          {/* Brand & Mission Column */}
          <div className="lg:w-2/5 space-y-10">
            <Link href="/" className="inline-block relative w-48 h-12 mb-4">
              <Image
                src="/logo.png"
                alt="Proptee Logo"
                fill
                className="object-contain brightness-0 invert opacity-90"
                priority
              />
            </Link>
            
            <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-white/90">
              Elegance in <span className="text-[#1F7A5C] font-medium italic">every square foot.</span>
            </h2>

            <div className="flex flex-col gap-6 pt-4">
              <div className="flex items-center gap-4 text-white/60">
                <MapPin size={20} className="text-[#1F7A5C]" />
                <span className="text-base font-medium">Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Mail size={20} className="text-[#1F7A5C]" />
                <span className="text-base font-medium italic">concierge@proptee.ng</span>
              </div>
              <div className="flex items-center gap-4 text-white/60">
                <Phone size={20} className="text-[#1F7A5C]" />
                <span className="text-base font-medium">+234 (0) 800 PROPTEE</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social Side */}
          <div className="lg:w-3/5 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Navigation Links */}
              <div className="grid grid-cols-2 gap-12">
                {navGroups.map((group) => (
                  <div key={group.title} className="space-y-8">
                    <h5 className="text-[12px] uppercase tracking-[0.4em] font-black text-[#1F7A5C]">{group.title}</h5>
                    <ul className="space-y-4">
                      {group.links.map((link) => (
                        <li key={link.name}>
                          <Link 
                            href={link.href} 
                            className="text-[14px] text-white/40 hover:text-white transition-all flex items-center group font-bold tracking-tight"
                          >
                            <ChevronRight size={12} className="text-[#1F7A5C] opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all mr-2" />
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Newsletter Block */}
              <div className="bg-[#0F3D2E]/10 p-10 rounded-[2.5rem] border border-white/5 space-y-6 backdrop-blur-sm">
                <h4 className="text-xl font-bold tracking-tighter text-white">Stay Inspired</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">
                  Join our curated mailing list for exclusive luxury listings and market insights.
                </p>
                <div className="space-y-4">
                  <input 
                    type="email" 
                    placeholder="Luxury Insight Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-[#1F7A5C] transition-all placeholder:text-white/20 font-medium"
                  />
                  <button className="w-full bg-[#0F3D2E] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-[#1F7A5C] hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-[#0F3D2E]/40 transition-all duration-500">
                    Register Access
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Brand Bar / Socials */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex gap-4">
            {[
              { icon: <Facebook size={18} />, url: "#" },
              { icon: <XIcon size={16} />, url: "#" },
              { icon: <Instagram size={18} />, url: "#" },
              { icon: <Linkedin size={18} />, url: "#" },
              { icon: <Youtube size={18} />, url: "#" },
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.url} 
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-[#1F7A5C] hover:bg-[#1F7A5C]/10 transition-all duration-500"
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.6em] mb-2">&copy; {new Date().getFullYear()} PROPTEE NIGERIA</p>
            <p className="text-white/10 text-[9px] font-bold tracking-[0.2em]">PRIVATE INVESTMENT & ARCHITECTURAL CURATION</p>
          </div>

          <Link href="/contact" className="hidden lg:flex items-center gap-2 text-[#1F7A5C] font-black text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all group">
            Work with us <ArrowRight size={16} className="transition-transform duration-500" />
          </Link>
        </div>
      </div>

      {/* Luxury Scroll Top */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-12 right-12 z-[50] group hidden md:block"
      >
        <div className="w-12 h-24 border border-white/10 rounded-full flex flex-col items-center justify-start p-2 bg-black/40 backdrop-blur-xl group-hover:border-[#1F7A5C] transition-all duration-700 shadow-2xl">
          <div className="w-1 bg-[#1F7A5C] h-6 rounded-full animate-bounce mt-2 shadow-[0_0_15px_#1F7A5C]"></div>
          <span className="text-[9px] uppercase font-black tracking-widest text-white/20 mt-auto mb-2 group-hover:text-white transition-colors duration-500">TOP</span>
        </div>
      </button>
    </footer>
  );
};

// Simple Chevron for the menu
const ChevronRight = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default Footer;

