"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  LayoutDashboard,
  Users,
  Cpu,
  Cloud,
  ShieldCheck,
  Star,
  CheckCircle2,
  Receipt,
  Store,
  Layers,
  Award,
  Zap,
  Lock,
  Globe
} from "lucide-react";

interface BannerSlide {
  id: string;
  category: string;
  brandTag: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  isExternalLink?: boolean;
  accentColor: "blue" | "orange";
  bgGradient: string;
  glowColor: string;
  stats: {
    icon: React.ElementType;
    number: string;
    label: string;
  }[];
}

const slides: BannerSlide[] = [
  {
    id: "verve-digital-engineering",
    category: "Software & Digital Engineering",
    brandTag: "Verve Nova:",
    headline: "Engineering Scalable Digital Solutions That Power Modern Businesses Worldwide",
    subtitle: "Enterprise digital engineering, custom software systems, AI automation, and mobile applications engineered to scale smoothly and drive measurable growth.",
    ctaText: "Start Your Project",
    ctaLink: "/contact",
    accentColor: "blue",
    bgGradient: "from-blue-50/40 via-sky-50/20 to-blue-100/30",
    glowColor: "rgba(27, 103, 178, 0.15)",
    stats: [
      {
        icon: Rocket,
        number: "50+",
        label: "Successful Projects Delivered"
      },
      {
        icon: Star,
        number: "100%",
        label: "Upwork Job Success Score"
      },
      {
        icon: Award,
        number: "4.9★",
        label: "Google Verified Client Rating"
      }
    ]
  },
  {
    id: "vnt-billzer",
    category: "Billing & Inventory SaaS",
    brandTag: "VNT Billzer:",
    headline: "Institutional-Grade SaaS Billing & High-Performance POS Platform",
    subtitle: "High-performance POS with neural analytics, real-time GST invoicing, and multi-store inventory synchronization built for modern retail leaders.",
    ctaText: "Explore VNT Billzer",
    ctaLink: "https://verve-ledger.vercel.app/",
    isExternalLink: true,
    accentColor: "orange",
    bgGradient: "from-orange-50/40 via-amber-50/20 to-orange-100/30",
    glowColor: "rgba(249, 102, 27, 0.15)",
    stats: [
      {
        icon: Receipt,
        number: "Instant",
        label: "Automated GST Invoicing"
      },
      {
        icon: Store,
        number: "Multi-Store",
        label: "Real-Time Inventory Sync"
      },
      {
        icon: Zap,
        number: "Live SaaS",
        label: "Cloud POS Production Suite"
      }
    ]
  },
  {
    id: "verve-crm",
    category: "Client Relationship Management",
    brandTag: "Verve CRM:",
    headline: "Intelligent Client Relationship Management System",
    subtitle: "Built to transform leads into lifelong customers. Automates the boring parts of sales so your team can focus on closing high-value deals.",
    ctaText: "Access Verve CRM",
    ctaLink: "https://www.vervenovatechcrm.online/login",
    isExternalLink: true,
    accentColor: "blue",
    bgGradient: "from-blue-50/40 via-slate-50/20 to-indigo-100/30",
    glowColor: "rgba(27, 103, 178, 0.15)",
    stats: [
      {
        icon: Users,
        number: "Automated",
        label: "Lead Pipeline & Smart Follow-ups"
      },
      {
        icon: LayoutDashboard,
        number: "Real-Time",
        label: "Sales Telemetry & Analytics"
      },
      {
        icon: CheckCircle2,
        number: "Live System",
        label: "Active Production CRM Suite"
      }
    ]
  },
  {
    id: "verve-erp",
    category: "Enterprise Resource Planning",
    brandTag: "Verve ERP:",
    headline: "Comprehensive Enterprise Resource Planning Orchestration",
    subtitle: "Integrates every department—from logistics and HR to finance and production—into a single high-performance source of truth.",
    ctaText: "Request ERP Demo",
    ctaLink: "/contact?service=erp",
    accentColor: "orange",
    bgGradient: "from-amber-50/40 via-orange-50/20 to-amber-100/30",
    glowColor: "rgba(249, 102, 27, 0.15)",
    stats: [
      {
        icon: Layers,
        number: "All-in-One",
        label: "Logistics, HR & Finance Engine"
      },
      {
        icon: Cpu,
        number: "Zero-Lag",
        label: "Cross-Department Operations Sync"
      },
      {
        icon: Globe,
        number: "Enterprise",
        label: "Early Access Deployment"
      }
    ]
  },
  {
    id: "cloud-ai-security",
    category: "Cloud, AI & Cybersecurity",
    brandTag: "Enterprise Services:",
    headline: "Next-Gen Cloud Architecture, AI Automation & VAPT Audits",
    subtitle: "AWS/GCP deployments, intelligent workflow chatbots, and bank-grade security audits backed by a Govt. of India registered enterprise.",
    ctaText: "Explore All Services",
    ctaLink: "/services",
    accentColor: "blue",
    bgGradient: "from-sky-50/40 via-blue-50/20 to-indigo-100/30",
    glowColor: "rgba(27, 103, 178, 0.15)",
    stats: [
      {
        icon: Cloud,
        number: "99.99%",
        label: "Cloud SLA Uptime Guarantee"
      },
      {
        icon: Award,
        number: "MSME Reg.",
        label: "UDYAM-UP-10-0047070"
      },
      {
        icon: ShieldCheck,
        number: "100% IP",
        label: "Full Source Code Ownership"
      }
    ]
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance every 6 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  const active = slides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-white pt-20 sm:pt-24 select-none"
    >
      {/* Main Banner Slide Container with Themed Ambient Glow - Full Viewport Height */}
      <div 
        className={`relative min-h-[calc(100vh-80px)] lg:min-h-[760px] bg-gradient-to-r ${active.bgGradient} text-slate-900 flex flex-col justify-between py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-14 border-b border-slate-200/80 transition-colors duration-700`}
      >
        {/* Ambient Warm Radial Spotlight on the Right */}
        <div 
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{ background: active.glowColor }}
        />

        {/* Subtle Decorative Line-Art Doodles in Corners (AppSquadz Style) */}
        <div className="absolute bottom-6 left-8 pointer-events-none opacity-25 hidden sm:block">
          <svg width="240" height="160" viewBox="0 0 180 120" fill="none" stroke={active.accentColor === "orange" ? "#f9661b" : "#1b67b2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M30 45 A14 14 0 1 1 48 45 C46 51 44 55 44 60 L34 60 C34 55 32 51 30 45 Z" />
            <line x1="35" y1="64" x2="43" y2="64" />
            <line x1="37" y1="68" x2="41" y2="68" />
            <circle cx="95" cy="70" r="10" strokeDasharray="3 3" />
            <circle cx="95" cy="70" r="5" />
            <circle cx="140" cy="35" r="5" />
            <circle cx="165" cy="55" r="4" />
            <circle cx="135" cy="75" r="4" />
            <line x1="140" y1="35" x2="165" y2="55" />
            <line x1="140" y1="35" x2="135" y2="75" />
            <rect x="15" y="80" width="22" height="18" rx="2" />
            <line x1="19" y1="86" x2="31" y2="86" />
            <line x1="19" y1="91" x2="27" y2="91" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
            >
              
              {/* Left Column: Headline, Divider, Subtitle, Pill Button */}
              <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
                
                {/* Main Headline (Real Verve Nova Brand Tag + Headline) */}
                <h1 className="text-3xl sm:text-4xl lg:text-[3.15rem] xl:text-[3.4rem] font-bold tracking-tight leading-[1.2] text-slate-950">
                  <span className={`font-extrabold ${active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"}`}>
                    {active.brandTag}
                  </span>{" "}
                  {active.headline}
                </h1>

                {/* Thin Subtle Horizontal Accent Divider Line */}
                <div 
                  className={`h-[2px] w-full max-w-[520px] my-6 mx-auto lg:mx-0 ${
                    active.accentColor === "orange"
                      ? "bg-gradient-to-r from-orange-400 via-amber-300 to-transparent"
                      : "bg-gradient-to-r from-blue-400 via-sky-300 to-transparent"
                  }`} 
                />

                {/* Subtitle Paragraph */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl mb-9 mx-auto lg:mx-0">
                  {active.subtitle}
                </p>

                {/* AppSquadz-Style Rounded-Full Solid Pill Button */}
                <div className="flex justify-center lg:justify-start">
                  {active.isExternalLink ? (
                    <a
                      href={active.ctaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-base sm:text-lg tracking-wide shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] ${
                        active.accentColor === "orange"
                          ? "bg-[#f9661b] hover:bg-[#e05510]"
                          : "bg-[#1b67b2] hover:bg-[#15528e]"
                      }`}
                    >
                      <span>{active.ctaText}</span>
                    </a>
                  ) : (
                    <Link
                      href={active.ctaLink}
                      className={`inline-flex items-center justify-center px-10 py-4 rounded-full text-white font-bold text-base sm:text-lg tracking-wide shadow-md transition-all duration-200 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] ${
                        active.accentColor === "orange"
                          ? "bg-[#f9661b] hover:bg-[#e05510]"
                          : "bg-[#1b67b2] hover:bg-[#15528e]"
                      }`}
                    >
                      <span>{active.ctaText}</span>
                    </Link>
                  )}
                </div>

              </div>

              {/* Right Column: 3 Real Verve Nova Stat Elements (Icons + Big Numbers + Labels) Side-by-Side */}
              <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
                <div className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-[620px]">
                  {active.stats.map((st, idx) => {
                    const IconComponent = st.icon;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center p-2 sm:p-4"
                      >
                        {/* Large Colored Illustration Icon */}
                        <div 
                          className={`w-16 h-16 sm:w-22 sm:h-22 flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110 ${
                            active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"
                          }`}
                        >
                          <IconComponent className="w-14 h-14 sm:w-18 sm:h-18 stroke-[1.8]" />
                        </div>

                        {/* Large Bold Stat Counter */}
                        <p 
                          className={`text-2xl sm:text-3xl lg:text-[2.4rem] font-extrabold tracking-tight mb-1.5 ${
                            active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"
                          }`}
                        >
                          {st.number}
                        </p>

                        {/* Clean Two-Line Description Label */}
                        <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug max-w-[150px]">
                          {st.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Bottom Navigation Dots (AppSquadz Style Centered Bullets) */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 pt-8 pb-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentSlide
                  ? active.accentColor === "orange"
                    ? "w-10 bg-[#f9661b]"
                    : "w-10 bg-[#1b67b2]"
                  : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
