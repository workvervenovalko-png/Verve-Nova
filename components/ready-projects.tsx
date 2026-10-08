"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, ChevronRight, ShoppingBag, Wrench, Smartphone, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

export function ReadyProjects() {
  const projects = [
    {
      title: "ChotU (छोटू)",
      subtitle: "Hyperlocal Quick Commerce",
      category: "Mobile App Ecosystem",
      desc: "Zero-commission hyperlocal kirana marketplace and instant delivery mobile app empowering neighborhood grocery stores with 1-5km delivery logistics.",
      logo: "/projects/chotu.png",
      bgGradient: "from-[#042111] via-[#0A4D27] to-[#02140A]",
      glowColor: "rgba(16, 185, 129, 0.35)",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      btnGradient: "from-emerald-600 to-teal-600 hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]",
      link: "/case-studies",
      icon: ShoppingBag,
      features: ["Zero Commission", "Barcode Catalog", "Geofenced Delivery"],
      ctaText: "View App Details",
      isApp: true
    },
    {
      title: "ServiceHub",
      subtitle: "On-Demand Home Repairs",
      category: "Play Store Live App",
      desc: "Enterprise handyman & home service Android app featuring real-time technician tracking, automated stock deduction, and Supabase backend.",
      logo: "/projects/servicehub.png",
      logoBg: "bg-white p-3 rounded-2xl shadow-2xl",
      bgGradient: "from-[#08152D] via-[#102958] to-[#050D1C]",
      glowColor: "rgba(59, 130, 246, 0.35)",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      btnGradient: "from-blue-600 to-cyan-600 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]",
      link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
      icon: Wrench,
      features: ["Live Tracking", "Stock Alerts", "Supabase Backend"],
      ctaText: "View On Play Store",
      isApp: true
    },
    {
      title: "Advance Transcription",
      subtitle: "Audio Speech-to-Text AI",
      category: "Utility Web Platform",
      desc: "An easy-to-use software that converts audio files into text quickly. Perfect for meetings, lectures, and corporate interviews.",
      image: "/projects/transcription.png",
      bgGradient: "from-[#190C2C] via-[#2D1650] to-[#0F071C]",
      glowColor: "rgba(168, 85, 247, 0.35)",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      btnGradient: "from-purple-600 to-indigo-600 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]",
      link: "https://www.advancetranscription.com/",
      icon: Headphones,
      features: ["Fast Conversion", "Simple Interface", "Secure Storage"],
      ctaText: "Visit Live Website",
      isApp: false
    },
    {
      title: "Siora Infra Design",
      subtitle: "3D Infrastructure Portal",
      category: "Enterprise Web Portal",
      desc: "A complete professional portal for construction and design companies to manage projects with dynamic 3D web experience.",
      image: "/projects/siora.png",
      bgGradient: "from-[#22160C] via-[#422B18] to-[#140D07]",
      glowColor: "rgba(245, 158, 11, 0.35)",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      btnGradient: "from-amber-600 to-orange-600 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["Project Tracking", "3D Architecture", "Client Dashboard"],
      ctaText: "Visit Live Website",
      isApp: false
    }
  ];

  return (
    <section id="projects" className="py-28 bg-[#09090C] border-y border-white/[0.04] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.05] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-20 text-center md:text-left">
          <div className="max-w-xl flex flex-col items-center md:items-start space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <Sparkles className="w-3.5 h-3.5" /> Client Engineering Showcase
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none font-display">
              Featured <span className="text-gradient font-black">Projects</span>
            </h2>
            <p className="text-base text-white/40 font-light leading-relaxed">
              Explore production-ready mobile applications and web platforms engineered for industry leaders.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="group flex items-center gap-3 text-[11px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-all bg-white/5 hover:bg-indigo-600 px-7 py-3.5 rounded-2xl border border-white/10 hover:border-transparent shadow-lg"
          >
            Explore Full Portfolio <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group glass-card rounded-[2.5rem] overflow-hidden hover:glass-card-hover transition-all duration-700 flex flex-col h-full border border-white/10 bg-white/[0.015] shadow-2xl hover:border-indigo-500/40 relative"
            >
              {/* Premium Hero Canvas */}
              <div className={`aspect-[16/9] relative overflow-hidden bg-gradient-to-br ${project.bgGradient} flex items-center justify-center p-8 border-b border-white/10`}>
                {/* Glow aura */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${project.glowColor} 0%, transparent 70%)` }}
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-5 right-5 z-20">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${project.badgeColor}`}>
                    {project.category}
                  </span>
                </div>

                <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/10 shadow-xl">
                    <project.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Main Logo / Graphic Presentation */}
                {project.logo ? (
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3 group-hover:scale-105 transition-transform duration-700">
                    <div className={`relative flex items-center justify-center ${project.logoBg || "bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl"}`}>
                      <img 
                        src={project.logo} 
                        alt={project.title}
                        className="h-16 md:h-20 max-w-[200px] object-contain drop-shadow-2xl"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.3em] font-mono">
                      {project.subtitle}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[10px] font-bold text-indigo-400/80 uppercase tracking-widest mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-white/50 font-medium leading-relaxed mb-8 mt-2 line-clamp-3">
                  {project.desc}
                </p>
                
                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2.5 mb-8 mt-auto">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2 text-[9.5px] font-bold text-white/40 uppercase tracking-wider bg-white/[0.03] px-3.5 py-1.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Primary Action Button */}
                <a 
                  href={project.link}
                  target={project.link.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className={`inline-flex h-14 px-8 items-center bg-gradient-to-r ${project.btnGradient} text-white text-[10px] font-black uppercase tracking-[0.25em] transition-all rounded-2xl w-full justify-center group/btn shadow-xl`}
                >
                  {project.ctaText}
                  {project.isApp ? (
                    <Smartphone className="ml-2.5 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  ) : (
                    <ArrowUpRight className="ml-2.5 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  )}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
