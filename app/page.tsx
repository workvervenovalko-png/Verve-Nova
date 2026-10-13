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
  ExternalLink, 
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

  // Simple visual countdown ticker for scheduled deployment
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
    <main className="min-h-screen bg-[#070b12] text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* Background glow ambiance */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <img
            src="/vnt-logo.png"
            alt="Verve Nova Technologies"
            className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
          />
          <div>
            <span className="text-base font-black tracking-widest uppercase text-white block leading-none">
              Verve Nova
            </span>
            <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-blue-400 mt-1 block leading-none">
              Technologies
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Under Maintenance</span>
        </div>
      </header>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
          <Wrench className="w-3.5 h-3.5 text-blue-400" />
          <span>Scheduled Infrastructure & Platform Upgrade</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.08] mb-6 text-white">
          We&apos;re Upgrading Our <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Digital Experience
          </span>
        </h1>

        {/* Subtitle Message */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-normal">
          Humari website currently scheduled maintenance aur architectural upgrade me hai.
          Naya, faster aur enterprise-grade platform <strong>kal tak live ho jayega</strong>.
        </p>

        {/* Countdown Timer Strip */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md mb-12">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono block">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1 block">
              Hours
            </span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-2xl sm:text-4xl font-extrabold text-blue-400 font-mono block">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1 block">
              Minutes
            </span>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <span className="text-2xl sm:text-4xl font-extrabold text-slate-300 font-mono block">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 mt-1 block">
              Seconds
            </span>
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12 text-left">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <Clock className="w-5 h-5 text-blue-400 mb-2" />
            <span className="text-xs font-black uppercase text-white tracking-wider block">
              Live Expected
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Kal (Within 24 Hours) live release schedule hai.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
            <span className="text-xs font-black uppercase text-white tracking-wider block">
              Govt. Registered
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Ministry of MSME • URN: UDYAM-UP-10-0047070
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 mb-2" />
            <span className="text-xs font-black uppercase text-white tracking-wider block">
              Client Operations
            </span>
            <p className="text-xs text-slate-400 mt-1">
              All ongoing enterprise projects & support active as normal.
            </p>
          </div>
        </div>

        {/* Emergency / Direct Connect Actions */}
        <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/10 backdrop-blur-xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400 block mb-2">
            Urgent Project Discussion or Support?
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            Our team is available 24/7 on direct channels
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+917380663685"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>Call: +91 7380663685</span>
            </a>

            <a
              href="https://wa.me/917380663685"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:work.vervenova.lko@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold uppercase tracking-wider transition-all active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-400">
        <div>
          © {new Date().getFullYear()} Verve Nova Technologies. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-xs">
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
