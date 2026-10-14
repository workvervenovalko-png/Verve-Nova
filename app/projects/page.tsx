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
      logoBg: "bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl",
      bgGradient: "from-[#042111] via-[#0A4D27] to-[#02140A]",
      glowColor: "rgba(16, 185, 129, 0.35)",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
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
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
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
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
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
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
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
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
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
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200 font-bold",
      btnGradient: "from-[#1b67b2] to-[#15538e]",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["Project Tracking", "3D Architecture", "Client Dashboard"],
      ctaText: "Visit Live Project",
      isApp: false
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Portfolio of Excellence
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Our <span className="text-[#1b67b2]">Projects</span>
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed mb-12">
            Explore custom mobile applications, enterprise SaaS suites, and digital platforms engineered by Verve Nova.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#1b67b2] text-white border-[#1b67b2] shadow-md shadow-blue-500/20 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <div
              key={project.title}
              className="group rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full border border-slate-200 bg-white shadow-sm hover:border-[#1b67b2] hover:shadow-xl relative"
            >
              {/* Visual Media Header */}
              <div className={`aspect-[16/9] relative overflow-hidden bg-gradient-to-br ${project.bgGradient} flex items-center justify-center p-8 border-b border-slate-200`}>
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500 blur-2xl"
                  style={{ background: `radial-gradient(circle at center, ${project.glowColor} 0%, transparent 70%)` }}
                />

                {/* Top Badge Overlay */}
                <div className="absolute top-4 right-4 z-20">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border shadow-xs ${project.badgeColor}`}>
                    {project.badge}
                  </span>
                </div>

                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-sm">
                    <project.icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Main Graphic Presentation */}
                {project.logo ? (
                  <div className="w-full h-full relative flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform duration-500">
                    <div className={`relative flex items-center justify-center ${project.logoBg || "bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl"}`}>
                      <img 
                        src={project.logo} 
                        alt={project.title}
                        className="h-16 md:h-20 max-w-[200px] object-contain drop-shadow-2xl rounded-2xl"
                      />
                    </div>
                    <span className="text-xs font-bold text-white/70 uppercase tracking-widest font-mono mt-3">
                      {project.subtitle}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full relative overflow-hidden rounded-xl border border-white/20 shadow-md">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="mb-3">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight group-hover:text-[#1b67b2] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-bold text-[#1b67b2] uppercase tracking-wider mt-1">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 font-normal leading-relaxed mb-6 mt-2 line-clamp-3">
                  {project.desc}
                </p>
                
                {/* Feature Chips */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 uppercase tracking-wider bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1b67b2]" />
                      {feat}
                    </div>
                  ))}
                </div>

                {/* Primary Action Button */}
                <a 
                  href={project.link}
                  target={project.link.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex h-12 px-6 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-[11px] font-extrabold uppercase tracking-widest transition-all rounded-xl w-full justify-center group/btn shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <span>{project.ctaText}</span>
                  {project.isApp ? (
                    <Smartphone className="ml-2 w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  ) : (
                    <ArrowUpRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  )}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center border border-slate-200 bg-white relative overflow-hidden shadow-lg">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-slate-950">
            Ready to Build Your <br /> <span className="text-[#1b67b2]">Next Vision?</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-xl mx-auto font-normal">
            Let's architect a solution that defines your industry. From concept to global deployment.
          </p>
          <Link 
            href="/#contact" 
            className="inline-flex h-14 px-10 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/25 transition-all rounded-xl active:scale-95"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
