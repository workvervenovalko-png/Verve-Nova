"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, ChevronRight, ChevronLeft, ShoppingBag, Wrench, Smartphone, Sparkles, Play, Pause } from "lucide-react";
import Link from "next/link";

export function ReadyProjects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

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
      bgGradient: "from-[#08152D] via-[#102958] to-[#050C1A]",
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

  useEffect(() => {
    if (!isAutoplay) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoplay, projects.length]);

  const activeProject = projects[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="py-24 bg-[#070709] border-y border-white/[0.04] relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-indigo-600/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-12 text-center md:text-left">
          <div className="max-w-xl flex flex-col items-center md:items-start space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9.5px] font-black uppercase tracking-[0.4em]">
              <Sparkles className="w-3.5 h-3.5" /> Client Engineering Spotlight
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter font-display">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-sm text-white/40 font-light leading-relaxed">
              Explore 4 high-impact mobile applications and web platforms engineered for industry leaders.
            </p>
          </div>

          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-[10.5px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-all bg-white/5 hover:bg-indigo-600 px-6 py-3 rounded-2xl border border-white/10 shadow-lg"
          >
            All Projects Portfolio <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Project Selector Tabs Bar (1 Row, 4 Cards Navigation) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {projects.map((p, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setIsAutoplay(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex items-center gap-3 ${
                  isActive
                    ? "bg-white/[0.06] border-indigo-500/60 shadow-[0_0_25px_rgba(99,102,241,0.25)] scale-[1.02]"
                    : "bg-white/[0.015] border-white/10 text-white/40 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                  isActive ? "bg-indigo-600 text-white shadow-md" : "bg-white/5 text-white/40"
                }`}>
                  {p.number}
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className={`text-xs font-black uppercase truncate ${isActive ? "text-white" : "text-white/60"}`}>
                    {p.title}
                  </h4>
                  <p className="text-[9px] font-bold text-indigo-400/80 uppercase truncate">
                    {p.category}
                  </p>
                </div>

                {isActive && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Spotlight Card Display (1 Card at a time) */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="glass-card rounded-[2.5rem] border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl relative grid grid-cols-1 lg:grid-cols-12 min-h-[480px]"
            >
              {/* Left Side: Branded Visual Canvas (5 cols) */}
              <div className={`lg:col-span-5 relative overflow-hidden bg-gradient-to-br ${activeProject.bgGradient} flex flex-col justify-between p-8 border-b lg:border-b-0 lg:border-r border-white/10 min-h-[260px] lg:min-h-full`}>
                {/* Glow aura */}
                <div 
                  className="absolute inset-0 opacity-50 blur-3xl pointer-events-none"
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
                <div className="relative z-20 my-auto py-8 flex flex-col items-center text-center">
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
                <div className="relative z-20 flex items-center justify-between text-white/40 text-[10px] font-mono font-bold tracking-widest uppercase">
                  <span>PROJECT {activeProject.number}</span>
                  <span>OF 04</span>
                </div>
              </div>

              {/* Right Side: Content & Actions (7 cols) */}
              <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
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

                    {/* Navigation Control Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          handlePrev();
                          setIsAutoplay(false);
                        }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        title="Previous Project"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          handleNext();
                          setIsAutoplay(false);
                        }}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        title="Next Project"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
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
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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

                  <div className="flex items-center gap-3 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                    <span>{activeIndex + 1} / 4</span>
                    <button
                      onClick={() => setIsAutoplay(!isAutoplay)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                      title={isAutoplay ? "Pause Autoplay" : "Resume Autoplay"}
                    >
                      {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
