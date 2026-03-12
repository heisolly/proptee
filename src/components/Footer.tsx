"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Youtube, Facebook, MapPin, Phone, Mail } from "lucide-react";

const links = {
  Properties: ["Houses", "Apartments", "Villas", "Penthouses"],
  Company: ["How We Work", "Pricing", "About Us", "Security"],
  Resources: ["Blog", "Agents", "FAQ", "Investment Guide"],
  Help: ["Privacy Policy", "Terms of Use", "Contact", "Support"],
};

export default function Footer() {
  return (
    <footer className="bg-brand-dark">
      {/* Main Footer */}
      <div className="container max-w-[1140px] mx-auto px-6 py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-12 gap-x-8">

          {/* Logo + About + Contact */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <div className="relative w-36 h-10">
                <Image src="/logo.png" alt="Proptee" fill className="object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-white/40 text-xs md:text-sm font-sans leading-relaxed max-w-sm mb-8">
              Nigeria's most trusted premium real estate platform. Connecting verified buyers, sellers, and agents since 2010.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-white/40 text-[13px] font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="shrink-0 w-4 h-4 mt-0.5 text-brand-emerald" />
                <span>31, Atofarati Qtrs, Abatiti, Adegbayi, Ibadan.</span>
              </div>
              <div className="space-y-2">
                <p className="flex items-center gap-3">
                  <Phone className="shrink-0 w-4 h-4 text-brand-emerald" />
                  <span>+234 707 381 7578</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="shrink-0 w-4 h-4 text-brand-emerald" />
                  <span>info@proptee.ng</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a href="http://www.instagram.com/propteeng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <Instagram size={14} />
              </a>
              <a href="http://www.pinterest.com/propteeng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345l-.288 1.178c-.046.19-.152.232-.35.139-1.312-.612-2.131-2.536-2.131-4.08 0-3.324 2.415-6.381 6.973-6.381 3.65 0 6.49 2.601 6.49 6.071 0 3.629-2.285 6.549-5.457 6.549-1.066 0-2.068-.554-2.411-1.209l-.657 2.503c-.237.91-.878 2.046-1.312 2.743 1.025.312 2.108.48 3.235.48 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
              </a>
              <a href="http://www.youtube.com/@PROPTEEng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <Youtube size={14} />
              </a>
              <a href="http://www.x.com/propteeng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <svg width="13" height="13" viewBox="0 0 1200 1227" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
              </a>
              <a href="http://www.tiktok.com/@propteeng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.4c-.01 2.98-1.73 5.47-4.65 6.68-2.88 1.18-6.08.46-8.26-1.77C1.52 18.16.82 15.02 1.7 11.98c.87-3.03 3.6-5.18 6.68-5.32v4.07c-1.17.07-2.31.78-2.88 1.83-.58 1.05-.51 2.37.15 3.37.66 1 1.83 1.59 3.03 1.56 1.48-.03 2.74-1.2 2.82-2.65V.02z"/></svg>
              </a>
              <a href="http://www.facebook.com/PROPTEEng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <Facebook size={14} />
              </a>
              <a href="http://www.linkedin.com/company/PROPTEEng" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all">
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="col-span-1">
              <h4 className="text-white font-bold uppercase tracking-wider text-[10px] mb-5 opacity-80">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/30 hover:text-white text-[13px] font-sans transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container max-w-[1140px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30 font-sans">
          <p>© {new Date().getFullYear()} Proptee Ng Limited. All Rights Reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
