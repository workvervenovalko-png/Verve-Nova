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
    <main 
      style={{ backgroundColor: "#ffffff", color: "#0f172a" }}
      className="min-h-screen flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#1b67b2] selection:text-white"
    >
      {/* Subtle ambient light gradient background matching redesign */}
      <div 
        className="absolute top-0 inset-x-0 h-[600px] pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(239, 246, 255, 0.9) 0%, rgba(248, 250, 252, 0.6) 60%, rgba(255, 255, 255, 1) 100%)" }}
      />
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-10 w-96 h-96 bg-[#f9661b]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header 
        style={{ borderColor: "#e2e8f0" }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b"
      >
        <div className="flex items-center gap-3.5">
          <img
            src="/vnt-logo.png"
            alt="Verve Nova Technologies"
            className="w-11 h-11 object-contain drop-shadow-[0_4px_12px_rgba(27,103,178,0.2)]"
          />
          <div>
            <span 
              style={{ color: "#0f172a" }}
              className="text-base sm:text-lg font-black tracking-widest uppercase block leading-none"
            >
              Verve Nova
            </span>
            <span 
              style={{ color: "#1b67b2" }}
              className="text-[9px] font-bold tracking-[0.35em] uppercase mt-1 block leading-none"
            >
              Technologies
            </span>
          </div>
        </div>

        <div 
          style={{ backgroundColor: "#fffbeb", borderColor: "#fde68a", color: "#92400e" }}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Scheduled Upgrade Active</span>
        </div>
      </header>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        
        {/* Status Chip */}
        <div 
          style={{ backgroundColor: "#eff6ff", borderColor: "#bfdbfe", color: "#1b67b2" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
        >
          <Wrench className="w-3.5 h-3.5 text-[#1b67b2]" />
          <span>Scheduled Platform & Infrastructure Upgrade</span>
        </div>

        {/* Main Headline */}
        <h1 
          style={{ color: "#0f172a" }}
          className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-[1.08] mb-6"
        >
          We&apos;re Upgrading Our <br />
          <span style={{ color: "#1b67b2" }}>
            Digital Platform
          </span>
        </h1>

        {/* Subtitle Message with 100% Guaranteed Crisp Contrast */}
        <p 
          style={{ color: "#334155" }}
          className="text-base sm:text-lg max-w-2xl leading-relaxed mb-10 font-normal"
        >
          Humari website currently scheduled maintenance aur architectural upgrade me hai.
          Naya, ultra-fast aur enterprise-grade platform{" "}
          <strong style={{ color: "#0f172a" }} className="font-bold">
            kal tak live ho jayega
          </strong>.
        </p>

        {/* Countdown Timer Strip in Crisp White Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md mb-12">
          <div 
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1" }}
            className="p-4 sm:p-5 rounded-2xl border shadow-sm"
          >
            <span 
              style={{ color: "#0f172a" }}
              className="text-3xl sm:text-4xl font-black font-mono block"
            >
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span 
              style={{ color: "#475569" }}
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 block"
            >
              Hours
            </span>
          </div>
          <div 
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1" }}
            className="p-4 sm:p-5 rounded-2xl border shadow-sm"
          >
            <span 
              style={{ color: "#1b67b2" }}
              className="text-3xl sm:text-4xl font-black font-mono block"
            >
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span 
              style={{ color: "#475569" }}
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 block"
            >
              Minutes
            </span>
          </div>
          <div 
            style={{ backgroundColor: "#ffffff", borderColor: "#cbd5e1" }}
            className="p-4 sm:p-5 rounded-2xl border shadow-sm"
          >
            <span 
              style={{ color: "#ea580c" }}
              className="text-3xl sm:text-4xl font-black font-mono block"
            >
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span 
              style={{ color: "#475569" }}
              className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 block"
            >
              Seconds
            </span>
          </div>
        </div>

        {/* Operational Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-12 text-left">
          <div 
            style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            className="p-5 rounded-2xl border hover:border-[#1b67b2] transition-colors shadow-xs"
          >
            <div 
              style={{ backgroundColor: "#eff6ff", color: "#1b67b2" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            >
              <Clock className="w-5 h-5 text-[#1b67b2]" />
            </div>
            <span 
              style={{ color: "#0f172a" }}
              className="text-xs font-black uppercase tracking-wider block"
            >
              Live Expected
            </span>
            <p 
              style={{ color: "#334155" }}
              className="text-xs mt-1 leading-relaxed font-medium"
            >
              Kal (Within 24 Hours) live release scheduled hai.
            </p>
          </div>

          <div 
            style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            className="p-5 rounded-2xl border hover:border-[#1b67b2] transition-colors shadow-xs"
          >
            <div 
              style={{ backgroundColor: "#ecfdf5", color: "#059669" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            >
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <span 
              style={{ color: "#0f172a" }}
              className="text-xs font-black uppercase tracking-wider block"
            >
              Govt. Registered
            </span>
            <p 
              style={{ color: "#334155" }}
              className="text-xs mt-1 font-mono font-medium leading-relaxed"
            >
              Ministry of MSME • UDYAM-UP-10-0047070
            </p>
          </div>

          <div 
            style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
            className="p-5 rounded-2xl border hover:border-[#1b67b2] transition-colors shadow-xs"
          >
            <div 
              style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
              className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
            >
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
            </div>
            <span 
              style={{ color: "#0f172a" }}
              className="text-xs font-black uppercase tracking-wider block"
            >
              Client Operations
            </span>
            <p 
              style={{ color: "#334155" }}
              className="text-xs mt-1 leading-relaxed font-medium"
            >
              All ongoing enterprise projects & support active as normal.
            </p>
          </div>
        </div>

        {/* Emergency / Direct Connect Actions */}
        <div 
          style={{ backgroundColor: "#f8fafc", borderColor: "#e2e8f0" }}
          className="w-full p-6 sm:p-8 rounded-3xl border shadow-sm"
        >
          <span 
            style={{ color: "#1b67b2" }}
            className="text-xs font-bold uppercase tracking-[0.2em] block mb-2"
          >
            Urgent Project Discussion or Support?
          </span>
          <h3 
            style={{ color: "#0f172a" }}
            className="text-lg sm:text-xl font-bold mb-6"
          >
            Our team is available 24/7 on direct channels
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="tel:+917380663685"
              style={{ backgroundColor: "#1b67b2" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-blue-500/20 active:scale-95"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>Call: +91 7380663685</span>
            </a>

            <a
              href="https://wa.me/917380663685"
              target="_blank"
              rel="noopener noreferrer"
              style={{ backgroundColor: "#059669" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-[#047857] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:work.vervenova.lko@gmail.com"
              style={{ backgroundColor: "#0f172a" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>Email Us</span>
            </a>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer 
        style={{ borderColor: "#e2e8f0", color: "#64748b" }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-medium"
      >
        <div>
          © {new Date().getFullYear()} Verve Nova Technologies. All Rights Reserved.
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
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
