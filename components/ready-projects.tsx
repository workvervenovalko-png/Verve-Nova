"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, CheckCircle2, Award, ShoppingBag, Wrench, Headphones, Building2 } from "lucide-react";
import Link from "next/link";

export function ReadyProjects() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: "ChotU (छोटू)",
      subtitle: "Hyperlocal Quick Commerce",
      category: "Mobile App Ecosystem",
      bgGradient: "from-[#042111] via-[#0A4D27] to-[#02140A]",
      glowColor: "rgba(16, 185, 129, 0.45)",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      logo: "/projects/chotu.png",
      logoBg: "bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl",
      icon: ShoppingBag,
      link: "/case-studies",
      isExternal: false,
    },
    {
      title: "ServiceHub",
      subtitle: "On-Demand Home Repairs",
      category: "Play Store Live App",
      bgGradient: "from-[#08152D] via-[#102958] to-[#050C1A]",
      glowColor: "rgba(59, 130, 246, 0.45)",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      logo: "/projects/servicehub.png",
      logoBg: "bg-white p-3 rounded-2xl shadow-2xl",
      icon: Wrench,
      link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
      isExternal: true,
    },
    {
      title: "Advance Transcription",
      subtitle: "Audio Speech-to-Text AI",
      category: "AI SaaS Platform",
      bgGradient: "from-[#190C2C] via-[#2D1650] to-[#0F071C]",
      glowColor: "rgba(168, 85, 247, 0.45)",
      badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      image: "/projects/transcription.png",
      icon: Headphones,
      link: "https://www.advancetranscription.com/",
      isExternal: true,
    },
    {
      title: "Siora Infra Design",
      subtitle: "3D Infrastructure Portal",
      category: "Enterprise Web Portal",
      bgGradient: "from-[#22160C] via-[#422B18] to-[#140D07]",
      glowColor: "rgba(245, 158, 11, 0.45)",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      image: "/projects/siora.png",
      icon: Building2,
      link: "https://siorainfradesign.com/",
      isExternal: true,
    },
  ];

  // For responsive sliding
  const maxSlides = projects.length - 2; // on 3-col view: projects.length - 2

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlides ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlides : prev - 1));
  };

  return (
    <section id="projects" className="pt-28 pb-20 bg-white border-b border-slate-200 scroll-mt-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading (AppSquadz Style: Clean & Centered) */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-slate-900 tracking-tight">
            Our Success Stories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 max-w-xl mx-auto">
            Discover how Verve Nova Technologies builds cutting-edge software solutions and scalable systems for modern enterprises.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows for Desktop */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:text-[#1b67b2] hover:border-[#1b67b2] transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-700 hover:text-[#1b67b2] hover:border-[#1b67b2] transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Cards Grid / Carousel Viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out gap-6"
              style={{
                transform: `translateX(-${currentSlide * 33.333}%)`,
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 flex flex-col group"
                >
                  {/* Top Colored Canvas Container with Rounded Corners */}
                  <div
                    className={`w-full aspect-[4/3] rounded-3xl bg-gradient-to-br ${project.bgGradient} p-5 flex items-center justify-center overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow border border-slate-200/60`}
                  >
                    {/* Ambient glow aura */}
                    <div
                      className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-500 blur-2xl pointer-events-none"
                      style={{ background: `radial-gradient(circle at center, ${project.glowColor} 0%, transparent 70%)` }}
                    />

                    {/* Top Right Category Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border backdrop-blur-md shadow-md ${project.badgeColor}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Top Left Icon Badge */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/15 shadow-md">
                        <project.icon className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Main Logo / Graphic Presentation */}
                    {project.logo ? (
                      <div className="relative z-10 flex flex-col items-center text-center space-y-3 group-hover:scale-105 transition-transform duration-500">
                        <div className={`relative flex items-center justify-center ${project.logoBg || "bg-black/40 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl"}`}>
                          <img
                            src={project.logo}
                            alt={project.title}
                            className="h-16 sm:h-20 max-w-[200px] object-contain drop-shadow-2xl rounded-2xl"
                          />
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-bold text-white/70 uppercase tracking-[0.3em] font-mono">
                          {project.subtitle}
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full relative rounded-2xl overflow-hidden flex items-center justify-center border border-white/10 shadow-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Compact Info Bar (Exact AppSquadz layout) */}
                  <div className="pt-4 pb-1 px-1 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#1b67b2] transition-colors truncate">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    <a
                      href={project.link}
                      target={project.isExternal ? "_blank" : "_self"}
                      rel={project.isExternal ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#1b67b2] text-[#1b67b2] text-xs font-bold hover:bg-[#1b67b2] hover:text-white transition-all shrink-0 cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Pagination Indicator (Exact AppSquadz Dots) */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: maxSlides + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  currentSlide === idx
                    ? "w-8 h-2 rounded-full bg-[#1b67b2]"
                    : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* AppSquadz-Style Official Compliance & Standards Logo Strip */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-slate-500">
              Verified Enterprise Compliance & Registrations
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 md:gap-20">
            {/* MSME Govt of India */}
            <Link
              href="/registry#msme-udyam"
              className="flex flex-col items-center group transition-transform hover:scale-105"
            >
              <div className="h-14 w-auto flex items-center justify-center">
                <img
                  src="/msme-udyam-registration.jpeg"
                  alt="Ministry of MSME, Govt. of India"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2 text-center group-hover:text-[#1b67b2]">
                Ministry of MSME, Govt. of India
              </span>
            </Link>

            {/* Udyam Certificate */}
            <Link
              href="/registry#msme-udyam"
              className="flex flex-col items-center group transition-transform hover:scale-105"
            >
              <div className="h-14 w-auto flex items-center justify-center">
                <img
                  src="/udyam.png"
                  alt="Udyam Registration"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-700 mt-2 text-center group-hover:text-[#1b67b2]">
                UDYAM-UP-10-0047070
              </span>
            </Link>

            {/* ISO 9001 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2]">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2 text-center">
                ISO 9001:2015 Quality
              </span>
            </div>

            {/* ISO 27001 */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1b67b2]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2 text-center">
                ISO 27001 Security
              </span>
            </div>

            {/* 100% NDA Protection */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-slate-700 mt-2 text-center">
                100% NDA Compliant
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
