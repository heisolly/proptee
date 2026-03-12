"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Logo + About */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-8 block">
              <div className="relative w-36 h-10">
                <Image src="/logo.png" alt="Proptee" fill className="object-contain brightness-0 invert" />
              </div>
            </Link>
            <p className="text-white/50 text-sm font-sans leading-relaxed max-w-xs mb-8">
              Nigeria's most trusted real estate platform. Connecting verified buyers, sellers, and agents since 2010.
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-brand-emerald hover:bg-brand-emerald transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">{title}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-white/40 hover:text-white text-sm font-sans transition-colors">
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
