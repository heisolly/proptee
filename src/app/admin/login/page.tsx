'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff, Building2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Artificial delay for premium feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'proptee';
    if (password === adminPassword) {
      document.cookie = 'admin_auth=true; path=/; max-age=86400';
      router.push('/admin');
    } else {
      setError('Access denied. Please check your credentials.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-emerald.png"
          alt="Luxury Real Estate"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/90 via-[#0F3D2E]/80 to-[#000000]/95 backdrop-blur-[2px]"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1F7A5C]/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0F3D2E]/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-20 h-20 bg-[#F2F2F2] rounded-3xl flex items-center justify-center mb-6 shadow-2xl relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F3D2E] to-[#1F7A5C] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Building2 className="text-[#0F3D2E] group-hover:text-white transition-colors relative z-10" size={40} />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            PROPTEE <span className="text-[#1F7A5C]">ADMIN</span>
          </h1>
          <p className="text-gray-400 font-medium tracking-wide uppercase text-[10px]">Secure Gateway • Real Estate Management</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="relative">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">
                Security Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#1F7A5C] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white pl-14 pr-14 py-5 rounded-2xl outline-none focus:ring-2 focus:ring-[#1F7A5C]/50 focus:border-[#1F7A5C] transition-all font-medium placeholder:text-gray-600"
                  placeholder="Enter system key"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-5 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 py-3 px-4 rounded-xl flex items-center gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <p className="text-red-400 text-xs font-bold uppercase tracking-wider">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#0F3D2E] via-[#1F7A5C] to-[#0F3D2E] bg-[length:200%_auto] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-[0_10px_30px_rgba(31,122,92,0.3)] hover:shadow-[0_15px_40px_rgba(31,122,92,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 group disabled:opacity-50 hover:bg-right transition-[background-position] duration-500"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex flex-col items-center gap-6">
            <button className="text-[10px] font-bold text-gray-500 hover:text-[#1F7A5C] transition-colors uppercase tracking-[0.2em]">
              Request New Access Key
            </button>
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white/5 py-2 px-4 rounded-full border border-white/5">
              <ShieldCheck size={12} className="text-[#1F7A5C]" /> 
              Proptee Security Protocol 2.4
            </div>
          </div>
        </div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            Proptee Real Estate Ecosystem
          </p>
          <div className="flex items-center justify-center gap-6">
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="w-1 h-1 rounded-full bg-[#1F7A5C]"></span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
