"use client";

import React, { useState, useEffect } from "react";
import { 
  Instagram, 
  Play, 
  ArrowUpRight, 
  Film, 
  Layers, 
  Volume2,
  Sparkles,
  Heart
} from "lucide-react";
import Image from "next/image";

interface InstagramItem {
  id: string;
  type: "reel" | "post";
  url: string;
  image: string;
  title: string;
  tag: string;
  likes: number;
  comments: number;
  date: string;
  caption: string;
}

const INSTAGRAM_POSTS: InstagramItem[] = [
  {
    id: "reel-1",
    type: "reel",
    url: "https://www.instagram.com/reel/DXUZzu-guyx/",
    image: "/instagram/post-1-reel.jpg",
    title: "Official Launch 🚀",
    tag: "Studio Reveal",
    likes: 51,
    comments: 3,
    date: "April 19",
    caption: "Official launch of Verve Nova Technologies. Next-gen cloud systems & software engineering."
  },
  {
    id: "post-2",
    type: "post",
    url: "https://www.instagram.com/p/DXb8-36Adng/",
    image: "/instagram/post-2-scale.jpg",
    title: "Build Smarter. Scale Faster ⚡",
    tag: "Full-Stack Dev",
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
    tag: "Cloud Architecture",
    likes: 41,
    comments: 0,
    date: "May 1",
    caption: "What looks simple on the surface saves hundreds of manual hours behind the scenes."
  },
  {
    id: "post-4",
    type: "post",
    url: "https://www.instagram.com/p/DZJwWFDlFDD/",
    image: "/instagram/post-4-website.jpg",
    title: "The Architecture Blueprint 📑",
    tag: "Tech Playbook",
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
    tag: "Startup Engineering",
    likes: 10,
    comments: 0,
    date: "April 21",
    caption: "Slow performance and wrong tech stacks silently kill growth. Engineering is your growth engine."
  }
];

