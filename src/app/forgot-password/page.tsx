"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (resetError) throw resetError;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Could not send reset link. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-brand-bg relative overflow-hidden">
        <div className="container max-w-[1140px] mx-auto px-6 relative z-10">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100"
            >
              <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-dark/40 hover:text-brand-emerald transition-colors mb-10">
                <ArrowLeft size={14} /> Back to Login
              </Link>

              <div className="text-center mb-10">
                <h1 className="text-3xl font-serif text-brand-dark mb-2">Reset Password</h1>
                <p className="text-brand-dark/50 text-sm font-sans">
                  Enter your email and we'll send you a recovery link.
                </p>
              </div>

              {success ? (
                <div className="text-center space-y-6 py-6">
                  <div className="w-16 h-16 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto text-brand-emerald">
                    <ShieldCheck size={32} />
                  </div>
                  <p className="text-sm text-brand-dark/60 font-medium">
                    Reset link sent! Please check your inbox for **{email}**.
                  </p>
                  <Link href="/login" className="luxury-button w-full justify-center">
                    Return to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-6">
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
                        placeholder="emmanuel@luxury.com"
                        required
                      />
                    </div>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
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
                      Send Reset Link <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
