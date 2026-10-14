"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Server,
  Cloud,
  Zap,
  ShieldCheck,
  Code2,
  Rocket,
  FileCheck,
  Smartphone,
  Star,
  Sparkles,
  Cpu,
  Lock,
  Award,
  Layers,
  Activity,
  ArrowDownToLine,
  ThumbsUp,
  Brain
} from "lucide-react";

interface BannerSlide {
  id: string;
  category: string;
  brandTag: string;
  headline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  accentColor: string; // "orange" | "blue"
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
    id: "educrypt-style-web",
    category: "Web & SaaS",
    brandTag: "VerveWeb:",
    headline: "Custom Enterprise Web Platforms & Scalable SaaS",
    subtitle: "Empowering fast-growing enterprises with ultra-fast, secure, and customizable digital platforms built with Next.js 15 & React.",
    ctaText: "Explore More",
    ctaLink: "/services",
    accentColor: "orange",
    bgGradient: "from-orange-50/40 via-amber-50/20 to-orange-100/30",
    glowColor: "rgba(249, 102, 27, 0.15)",
    stats: [
      {
        icon: Rocket,
        number: "50+",
        label: "Enterprise Platforms Shipped Worldwide"
      },
      {
        icon: Zap,
        number: "<1.0s",
        label: "Sub-Second Core Web Vitals Speed"
      },
      {
        icon: FileCheck,
        number: "100%",
        label: "Full Source Code & IP Transfer"
      }
    ]
  },
  {
    id: "cloud-devops",
    category: "Cloud Systems",
    brandTag: "VerveCloud:",
    headline: "High-Performance AWS & Multi-Cloud Architecture",
    subtitle: "Architecting high-availability infrastructure, automated CI/CD pipelines, and Kubernetes microservices engineered for 99.99% uptime.",
    ctaText: "Get Cloud Consultation",
    ctaLink: "/contact",
    accentColor: "blue",
    bgGradient: "from-blue-50/40 via-sky-50/20 to-blue-100/30",
    glowColor: "rgba(27, 103, 178, 0.15)",
    stats: [
      {
        icon: Cloud,
        number: "99.99%",
        label: "Cloud SLA Uptime Guarantee"
      },
      {
        icon: Activity,
        number: "120ms",
        label: "Average Global Edge Latency"
      },
      {
        icon: ShieldCheck,
        number: "Multi-AZ",
        label: "High-Availability Redundancy"
      }
    ]
  },
  {
    id: "mobile-apps",
    category: "Mobile Apps",
    brandTag: "VerveMobile:",
    headline: "Fluid & Intuitive iOS and Android Applications",
    subtitle: "Delivering 60 FPS cross-platform mobile apps built with Flutter and React Native for frictionless user growth and 5-star ratings.",
    ctaText: "Explore Mobile Apps",
    ctaLink: "/services",
    accentColor: "orange",
    bgGradient: "from-amber-50/40 via-orange-50/20 to-amber-100/30",
    glowColor: "rgba(249, 102, 27, 0.15)",
    stats: [
      {
        icon: ArrowDownToLine,
        number: "2M+",
        label: "Active Mobile App User Downloads"
      },
      {
        icon: Star,
        number: "4.9★",
        label: "Average App Store & Play Store Rating"
      },
      {
        icon: ThumbsUp,
        number: "98%",
        label: "Client & User Retention Rate"
      }
    ]
  },
  {
    id: "gen-ai",
    category: "Generative AI",
    brandTag: "VerveAI:",
    headline: "Autonomous Enterprise AI & Custom LLM Systems",
    subtitle: "Deploying domain-specific LLMs, intelligent RAG knowledge retrieval, and autonomous agents that multiply operational efficiency.",
    ctaText: "Discover AI Labz",
    ctaLink: "/services",
    accentColor: "blue",
    bgGradient: "from-indigo-50/40 via-blue-50/20 to-indigo-100/30",
    glowColor: "rgba(27, 103, 178, 0.15)",
    stats: [
      {
        icon: Brain,
        number: "10x",
        label: "Workflow & Operations Acceleration"
      },
      {
        icon: Sparkles,
        number: "Custom",
        label: "Fine-Tuned Domain LLMs"
      },
      {
        icon: Lock,
        number: "100%",
        label: "Private Hosting & Zero Data Leakage"
      }
    ]
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity & VAPT",
    brandTag: "VerveSec:",
    headline: "Bank-Grade Digital Security & Rigorous VAPT Audits",
    subtitle: "Protecting enterprise assets from modern vulnerabilities. Comprehensive penetration testing, OWASP compliance, and zero-trust policies.",
    ctaText: "Request Security Audit",
    ctaLink: "/contact",
    accentColor: "orange",
    bgGradient: "from-orange-50/40 via-amber-50/20 to-orange-100/30",
    glowColor: "rgba(249, 102, 27, 0.15)",
    stats: [
      {
        icon: ShieldCheck,
        number: "OWASP",
        label: "Top 10 Full Matrix Audited"
      },
      {
        icon: Award,
        number: "Govt. Reg.",
        label: "MSME UDYAM-UP-10-0047070"
      },
      {
        icon: Lock,
        number: "AES-256",
        label: "End-to-End Encryption Standard"
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden bg-white pt-20 sm:pt-24 select-none"
    >
      {/* Main Banner Slide Container with Themed Ambient Glow */}
      <div 
        className={`relative min-h-[520px] lg:min-h-[560px] bg-gradient-to-r ${active.bgGradient} text-slate-900 flex flex-col justify-center py-14 px-4 sm:px-8 lg:px-14 border-b border-slate-200/80 transition-colors duration-700`}
      >
        {/* Ambient Warm Radial Spotlight on the Right */}
        <div 
          className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none transition-all duration-700"
          style={{ background: active.glowColor }}
        />

        {/* Subtle Decorative Line-Art Doodles in Corners (AppSquadz Style) */}
        <div className="absolute bottom-4 left-6 pointer-events-none opacity-25 hidden sm:block">
          <svg width="180" height="120" viewBox="0 0 180 120" fill="none" stroke={active.accentColor === "orange" ? "#f9661b" : "#1b67b2"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Lightbulb / Idea doodle */}
            <path d="M30 45 A14 14 0 1 1 48 45 C46 51 44 55 44 60 L34 60 C34 55 32 51 30 45 Z" />
            <line x1="35" y1="64" x2="43" y2="64" />
            <line x1="37" y1="68" x2="41" y2="68" />
            {/* Gear doodle */}
            <circle cx="95" cy="70" r="10" strokeDasharray="3 3" />
            <circle cx="95" cy="70" r="5" />
            {/* Molecule / Code node */}
            <circle cx="140" cy="35" r="5" />
            <circle cx="165" cy="55" r="4" />
            <circle cx="135" cy="75" r="4" />
            <line x1="140" y1="35" x2="165" y2="55" />
            <line x1="140" y1="35" x2="135" y2="75" />
            {/* Small book / pad */}
            <rect x="15" y="80" width="22" height="18" rx="2" />
            <line x1="19" y1="86" x2="31" y2="86" />
            <line x1="19" y1="91" x2="27" y2="91" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center"
            >
              
              {/* Left Column: Headline, Divider, Subtitle, Pill Button */}
              <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
                
                {/* Main Headline (Brand Tag Colored + Clean Headline Text) */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight leading-[1.25] text-slate-950">
                  <span className={`font-extrabold ${active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"}`}>
                    {active.brandTag}
                  </span>{" "}
                  {active.headline}
                </h1>

                {/* Thin Subtle Horizontal Accent Divider Line */}
                <div 
                  className={`h-[1.5px] w-full max-w-[480px] my-5 mx-auto lg:mx-0 ${
                    active.accentColor === "orange"
                      ? "bg-gradient-to-r from-orange-400 via-amber-300 to-transparent"
                      : "bg-gradient-to-r from-blue-400 via-sky-300 to-transparent"
                  }`} 
                />

                {/* Subtitle Paragraph */}
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl mb-7 mx-auto lg:mx-0">
                  {active.subtitle}
                </p>

                {/* AppSquadz-Style Rounded-Full Solid Pill Button */}
                <div className="flex justify-center lg:justify-start">
                  <Link
                    href={active.ctaLink}
                    className={`inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-bold text-sm sm:text-base tracking-wide shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] ${
                      active.accentColor === "orange"
                        ? "bg-[#f9661b] hover:bg-[#e05510]"
                        : "bg-[#1b67b2] hover:bg-[#15528e]"
                    }`}
                  >
                    <span>{active.ctaText}</span>
                  </Link>
                </div>

              </div>

              {/* Right Column: 3 Prominent Stat Elements (Icons + Big Numbers + Labels) Side-by-Side */}
              <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-[560px]">
                  {active.stats.map((st, idx) => {
                    const IconComponent = st.icon;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center p-2 sm:p-3"
                      >
                        {/* Large Colored Illustration Icon */}
                        <div 
                          className={`w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110 ${
                            active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"
                          }`}
                        >
                          <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 stroke-[1.8]" />
                        </div>

                        {/* Large Bold Stat Counter */}
                        <p 
                          className={`text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight mb-1 ${
                            active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"
                          }`}
                        >
                          {st.number}
                        </p>

                        {/* Clean Two-Line Description Label */}
                        <p className="text-xs sm:text-[13px] font-semibold text-slate-700 leading-snug max-w-[130px]">
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
        <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 pt-10 mt-2 z-20">
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
