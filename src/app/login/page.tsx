"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Github, Chrome } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-brand-bg relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="container max-w-[1140px] mx-auto px-6 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-[2rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <div className="text-center mb-10">
                <div className="relative w-32 h-8 mx-auto mb-6">
                  <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
                </div>
                <h1 className="text-3xl font-serif text-brand-dark mb-2">Welcome Back</h1>
                <p className="text-brand-dark/50 text-sm font-sans">
                  Sign in to access your curated property portfolio.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 py-4 pl-14 pr-6 rounded-2xl outline-none focus:ring-2 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all text-sm font-medium"
                      placeholder="name@luxury.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-5 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 py-4 pl-14 pr-14 rounded-2xl outline-none focus:ring-2 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all text-sm font-medium"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-5 flex items-center text-brand-dark/20 hover:text-brand-dark transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-200 text-brand-emerald focus:ring-brand-emerald/20" />
                    <span className="text-xs text-brand-dark/60 font-medium">Remember me</span>
                  </label>
                  <Link href="/forgot-password" title="Forgot Password?" className="text-xs font-bold text-brand-emerald hover:text-brand-dark transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 p-4 rounded-xl border border-red-100"
                    >
                      <p className="text-xs text-red-600 font-bold tracking-tight">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-dark text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-emerald transition-all relative overflow-hidden group shadow-xl shadow-brand-dark/10"
                >
                  <span className={loading ? "opacity-0" : "flex items-center justify-center gap-2"}>
                    Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </form>

              <div className="mt-10">
                <div className="relative mb-8 text-center">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100" />
                  <span className="relative z-10 bg-white px-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30">
                    Or Continue With
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all text-xs font-bold text-brand-dark/60">
                    <Chrome size={18} /> Google
                  </button>
                  <button className="flex items-center justify-center gap-3 py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all text-xs font-bold text-brand-dark/60">
                    <Github size={18} /> GitHub
                  </button>
                </div>
              </div>

              <p className="mt-10 text-center text-xs text-brand-dark/40 font-medium tracking-tight">
                New to Proptee?{" "}
                <Link href="/signup" className="text-brand-emerald font-black uppercase tracking-widest text-[9px] hover:text-brand-dark transition-colors ml-1">
                  Create Account
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
