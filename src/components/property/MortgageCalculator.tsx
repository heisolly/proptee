"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";

export default function MortgageCalculator({ price }: { price: number }) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(15.5); // Common in Nigeria
  const [years, setYears] = useState(15);

  const downPayment = (price * downPaymentPct) / 100;
  const principal = price - downPayment;
  
  // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = principal * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return (
    <div className="bg-brand-black border border-brand-border rounded-[32px] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-brand-emerald/20 flex items-center justify-center text-brand-emerald">
          <Calculator size={18} />
        </div>
        <h3 className="font-serif text-2xl text-white">Mortgage Estimator</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div>
          <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">Down Payment (%)</label>
          <div className="flex items-center border border-brand-border rounded-xl px-4 py-3 bg-brand-black/50">
            <input 
              type="number" 
              value={downPaymentPct} 
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full bg-transparent text-white outline-none font-medium" 
            />
            <span className="text-white/40 ml-2">%</span>
          </div>
        </div>
        <div>
          <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">Interest Rate (%)</label>
          <div className="flex items-center border border-brand-border rounded-xl px-4 py-3 bg-brand-black/50">
            <input 
              type="number" 
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full bg-transparent text-white outline-none font-medium" 
            />
            <span className="text-white/40 ml-2">%</span>
          </div>
        </div>
        <div>
          <label className="text-white/40 text-xs font-bold uppercase tracking-widest block mb-2">Duration (Years)</label>
          <div className="flex items-center border border-brand-border rounded-xl px-4 py-3 bg-brand-black/50">
            <input 
              type="number" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full bg-transparent text-white outline-none font-medium" 
            />
            <span className="text-white/40 ml-2">Yrs</span>
          </div>
        </div>
      </div>

      <div className="bg-[#121418] rounded-2xl p-6 border border-brand-border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/60 font-medium">Principal Amount</span>
          <span className="text-white font-bold">₦{principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-white/60 font-medium">Down Payment</span>
          <span className="text-white font-bold">₦{downPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
        <div className="h-px bg-brand-border w-full my-4" />
        <div className="flex justify-between items-center">
          <span className="text-white font-serif text-lg">Estimated Monthly Pay</span>
          <span className="text-brand-gold font-bold text-3xl">₦{monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
        </div>
      </div>
    </div>
  );
}
