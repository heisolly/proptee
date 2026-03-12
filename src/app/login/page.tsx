"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

function LoginContent() {
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
      setError(err.message || "Login failed. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block relative w-32 h-10 grayscale opacity-80 hover:opacity-100 transition-opacity">
            <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14">
          <header className="mb-10">
            <h1 className="text-3xl font-serif text-brand-dark mb-2">Welcome Back</h1>
            <p className="text-sm text-gray-400">Enter your credentials to access your account.</p>
          </header>

          {isNewlySignedUp && (
            <div className="mb-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <ShieldCheck size={18} className="text-emerald-600" />
              <p className="text-xs font-semibold text-emerald-600">Account created! You can now sign in.</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-brand-emerald transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent py-4 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                    placeholder="Enter username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <Link href="/forgot-password" title="Recover Access" className="text-[10px] font-bold text-brand-emerald hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-brand-emerald transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-50 border border-transparent py-4 pl-14 pr-14 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-5 flex items-center text-gray-400 hover:text-brand-dark transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-50 p-4 rounded-xl border border-red-100"
                >
                  <p className="text-[11px] text-red-600 font-bold leading-tight">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-dark text-white py-4.5 rounded-2xl font-bold text-sm hover:bg-brand-emerald transition-all shadow-lg shadow-brand-dark/10 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-400 mb-4">New to the platform?</p>
            <Link href="/signup" className="text-sm font-bold text-brand-emerald hover:underline">
              Create a free account
            </Link>
          </div>
        </div>

        <div className="text-center mt-12 space-x-6">
          <Link href="/terms" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Terms</Link>
          <Link href="/privacy" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Privacy</Link>
          <Link href="/contact" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Support</Link>
        </div>
      </motion.div>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* ── Background Aesthetics ── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/proptee_entrance_narrative_1773291875530.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-[0.03] scale-110 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-brand-emerald/5" />
      </div>

      <Suspense fallback={<div className="relative z-10 w-full max-w-[440px] h-96 bg-white/50 backdrop-blur rounded-[2.5rem] animate-pulse" />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
