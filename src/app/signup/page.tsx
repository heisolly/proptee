"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 bg-brand-bg relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-emerald/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2" />

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
                <h1 className="text-3xl font-serif text-brand-dark mb-2">Join Proptee</h1>
                <p className="text-brand-dark/50 text-sm font-sans">
                  Begin your journey to extraordinary real estate.
                </p>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-brand-emerald/10 flex items-center justify-center mx-auto text-brand-emerald">
                    <ShieldCheck size={40} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif text-brand-dark mb-2">Check Your Email</h2>
                    <p className="text-brand-dark/50 text-sm font-sans px-4">
                      We've sent a verification link to **{email}**. Please confirm your account to continue.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/login")}
                    className=" luxury-button-outline w-full justify-center"
                  >
                    Go to Login
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 mb-2 ml-1">
                      Full Name
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-5 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 py-4 pl-14 pr-6 rounded-2xl outline-none focus:ring-2 focus:ring-brand-emerald/10 focus:border-brand-emerald transition-all text-sm font-medium"
                        placeholder="Emmanuel Cole"
                        required
                      />
                    </div>
                  </div>

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
                        placeholder="Choose a secure password"
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
                    <p className="mt-2 text-[9px] text-brand-dark/30 font-medium px-1 tracking-tight">
                      Minimum 8 characters with letters and numbers.
                    </p>
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
                      Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      </div>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-brand-dark/30 font-medium px-4 leading-relaxed">
                    By creating an account, you agree to our <Link href="/terms" className="text-brand-dark underline">Terms of Service</Link> and <Link href="/privacy" className="text-brand-dark underline">Privacy Policy</Link>.
                  </p>
                </form>
              )}

              <p className="mt-10 text-center text-xs text-brand-dark/40 font-medium tracking-tight">
                Already have an account?{" "}
                <Link href="/login" className="text-brand-emerald font-black uppercase tracking-widest text-[9px] hover:text-brand-dark transition-colors ml-1">
                  Sign In
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
