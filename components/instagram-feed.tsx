"use client";

import React, { useState, useRef } from "react";
import { 
  Instagram, 
  Play, 
  ArrowUpRight, 
  Film, 
  Layers, 
  Sparkles,
  Heart,
  ChevronRight,
  Code2,
  Zap,
  Volume2,
  VolumeX
} from "lucide-react";
import Image from "next/image";

interface InstagramItem {
  id: string;
  type: "reel" | "post";
  url: string;
  image: string;
  videoUrl?: string;
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
    videoUrl: "/instagram/reel-1.mp4",
    title: "Official Studio Launch 🚀",
    tag: "Studio Reveal",
    actionLabel: "STUDIO REVEAL",
    likes: 51,
    comments: 3,
    date: "April 19",
    caption: "Official launch of Verve Nova Technologies. Engineering high-concurrency cloud systems.",
    duration: "0:16"
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
    videoUrl: "/instagram/reel-3.mp4",
    title: "Building Smarter Systems 💡",
    tag: "Architecture",
    actionLabel: "SMARTER SYSTEMS",
    likes: 41,
    comments: 0,
    date: "May 1",
    caption: "What looks simple on the surface is designed to save hundreds of manual hours behind the scenes.",
    duration: "0:39"
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
  const [isMuted, setIsMuted] = useState(true);

  // Video element references
  const featuredVideoRef = useRef<HTMLVideoElement>(null);
  const spotlightVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const gridVideoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Featured reel hover play handler
  const handleFeaturedEnter = () => {
    setHoveredCardId("featured-reel");
    if (featuredVideoRef.current) {
      featuredVideoRef.current.currentTime = 0;
      featuredVideoRef.current.play().catch(() => {});
    }
  };

  const handleFeaturedLeave = () => {
    setHoveredCardId(null);
    if (featuredVideoRef.current) {
      featuredVideoRef.current.pause();
    }
  };