export function InstagramFeed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [playbackSeconds, setPlaybackSeconds] = useState(1);

  // Ticking timecode simulation when hovering any card
  useEffect(() => {
    if (!hoveredId) {
      setPlaybackSeconds(1);
      return;
    }
    const interval = setInterval(() => {
      setPlaybackSeconds(prev => (prev >= 15 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [hoveredId]);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-b border-slate-200" id="instagram-feed">
      {/* Scoped CSS animations for seamless Instagram playback simulation */}
      <style jsx global>{`
        @keyframes igStoryProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes igEqualizer1 {
          0%, 100% { height: 6px; }
          50% { height: 22px; }
        }
        @keyframes igEqualizer2 {
          0%, 100% { height: 20px; }
          50% { height: 8px; }
        }
        @keyframes igEqualizer3 {
          0%, 100% { height: 10px; }
          50% { height: 26px; }
        }
        @keyframes igEqualizer4 {
          0%, 100% { height: 16px; }
          50% { height: 6px; }
        }
        @keyframes igVideoDrift {
          0% { transform: scale(1.15) translate(0, 0); }
          50% { transform: scale(1.22) translate(-2px, -3px); }
          100% { transform: scale(1.15) translate(0, 0); }
        }
      `}</style>

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[360px] bg-gradient-to-r from-pink-500/[0.04] via-rose-500/[0.05] to-amber-500/[0.03] blur-[140px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-200/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-pink-200/80 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] animate-pulse" />
              <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              <span className="text-[11px] font-black">Studio Reels & Dispatches</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Follow The Studio{" "}
              <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
                @vntech_global
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1">
              Hover over any reel to expand and watch live playback. Tap to open on Instagram.
            </p>
          </div>

          {/* Follow Button */}
          <a
            href="https://www.instagram.com/vntech_global/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 text-xs font-black uppercase tracking-wider shadow-xs transition-all duration-300 shrink-0"
          >
            <div className="w-5 h-5 rounded-full p-[1.5px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center p-0.5">
                <Image src="/vnt-logo.png" alt="VNT" width={14} height={14} className="object-contain" />
              </div>
            </div>
            <span>Follow @vntech_global</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-pink-500 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* 🎬 SINGLE LINE HORIZONTAL ROW (ALL 6 IN ONE ROW) */}
        <div className="w-full overflow-x-auto lg:overflow-visible pb-8 pt-4 scrollbar-none">
          <div className="flex items-center justify-between gap-3 sm:gap-4 min-w-[960px] lg:min-w-0">
            {INSTAGRAM_POSTS.map((item) => {
              const isHovered = hoveredId === item.id;
              const isReel = item.type === "reel";

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
                  className={`flex-1 relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out select-none ${
                    isHovered 
                      ? "z-30 scale-110 sm:scale-115 -translate-y-3 shadow-[0_25px_60px_-12px_rgba(225,48,108,0.45)] ring-2 ring-pink-500" 
                      : "z-10 scale-100 shadow-sm hover:shadow-md border border-slate-200"
                  }`}
                  style={{
                    aspectRatio: "9/16",
                    minWidth: "150px"
                  }}
                >
                  {/* Background Image with Video Drift when Hovered */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered 
                          ? "brightness-95 filter" 
                          : "scale-100 brightness-90 filter"
                      }`}
                      style={{
                        animation: isHovered ? "igVideoDrift 4s ease-in-out infinite" : "none"
                      }}
                    />

                    {/* Dark gradient vignette overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />

                    {/* Active Video Shimmer effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-pink-500/10 pointer-events-none" />
                    )}
                  </div>

                  {/* Top Bar: Progress Bar + Tag Badge */}
                  <div className="relative z-10 p-3 flex flex-col gap-2">
                    {/* Story / Reel Progress Bar (Plays when Hovered) */}
                    <div className="w-full h-1 bg-white/25 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-200 ${
                          isHovered 
                            ? "bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500" 
                            : "w-0 bg-white"
                        }`}
                        style={{
                          animation: isHovered ? "igStoryProgress 4s linear infinite" : "none"
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-0.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md border ${
                        isReel 
                          ? "bg-rose-500/30 border-rose-400/40 text-rose-200" 
                          : "bg-blue-500/30 border-blue-400/40 text-blue-200"
                      }`}>
                        {isReel ? <Film className="w-2.5 h-2.5 text-rose-300" /> : <Layers className="w-2.5 h-2.5 text-blue-300" />}
                        <span>{item.tag}</span>
                      </span>

                      {/* External arrow indicator */}
                      <span className="w-5 h-5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Center Action: Play Button (Plays active equalizer when hovered) */}
                  <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                    {isHovered ? (
                      /* 🔴 ACTIVE PLAYING STATE */
                      <div className="flex flex-col items-center gap-2 transition-transform duration-300 scale-105">
                        {/* Glowing Playing Ring */}
                        <div className="relative w-13 h-13 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-2xl">
                          <div className="w-full h-full rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center">
                            {/* Animated Equalizer Sound Bars */}
                            <div className="flex items-end gap-1 h-6 px-2">
                              <span 
                                className="w-1 bg-pink-400 rounded-full" 
                                style={{ animation: "igEqualizer1 0.6s ease-in-out infinite" }} 
                              />
                              <span 
                                className="w-1 bg-white rounded-full" 
                                style={{ animation: "igEqualizer2 0.8s ease-in-out infinite" }} 
                              />
                              <span 
                                className="w-1 bg-amber-400 rounded-full" 
                                style={{ animation: "igEqualizer3 0.5s ease-in-out infinite" }} 
                              />
                              <span 
                                className="w-1 bg-rose-400 rounded-full" 
                                style={{ animation: "igEqualizer4 0.7s ease-in-out infinite" }} 
                              />
                            </div>
                          </div>
                        </div>

                        {/* Playing Status Pill */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-pink-500/40 text-[9px] font-mono text-pink-300 font-bold tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                          <span>PLAYING 0:{playbackSeconds < 10 ? `0${playbackSeconds}` : playbackSeconds}</span>
                        </div>
                      </div>
                    ) : (
                      /* ⚪ Static Idle Play Button */
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transition-transform duration-300">
                        <Play className="w-4 h-4 fill-white translate-x-0.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Bottom Info: Title, caption, likes */}
                  <div className="relative z-10 p-3 pt-0">
                    <h3 className="text-xs font-black text-white uppercase tracking-tight leading-snug line-clamp-2 drop-shadow-md mb-1">
                      {item.title}
                    </h3>
                    
                    <p className={`text-[10px] text-slate-300 leading-tight transition-all duration-300 ${
                      isHovered ? "line-clamp-2 text-white" : "line-clamp-1"
                    }`}>
                      {item.caption}
                    </p>

                    {/* Bottom strip */}
                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/15 text-[10px] text-slate-300 font-medium">
                      <span className="inline-flex items-center gap-1 text-pink-400 font-bold">
                        <Heart className="w-2.5 h-2.5 fill-pink-400" />
                        <span>{item.likes}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 text-white font-bold uppercase tracking-wider text-[9px]">
                        Watch <Instagram className="w-2.5 h-2.5 text-pink-400" />
                      </span>
                    </div>
                  </div>

                  {/* Glow outline on hover */}
                  <div className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                    isHovered ? "opacity-100 border-2 border-pink-500/90" : "opacity-0"
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Helper footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-medium pt-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Click any reel to open directly on Instagram</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">@vntech_global • 6 Dispatches</span>
        </div>

      </div>
    </section>
  );
}
