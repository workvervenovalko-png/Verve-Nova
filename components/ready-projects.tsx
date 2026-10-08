"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, ChevronRight, ChevronLeft, ShoppingBag, Wrench, Smartphone, Sparkles } from "lucide-react";
import Link from "next/link";

export function ReadyProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: "chotu",
      number: "01",
      title: "ChotU (छोटू)",
      subtitle: "Hyperlocal Quick Commerce Ecosystem",
      category: "Mobile App Ecosystem",
      desc: "Zero-commission hyperlocal kirana marketplace and instant delivery mobile app empowering neighborhood grocery stores with 1-5km delivery logistics, barcode cataloging, and direct merchant settlements.",
      logo: "/projects/chotu.png",
      bgGradient: "from-[#042111] via-[#0A4D27] to-[#02140A]",
      glowColor: "rgba(16, 185, 129, 0.4)",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      btnGradient: "from-emerald-600 to-teal-600 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]",
      link: "/case-studies",
      icon: ShoppingBag,
      features: ["Zero Commission Model", "Real-Time Barcode Catalog", "Geofenced Daily Payouts"],
      ctaText: "View App Case Study",
      isApp: true
    },
    {
      id: "servicehub",
      number: "02",
      title: "ServiceHub",
      subtitle: "On-Demand Home Repairs & Booking",
      category: "Play Store Live App",
      desc: "Enterprise handyman & home service Android app featuring real-time technician tracking, automated stock deduction, Supabase backend, FCM siren alerts, and integrated wallets.",
      logo: "/projects/servicehub.png",
      logoBg: "bg-white p-4 rounded-3xl shadow-2xl",
      bgGradient: "from-[#08152D] via-[#102958] to-[#050D1C]",
      glowColor: "rgba(59, 130, 246, 0.4)",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      btnGradient: "from-blue-600 to-cyan-600 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]",
      link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
      icon: Wrench,
      features: ["Sub-second Realtime Streams", "Automated Stock Deduction", "FCM Siren Push Alerts"],
      ctaText: "View On Google Play Store",
      isApp: true
    },
    {
      id: "transcription",
      number: "03",
      title: "Advance Transcription",
      subtitle: "Audio Speech-to-Text AI Suite",
      category: "Utility Web Platform",
      desc: "An easy-to-use software that converts audio files into text quickly. Perfect for meetings, lectures, and corporate interviews with automated cloud storage.",
      image: "/projects/transcription.png",
      bgGradient: "from-[#190C2C] via-[#2D1650] to-[#0F071C]",
      glowColor: "rgba(168, 85, 247, 0.4)",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      btnGradient: "from-purple-600 to-indigo-600 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]",
      link: "https://www.advancetranscription.com/",
      icon: Headphones,
      features: ["Fast Speech Conversion", "Seamless File Export", "Encrypted Data Safety"],
      ctaText: "Visit Live Website",
      isApp: false
    },
    {
      id: "siora",
      number: "04",
      title: "Siora Infra Design",
      subtitle: "3D Infrastructure Web Portal",
      category: "Enterprise Web Portal",
      desc: "A complete professional portal for construction and design companies to manage projects with dynamic 3D web graphics and interactive client dashboards.",
      image: "/projects/siora.png",
      bgGradient: "from-[#22160C] via-[#422B18] to-[#140D07]",
      glowColor: "rgba(245, 158, 11, 0.4)",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      btnGradient: "from-amber-600 to-orange-600 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["3D Architecture Rendering", "Client Project Management", "Ultra-Fast Performance"],
      ctaText: "Visit Live Website",
      isApp: false
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      projects.length - 1,
      Math.floor(latest * projects.length)
    );
    if (index !== activeIndex && index >= 0 && index < projects.length) {
      setActiveIndex(index);
    }
  });

  const activeProject = projects[activeIndex];

  return (
    <section id="projects" ref={containerRef} className="relative h-[320vh] bg-[#070709] border-y border-white/[0.04]">
      {/* Sticky Pinned Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden px-4 md:px-8">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/[0.04] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col h-full max-h-[900px] justify-between py-8">
          
          {/* Top Control Bar & Header */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-4 shrink-0 pb-4 border-b border-white/10">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9.5px] font-black uppercase tracking-[0.4em] mb-2">
                <Sparkles className="w-3 h-3" /> Pinned Spotlight Showcase
              </div>
              <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter font-display">
                Featured <span className="text-gradient">Projects</span>
              </h2>
            </div>

            {/* Stepper Dots & Navigation Controls */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                {projects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3 py-1 rounded-xl text-[10px] font-black transition-all ${
                      activeIndex === idx
                        ? "bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105"
                        : "text-white/40 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {p.number}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => Math.min(projects.length - 1, prev + 1))}
                  disabled={activeIndex === projects.length - 1}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link 
                href="/projects" 
                className="hidden sm:inline-flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white bg-white/5 px-5 py-2.5 rounded-xl border border-white/10"
              >
                All Projects <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Main Animated Project Spotlight Card */}
          <div className="my-auto py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="glass-card rounded-[2.5rem] border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 min-h-[460px] md:min-h-[500px]"
              >
                {/* Left Side: Branded Visual Header Canvas (5 cols) */}
                <div className={`lg:col-span-5 relative overflow-hidden bg-gradient-to-br ${activeProject.bgGradient} flex flex-col justify-between p-8 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[260px] lg:min-h-full`}>
                  {/* Glow aura */}
                  <div 
                    className="absolute inset-0 opacity-50 blur-3xl"
                    style={{ background: `radial-gradient(circle at center, ${activeProject.glowColor} 0%, transparent 70%)` }}
                  />

                  {/* Top Canvas Bar */}
                  <div className="relative z-20 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-xl">
                      <activeProject.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${activeProject.badgeColor}`}>
                      {activeProject.category}
                    </span>
                  </div>

                  {/* Center Logo / Graphic */}
                  <div className="relative z-20 my-auto py-6 flex flex-col items-center text-center">
                    {activeProject.logo ? (
                      <div className="flex flex-col items-center space-y-3">
                        <div className={`relative flex items-center justify-center ${activeProject.logoBg || "bg-black/40 backdrop-blur-xl p-5 rounded-3xl border border-white/10 shadow-2xl"}`}>
                          <img 
                            src={activeProject.logo} 
                            alt={activeProject.title}
                            className="h-16 md:h-20 max-w-[220px] object-contain drop-shadow-2xl"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] font-mono">
                          {activeProject.subtitle}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-48 md:h-56 relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                        <img 
                          src={activeProject.image} 
                          alt={activeProject.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Counter */}
                  <div className="relative z-20 flex items-center justify-between text-white/30 text-[10px] font-mono font-bold tracking-widest uppercase">
                    <span>PROJECT {activeProject.number}</span>
                    <span>OF 04</span>
                  </div>
                </div>

                {/* Right Side: Content & Actions (7 cols) */}
                <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl md:text-5xl font-black text-white/10 font-mono tracking-tighter">
                        {activeProject.number}
                      </span>
                      <div>
                        <h3 className="text-2xl md:text-4xl font-black text-white font-display uppercase tracking-tight">
                          {activeProject.title}
                        </h3>
                        <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                          {activeProject.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-white/60 font-medium leading-relaxed my-6">
                      {activeProject.desc}
                    </p>

                    <div className="space-y-3 mb-8">
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">Key Capabilities</p>
                      <div className="flex flex-wrap gap-2.5">
                        {activeProject.features.map(feat => (
                          <div key={feat} className="flex items-center gap-2 text-[10px] font-bold text-white/70 uppercase tracking-wider bg-white/[0.04] px-4 py-2 rounded-xl border border-white/10">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <a 
                      href={activeProject.link}
                      target={activeProject.link.startsWith("/") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className={`inline-flex h-14 px-8 items-center bg-gradient-to-r ${activeProject.btnGradient} text-white text-[10px] font-black uppercase tracking-[0.25em] transition-all rounded-2xl w-full sm:w-auto justify-center group/btn shadow-xl`}
                    >
                      {activeProject.ctaText}
                      {activeProject.isApp ? (
                        <Smartphone className="ml-2.5 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      ) : (
                        <ArrowUpRight className="ml-2.5 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      )}
                    </a>

                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest hidden sm:block">
                      Scroll down for next project ↓
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Progress Bar across the 4 cards */}
          <div className="shrink-0 pt-4">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden flex">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className={`h-full transition-all duration-500 flex-1 ${
                    idx === activeIndex
                      ? "bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                      : idx < activeIndex
                      ? "bg-indigo-500/40"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
