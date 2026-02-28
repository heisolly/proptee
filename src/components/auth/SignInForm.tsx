"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

interface SignInFormProps {
  onSuccess: () => void;
  switchToSignUp: () => void;
}

export default function SignInForm({ onSuccess, switchToSignUp }: SignInFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0F3D2E]">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your private portal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 focus:ring-4 focus:ring-[#0F3D2E]/5 outline-none transition-all text-[#0F3D2E]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 focus:ring-4 focus:ring-[#0F3D2E]/5 outline-none transition-all text-[#0F3D2E]"
            />
          </div>
          <div className="text-right">
            <button type="button" className="text-xs font-bold text-[#0F3D2E] hover:underline">
              Forgot Password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-[#0F3D2E] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#0F3D2E]/20 hover:bg-[#1F7A5C] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (
            <>
              Sign In
              <LogIn className="group-hover:translate-x-1 transition-transform" size={16} />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-4 border-t border-gray-50">
        <p className="text-sm text-gray-500">
          New to Proptee?{" "}
          <button onClick={switchToSignUp} className="text-[#0F3D2E] font-bold hover:underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
}
