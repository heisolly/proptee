"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, LayoutDashboard, Heart, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import AuthModal from "./auth/AuthModal";

// Header height constant — keep in sync with the pt-[72px] on <main> in page.tsx
const HEADER_H = 72;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sideNavOpen, setSideNavOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  /* ── Lock body scroll when side-nav open ── */
  useEffect(() => {
    document.body.style.overflow = sideNavOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sideNavOpen]);

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Auth ── */
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setUser(s?.user ?? null);
      if (s?.user) fetchProfile(s.user.id); else setProfile(null);
    });
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    })();
    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (id: string) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
    if (data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSideNavOpen(false);
  };

  const navItems = [
    { name: "Home",        href: "/" },
    { name: "Collections", href: "/#properties" },
    { name: "About",       href: "/about" },
    { name: "Insights",    href: "/blog" },
    { name: "Concierge",   href: "/contact" },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════
          FIXED HEADER  (always at top of screen)
          ═══════════════════════════════════════ */}
      <header
        style={{ height: HEADER_H }}
        className={`fixed top-0 inset-x-0 z-[80] transition-all duration-500
          ${scrolled
            ? "bg-[#0A0A0A]/98 backdrop-blur-xl border-b border-white/6 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
            : "bg-[#0A0A0A]"
          }`}
      >
        <div className="h-full container mx-auto px-6 lg:px-12 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="shrink-0 group">
            <div className="relative w-28 md:w-36 h-9 group-hover:scale-105 transition-transform duration-500">
              <Image
                src="/logo.png"
                alt="Proptee"
                fill
                className="object-contain brightness-[100] drop-shadow"
                priority
              />
            </div>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-4 md:gap-6">

            {/* Private Portal — desktop only, shown when not logged in */}
            {!user && (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden md:flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.3em] px-7 py-3 rounded-full border border-white/15 text-white/80 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
              >
                <User size={13} />
                <span>Private Portal</span>
              </button>
            )}

            {/* Hamburger / Menu button */}
            <button
              onClick={() => setSideNavOpen(true)}
              aria-label="Open navigation"
              className="flex items-center gap-3 text-white hover:text-[#D4AF37] transition-colors group"
            >
              <span className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.35em] text-white/60 group-hover:text-[#D4AF37] transition-colors">Menu</span>
              <div className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/8 transition-all duration-300">
                <Menu size={18} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Auth modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* ═══════════════════════════════════════
          SIDE NAV OVERLAY
          ═══════════════════════════════════════ */}
      <div
        aria-hidden
        onClick={() => setSideNavOpen(false)}
        className={`fixed inset-0 bg-black/65 backdrop-blur-sm z-[90] transition-all duration-500
          ${sideNavOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/* ═══════════════════════════════════════
          SIDE NAV DRAWER (slides from right)
          ═══════════════════════════════════════ */}
      <aside
        aria-label="Site navigation"
        className={`fixed top-0 right-0 h-dvh w-full md:w-[440px] bg-[#080808] border-l border-white/6 z-[100]
          flex flex-col shadow-[-30px_0_80px_rgba(0,0,0,0.7)]
          transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${sideNavOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/6 shrink-0">
          <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-white/30">Navigation</span>
          <button
            onClick={() => setSideNavOpen(false)}
            aria-label="Close navigation"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:rotate-90 transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-1">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={() => setSideNavOpen(false)}
              className="group flex items-center justify-between py-5 border-b border-white/5 hover:border-[#D4AF37]/20 transition-colors duration-300"
            >
              <span className="text-4xl md:text-5xl font-serif font-light italic text-white/65 group-hover:text-[#D4AF37] transition-colors duration-300 leading-none">
                {item.name}
              </span>
              <ArrowRight
                size={20}
                className="text-white/20 -translate-x-3 group-hover:text-[#D4AF37] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              />
            </Link>
          ))}
        </nav>

        {/* Drawer footer — auth */}
        <div className="px-8 py-8 border-t border-white/6 bg-white/2 shrink-0">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-11 h-11 rounded-full bg-[#D4AF37] flex items-center justify-center text-base font-black text-black shrink-0">
                  {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{profile?.full_name || "Valued Resident"}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-0.5">{profile?.role || "Member"}</p>
                </div>
              </div>
              {profile?.role === "agent" && (
                <Link href="/dashboard/agent" onClick={() => setSideNavOpen(false)}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/8 text-white/70 hover:text-[#D4AF37] transition-all group">
                  <LayoutDashboard size={16} className="group-hover:text-[#D4AF37]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Dashboard</span>
                </Link>
              )}
              <Link href="/saved" onClick={() => setSideNavOpen(false)}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/8 text-white/70 hover:text-[#D4AF37] transition-all group">
                <Heart size={16} className="group-hover:text-[#D4AF37]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Saved Collections</span>
              </Link>
              <button onClick={handleLogout}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-red-500/8 hover:bg-red-500/15 text-red-400/80 hover:text-red-400 border border-red-500/15 transition-all">
                <LogOut size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">End Session</span>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[9px] text-white/30 uppercase tracking-[0.45em] mb-4 font-bold">Member Access</p>
              <button
                onClick={() => { setSideNavOpen(false); setAuthModalOpen(true); }}
                className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#D4AF37] hover:bg-[#c09b2c] text-black text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 active:scale-95"
              >
                <User size={15} />
                <span>Sign In / Register</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
