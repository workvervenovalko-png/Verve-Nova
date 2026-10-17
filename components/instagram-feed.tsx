"use client";

import React, { useState } from "react";
import { 
  Instagram, 
  Play, 
  ArrowUpRight, 
  Film, 
  Layers, 
  Sparkles,
  Heart,
  ChevronRight,
  ChevronLeft,
  Code2,
  Cpu,
  ShieldCheck,
  Zap,
  ExternalLink
} from "lucide-react";
import Image from "next/image";

interface InstagramItem {
  id: string;
  type: "reel" | "post";
  url: string;
  image: string;
  title: string;
  tag: string;
  actionLabel: string;
  likes: number;
  comments: number;
  date: string;
  caption: string;
  duration?: string;
}

const ALL_POSTS: InstagramItem[] = [
  {
    id: "reel-1",
    type: "reel",
    url: "https://www.instagram.com/reel/DXUZzu-guyx/",
    image: "/instagram/post-1-reel.jpg",
    title: "Official Studio Launch 🚀",
    tag: "Studio Reveal",
    actionLabel: "STUDIO REVEAL",
    likes: 51,
    comments: 3,
    date: "April 19",
    caption: "Official launch of Verve Nova Technologies. Engineering high-concurrency cloud systems.",
    duration: "0:45"
  },
  {
    id: "post-2",
    type: "post",
    url: "https://www.instagram.com/p/DXb8-36Adng/",
    image: "/instagram/post-2-scale.jpg",
    title: "Build Smarter. Scale Faster ⚡",
    tag: "Engineering",
    actionLabel: "FULL-STACK ARCHITECTURE",
    likes: 11,
    comments: 0,
    date: "April 22",
    caption: "From idea to execution: Full-stack dev, AI & automation, custom ERP, and cybersecurity."
  },
  {
    id: "reel-3",
    type: "reel",
    url: "https://www.instagram.com/reel/DXzFz3ghcEU/",
    image: "/instagram/post-3-systems.jpg",
    title: "Building Smarter Systems 💡",
    tag: "Architecture",
    actionLabel: "SMARTER SYSTEMS",
    likes: 41,
    comments: 0,
    date: "May 1",
    caption: "What looks simple on the surface is designed to save hundreds of manual hours behind the scenes.",
    duration: "0:30"
  },
  {
    id: "post-4",
    type: "post",
    url: "https://www.instagram.com/p/DZJwWFDlFDD/",
    image: "/instagram/post-4-website.jpg",
    title: "The Architecture Blueprint 📑",
    tag: "Tech Playbook",
    actionLabel: "TECH PLAYBOOK",
    likes: 45,
    comments: 0,
    date: "June 3",
    caption: "Complete breakdown of high-performance modern web platforms and enterprise scale."
  },
  {
    id: "post-5",
    type: "post",
    url: "https://www.instagram.com/p/DXeaXMClGP0/",
    image: "/instagram/post-5-invisible.jpg",
    title: "Don't Be Invisible Online ⚡",
    tag: "Digital Growth",
    actionLabel: "DIGITAL MOAT",
    likes: 11,
    comments: 0,
    date: "April 23",
    caption: "Businesses fail when they are invisible online. Build your high-converting digital platform."
  },
  {
    id: "post-6",
    type: "post",
    url: "https://www.instagram.com/p/DXZY4KSlAEE/",
    image: "/instagram/post-6-startup.jpg",
    title: "Why Startups Fail: Bad Tech 🚨",
    tag: "Startup Tech",
    actionLabel: "STARTUP TECH",
    likes: 10,
    comments: 0,
    date: "April 21",
    caption: "Slow performance and wrong tech stacks silently kill growth. Engineering is your growth engine."
  }
];

