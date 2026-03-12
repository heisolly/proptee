"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, Map, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { label: "Home", href: "/", icon: Home },
  { label: "Search", href: "/properties", icon: Search },
  { label: "Saved", href: "/saved", icon: Heart },
  { label: "Map", href: "/map", icon: Map },
  { label: "Account", href: "/login", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on admin pages
  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[150] md:hidden glass-bottom-nav"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      role="navigation"
      aria-label="Primary mobile navigation"
    >
      <div className="flex items-center justify-around px-2 h-[72px]">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.label}
              href={tab.href}
              className="relative flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] px-3 py-2 rounded-2xl transition-colors"
              aria-current={isActive ? "page" : undefined}
            >
              {/* Active background indicator */}
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-brand-emerald/8 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <tab.icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.6}
                className={`relative z-10 transition-colors duration-200 ${
                  isActive ? "text-brand-emerald" : "text-gray-400"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                  isActive ? "text-brand-emerald" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
