"use client";

import React from "react";

/**
 * REUSABLE LOADING UI
 * 
 * Strategy:
 * - Extracted from loading.tsx for manual transition control
 */
export function LoadingUI() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/80 backdrop-blur-xl transition-opacity duration-300">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full border-4 border-slate-100 opacity-20"></div>
        <div className="absolute w-32 h-32 rounded-full border-t-4 border-primary animate-spin"></div>
        <div className="absolute w-24 h-24 rounded-full border-b-4 border-slate-300 animate-spin transition-all duration-[2000ms]"></div>
        
        <div className="relative bg-slate-900 p-6 rounded-[32px] shadow-2xl shadow-slate-900/20 animate-pulse">
          <img 
            src="/assets/resolver_logo.png" 
            alt="Resolvr. Logo" 
            className="w-10 h-10 object-contain invert brightness-0"
          />
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-2">
        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-900">Synchronizing</h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest animate-pulse italic">Accessing Municipal Data Relay...</p>
      </div>
    </div>
  );
}