export function InstagramFeed() {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [spotlightOffset, setSpotlightOffset] = useState(0);

  // Spotlight carousel pool (cycling through the remaining posts)
  const spotlightPool = [
    ALL_POSTS[1], // post-2
    ALL_POSTS[2], // reel-3
    ALL_POSTS[3], // post-4
    ALL_POSTS[4], // post-5
    ALL_POSTS[5], // post-6
    ALL_POSTS[1]  // wrap
  ];

  const currentSpotlightCards = spotlightPool.slice(spotlightOffset, spotlightOffset + 3);

  const nextSpotlight = () => {
    setSpotlightOffset((prev) => (prev + 1 > spotlightPool.length - 3 ? 0 : prev + 1));
  };

  const prevSpotlight = () => {
    setSpotlightOffset((prev) => (prev - 1 < 0 ? spotlightPool.length - 3 : prev - 1));
  };

  return (
    <section className="pt-28 pb-20 lg:pt-32 lg:pb-24 bg-[#FAF8F5] relative overflow-hidden border-b border-slate-200 scroll-mt-32" id="instagram-feed">
      {/* Dynamic Keyframes for Equalizer & Live Playing Effect */}
      <style jsx global>{`
        @keyframes eq1 { 0%, 100% { height: 6px; } 50% { height: 22px; } }
        @keyframes eq2 { 0%, 100% { height: 18px; } 50% { height: 8px; } }
        @keyframes eq3 { 0%, 100% { height: 10px; } 50% { height: 26px; } }
        @keyframes eq4 { 0%, 100% { height: 20px; } 50% { height: 6px; } }
        @keyframes reelProgress { 0% { width: 0%; } 100% { width: 100%; } }
      `}</style>

      {/* Subtle warm background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-amber-500/[0.03] via-rose-500/[0.03] to-transparent blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ══════════════════════════════════════════════════════════
            1. TOP SECTION: HEADER + DOODLED ANNOTATIONS
            ══════════════════════════════════════════════════════════ */}
        <div className="relative text-center mb-12 sm:mb-16 pt-2">
          
          {/* Eyebrow dots */}
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-[0.22em] text-slate-500 uppercase mb-3">
            <span>REAL ARCHITECTURE</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span>REAL SYSTEMS</span>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <span>REAL SCALE</span>
          </div>

          {/* Main Title with Heart / Sparkle Motif */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-serif italic sm:not-italic">
            Follow Our Instagram Journey{" "}
            <span className="inline-block text-rose-500 font-sans font-light not-italic text-3xl sm:text-5xl">♡</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 font-normal leading-relaxed">
            From behind-the-scenes architecture to high-concurrency cloud systems — see how our engineering studio builds for the future.
          </p>

          {/* Left Doodle: "Instagram Reels + Posts showcase" with arrow */}
          <div className="hidden lg:flex items-center gap-2 absolute left-4 -bottom-4 text-slate-500 pointer-events-none select-none">
            <div className="text-left font-serif italic text-xs leading-tight tracking-tight text-slate-600">
              <span>Instagram</span><br />
              <span>Reels + Posts</span><br />
              <span className="text-[11px] text-slate-500">showcase</span>
            </div>
            {/* Curved Arrow SVG pointing down-right */}
            <svg width="45" height="40" viewBox="0 0 45 40" fill="none" className="text-slate-500 rotate-12 -translate-y-1">
              <path d="M5 8 C 15 2, 28 8, 32 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
              <path d="M26 22 L 32 25 L 34 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right Doodle: "Interactive & Live Dispatch ♡" with arrow */}
          <div className="hidden lg:flex items-center gap-2 absolute right-6 -bottom-4 text-slate-500 pointer-events-none select-none">
            {/* Sparkle burst lines */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="text-slate-400">
              <path d="M15 4 L 15 10 M 15 20 L 15 26 M 4 15 L 10 15 M 20 15 L 26 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <div className="text-right font-serif italic text-xs leading-tight tracking-tight text-slate-600">
              <span>Interactive</span><br />
              <span>& Live Dispatch</span>
              <span className="block text-[11px] text-rose-500">♡</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. FEATURED SPOTLIGHT BANNER (BEIGE/WARM STUDIO CONTAINER)
            ══════════════════════════════════════════════════════════ */}
        <div className="bg-[#EFE9DF] rounded-3xl sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 mb-16 border border-[#E3DBD0] shadow-sm relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">

            {/* 🔴 Left Featured Reel Card (Large 9:16 portrait) */}
            <div className="lg:col-span-3">
              <div 
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 group aspect-[9/15] bg-slate-950"
                onMouseEnter={() => setHoveredCardId(ALL_POSTS[0].id)}
                onMouseLeave={() => setHoveredCardId(null)}
                onClick={() => window.open(ALL_POSTS[0].url, "_blank", "noopener,noreferrer")}
              >
                {/* Background Image */}
                <img 
                  src={ALL_POSTS[0].image} 
                  alt={ALL_POSTS[0].title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCardId === ALL_POSTS[0].id ? "scale-110 brightness-95" : "scale-100 brightness-90"
                  }`}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/60" />

                {/* Top REEL Badge & Live Progress Bar */}
                <div className="absolute top-3 inset-x-3 z-10 flex flex-col gap-2">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-white rounded-full ${
                        hoveredCardId === ALL_POSTS[0].id ? "animate-[reelProgress_4s_linear_infinite]" : "w-0"
                      }`} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase border border-white/20">
                      REEL
                    </span>
                    <span className="w-6 h-6 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white text-xs">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Center Play Button (Morphs to Animated Equalizer on Hover) */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  {hoveredCardId === ALL_POSTS[0].id ? (
                    <div className="w-14 h-14 rounded-full bg-black/75 backdrop-blur-md border border-rose-400/60 flex items-center justify-center shadow-xl">
                      <div className="flex items-end gap-1 h-6">
                        <span className="w-1 bg-rose-400 rounded-full" style={{ animation: "eq1 0.6s ease-in-out infinite" }} />
                        <span className="w-1 bg-amber-300 rounded-full" style={{ animation: "eq2 0.8s ease-in-out infinite" }} />
                        <span className="w-1 bg-white rounded-full" style={{ animation: "eq3 0.5s ease-in-out infinite" }} />
                        <span className="w-1 bg-pink-400 rounded-full" style={{ animation: "eq4 0.7s ease-in-out infinite" }} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </div>
                  )}
                </div>

                {/* Bottom Card Info */}
                <div className="absolute bottom-3 inset-x-3 z-10">
                  <h4 className="text-white font-bold text-xs sm:text-sm drop-shadow-md line-clamp-1">
                    Watch the making
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                    <span className="font-serif italic text-white/90">From idea to launch ♡</span>
                    <span className="font-mono text-white/90">{ALL_POSTS[0].duration || "0:45"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 💬 Center-Left Text Block: "Behind the Architecture" */}
            <div className="lg:col-span-3 px-2 lg:px-4 py-2 text-left">
              <span className="text-rose-500 text-xl font-light block mb-2">♡</span>
              
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-3">
                Behind<br />the Architecture
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Get a closer look at the code, cloud systems, and little engineering details that make every platform special.
              </p>

              <a
                href="https://www.instagram.com/vntech_global/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#3D3A37] hover:bg-slate-900 text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow"
              >
                <span>Watch More Reels</span>
                <span>→</span>
              </a>

              <div className="mt-5">
                <a
                  href="https://www.instagram.com/vntech_global/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-950 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-slate-700" />
                  <span className="underline underline-offset-2">View on Instagram</span>
                </a>
              </div>
            </div>

            {/* 🖼️ Right 3 Spotlight Cards + Carousel Button */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {currentSpotlightCards.map((item, idx) => {
                  const isHovered = hoveredCardId === `spotlight-${item.id}-${idx}`;

                  return (
                    <div
                      key={`spotlight-${item.id}-${idx}`}
                      onMouseEnter={() => setHoveredCardId(`spotlight-${item.id}-${idx}`)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-slate-950 aspect-[9/15] shadow-sm transition-all duration-400 group ${
                        isHovered ? "scale-105 shadow-xl -translate-y-1.5" : "hover:shadow-md"
                      }`}
                    >
                      {/* Background Thumbnail */}
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${
                          isHovered ? "scale-110 brightness-95" : "scale-100 brightness-90"
                        }`}
                      />

                      {/* Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                      {/* Top Type Indicator */}
                      <div className="absolute top-2.5 right-2.5 z-10">
                        <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Center Hover Equalizer / Play indicator */}
                      {isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg animate-in fade-in zoom-in-90 duration-200">
                            <Play className="w-4 h-4 fill-white translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Pill (Exact Match to Reference Style) */}
                      <div className="absolute bottom-3 inset-x-2.5 z-10">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold tracking-wider uppercase w-full justify-center text-center">
                          {idx === 0 && <Sparkles className="w-3 h-3 text-amber-300" />}
                          {idx === 1 && <Code2 className="w-3 h-3 text-rose-300" />}
                          {idx === 2 && <Zap className="w-3 h-3 text-sky-300" />}
                          <span className="truncate">{item.actionLabel}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Carousel Next Arrow Circle Button (Positioned on the Right Edge) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSpotlight();
                }}
                aria-label="Next spotlight items"
                className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white hover:bg-slate-900 hover:text-white text-slate-800 shadow-lg border border-slate-200/80 items-center justify-center z-20 transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            3. MIDDLE ROW: "Latest from Instagram" (6 SQUARE CARDS)
            ══════════════════════════════════════════════════════════ */}
        <div className="mb-16">
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] flex items-center justify-center shadow-xs">
                <div className="w-full h-full rounded-[6px] bg-white flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-[#dc2743]" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Latest from Instagram
              </h3>
            </div>

            <a
              href="https://www.instagram.com/vntech_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-950 transition-colors"
            >
              <span>Follow us @vntech_global</span>
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          {/* 6 Square Grid Cards (Single line on desktop, clean responsive grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {ALL_POSTS.map((item) => {
              const isHovered = hoveredCardId === `grid-${item.id}`;
              const isReel = item.type === "reel";

              return (
                <div
                  key={`grid-${item.id}`}
                  onMouseEnter={() => setHoveredCardId(`grid-${item.id}`)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer bg-slate-950 aspect-square border border-slate-200/90 shadow-2xs transition-all duration-300 group ${
                    isHovered ? "scale-105 shadow-xl -translate-y-1 z-20 ring-2 ring-rose-400" : "hover:shadow-md"
                  }`}
                >
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isHovered ? "scale-115 brightness-90" : "scale-100 brightness-95"
                    }`}
                  />

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isHovered 
                      ? "bg-gradient-to-t from-black/85 via-black/40 to-black/20 opacity-100" 
                      : "bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-80"
                  }`} />

                  {/* Top Badges (Exact match to reference: play icon left, card icon right) */}
                  <div className="absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none">
                    <span className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                      {isReel ? <Play className="w-2.5 h-2.5 fill-white" /> : <Layers className="w-2.5 h-2.5" />}
                    </span>
                    <span className="w-5 h-5 rounded-md bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90">
                      <span className="w-2 h-2 rounded-xs border border-white" />
                    </span>
                  </div>

                  {/* Hover Information / Like count */}
                  <div className={`absolute inset-x-2.5 bottom-2.5 z-10 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                  }`}>
                    <p className="text-[10px] text-white font-bold leading-tight line-clamp-1 mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-slate-300">
                      <span className="inline-flex items-center gap-1 text-rose-300 font-bold">
                        <Heart className="w-2.5 h-2.5 fill-rose-300" />
                        <span>{item.likes}</span>
                      </span>
                      <span className="text-white font-bold uppercase tracking-wider">
                        Watch ↗
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════
            4. BOTTOM COMMUNITY BANNER ("Join Our Tech & Innovation Community")
            ══════════════════════════════════════════════════════════ */}
        <div className="bg-[#DFE7DD] rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 text-center relative overflow-hidden border border-[#D2DDD0] shadow-sm mb-12">
          
          {/* Left Hand-Drawn Doodle */}
          <div className="hidden md:flex items-center gap-2 absolute left-8 top-1/2 -translate-y-1/2 text-slate-600 select-none pointer-events-none">
            <div className="font-serif italic text-xs leading-tight text-slate-700">
              <span>More</span><br />
              <span>on Instagram</span>
              <span className="block text-rose-500 text-xs">♡</span>
            </div>
            {/* Curved arrow pointing towards the follow button */}
            <svg width="45" height="35" viewBox="0 0 45 35" fill="none" className="text-slate-600">
              <path d="M5 25 C 15 30, 30 25, 38 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
              <path d="M30 10 L 39 12 L 38 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right Hand-Drawn Doodle: Tech Innovation & Code */}
          <div className="hidden md:flex items-center gap-3 absolute right-8 top-1/2 -translate-y-1/2 text-slate-600 select-none pointer-events-none">
            {/* Tech Doodle: Code / Flower nodes */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-slate-600">
              <path d="M12 14 L 6 20 L 12 26 M 28 14 L 34 20 L 28 26 M 22 10 L 18 30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="font-serif italic text-xs leading-tight text-slate-700 text-left">
              <span>Built with</span><br />
              <span>precision</span>
              <span className="block text-rose-500 text-xs">♡</span>
            </div>
          </div>

          {/* Center Content */}
          <div className="max-w-xl mx-auto relative z-10">
            {/* Instagram Camera Icon */}
            <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md mx-auto flex items-center justify-center text-slate-800 mb-3 shadow-xs border border-white">
              <Instagram className="w-5 h-5 text-slate-800" />
            </div>

            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">
              Join Our Tech & Innovation Community
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 max-w-md mx-auto">
              Follow us for architecture breakdowns, system design insights, and live product drops.
            </p>

            <a
              href="https://www.instagram.com/vntech_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3D3A37] hover:bg-slate-950 text-white text-xs sm:text-sm font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span>Follow @vntech_global</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            5. BOTTOM VALUE BADGES STRIP (4 TRUST PILLARS)
            ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-200/80 text-slate-600 text-xs font-semibold">
          <div className="flex items-center justify-center gap-2 py-2">
            <Sparkles className="w-4 h-4 text-slate-800" />
            <span>High-Concurrency Cloud</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            <span>Bespoke Engineering</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 27001 Certified Security</span>
          </div>
          <div className="flex items-center justify-center gap-2 py-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>99.9% Production Uptime</span>
          </div>
        </div>

      </div>
    </section>
  );
}
