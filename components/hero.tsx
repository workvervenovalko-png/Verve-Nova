"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Cloud,
  Server,
  Code2,
  Smartphone,
  Sparkles,
  Lock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Cpu,
  Database,
  Terminal,
  Activity,
  Layers,
  Zap,
  Globe,
  Radio
} from "lucide-react";

interface BannerSlide {
  id: string;
  category: string;
  badgeIcon: React.ElementType;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  highlightColor: string; // e.g. text-[#1b67b2] or text-[#f9661b]
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  stats: { value: string; label: string }[];
  visualType: "cloud" | "web" | "mobile" | "ai" | "security";
  bgGradient: string;
}

const slides: BannerSlide[] = [
  {
    id: "cloud-devops",
    category: "Cloud Architecture & DevOps Systems",
    badgeIcon: Cloud,
    titlePrefix: "Engineering High-Performance",
    titleHighlight: "Cloud & DevOps",
    titleSuffix: "Systems Built for 99.99% Uptime",
    highlightColor: "text-[#1b67b2]",
    description:
      "Enterprise AWS and multi-cloud infrastructure, Kubernetes container orchestration, and zero-downtime automated CI/CD pipelines engineered to handle millions of requests seamlessly.",
    primaryCtaText: "Explore Cloud Services",
    primaryCtaLink: "/services",
    secondaryCtaText: "Schedule Architecture Audit",
    secondaryCtaLink: "/contact",
    stats: [
      { value: "99.99%", label: "Cloud SLA Uptime" },
      { value: "120ms", label: "Edge Latency" },
      { value: "Multi-Region", label: "AWS & GCP Clusters" },
    ],
    visualType: "cloud",
    bgGradient: "from-blue-50/80 via-slate-50/50 to-white",
  },
  {
    id: "web-software",
    category: "Custom Web & SaaS Engineering",
    badgeIcon: Code2,
    titlePrefix: "Custom Enterprise",
    titleHighlight: "Web Applications & SaaS",
    titleSuffix: "Engineered For Rapid Scale",
    highlightColor: "text-[#1b67b2]",
    description:
      "Building ultra-responsive digital platforms, complex internal tools, and high-conversion SaaS web applications with Next.js 15, React, Node.js, and modular microservices.",
    primaryCtaText: "View Web Engineering",
    primaryCtaLink: "/services",
    secondaryCtaText: "See Case Studies",
    secondaryCtaLink: "/case-studies",
    stats: [
      { value: "<1.0s", label: "Core Web Vitals" },
      { value: "100%", label: "Full IP Transfer" },
      { value: "50+", label: "Web Apps Shipped" },
    ],
    visualType: "web",
    bgGradient: "from-indigo-50/70 via-slate-50/50 to-white",
  },
  {
    id: "mobile-apps",
    category: "Cross-Platform Mobile Applications",
    badgeIcon: Smartphone,
    titlePrefix: "Fluid & Intuitive",
    titleHighlight: "iOS & Android Apps",
    titleSuffix: "Built For Frictionless User Growth",
    highlightColor: "text-[#f9661b]",
    description:
      "Delivering high-fidelity consumer and enterprise mobile applications built with Flutter, React Native, and Swift. Engineered for 60fps native speed, biometric security, and offline sync.",
    primaryCtaText: "Explore Mobile Solutions",
    primaryCtaLink: "/services",
    secondaryCtaText: "Get App Estimate",
    secondaryCtaLink: "/contact",
    stats: [
      { value: "60 FPS", label: "Native Performance" },
      { value: "Dual Store", label: "App & Play Store Ready" },
      { value: "4.9★", label: "User Experience Rating" },
    ],
    visualType: "mobile",
    bgGradient: "from-orange-50/70 via-slate-50/50 to-white",
  },
  {
    id: "gen-ai",
    category: "Generative AI & Autonomous Automation",
    badgeIcon: Sparkles,
    titlePrefix: "Transforming Business With",
    titleHighlight: "Generative AI & LLMs",
    titleSuffix: "Trained For Real-World ROI",
    highlightColor: "text-[#1b67b2]",
    description:
      "Integrating domain-specific LLMs, intelligent RAG pipelines, autonomous customer support agents, and AI document processing to eliminate manual bottlenecks and multiply operational efficiency.",
    primaryCtaText: "Discover AI Solutions",
    primaryCtaLink: "/services",
    secondaryCtaText: "Schedule AI Discovery",
    secondaryCtaLink: "/contact",
    stats: [
      { value: "10x", label: "Workflow Acceleration" },
      { value: "Custom LLMs", label: "Fine-Tuned Models" },
      { value: "100% Private", label: "Zero Data Leakage" },
    ],
    visualType: "ai",
    bgGradient: "from-violet-50/70 via-slate-50/50 to-white",
  },
  {
    id: "cybersecurity",
    category: "Enterprise Cybersecurity & VAPT",
    badgeIcon: Lock,
    titlePrefix: "Bank-Grade Digital Protection &",
    titleHighlight: "Rigorous VAPT Audits",
    titleSuffix: "To Fortify Your Assets",
    highlightColor: "text-[#f9661b]",
    description:
      "Comprehensive vulnerability assessment and penetration testing (VAPT), OWASP compliance auditing, zero-trust network design, and 24/7 security posture hardening for modern digital enterprises.",
    primaryCtaText: "Request Security Audit",
    primaryCtaLink: "/services",
    secondaryCtaText: "Verify MSME Registration",
    secondaryCtaLink: "/verify",
    stats: [
      { value: "OWASP", label: "Full Matrix Audited" },
      { value: "Zero-Trust", label: "Network Architecture" },
      { value: "ISO & MSME", label: "Govt. Compliant" },
    ],
    visualType: "security",
    bgGradient: "from-emerald-50/60 via-slate-50/50 to-white",
  },
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
      {/* Top Slide Quick Navigator Tabs (AppSquadz Style Category Switcher) */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto py-2.5 gap-2 scrollbar-none">
            {slides.map((s, idx) => {
              const Icon = s.badgeIcon;
              const isActive = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#1b67b2] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#1b67b2]"}`} />
                  <span>{s.category.split("&")[0].trim()}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Banner Slide Container */}
      <div className={`relative min-h-[580px] lg:min-h-[620px] bg-gradient-to-b ${active.bgGradient} text-slate-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200 transition-colors duration-700`}>
        
        {/* Subtle Ambient Decorative Mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1b67b2]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#f9661b]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Left Column: Headlines & Content */}
              <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
                
                {/* Category Pill Badge */}
                <div className="flex items-center justify-center lg:justify-start mb-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1b67b2] text-xs font-bold uppercase tracking-wider shadow-sm">
                    {React.createElement(active.badgeIcon, { className: "w-4 h-4 text-[#1b67b2]" })}
                    <span>{active.category}</span>
                  </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold tracking-tight leading-[1.15] mb-5 text-slate-950 uppercase">
                  {active.titlePrefix}{" "}
                  <span className={active.highlightColor}>{active.titleHighlight}</span>{" "}
                  {active.titleSuffix}
                </h1>

                {/* Body Description */}
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mb-8 mx-auto lg:mx-0">
                  {active.description}
                </p>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                  <Link
                    href={active.primaryCtaLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#1b67b2] hover:bg-[#15528e] text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>{active.primaryCtaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href={active.secondaryCtaLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 hover:border-slate-400 shadow-sm transition-all duration-300"
                  >
                    <span>{active.secondaryCtaText}</span>
                  </Link>
                </div>

                {/* Slide Domain Stats Strip */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0">
                  {active.stats.map((st, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <p className="text-lg sm:text-xl font-black text-slate-900">{st.value}</p>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-500 leading-tight">{st.label}</p>
                    </div>
                  ))}
                </div>

              </div>

              {/* Right Column: Dynamic Tailored Graphic Visual for each slide */}
              <div className="lg:col-span-5 flex items-center justify-center relative py-4">
                <BannerVisual graphic={active.visualType} />
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Bottom Navigation Controls (Arrows + AppSquadz Expanding Pills) */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-8 mt-4 border-t border-slate-200/60 z-20">
          
          {/* Slide Indicator Counter */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span className="text-[#1b67b2] font-black text-sm">0{currentSlide + 1}</span>
            <span>/</span>
            <span>0{slides.length}</span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
            <span className="hidden sm:inline-block text-slate-700 font-medium">{active.category}</span>
          </div>

          {/* Expanding AppSquadz Style Navigation Bullets */}
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

// Tailored Enterprise Graphic Components matching each slide topic cleanly
function BannerVisual({ graphic }: { graphic: BannerSlide["visualType"] }) {
  switch (graphic) {
    case "cloud":
      return <CloudArchitectureVisual />;
    case "web":
      return <WebPlatformVisual />;
    case "mobile":
      return <MobileAppsVisual />;
    case "ai":
      return <GenerativeAiVisual />;
    case "security":
      return <CybersecurityVisual />;
    default:
      return <CloudArchitectureVisual />;
  }
}

// 1. Cloud Architecture & Infrastructure Visual
function CloudArchitectureVisual() {
  return (
    <div className="relative w-full max-w-[460px] bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="text-xs font-mono font-bold text-slate-600 ml-2">aws-multi-cluster-vpc</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Active SLA: 99.99%</span>
        </div>
      </div>

      {/* Cloud Nodes Diagram */}
      <div className="space-y-3.5">
        {/* Tier 1: Cloud Gateway */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1b67b2] text-white flex items-center justify-center font-bold">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">CloudFront CDN & API Gateway</p>
              <p className="text-[10px] font-medium text-slate-500">Global Anycast Routing • 120ms Edge</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-blue-100 text-[#1b67b2] text-[10px] font-bold">Traffic: 4.8M req/s</span>
        </div>

        {/* Tier 2: Microservices Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Server className="w-4 h-4 text-[#1b67b2]" />
              <p className="text-xs font-bold text-slate-800">Kubernetes Pods</p>
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Auto-scaling Node Group</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#1b67b2] h-full w-[78%]" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 mb-1.5">
              <Database className="w-4 h-4 text-[#f9661b]" />
              <p className="text-xs font-bold text-slate-800">Aurora DB Cluster</p>
            </div>
            <p className="text-[10px] text-slate-500 mb-2">Multi-AZ Read Replicas</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#f9661b] h-full w-[45%]" />
            </div>
          </div>
        </div>

        {/* Tier 3: Telemetry Bar */}
        <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-[11px] text-slate-300">Region: us-east-1 + ap-south-1</span>
          </div>
          <span className="text-emerald-400 font-bold text-[11px]">0 errors detected</span>
        </div>
      </div>
    </div>
  );
}

// 2. Custom Web & SaaS Engineering Visual
function WebPlatformVisual() {
  return (
    <div className="relative w-full max-w-[460px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <div className="bg-slate-100 px-3 py-1 rounded-md text-[11px] font-mono text-slate-600 flex items-center gap-1.5 ml-2">
            <Lock className="w-3 h-3 text-emerald-600" />
            <span>https://app.enterprise-client.com</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Next.js 15</span>
      </div>

      {/* Dashboard Preview */}
      <div className="space-y-3">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-medium">Monthly Active</p>
            <p className="text-sm font-black text-slate-900">248,920</p>
            <span className="text-[9px] text-emerald-600 font-bold">↑ 28.4% growth</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-medium">API Latency</p>
            <p className="text-sm font-black text-slate-900">42ms</p>
            <span className="text-[9px] text-emerald-600 font-bold">Optimal Speed</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-medium">Conversion</p>
            <p className="text-sm font-black text-slate-900">14.8%</p>
            <span className="text-[9px] text-blue-600 font-bold">Top Quartile</span>
          </div>
        </div>

        {/* Code Snippet Drawer */}
        <div className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-[11px] leading-relaxed">
          <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-[10px]">
            <span className="flex items-center gap-1.5"><Terminal className="w-3 h-3 text-[#1b67b2]" /> api/checkout/route.ts</span>
            <span className="text-emerald-400">200 OK (38ms)</span>
          </div>
          <p><span className="text-purple-400">export async function</span> <span className="text-blue-400">POST</span>(req: Request) &#123;</p>
          <p className="pl-3 text-slate-400">// Enterprise Microservice Pipeline</p>
          <p className="pl-3"><span className="text-purple-400">const</span> payload = <span className="text-amber-300">await</span> req.json();</p>
          <p className="pl-3"><span className="text-purple-400">return</span> Response.json(&#123; <span className="text-emerald-300">status</span>: <span className="text-emerald-300">"SUCCESS"</span> &#125;);</p>
          <p>&#125;</p>
        </div>

        {/* Lighthouse Score Bar */}
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white font-black text-xs flex items-center justify-center">
              99
            </div>
            <span className="text-xs font-bold text-slate-800">Google Lighthouse Score</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">Enterprise Verified</span>
        </div>
      </div>
    </div>
  );
}

// 3. Mobile Apps (iOS & Android) Visual
function MobileAppsVisual() {
  return (
    <div className="relative w-full max-w-[460px] flex items-center justify-center py-2">
      {/* Primary Phone Mockup */}
      <div className="relative w-[240px] sm:w-[260px] bg-slate-950 rounded-[38px] p-3 shadow-2xl border-4 border-slate-800 z-10">
        {/* Notch */}
        <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3" />
        
        {/* Screen Content */}
        <div className="bg-white rounded-[26px] p-3.5 space-y-3 min-h-[340px]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Digital Wallet</p>
              <p className="text-sm font-black text-slate-900">$84,250.00</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-100 text-[#f9661b] flex items-center justify-center font-bold text-xs">
              VN
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-700">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">Send</div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">Receive</div>
            <div className="p-2 rounded-xl bg-[#1b67b2] text-white">Invest</div>
          </div>

          {/* Activity List */}
          <div className="space-y-2 pt-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Live Transactions</p>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs">
              <span className="font-bold text-slate-800">Stripe Global Payout</span>
              <span className="font-bold text-emerald-600">+$12,400</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 text-xs">
              <span className="font-bold text-slate-800">AWS Cloud Bill</span>
              <span className="font-bold text-slate-700">-$1,840</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[10px] font-black text-emerald-700 uppercase">Biometric Auth Verified ✓</span>
          </div>
        </div>
      </div>

      {/* Floating Badges */}
      <div className="absolute -top-1 -right-2 sm:right-2 z-20 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-2.5 shadow-lg">
        <p className="text-[10px] font-bold text-slate-500">Cross-Platform</p>
        <p className="text-xs font-black text-[#1b67b2]">Flutter & React Native</p>
      </div>

      <div className="absolute -bottom-2 -left-2 sm:left-2 z-20 bg-slate-900 text-white rounded-2xl p-2.5 shadow-xl">
        <p className="text-[9px] text-slate-400 font-bold uppercase">Store Ready</p>
        <p className="text-xs font-black text-emerald-400">iOS & Android 60 FPS</p>
      </div>
    </div>
  );
}

// 4. Generative AI & Automation Visual
function GenerativeAiVisual() {
  return (
    <div className="relative w-full max-w-[460px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-900">VNT GenAI Autonomous Engine</p>
            <p className="text-[10px] text-slate-500">Fine-Tuned LLM • Vector RAG Database</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold">RAG Active</span>
      </div>

      {/* Interactive AI Prompt & Response Flow */}
      <div className="space-y-3">
        {/* User Prompt */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Incoming Enterprise Query</p>
          <p className="text-slate-800 font-medium">"Analyze Q3 cloud consumption & generate optimization playbook"</p>
        </div>

        {/* Neural Processing Pipeline */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-blue-500/10 border border-violet-200/80 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-violet-900">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-violet-600 animate-spin" /> Vector Embedding & Reasoning</span>
            <span className="text-[10px] text-violet-600">32ms</span>
          </div>
          <div className="w-full bg-violet-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-violet-600 h-full w-[85%]" />
          </div>
        </div>

        {/* AI Output Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-100 text-xs space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span className="text-emerald-400 font-bold">✓ Autonomous Response</span>
            <span>Tokens: 1,420</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            Identified 3 idle RDS replicas. Downscaled to save <span className="text-emerald-400 font-bold">$4,200/mo</span>. Auto-scaling rules applied across 4 clusters.
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-between pt-1 text-[10px] font-bold text-slate-500">
          <span>Zero Data Leakage Policy</span>
          <span className="text-violet-600">Private Enterprise Hosting</span>
        </div>
      </div>
    </div>
  );
}

// 5. Cybersecurity & VAPT Visual
function CybersecurityVisual() {
  return (
    <div className="relative w-full max-w-[460px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-2xl shadow-blue-500/10">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-900">Zero-Trust SecOps Console</p>
            <p className="text-[10px] text-slate-500">VAPT Auditing & Penetration Testing</p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Protected</span>
      </div>

      {/* Security Shield & Auditing Grid */}
      <div className="space-y-3">
        {/* Status Strip */}
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black text-slate-900">0 Critical Vulnerabilities</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">Passed OWASP</span>
        </div>

        {/* Audit Pillars */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Network Security</p>
            <p className="text-xs font-black text-slate-900">DDoS & WAF Active</p>
            <span className="text-[9px] text-emerald-600 font-bold">100% Block Rate</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <p className="text-[10px] text-slate-500 font-bold uppercase">Data Encryption</p>
            <p className="text-xs font-black text-slate-900">AES-256 + TLS 1.3</p>
            <span className="text-[9px] text-blue-600 font-bold">At Rest & Transit</span>
          </div>
        </div>

        {/* Terminal Log */}
        <div className="p-3 rounded-xl bg-slate-950 text-slate-300 font-mono text-[10px] space-y-1">
          <p className="text-slate-400">$ vnt-security audit --target production-api</p>
          <p className="text-emerald-400">✓ SQL Injection: SAFE</p>
          <p className="text-emerald-400">✓ XSS & CSRF Token Validation: SAFE</p>
          <p className="text-emerald-400">✓ Identity & RBAC Enforcement: VERIFIED</p>
        </div>

        {/* MSME & ISO Note */}
        <div className="p-2 rounded-xl bg-slate-100 text-center text-[10px] font-bold text-slate-700">
          Govt. Registered Enterprise • UDYAM-UP-10-0047070
        </div>
      </div>
    </div>
  );
}
