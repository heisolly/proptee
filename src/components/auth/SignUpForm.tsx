"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { User, Mail, Lock, Loader2, UserCircle } from "lucide-react";

interface SignUpFormProps {
  onSuccess: () => void;
  switchToSignIn: () => void;
}

export default function SignUpForm({ onSuccess, switchToSignIn }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"buyer" | "agent">("buyer");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#0F3D2E]">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Join the most exclusive real estate community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 p-1 bg-gray-50 rounded-2xl border border-gray-100">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              role === "buyer"
                ? "bg-white text-[#0F3D2E] shadow-sm ring-1 ring-gray-100"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Buyer / User
          </button>
          <button
            type="button"
            onClick={() => setRole("agent")}
            className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              role === "agent"
                ? "bg-white text-[#0F3D2E] shadow-sm ring-1 ring-gray-100"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Property Agent
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
          <div className="relative">
            <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              name="fullName"
              type="text"
              required
              placeholder="John Doe"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#0F3D2E]/20 focus:ring-4 focus:ring-[#0F3D2E]/5 outline-none transition-all text-[#0F3D2E]"
            />
          </div>
        </div>

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
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-[#0F3D2E] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-[#0F3D2E]/20 hover:bg-[#1F7A5C] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : (
            <>
              Create Account
              <User className="group-hover:translate-x-1 transition-transform" size={16} />
            </>
          )}
        </button>
      </form>

      <div className="text-center pt-4 border-t border-gray-50">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <button onClick={switchToSignIn} className="text-[#0F3D2E] font-bold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
