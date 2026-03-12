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
  const [year, setYear] = React.useState<number | null>(null);
  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-brand-dark">
      {/* Main Footer */}
      <div className="container max-w-[1140px] mx-auto px-6 py-8 md:py-20">
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-y-6 lg:gap-12">

          {/* Logo + Socials + Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <Link href="/">
                <div className="relative w-32 h-8">
                  <Image src="/logo.png" alt="Proptee" fill className="object-contain brightness-0 invert" />
                </div>
              </Link>
              {/* Socials - Moved next to logo on larger screens, compact on mobile */}
              <div className="flex flex-wrap items-center gap-2">
                {[Instagram, Youtube, Facebook, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-brand-emerald transition-all">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/30 text-[12px] font-sans">
              <div className="flex items-center gap-2">
                <MapPin className="shrink-0 w-3.5 h-3.5 text-brand-emerald" />
                <span>31, Atofarati Qtrs, Ibadan.</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="shrink-0 w-3.5 h-3.5 text-brand-emerald" />
                  <span>+234 707 381 7578</span>
                </div>
                <div className="flex items-center gap-2 lg:hidden xl:flex">
                  <Mail className="shrink-0 w-3.5 h-3.5 text-brand-emerald" />
                  <span>info@proptee.ng</span>
                </div>
              </div>
            </div>
          </div>

          {/* Link Columns - More compact grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 lg:col-span-3 gap-8">
            {Object.entries(links).map(([title, items]) => (
              <div key={title} className="space-y-4">
                <h4 className="text-white font-bold uppercase tracking-widest text-[10px] opacity-60">{title}</h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item}>
                      <Link href="#" className="text-white/20 hover:text-white text-[12px] font-sans transition-colors">
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container max-w-[1140px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/20 font-sans">
          <p>© {year || 2026} Proptee Ng Limited. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
