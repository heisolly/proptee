"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, Globe } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [username, setUsername] = useState("");
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

    if (username.includes(" ")) {
      setError("Username cannot contain spaces.");
      setLoading(false);
      return;
    }

    try {
      const internalEmail = `${username.toLowerCase()}@proptee.local`;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email: internalEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            display_username: username,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?new=true");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* ── Background Aesthetics ── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/proptee_concierge_narrative_1773292168744.png" 
          alt="Background" 
          fill 
          className="object-cover opacity-[0.03] scale-110 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white/40 to-brand-emerald/5" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[480px]"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block relative w-32 h-10 grayscale opacity-80 hover:opacity-100 transition-opacity">
            <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
          </Link>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100 p-10 md:p-14">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Sparkles size={32} />
                </div>
                <h2 className="text-3xl font-serif text-brand-dark mb-4">Account Created</h2>
                <p className="text-sm text-gray-500 mb-10 leading-relaxed px-4">
                  Welcome to Proptee, <span className="font-bold text-brand-dark">{fullName}</span>. Redirecting you to the sign in page...
                </p>
                <div className="w-8 h-8 border-2 border-brand-emerald/10 border-t-brand-emerald rounded-full animate-spin mx-auto" />
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <header className="mb-10 text-center md:text-left">
                  <h1 className="text-3xl font-serif text-brand-dark mb-2">Create Account</h1>
                  <p className="text-sm text-gray-400">Join the elite network for premium real estate.</p>
                </header>

                <form onSubmit={handleSignup} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Name</label>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-brand-emerald transition-colors">
                            <User size={18} />
                          </div>
                          <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent py-4 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                            placeholder="John Doe"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Username</label>
                       <div className="relative group">
                          <div className="absolute inset-y-0 left-5 flex items-center text-gray-400 group-focus-within:text-brand-emerald transition-colors">
                            <Globe size={18} />
                          </div>
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-gray-50 border border-transparent py-4 pl-14 pr-6 rounded-2xl outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium"
                            placeholder="johndoe_elite"
                            required
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Password</label>
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

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-red-50 p-4 rounded-xl border border-red-100"
                    >
                      <p className="text-[11px] text-red-600 font-bold leading-tight">{error}</p>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-dark text-white py-4.5 rounded-2xl font-bold text-sm hover:bg-brand-emerald transition-all shadow-lg shadow-brand-dark/10 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Create Account <ArrowRight size={18} /></>
                    )}
                  </button>

                  <p className="text-center text-[10px] text-gray-400 leading-relaxed px-2">
                    By signing up, you agree to our <Link href="/terms" className="text-brand-emerald hover:underline font-bold">Terms of Service</Link> and <Link href="/privacy" className="text-brand-emerald hover:underline font-bold">Privacy Policy</Link>.
                  </p>
                </form>

                <div className="mt-10 pt-8 border-t border-gray-50 text-center">
                  <p className="text-sm text-gray-400 mb-4">Already have an account?</p>
                  <Link href="/login" className="text-sm font-bold text-brand-emerald hover:underline">
                    Sign in to your account
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center mt-12 space-x-6">
          <Link href="/terms" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Terms</Link>
          <Link href="/privacy" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Privacy</Link>
          <Link href="/contact" className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-gray-400 transition-colors">Support</Link>
        </div>
      </motion.div>
    </div>
  );
}
