"use client";

import { useState } from "react";
import { 
  Settings, 
  Shield, 
  Database, 
  Globe, 
  Mail, 
  Lock, 
  Save, 
  Bell, 
  Smartphone,
  Server,
  Key,
  Fingerprint
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Security");

  const tabs = [
    { name: "Security", icon: Shield },
    { name: "Global", icon: Globe },
    { name: "System", icon: Server },
    { name: "Archive", icon: Database }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* ── Navigation Console ── */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-white p-10 rounded-[3rem] border border-gray-50 shadow-sm sticky top-32 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-full translate-x-12 -translate-y-12" />
          
          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="text-2xl font-serif text-brand-dark flex items-center gap-3"><Settings size={24} className="text-brand-emerald" /> Control Tower</h3>
              <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest mt-1">System Orchestration Layer</p>
            </div>
            
            <div className="space-y-3">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-4 px-6 py-5 rounded-[1.8rem] transition-all duration-500 transform ${
                    activeTab === tab.name 
                      ? "bg-brand-dark text-white shadow-xl shadow-brand-dark/10 -translate-y-1" 
                      : "text-gray-400 hover:text-brand-dark hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={20} strokeWidth={activeTab === tab.name ? 2 : 1.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">{tab.name} Protocols</span>
                </button>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-50">
              <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                <Fingerprint size={18} className="text-brand-emerald" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-brand-emerald">Authorized User</span>
                  <span className="text-xs font-serif text-brand-dark italic leading-none mt-1">Administrator Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Protocol Canvas ── */}
      <div className="lg:col-span-8">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-12 sm:p-16 rounded-[4rem] border border-gray-50 shadow-sm space-y-12 relative overflow-hidden"
        >
          {/* Background Motif */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 -z-0" />
          
          <div className="relative z-10 space-y-12">
            <div>
              <h4 className="text-3xl font-serif text-brand-dark mb-2">{activeTab} Environment</h4>
              <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest">Modified at node {new Date().toLocaleTimeString()} on Proptee Core</p>
            </div>

            {activeTab === "Security" && (
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-brand-dark/40 ml-1 flex items-center gap-2">
                    <Key size={12} /> Master Authentication Token
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      value="••••••••••••••••" 
                      readOnly
                      className="w-full bg-gray-50 border border-transparent py-5 px-8 rounded-2xl outline-none font-black tracking-widest text-gray-400 cursor-not-allowed"
                    />
                    <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-brand-emerald hover:text-brand-dark transition-colors">Rotate Key</button>
                  </div>
                  <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tight ml-1 italic">This token initializes the primary admin portal interface.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-brand-emerald/10 transition-all space-y-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm"><Lock size={20} /></div>
                    <h5 className="font-serif text-lg text-brand-dark">Encryption Mesh</h5>
                    <p className="text-[10px] font-medium text-brand-dark/50 leading-relaxed uppercase tracking-widest">Enforce system-wide data obfuscation and end-to-end encryption protocols.</p>
                    <div className="flex justify-end pt-4">
                      <div className="w-12 h-6 bg-brand-emerald rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md ml-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-brand-emerald/10 transition-all space-y-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm"><Smartphone size={20} /></div>
                    <h5 className="font-serif text-lg text-brand-dark">Biometric Link</h5>
                    <p className="text-[10px] font-medium text-brand-dark/50 leading-relaxed uppercase tracking-widest">Require hardware-based biometric verification for high-risk operations.</p>
                    <div className="flex justify-end pt-4">
                      <div className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full shadow-md mr-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "Security" && (
              <div className="py-20 flex flex-col items-center justify-center gap-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200"><Server size={32} /></div>
                <div className="text-center">
                  <p className="text-xl font-serif text-brand-dark mb-1">{activeTab} Protocol Layer</p>
                  <p className="text-[10px] text-brand-dark/30 font-black uppercase tracking-widest italic">Node deployment in structural pending state...</p>
                </div>
              </div>
            )}

            <div className="pt-12 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-dark/20 italic">
                Proptee Hub Protocol v2.4.0 • Established 2026
              </div>
              <button 
                className="flex items-center gap-3 bg-brand-dark text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-brand-emerald transition-all shadow-xl shadow-brand-dark/10 group"
              >
                <Save size={18} className="group-hover:scale-110 transition-transform" />
                Commit Protocol
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
