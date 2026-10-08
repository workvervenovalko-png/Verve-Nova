"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, Globe, LayoutDashboard, Users, ShoppingBag, Wrench, Smartphone, Sparkles, Filter } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Mobile Apps", "SaaS Products", "Enterprise & Portals"];

  const allProjects = [
    {
      title: "ChotU (छोटू)",
      subtitle: "Hyperlocal Quick Commerce",
      category: "Mobile Apps",
      badge: "Mobile App Ecosystem",
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
      category: "Mobile Apps",
      badge: "Play Store Live App",
      desc: "Enterprise handyman and home-repair mobile application with automated stock alerts, Supabase realtime engine, FCM siren alerts, and customer-technician wallets.",
      logo: "/projects/servicehub.png",
      logoBg: "bg-white p-3 rounded-2xl shadow-2xl",
      bgGradient: "from-[#08152D] via-[#102958] to-[#050C1A]",
      glowColor: "rgba(59, 130, 246, 0.35)",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      btnGradient: "from-blue-600 to-cyan-600 hover:shadow-[0_0_35px_rgba(59,130,246,0.5)]",
      link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
      icon: Wrench,
      features: ["Live Tracking", "Stock Deduction", "FCM Siren Alerts"],
      ctaText: "View On Play Store",
      isApp: true
    },
    {
      title: "VNT Billzer",
      subtitle: "Retail POS & Inventory Suite",
      category: "SaaS Products",
      badge: "Flagship SaaS Suite",
      desc: "Institutional-grade SaaS billing and inventory management platform for retail leaders and business owners.",
      image: "/projects/billzer.png",
      bgGradient: "from-[#0B1528] via-[#152B52] to-[#080E1C]",
      glowColor: "rgba(99, 102, 241, 0.35)",
      badgeColor: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      btnGradient: "from-indigo-600 to-blue-600 hover:shadow-[0_0_35px_rgba(99,102,241,0.5)]",
      link: "https://verve-ledger.vercel.app/",
      icon: LayoutDashboard,
      features: ["Neural Analytics", "Unified POS", "Stock Management"],
      ctaText: "Visit Live Project",
      isApp: false
    },
    {
      title: "Verve CRM",
      subtitle: "Intelligent Client Retain Engine",
      category: "SaaS Products",
      badge: "Sales Automation",
      desc: "Intelligent client relationship management system designed to automate sales pipeline and maximize lead retention.",
      image: "/projects/crm.png",
      bgGradient: "from-[#1B0B2E] via-[#331358] to-[#11071F]",
      glowColor: "rgba(139, 92, 246, 0.35)",
      badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
      btnGradient: "from-violet-600 to-purple-600 hover:shadow-[0_0_35px_rgba(139,92,246,0.5)]",
      link: "https://www.vervenovatechcrm.online/login",
      icon: Users,
      features: ["Sales Automation", "Lead Tracking", "Team Insights"],
      ctaText: "Visit Live Project",
      isApp: false
    },
    {
      title: "Advance Transcription",
      subtitle: "Audio Speech-to-Text AI",
      category: "Enterprise & Portals",
      badge: "Utility Software",
      desc: "An easy-to-use software that converts audio files into text quickly. Perfect for meetings, lectures, and corporate interviews.",
      image: "/projects/transcription.png",
      bgGradient: "from-[#190C2C] via-[#2D1650] to-[#0F071C]",
      glowColor: "rgba(168, 85, 247, 0.35)",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      btnGradient: "from-purple-600 to-indigo-600 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]",
      link: "https://www.advancetranscription.com/",
      icon: Headphones,
      features: ["Fast Conversion", "Simple Interface", "Secure Storage"],
      ctaText: "Visit Live Project",
      isApp: false
    },
    {
      title: "Siora Infra Design",
      subtitle: "3D Construction Architecture Portal",
      category: "Enterprise & Portals",
      badge: "Industry Portal",
      desc: "A complete professional portal for construction and design companies to manage projects with interactive 3D web experience.",
      image: "/projects/siora.png",
      bgGradient: "from-[#22160C] via-[#422B18] to-[#140D07]",
      glowColor: "rgba(245, 158, 11, 0.35)",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      btnGradient: "from-amber-600 to-orange-600 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)]",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["Project Tracking", "3D Architecture", "Client Dashboard"],
      ctaText: "Visit Live Project",
      isApp: false
    },
    {
      title: "Chakshura",
      subtitle: "Strategic Intelligence Radar",
      category: "Enterprise & Portals",
      badge: "Defence AI Platform",
      desc: "AI-Powered Strategic Foresight & Real-Time Intelligence Radar for Global Defence Networks. (SIH Winning Project for DRDO)",
      image: "/projects/chakshura.png",
      bgGradient: "from-[#081B2B] via-[#0D304D] to-[#05111B]",
      glowColor: "rgba(14, 165, 233, 0.35)",
      badgeColor: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      btnGradient: "from-sky-600 to-blue-600 hover:shadow-[0_0_35px_rgba(14,165,233,0.5)]",
      link: "https://chak-shuraa.vercel.app/",
      icon: Globe,
      features: ["Patent Intelligence", "Market Analytics", "TRL Prediction"],
      ctaText: "Visit Live Project",
      isApp: false
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#09090C] text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-40 pb-16 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] bg-indigo-600/[0.06] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Portfolio of Excellence
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8 font-display"
          >
            Our <span className="text-gradient">Projects</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12"
          >
            Explore custom mobile applications, enterprise SaaS suites, and digital platforms engineered by Verve Nova.
          </motion.p>

          {/* Interactive Category Filter Pills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.4)] scale-105"
                    : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group glass-card rounded-[2.5rem] overflow-hidden hover:glass-card-hover transition-all duration-700 flex flex-col h-full border border-white/10 bg-white/[0.015] shadow-2xl hover:border-indigo-500/40 relative"
            >
              {/* Premium Hero Canvas Header */}
              <div className={`aspect-[16/9] relative overflow-hidden bg-gradient-to-br ${project.bgGradient} flex items-center justify-center p-8 border-b border-white/10`}>
                {/* Glow aura */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-700 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${project.glowColor} 0%, transparent 70%)` }}
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-5 right-5 z-20">
                  <span className={`text-[8.5px] font-black uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-full border backdrop-blur-md shadow-lg ${project.badgeColor}`}>
                    {project.badge}
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
                        className="h-16 max-w-[180px] object-contain drop-shadow-2xl"
                      />
                    </div>
                    <span className="text-[9.5px] font-bold text-white/50 uppercase tracking-[0.3em] font-mono">
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
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-2xl font-black text-white font-display uppercase tracking-tight group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[9.5px] font-bold text-indigo-400/80 uppercase tracking-widest mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs text-white/50 font-medium leading-relaxed mb-8 mt-2 line-clamp-3">
                  {project.desc}
                </p>
                
                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-1.5 text-[9px] font-bold text-white/40 uppercase tracking-wider bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
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
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 font-display">
            Ready to Build Your <br /> <span className="text-gradient">Next Vision?</span>
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-medium">
            Let's architect a solution that defines your industry. From concept to global deployment.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex h-16 px-12 items-center bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all rounded-2xl shadow-2xl"
          >
            Start Your Project <ArrowUpRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
