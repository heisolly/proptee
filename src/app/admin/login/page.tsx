"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff, Building2, Key } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Artificial delay for feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "proptee";
    if (password === adminPassword) {
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      router.push("/admin");
    } else {
      setError("Incorrect security key. Access denied.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-brand-dark rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-dark/10">
                <Building2 size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Access</h1>
            <p className="text-sm text-gray-400 mt-1">Enter your system key to manage Proptee.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2rem] border border-gray-100 p-10 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                Security Key
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-brand-emerald transition-colors">
                  <Key size={18} />
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

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-xl"
                >
                  <p className="text-red-600 text-[11px] font-bold tracking-tight text-center">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white py-4.5 rounded-2xl font-bold text-sm hover:bg-brand-emerald transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Verify Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-300 uppercase tracking-widest bg-gray-50 py-1.5 px-4 rounded-full">
              <ShieldCheck size={12} className="text-brand-emerald" /> 
              Secure Access Node
            </div>
            <Link href="/" className="text-xs font-bold text-brand-emerald hover:underline">
               Back to Website
            </Link>
          </div>
        </div>

        <p className="mt-12 text-center text-gray-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 Proptee Real Estate • Administrative Protocol
        </p>
      </motion.div>
    </main>
  );
}