  // Spotlight cards hover play handler
  const handleSpotlightEnter = (key: string) => {
    setHoveredCardId(key);
    const video = spotlightVideoRefs.current[key];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleSpotlightLeave = (key: string) => {
    setHoveredCardId(null);
    const video = spotlightVideoRefs.current[key];
    if (video) {
      video.pause();
    }
  };

  // Grid cards hover play handler
  const handleGridEnter = (key: string) => {
    setHoveredCardId(key);
    const video = gridVideoRefs.current[key];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleGridLeave = (key: string) => {
    setHoveredCardId(null);
    const video = gridVideoRefs.current[key];
    if (video) {
      video.pause();
    }
  };

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

  return (
    <section className="py-20 lg:py-24 bg-slate-50/60 relative overflow-hidden border-y border-slate-200/80 scroll-mt-24" id="instagram-feed">
      {/* Progress animation keyframe */}
      <style jsx global>{`
        @keyframes reelProgress { 0% { width: 0%; } 100% { width: 100%; } }
      `}</style>

      {/* Subtle modern ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-gradient-to-r from-pink-500/[0.03] via-indigo-500/[0.04] to-cyan-500/[0.03] blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* ══════════════════════════════════════════════════════════
            1. TOP SECTION: MODERN TECH STUDIO HEADER
            ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-12 pb-6 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-pink-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] animate-pulse" />
              <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              <span className="text-[11px] font-black">Official Studio Dispatch</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Follow The Studio{" "}
              <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
                @vntech_global
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1.5 max-w-xl">
              Hover over any reel to watch real live video playback. Tap to open directly on Instagram.
            </p>
          </div>

          {/* Follow Button */}
          <a
            href="https://www.instagram.com/vntech_global/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all duration-300 shrink-0"
          >
            <div className="w-5 h-5 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                <Image src="/vnt-logo.png" alt="VNT" width={14} height={14} className="object-contain" />
              </div>
            </div>
            <span>Follow @vntech_global</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-pink-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
          </a>
        </div>

        {/* ══════════════════════════════════════════════════════════
            2. FEATURED SPOTLIGHT BANNER (CLEAN TECH STUDIO CONTAINER)
            ══════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 mb-14 border border-slate-200/90 shadow-sm relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* 🔴 Left Featured Reel Card (PLAYS REAL VIDEO ON HOVER) */}
            <div className="lg:col-span-3">
              <div 
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group aspect-[9/15] bg-black"
                onMouseEnter={handleFeaturedEnter}
                onMouseLeave={handleFeaturedLeave}
                onClick={() => window.open(ALL_POSTS[0].url, "_blank", "noopener,noreferrer")}
              >
                {/* 🎥 REAL REEL VIDEO */}
                <video
                  ref={featuredVideoRef}
                  src="/instagram/reel-1.mp4"
                  poster="/instagram/post-1-reel.jpg"
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                    hoveredCardId === "featured-reel" ? "opacity-100 scale-105" : "opacity-90 scale-100"
                  }`}
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60 pointer-events-none" />

                {/* Top REEL Badge & Live Progress Bar */}
                <div className="absolute top-3 inset-x-3 z-10 flex flex-col gap-2">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 rounded-full ${
                        hoveredCardId === "featured-reel" ? "animate-[reelProgress_16s_linear_infinite]" : "w-0"
                      }`} 
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-wider uppercase border border-white/20">
                      REEL
                    </span>
                    
                    {/* Audio Mute/Unmute Toggle Button */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted(!isMuted);
                        }}
                        className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                        title={isMuted ? "Unmute audio" : "Mute audio"}
                      >
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-300" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-300" />}
                      </button>

                      <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white text-xs">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Indicator (Hidden while actively playing) */}
                {hoveredCardId !== "featured-reel" && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}

                {/* Playing Live Indicator Badge when Hovered */}
                {hoveredCardId === "featured-reel" && (
                  <div className="absolute top-12 left-3 z-10 animate-in fade-in duration-200">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-500/50 text-[9px] font-mono text-pink-300 font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      <span>PLAYING REEL</span>
                    </span>
                  </div>
                )}

                {/* Bottom Card Info */}
                <div className="absolute bottom-3 inset-x-3 z-10 pointer-events-none">
                  <h4 className="text-white font-black text-xs sm:text-sm drop-shadow-md line-clamp-1 uppercase tracking-tight">
                    Watch the making
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mt-1">
                    <span className="text-white/90 font-medium">Official Launch</span>
                    <span className="font-mono text-white/90">{ALL_POSTS[0].duration || "0:16"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 💬 Center-Left Text Block: "Behind the Architecture" */}
            <div className="lg:col-span-3 px-2 lg:px-4 py-2 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
                <Code2 className="w-3.5 h-3.5" />
                <span>Inside The Studio</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase leading-tight mb-3">
                Behind The<br />Architecture
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                Get an inside look at our engineering workflows, microservices, and bespoke software systems built for high-growth enterprises.
              </p>

              <a
                href="https://www.instagram.com/vntech_global/reels/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-xs font-bold tracking-wide transition-all shadow-sm hover:shadow"
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
                  <Instagram className="w-4 h-4 text-pink-600" />
                  <span className="underline underline-offset-2">View on Instagram</span>
                </a>
              </div>
            </div>

            {/* 🖼️ Right 3 Spotlight Cards + Carousel Button */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {currentSpotlightCards.map((item, idx) => {
                  const cardKey = `spotlight-${item.id}-${idx}`;
                  const isHovered = hoveredCardId === cardKey;
                  const hasVideo = !!item.videoUrl;

                  return (
                    <div
                      key={cardKey}
                      onMouseEnter={() => handleSpotlightEnter(cardKey)}
                      onMouseLeave={() => handleSpotlightLeave(cardKey)}
                      onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                      className={`relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer bg-black aspect-[9/15] shadow-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
                        isHovered ? "scale-105 shadow-xl -translate-y-1.5 z-20 ring-2 ring-pink-500/80" : "hover:shadow-md"
                      }`}
                    >
                      {/* REAL VIDEO or IMAGE */}
                      {hasVideo ? (
                        <video
                          ref={(el) => { spotlightVideoRefs.current[cardKey] = el; }}
                          src={item.videoUrl}
                          poster={item.image}
                          loop
                          muted={isMuted}
                          playsInline
                          preload="auto"
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isHovered ? "scale-105 brightness-100" : "scale-100 brightness-90"
                          }`}
                        />
                      ) : (
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className={`w-full h-full object-cover transition-transform duration-500 ${
                            isHovered ? "scale-110 brightness-95" : "scale-100 brightness-90"
                          }`}
                        />
                      )}

                      {/* Vignette Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                      {/* Top Type Indicator */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
                        {hasVideo && (
                          <span className="px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[8px] font-black tracking-wider text-rose-300 border border-white/20 uppercase">
                            REEL
                          </span>
                        )}
                        <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white">
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>

                      {/* Center Play Indicator when not hovered */}
                      {!isHovered && hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                          <div className="w-9 h-9 rounded-full bg-black/55 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md">
                            <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Pill */}
                      <div className="absolute bottom-3 inset-x-2.5 z-10 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/65 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-wider uppercase w-full justify-center text-center">
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

              {/* Carousel Next Arrow Circle Button */}
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
        <div className="mb-14">
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] flex items-center justify-center shadow-xs">
                <div className="w-full h-full rounded-[6px] bg-white flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-[#dc2743]" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 uppercase tracking-tight">
                Latest from Instagram
              </h3>
            </div>

            <a
              href="https://www.instagram.com/vntech_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-950 transition-colors"
            >
              <span>Follow us @vntech_global</span>
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          {/* 6 Square Grid Cards (PLAYS REAL VIDEO ON HOVER FOR REELS) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {ALL_POSTS.map((item) => {
              const cardKey = `grid-${item.id}`;
              const isHovered = hoveredCardId === cardKey;
              const hasVideo = !!item.videoUrl;

              return (
                <div
                  key={cardKey}
                  onMouseEnter={() => handleGridEnter(cardKey)}
                  onMouseLeave={() => handleGridLeave(cardKey)}
                  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer bg-black aspect-square border border-slate-200/90 shadow-2xs transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group ${
                    isHovered ? "scale-105 shadow-xl -translate-y-1 z-20 ring-2 ring-pink-500" : "hover:shadow-md"
                  }`}
                >
                  {/* REAL VIDEO or IMAGE */}
                  {hasVideo ? (
                    <video
                      ref={(el) => { gridVideoRefs.current[cardKey] = el; }}
                      src={item.videoUrl}
                      poster={item.image}
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? "scale-110 brightness-100" : "scale-100 brightness-95"
                      }`}
                    />
                  ) : (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isHovered ? "scale-115 brightness-90" : "scale-100 brightness-95"
                      }`}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                    isHovered 
                      ? "bg-gradient-to-t from-black/85 via-black/20 to-black/20 opacity-100" 
                      : "bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-80"
                  }`} />

                  {/* Top Badges */}
                  <div className="absolute top-2 inset-x-2 z-10 flex items-center justify-between pointer-events-none">
                    <span className="w-5 h-5 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
                      {hasVideo ? <Play className="w-2.5 h-2.5 fill-white" /> : <Layers className="w-2.5 h-2.5" />}
                    </span>
                    <span className="w-5 h-5 rounded-md bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90">
                      <span className="w-2 h-2 rounded-xs border border-white" />
                    </span>
                  </div>

                  {/* Hover Information / Like count */}
                  <div className={`absolute inset-x-2.5 bottom-2.5 z-10 transition-all duration-300 pointer-events-none ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}>
                    <p className="text-[10px] text-white font-bold leading-tight line-clamp-1 mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-[9px] text-slate-300">
                      <span className="inline-flex items-center gap-1 text-pink-400 font-bold">
                        <Heart className="w-2.5 h-2.5 fill-pink-400" />
                        <span>{item.likes}</span>
                      </span>
                      <span className="text-white font-bold uppercase tracking-wider">
                        {hasVideo ? "Watch Reel ↗" : "View Post ↗"}
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
        <div className="bg-white rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden border border-slate-200/90 shadow-sm">
          
          <div className="max-w-xl mx-auto relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-[1.5px] mx-auto mb-3 shadow-xs">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Instagram className="w-4 h-4 text-[#dc2743]" />
              </div>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-2">
              Join Our Engineering Community
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6 max-w-md mx-auto">
              Follow us for architecture breakdowns, system design insights, and live product drops.
            </p>

            <a
              href="https://www.instagram.com/vntech_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 text-white text-xs sm:text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all duration-300"
            >
              <span>Follow @vntech_global</span>
              <span>→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
