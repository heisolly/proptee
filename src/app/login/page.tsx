"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff, ShieldCheck, User, Sparkles, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewlySignedUp = searchParams.get("new") === "true";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const internalEmail = `${username.toLowerCase()}@proptee.local`;

      const { error: authError } = await supabase.auth.signInWithPassword({
        email: internalEmail,
        password,
      });

      if (authError) throw authError;

      const redirectTo = searchParams.get("redirect") || "/dashboard";
      router.push(redirectTo);
    } catch (err: any) {
      setError(err.message || "Identification failed. Verify your access code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden">
      {/* ── Left: Immersive Narrative Layer ── */}
      <div className="hidden md:flex md:w-1/2 lg:w-[60%] relative bg-brand-dark overflow-hidden sticky top-0 h-screen">
        <Image 
          src="/proptee_entrance_narrative_1773291875530.png" 
          alt="Luxury Entrance" 
          fill 
          className="object-cover opacity-60 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark via-brand-dark/40 to-transparent" />
        
        {/* Dynamic Brand Overlay */}
        <div className="absolute inset-x-20 bottom-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="w-16 h-[2px] bg-brand-emerald mb-8" />
            <h2 className="text-5xl lg:text-7xl font-serif text-white leading-tight mb-6">
              The Portal to <br /><span className="text-brand-emerald italic">Extraordinary</span> Realities.
            </h2>
            <p className="text-white/40 font-sans text-sm max-w-md leading-relaxed tracking-wide uppercase font-black">
              Global Residency • Digital Asset Orchestration • High-Definition Living
            </p>
          </motion.div>
        </div>

        {/* Floating Brand Badge */}
        <Link href="/" className="absolute top-12 left-20 z-10 block w-40 h-10 grayscale brightness-200 opacity-40 hover:opacity-100 transition-opacity">
          <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
        </Link>
      </div>

      {/* ── Right: Identification Terminal ── */}
      <main className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative">
        {/* Mobile Header */}
        <div className="md:hidden flex justify-between items-center mb-20">
          <Link href="/" className="block w-32 h-8 relative">
            <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
          </Link>
          <Link href="/signup" className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">Initialize</Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <header className="mb-12">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-dark mb-8 border border-gray-100">
                <Globe size={20} strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl font-serif text-brand-dark mb-3">Access Terminal</h1>
              <p className="text-brand-dark/40 text-sm font-sans italic leading-relaxed">
                Execute identification protocol to synchronize your portfolio.
              </p>
            </header>

            {isNewlySignedUp && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-5 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-4 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-brand-emerald text-white flex items-center justify-center">
                  <ShieldCheck size={16} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-emerald">Profile Established. Proceed to entry.</p>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-10">
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-3 ml-1 group-focus-within:text-brand-emerald transition-colors">Identifier (Username)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-6 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent py-5 pl-16 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                      placeholder="e.g. consul_elite"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-3 ml-1 group-focus-within:text-brand-emerald transition-colors">Access Key (Password)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-6 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent py-5 pl-16 pr-16 rounded-[1.5rem] outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-6 flex items-center text-brand-dark/20 hover:text-brand-dark transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-100 text-brand-emerald focus:ring-brand-emerald/20 transition-all cursor-pointer" />
                  <span className="text-[10px] text-brand-dark/40 font-black uppercase tracking-widest group-hover:text-brand-dark transition-colors">Stay Identified</span>
                </label>
                <Link href="/forgot-password" title="Recover Access" className="text-[10px] font-black uppercase tracking-widest text-brand-emerald hover:text-brand-dark transition-all border-b border-brand-emerald/20 hover:border-brand-dark pb-0.5">
                  Recover Access
                </Link>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 p-5 rounded-[1.5rem] border border-red-100"
                  >
                    <p className="text-xs text-red-600 font-bold tracking-tight flex items-center gap-2">
                       {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-dark text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-emerald transition-all relative overflow-hidden group shadow-2xl shadow-brand-dark/20 active:scale-[0.98]"
              >
                <span className={loading ? "opacity-0" : "flex items-center justify-center gap-3"}>
                  Initialize Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
            </form>

            <footer className="mt-20 pt-10 border-t border-gray-50 text-center">
              <p className="text-[11px] text-brand-dark/40 font-medium tracking-tight mb-6">
                Not a member of the elite registry?
              </p>
              <Link href="/signup" className="luxury-button inline-flex group relative overflow-hidden text-brand-emerald border-brand-emerald/20 hover:text-white">
                Register Identification Profile
              </Link>
            </footer>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
