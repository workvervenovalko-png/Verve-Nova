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
  ArrowRight,
  ExternalLink,
  Lock,
  Layers,
  Zap,
  Globe
} from "lucide-react";
import Link from "next/link";

// Target Launch Time: October 14, 2026 at 1:00 PM IST (13:00 IST)
const TARGET_LAUNCH_TIME = new Date("2026-10-14T13:00:00+05:30").getTime();

export default function MaintenancePage() {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    isLaunched: boolean;
  }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateCountdown = () => {
      const now = Date.now();
      const diff = TARGET_LAUNCH_TIME - now;

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isLaunched: true });
        // Automatically transition to the live website
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds, isLaunched: false });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfdfd] text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#1b67b2] selection:text-white">
      {/* Ambient background gradients matching Verve Nova light design system */}
      <div 
        className="absolute top-0 inset-x-0 h-[650px] pointer-events-none"
        style={{ 
          background: "linear-gradient(180deg, rgba(239, 246, 255, 0.95) 0%, rgba(248, 250, 252, 0.7) 60%, rgba(252, 253, 253, 1) 100%)" 
        }}
      />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 left-[-5%] w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-slate-200/90">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs p-1">
            <img
              src="/vnt-logo.png"
              alt="Verve Nova Technologies"
              className="w-10 h-10 object-contain drop-shadow-[0_4px_10px_rgba(27,103,178,0.2)]"
            />
          </div>
          <div>
            <span className="text-base sm:text-lg font-black text-slate-950 tracking-widest uppercase block leading-none">
              Verve Nova
            </span>
            <span className="text-[9px] font-bold text-[#1b67b2] tracking-[0.35em] uppercase mt-1 block leading-none">
              Technologies
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="hidden sm:inline">Scheduled Platform Upgrade Active</span>
          <span className="sm:hidden">Upgrading</span>
        </div>
      </header>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 md:py-16 text-center flex flex-col items-center">
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-black uppercase tracking-wider mb-6 shadow-2xs">
          <Wrench className="w-3.5 h-3.5 text-[#1b67b2]" />
          <span>Verve Nova 2.0 Architectural Release</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 uppercase tracking-tight leading-[1.05] mb-5">
          Upgrading Systems <br />
          <span className="text-[#1b67b2]">Live Platform Launching Soon</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal max-w-2xl mx-auto leading-relaxed mb-10">
          We are deploying major architectural upgrades, brand-new project showcases, and our high-contrast light design system across all production clusters.
        </p>

        {/* ⏱️ Live Real-Time Countdown Timer to 1:00 PM IST */}
        <div className="w-full max-w-xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-500/5 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 text-[#1b67b2] text-xs font-black uppercase tracking-widest">
            <Clock className="w-4 h-4 animate-spin text-[#1b67b2]" style={{ animationDuration: '8s' }} />
            <span>Automatic Platform Reveal At 1:00 PM IST</span>
          </div>

          {timeLeft.isLaunched ? (
            <div className="py-6 flex flex-col items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              <p className="text-xl font-black text-slate-950 uppercase">Upgrade Complete!</p>
              <p className="text-xs text-slate-500">Launching Verve Nova Platform...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {/* Hours */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 font-mono tracking-tight">
                  {mounted ? String(timeLeft.hours).padStart(2, '0') : "12"}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 font-mono tracking-tight">
                  {mounted ? String(timeLeft.minutes).padStart(2, '0') : "53"}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Minutes
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <span className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1b67b2] font-mono tracking-tight">
                  {mounted ? String(timeLeft.seconds).padStart(2, '0') : "20"}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Seconds
                </span>
              </div>
            </div>
          )}

          <p className="text-[11px] font-semibold text-slate-500 mt-5 uppercase tracking-wider">
            Target Completion: <strong className="text-slate-800">Wednesday, 14 October 2026 • 1:00 PM IST (13:00 IST)</strong>
          </p>
        </div>

        {/* 100% Client Uptime Assurance Strip */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-10 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Active Client Deployments & Databases Running With 100% Guaranteed Uptime</span>
        </div>

        {/* Direct Contact Buttons */}
        <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://wa.me/917380663685?text=Hi%20Verve%20Nova%2C%20inquiry%20during%20scheduled%20maintenance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:+917380663685"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-xs transition-all active:scale-95"
          >
            <Phone className="w-4 h-4 text-[#1b67b2]" />
            <span>+91 7380663685</span>
          </a>

          <a
            href="mailto:contact@vervenovatech.com"
            className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider shadow-xs transition-all active:scale-95"
          >
            <Mail className="w-4 h-4 text-[#1b67b2]" />
            <span>Email Us</span>
          </a>
        </div>

        {/* Preview Link for Founder */}
        <div className="mt-8">
          <Link
            href="/?preview=true"
            className="text-[11px] font-bold text-slate-400 hover:text-[#1b67b2] uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Founder & Authorized Preview Access</span>
          </Link>
        </div>

      </div>

      {/* Footer Strip */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-200 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Verve Nova Technologies. All Rights Reserved.</p>
        <p className="font-mono text-[11px] text-slate-400">Govt. MSME UDYAM-UP-10-0047070</p>
      </footer>
    </main>
  );
}
