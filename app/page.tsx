"use client";

import React, { useState, useEffect } from "react";
import { 
  Wrench, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  // Ticker for scheduled deployment
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#1b67b2] selection:text-white">
      {/* Subtle ambient light gradient background matching redesign */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-blue-50/80 via-slate-50/50 to-white pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-[#f9661b]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-slate-200/80">
        <div className="flex items-center gap-3.5">
          <img
            src="/vnt-logo.png"
            alt="Verve Nova Technologies"
            className="w-11 h-11 object-contain drop-shadow-[0_4px_12px_rgba(27,103,178,0.2)]"
          />
          <div>
            <span className="text-base sm:text-lg font-black tracking-widest uppercase text-slate-950 block leading-none">
              Verve Nova
            </span>
            <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-[#1b67b2] mt-1 block leading-none">
              Technologies
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Scheduled Upgrade Active</span>
        </div>
      </header>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
          <Wrench className="w-3.5 h-3.5 text-[#1b67b2]" />
          <span>Scheduled Platform & Infrastructure Upgrade</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.08] mb-6 text-slate-950">
          We&apos;re Upgrading Our <br />
          <span className="text-[#1b67b2]">
            Digital Platform
          </span>
        </h1>

        {/* Subtitle Message */}
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-normal">
          Humari website currently scheduled maintenance aur architectural upgrade me hai.
          Naya, ultra-fast aur enterprise-grade platform <strong className="text-slate-900 font-bold">kal tak live ho jayega</strong>.
        </p>

        {/* Countdown Timer Strip in Crisp White Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md mb-12">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono block">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Hours
            </span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-[#1b67b2] font-mono block">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Minutes
            </span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <span className="text-3xl sm:text-4xl font-black text-[#f9661b] font-mono block">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500 mt-1 block">
              Seconds
            </span>
          </div>
        </div>

        {/* Operational Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12 text-left">
          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#1b67b2] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-[#1b67b2]" />
            </div>
            <span className="text-xs font-black uppercase text-slate-900 tracking-wider block">
              Live Expected
            </span>
            <p className="text-xs text-slate-600 mt-1">
              Kal (Within 24 Hours) live release schedule hai.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#1b67b2] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-black uppercase text-slate-900 tracking-wider block">
              Govt. Registered
            </span>
            <p className="text-xs text-slate-600 mt-1 font-mono">
              Ministry of MSME • UDYAM-UP-10-0047070
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#1b67b2] transition-colors">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-xs font-black uppercase text-slate-900 tracking-wider block">
              Client Operations
            </span>
            <p className="text-xs text-slate-600 mt-1">
              All ongoing enterprise projects & support active as normal.
            </p>
          </div>
        </div>

        {/* Emergency / Direct Connect Actions */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-[#f8fafc] border border-slate-200 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1b67b2] block mb-2">
            Urgent Project Discussion or Support?
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
            Our team is available 24/7 on direct channels
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+917380663685"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 7380663685</span>
            </a>

            <a
              href="https://wa.me/917380663685"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:work.vervenova.lko@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-500">
        <div>
          © {new Date().getFullYear()} Verve Nova Technologies. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-500 text-xs">
          <span>Enterprise IT Solutions</span>
          <span>•</span>
          <span>ISO Standards Compliant</span>
          <span>•</span>
          <span>NDA Protected</span>
        </div>
      </footer>
    </main>
  );
}
