"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Cloud,
  Code2,
  Smartphone,
  Sparkles,
  Lock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Check,
  Server,
  Layers
} from "lucide-react";

interface BannerSlide {
  id: string;
  category: string;
  categoryIcon: React.ElementType;
  pillTags: string[];
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  cardTitle: string;
  cardSubtitle: string;
  cardIcon: React.ElementType;
  cardPoints: string[];
  cardFooter: string;
  accentColor: string; // "blue" | "orange"
}

const slides: BannerSlide[] = [
  {
    id: "cloud-devops",
    category: "Cloud Architecture",
    categoryIcon: Cloud,
    pillTags: ["Cloud Migration", "AWS & GCP", "DevOps CI/CD", "Kubernetes"],
    titlePrefix: "Unlock the Full Potential of",
    titleHighlight: "Cloud Systems",
    titleSuffix: "to Transform and Scale Your Business",
    description:
      "Enterprise AWS and multi-cloud infrastructure, automated CI/CD pipelines, and high-availability architecture engineered for 99.99% uptime and smooth scalability.",
    ctaText: "Get Cloud Consultation Now",
    ctaLink: "/contact",
    secondaryCtaText: "Explore Cloud Services",
    secondaryCtaLink: "/services",
    cardTitle: "Enterprise Cloud Systems",
    cardSubtitle: "AWS & Multi-Cloud Infrastructure Partner",
    cardIcon: Cloud,
    cardPoints: [
      "High-Availability Multi-Region Architecture",
      "Kubernetes & Docker Microservices",
      "99.99% Guaranteed Cloud SLA Uptime",
      "Zero-Downtime Cloud Migration Pipelines"
    ],
    cardFooter: "Verve Nova Technologies • Cloud Division",
    accentColor: "blue"
  },
  {
    id: "web-software",
    category: "Custom Web & SaaS",
    categoryIcon: Code2,
    pillTags: ["Next.js 15 & React", "Custom SaaS", "Microservices", "100% IP Transfer"],
    titlePrefix: "Build High-Performing",
    titleHighlight: "Web Applications & SaaS",
    titleSuffix: "Engineered for Rapid Scale",
    description:
      "Ultra-responsive digital platforms, internal enterprise tools, and high-conversion SaaS web applications engineered with Next.js 15, React, Node.js, and modern APIs.",
    ctaText: "Start Your Web Project",
    ctaLink: "/contact",
    secondaryCtaText: "View Web Engineering",
    secondaryCtaLink: "/services",
    cardTitle: "Custom Web Platforms & SaaS",
    cardSubtitle: "Full-Stack Enterprise Engineering",
    cardIcon: Code2,
    cardPoints: [
      "Next.js 15 & React Server Components",
      "Sub-Second Edge Page Performance",
      "Scalable REST & GraphQL Microservices",
      "100% Full Client IP & Source Code Transfer"
    ],
    cardFooter: "Verve Nova Technologies • Web Division",
    accentColor: "blue"
  },
  {
    id: "mobile-apps",
    category: "Mobile App Development",
    categoryIcon: Smartphone,
    pillTags: ["Flutter & React Native", "iOS & Android", "60 FPS Performance", "Dual Store Launch"],
    titlePrefix: "Launch Fluid & Intuitive",
    titleHighlight: "iOS & Android Apps",
    titleSuffix: "Built for Frictionless User Growth",
    description:
      "High-fidelity mobile applications designed for 5-star ratings. Cross-platform engineering with Flutter and React Native delivering 60fps native speed and biometric security.",
    ctaText: "Get Mobile App Consultation",
    ctaLink: "/contact",
    secondaryCtaText: "Explore Mobile Solutions",
    secondaryCtaLink: "/services",
    cardTitle: "Cross-Platform Mobile Apps",
    cardSubtitle: "iOS App Store & Google Play Ready",
    cardIcon: Smartphone,
    cardPoints: [
      "Flutter & React Native Architecture",
      "Native 60 FPS Smooth User Experience",
      "Biometric Security & Offline Data Sync",
      "End-to-End App Store Deployment & Support"
    ],
    cardFooter: "Verve Nova Technologies • Mobile Division",
    accentColor: "orange"
  },
  {
    id: "gen-ai",
    category: "Generative AI",
    categoryIcon: Sparkles,
    pillTags: ["Autonomous AI Agents", "Custom LLMs", "Vector RAG Pipelines", "Zero Data Leakage"],
    titlePrefix: "Accelerate Operations with",
    titleHighlight: "Generative AI & LLMs",
    titleSuffix: "Trained for Real Enterprise Impact",
    description:
      "Integrating domain-specific LLMs, intelligent RAG pipelines, autonomous customer support agents, and document processing to eliminate bottlenecks and multiply efficiency.",
    ctaText: "Discover AI Solutions",
    ctaLink: "/contact",
    secondaryCtaText: "Explore AI Capabilities",
    secondaryCtaLink: "/services",
    cardTitle: "Generative AI & Automation",
    cardSubtitle: "Enterprise LLM & Agentic Systems",
    cardIcon: Sparkles,
    cardPoints: [
      "Domain-Specific Custom LLM Fine-Tuning",
      "Enterprise Vector RAG Knowledge Retrieval",
      "Autonomous Multi-Agent Workflow Automation",
      "100% Private Hosting & Zero Data Leakage"
    ],
    cardFooter: "Verve Nova Technologies • AI Labz",
    accentColor: "blue"
  },
  {
    id: "cybersecurity",
    category: "Cybersecurity & VAPT",
    categoryIcon: Lock,
    pillTags: ["OWASP Top 10 Auditing", "Penetration Testing", "Zero-Trust Architecture", "MSME Registered"],
    titlePrefix: "Safeguard Digital Infrastructure with",
    titleHighlight: "Bank-Grade Security",
    titleSuffix: "and Comprehensive VAPT Audits",
    description:
      "Protecting enterprise applications and cloud infrastructure against modern vulnerabilities. Complete penetration testing, compliance hardening, and zero-trust security.",
    ctaText: "Request Security Audit",
    ctaLink: "/contact",
    secondaryCtaText: "Verify MSME Registration",
    secondaryCtaLink: "/verify",
    cardTitle: "Cybersecurity & VAPT Assurance",
    cardSubtitle: "Vulnerability Assessment & Pen Testing",
    cardIcon: ShieldCheck,
    cardPoints: [
      "OWASP Top 10 Vulnerability Assessment",
      "Rigorous Penetration Testing & Hardening",
      "End-to-End Encryption (AES-256 + TLS 1.3)",
      "Govt. Registered (UDYAM-UP-10-0047070)"
    ],
    cardFooter: "Verve Nova Technologies • SecOps Division",
    accentColor: "orange"
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto advance every 6 seconds unless paused on hover
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
      {/* Top Slide Quick Navigator Tabs (AppSquadz Style Category Switcher) */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-2.5 gap-2 scrollbar-none">
            {slides.map((s, idx) => {
              const Icon = s.categoryIcon;
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#1b67b2] text-white shadow-sm"
                      : "bg-white text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#1b67b2]"}`} />
                  <span>{s.category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Banner Slide Container */}
      <div className="relative min-h-[540px] lg:min-h-[580px] bg-gradient-to-b from-blue-50/50 via-slate-50/30 to-white text-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        
        {/* Subtle Static Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Headline, Tags, CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                
                {/* Main Headline with Highlight Pill */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.2] mb-5 text-slate-950">
                  {active.titlePrefix}{" "}
                  <span className={`inline-block px-3 py-1 rounded-xl text-white font-extrabold shadow-sm ${
                    active.accentColor === "orange" ? "bg-[#f9661b]" : "bg-[#1b67b2]"
                  }`}>
                    {active.titleHighlight}
                  </span>{" "}
                  {active.titleSuffix}
                </h1>

                {/* Sub-Feature Tags (AppSquadz Arrow Style) */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
                  {active.pillTags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm"
                    >
                      <span className="text-[#1b67b2] font-bold">↘</span>
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Body Description */}
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 mx-auto lg:mx-0">
                  {active.description}
                </p>

                {/* Single Primary & Secondary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mb-8">
                  <Link
                    href={active.ctaLink}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 hover:shadow-lg ${
                      active.accentColor === "orange"
                        ? "bg-[#f9661b] hover:bg-[#e05510]"
                        : "bg-[#1b67b2] hover:bg-[#15528e]"
                    }`}
                  >
                    <span>{active.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={active.secondaryCtaLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-200"
                  >
                    <span>{active.secondaryCtaText}</span>
                  </Link>
                </div>

                {/* Trust Points */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>99.99% SLA Uptime</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>100% Code Ownership</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>NDA & IP Confidentiality</span>
                  </span>
                </div>

              </div>

              {/* Right Column: Clean, Simple, Solid Enterprise Card (No black boxes, no green pings) */}
              <div className="lg:col-span-5 flex items-center justify-center relative py-4">
                <div className="relative w-full max-w-[440px] bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xl shadow-slate-200/60">
                  
                  {/* Card Header with Icon & Subtitle */}
                  <div className="flex items-center gap-4 pb-5 border-b border-slate-100 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0 ${
                      active.accentColor === "orange" ? "bg-[#f9661b]" : "bg-[#1b67b2]"
                    }`}>
                      {React.createElement(active.cardIcon, { className: "w-7 h-7" })}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                        {active.cardTitle}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">
                        {active.cardSubtitle}
                      </p>
                    </div>
                  </div>

                  {/* Clean 4-Point Checklist */}
                  <div className="space-y-3.5 mb-6">
                    {active.cardPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                          active.accentColor === "orange" ? "text-[#f9661b]" : "text-[#1b67b2]"
                        }`} />
                        <span className="text-xs font-semibold text-slate-800 leading-snug">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card Footer Tag */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>{active.cardFooter}</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Verified
                    </span>
                  </div>

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Bottom Navigation Controls (AppSquadz Expanding Bullets + Arrows) */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-8 mt-4 border-t border-slate-200/80 z-20">
          
          {/* Slide Indicator */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-[#1b67b2] font-black text-sm">0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{slides.length}</span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="hidden sm:inline-block text-slate-700 font-medium">{active.category}</span>
          </div>

          {/* AppSquadz Expanding Bullets */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentSlide
                    ? "w-9 bg-[#1b67b2]"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Left/Right Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
