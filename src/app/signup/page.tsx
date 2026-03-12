"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles, Globe, MapPin } from "lucide-react";
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
      setError(err.message || "Identification establishment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row relative overflow-hidden text-brand-dark">
      {/* ── Left: Concierge Narrative Layer ── */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] relative bg-brand-dark overflow-hidden sticky top-0 h-screen">
        <Image 
          src="/proptee_concierge_narrative_1773292168744.png" 
          alt="Luxury Concierge" 
          fill 
          className="object-cover opacity-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-transparent to-brand-dark/40" />
        
        {/* Dynamic Context Badge */}
        <div className="absolute top-12 left-12 z-10 flex items-center gap-4 text-white/40">
           <MapPin size={16} className="text-brand-emerald" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">Proptee Global Residency</span>
        </div>

        <div className="absolute inset-x-12 bottom-20 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl font-serif text-white leading-tight mb-8">
               Establish Your <br />
               <span className="text-brand-emerald italic">Digital Legacy.</span>
            </h2>
            <div className="space-y-6">
               {[
                 "Direct access to off-market portfolios",
                 "High-definition asset orchestration",
                 "Concierge-level investment support"
               ].map((text, i) => (
                 <div key={i} className="flex items-center gap-4 text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-black uppercase tracking-widest">{text}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Floating Brand Badge */}
        <Link href="/" className="absolute bottom-12 right-12 z-10 block w-32 h-8 grayscale brightness-200 opacity-20 hover:opacity-100 transition-opacity">
          <Image src="/logo.png" alt="Proptee" fill className="object-contain" />
        </Link>
      </div>

      {/* ── Right: Census Terminal ── */}
      <main className="flex-1 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-white relative overflow-y-auto">
        <div className="max-w-md mx-auto w-full">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-10 py-10"
            >
              <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 flex items-center justify-center mx-auto text-brand-emerald shadow-xl shadow-brand-emerald/5 ring-1 ring-emerald-100">
                <Sparkles size={40} />
              </div>
              <div>
                <h2 className="text-4xl font-serif text-brand-dark mb-4 leading-tight">Registry <span className="text-brand-emerald italic">Synchronized.</span></h2>
                <p className="text-brand-dark/40 text-sm font-sans px-4 leading-relaxed italic">
                  Greeting, <span className="text-brand-dark font-black tracking-tighter not-italic">{fullName}</span>. Your identification protocol has been successfully established. Synchronizing with the Access Terminal...
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-brand-emerald/10 border-t-brand-emerald rounded-full animate-spin" />
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-dark/20">Handshaking Protocol...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <header className="mb-14">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-dark mb-8 border border-gray-100">
                  <ShieldCheck size={20} className="text-brand-emerald" />
                </div>
                <h1 className="text-4xl font-serif text-brand-dark mb-3">Onboarding Census</h1>
                <p className="text-brand-dark/40 text-sm font-sans italic leading-relaxed">
                  Join the world's most sophisticated real estate orchestration network.
                </p>
              </header>

              <form onSubmit={handleSignup} className="space-y-8">
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-3 ml-1 group-focus-within:text-brand-emerald transition-colors">Legal Identification (Full Name)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-6 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent py-5 pl-16 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                      placeholder="e.g. Julian Vane"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-3 ml-1 group-focus-within:text-brand-emerald transition-colors">Chosen Alias (Username)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-6 flex items-center text-brand-dark/20 group-focus-within:text-brand-emerald transition-colors">
                      <Globe size={18} />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-50 border border-transparent py-5 pl-16 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:border-brand-emerald/20 transition-all text-sm font-medium shadow-sm hover:shadow-md"
                      placeholder="e.g. vane_proprietary"
                      required
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark/30 mb-3 ml-1 group-focus-within:text-brand-emerald transition-colors">Access Cipher (Password)</label>
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

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 p-5 rounded-[1.5rem] border border-red-100"
                    >
                      <p className="text-xs text-red-600 font-bold tracking-tight">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-dark text-white py-6 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:bg-brand-emerald transition-all relative overflow-hidden group shadow-2xl shadow-brand-dark/20 active:scale-[0.98]"
                >
                  <span className={loading ? "opacity-0" : "flex items-center justify-center gap-3"}>
                    Establish Identity <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </div>
                  )}
                </button>

                <p className="text-center text-[9px] text-brand-dark/30 font-black uppercase tracking-[0.1em] px-4 leading-relaxed">
                  By executing this protocol, you adhere to our <Link href="/terms" className="text-brand-dark underline decoration-brand-emerald/30 underline-offset-4">Legal Framework</Link>.
                </p>
              </form>

              <footer className="mt-16 text-center">
                <p className="text-[11px] text-brand-dark/40 font-medium tracking-tight mb-4">
                  Already established in our registry?
                </p>
                <Link href="/login" className="text-brand-emerald font-black uppercase tracking-[0.3em] text-[10px] hover:text-brand-dark transition-all border-b-2 border-brand-emerald/10 hover:border-brand-dark pb-1">
                  Access Portal
                </Link>
              </footer>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
