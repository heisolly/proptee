"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Globe, User, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FullNav from "./Sidebar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const close = () => setDropdownOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [dropdownOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const navLinks = [
    { label: "Properties", href: "/properties" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Blog", href: "/blog" },
  ];

  const getDisplayName = () => {
    if (!user) return "";
    return user.user_metadata?.display_username || user.user_metadata?.full_name || "Member";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 w-full hidden md:block ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl py-3 border-b border-gray-100 shadow-[0_1px_12px_rgba(0,0,0,0.04)]"
            : "bg-transparent py-5"
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between">

          {/* ── Left: Logo + Nav ── */}
          <div className="flex items-center gap-8 lg:gap-12">
            <Link href="/" className="shrink-0">
              <div className={`relative transition-all duration-500 ${scrolled ? "w-28 h-7 lg:w-32 lg:h-8" : "w-32 h-8 lg:w-36 lg:h-9"}`}>
                <Image
                  src="/logo.png"
                  alt="Proptee"
                  fill
                  className={`object-contain transition-all duration-500 ${scrolled ? "" : "brightness-0 invert"}`}
                  priority
                />
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-[15px] font-medium transition-colors ${
                    scrolled
                      ? "text-gray-600 hover:text-brand-dark hover:bg-gray-50"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Right: Actions ── */}
          <div className="flex items-center gap-2 lg:gap-3">

            {/* List Property CTA */}
            <Link
              href="/list-property"
              className={`hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-[15px] font-semibold transition-all ${
                scrolled
                  ? "bg-brand-emerald text-white hover:bg-brand-emerald-muted shadow-sm"
                  : "bg-white text-brand-dark hover:bg-white/90"
              }`}
            >
              List Property
            </Link>

            {/* Globe / Language */}
            <button
              className={`hidden lg:flex w-10 h-10 items-center justify-center rounded-full transition-colors ${
                scrolled ? "text-gray-500 hover:bg-gray-100" : "text-white/70 hover:bg-white/10"
              }`}
            >
              <Globe size={18} />
            </button>

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setDropdownOpen(!dropdownOpen); }}
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-all ${
                    scrolled
                      ? "border-gray-200 bg-white hover:shadow-md text-brand-dark"
                      : "border-white/20 bg-white/10 hover:bg-white/15 text-white"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-brand-emerald flex items-center justify-center text-white text-xs font-bold">
                    {getDisplayName().charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[15px] font-medium hidden lg:block max-w-[120px] truncate">{getDisplayName()}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-[110] py-1"
                    >
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-[15px] font-semibold text-brand-dark truncate">{getDisplayName()}</p>
                        <p className="text-sm text-gray-400 truncate mt-0.5">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard/agent"
                        className="flex items-center gap-3 px-4 py-3 text-[15px] text-gray-600 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-gray-400" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[15px] text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link
                  href="/login"
                  className={`px-4 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                    scrolled ? "text-gray-600 hover:text-brand-dark hover:bg-gray-50" : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className={`px-5 py-2.5 rounded-full text-[15px] font-semibold border transition-all ${
                    scrolled
                      ? "border-gray-200 text-brand-dark hover:bg-brand-dark hover:text-white hover:border-brand-dark"
                      : "border-white/30 text-white hover:bg-white hover:text-brand-dark"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Menu Toggle */}
            <button
              onClick={() => setIsNavOpen(true)}
              className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ml-1 ${
                scrolled
                  ? "border-gray-200 text-brand-dark hover:bg-gray-50 hover:border-gray-300"
                  : "border-white/20 text-white hover:bg-white/10"
              }`}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Menu Button — appears when header hides on scroll (desktop only) */}
      <AnimatePresence>
        {isHidden && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={() => setIsNavOpen(true)}
            className="fixed top-5 right-6 lg:right-10 z-[105] hidden md:flex w-12 h-12 items-center justify-center bg-white rounded-full shadow-lg shadow-black/8 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all"
          >
            <Menu size={18} className="text-brand-dark" />
          </motion.button>
        )}
      </AnimatePresence>

      <FullNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
}
