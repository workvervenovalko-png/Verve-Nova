"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Instagram, 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  ExternalLink, 
  Film, 
  Layers, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles,
  X,
  Copy,
  Check,
  TrendingUp,
  Volume2
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
  hashtags: string[];
}

const INSTAGRAM_POSTS: InstagramItem[] = [
  {
    id: "reel-1",
    type: "reel",
    url: "https://www.instagram.com/reel/DXUZzu-guyx/",
    image: "/instagram/post-1-reel.jpg",
    title: "Official Launch: Verve Nova Technologies 🚀",
    tag: "Studio Reveal",
    likes: 51,
    comments: 3,
    date: "April 19, 2026",
    caption: "We are officially launching Verve Nova Technologies 🚀. Engineering high-concurrency cloud systems, bespoke enterprise software, and scalable digital platforms built for global innovators.",
    hashtags: ["#VerveNova", "#NewBusinessLaunch", "#BusinessGrowth", "#StartupIndia", "#ReelsTrending"]
  },
  {
    id: "post-2",
    type: "post",
    url: "https://www.instagram.com/p/DXb8-36Adng/",
    image: "/instagram/post-2-scale.jpg",
    title: "Build Smarter. Scale Faster ⚡",
    tag: "Full-Stack & Cloud",
    likes: 11,
    comments: 0,
    date: "April 22, 2026",
    caption: "From idea to execution — we handle everything your business needs to grow: Software Development, AI & Automation, CRM / ERP Platforms, UI/UX & Branding, Cloud & DevOps, and Zero-Trust Cybersecurity.",
    hashtags: ["#TechSolutions", "#StartupIndia", "#BuildInPublic", "#WebDevelopment", "#BusinessGrowth"]
  },
  {
    id: "reel-3",
    type: "reel",
    url: "https://www.instagram.com/reel/DXzFz3ghcEU/",
    image: "/instagram/post-3-systems.jpg",
    title: "Building Smarter Systems, Not Just Software 💡",
    tag: "System Engineering",
    likes: 41,
    comments: 0,
    date: "May 1, 2026",
    caption: "What looks simple on the surface is actually designed to save hours of manual work behind the scenes. This is how modern businesses scale with automation, clarity, and resilient architecture.",
    hashtags: ["#Automation", "#SystemDesign", "#Productivity", "#TechTrends", "#Innovation"]
  },
  {
    id: "post-4",
    type: "post",
    url: "https://www.instagram.com/p/DZJwWFDlFDD/",
    image: "/instagram/post-4-website.jpg",
    title: "The Architecture Blueprint: Comment 'WEBSITE' 📑",
    tag: "Tech Strategy",
    likes: 45,
    comments: 0,
    date: "June 3, 2026",
    caption: "Comment 'WEBSITE' and we'll send our complete architectural breakdown of high-performance modern web platforms, tech stacks, and conversion funnels directly to your inbox.",
    hashtags: ["#WebArchitecture", "#StartupGrowth", "#DigitalMoat", "#ScaleUp", "#TechLead"]
  },
  {
    id: "post-5",
    type: "post",
    url: "https://www.instagram.com/p/DXeaXMClGP0/",
    image: "/instagram/post-5-invisible.jpg",
    title: "Most Businesses Fail By Being Invisible Online ⚡",
    tag: "Digital Growth",
    likes: 11,
    comments: 0,
    date: "April 23, 2026",
    caption: "Most businesses don't fail because of bad products — they fail because they're invisible online. If you don't have a modern, high-converting digital platform, you're losing customers every single day.",
    hashtags: ["#DigitalTransformation", "#Branding", "#WebDesign", "#LeadGeneration", "#StartupIndia"]
  },
  {
    id: "post-6",
    type: "post",
    url: "https://www.instagram.com/p/DXZY4KSlAEE/",
    image: "/instagram/post-6-startup.jpg",
    title: "Why Startups Fail: Bad Tech Decisions 🚨",
    tag: "Startup Tech",
    likes: 10,
    comments: 0,
    date: "April 21, 2026",
    caption: "Not bad ideas — bad tech decisions. Poor UI, slow performance, wrong tech stack, and weak scalability silently kill growth. Technology isn't just a tool, it's your growth engine.",
    hashtags: ["#TechStack", "#StartupLessons", "#SoftwareEngineering", "#VerveNova", "#Scalability"]
  }
];

export function InstagramFeed() {
  const [activeFilter, setActiveFilter] = useState<"all" | "reel" | "post">("all");
  const [selectedPost, setSelectedPost] = useState<InstagramItem | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

  const filteredPosts = INSTAGRAM_POSTS.filter(post => {
    if (activeFilter === "all") return true;
    return post.type === activeFilter;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-200" id="instagram-feed">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-pink-500/[0.04] via-rose-500/[0.03] to-amber-500/[0.03] blur-[140px] pointer-events-none rounded-full" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Top Header Card */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            {/* Pill with Instagram Gradient Glow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80 text-pink-700 text-xs font-bold uppercase tracking-wider mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] animate-pulse" />
              <Instagram className="w-3.5 h-3.5 text-[#dc2743]" />
              <span>Official Instagram Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-[1.05]">
              Follow The Movement <br />
              <span className="bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] bg-clip-text text-transparent">
                @vntech_global
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-4 max-w-xl">
              Behind the code. System architecture teardowns, engineering sprints, tech playbooks, and production milestones direct from our studio floor.
            </p>
          </div>

          {/* Official Channel Follow Card */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <a
              href="https://www.instagram.com/vntech_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-1 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] shadow-lg shadow-pink-500/15 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 active:scale-[0.98]"
            >
              <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-[14px] bg-slate-950 text-white transition-all group-hover:bg-opacity-95">
                {/* Avatar with Story Ring */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
                      <Image 
                        src="/vnt-logo.png" 
                        alt="Verve Nova Technologies" 
                        width={28} 
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black tracking-wider uppercase">@vntech_global</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium">Verve Nova Technologies | Global</p>
                </div>

                <div className="ml-2 pl-3 border-l border-white/15 flex items-center gap-1 text-xs font-bold text-pink-400 group-hover:text-white transition-colors">
                  <span>Follow</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: "all", label: "All Insights", count: 6 },
            { id: "reel", label: "Reels & Video", count: 2, icon: Film },
            { id: "post", label: "Tech Playbooks", count: 4, icon: Layers }
          ].map(tab => {
            const isActive = activeFilter === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`relative px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-white text-slate-700 border border-slate-200"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid of Instagram Posts & Reels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((item, idx) => {
              const isLiked = !!likedPosts[item.id];
              const isReel = item.type === "reel";

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  onClick={() => setSelectedPost(item)}
                  className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
                  style={{
                    aspectRatio: isReel ? "9/13" : "9/11"
                  }}
                >
                  {/* Background Post/Reel Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter group-hover:brightness-90"
                    />
                    
                    {/* Gradient cinematic overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-85 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Top Bar on Card */}
                  <div className="relative z-10 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                        isReel 
                          ? "bg-rose-500/25 border-rose-400/30 text-rose-200" 
                          : "bg-blue-500/25 border-blue-400/30 text-blue-200"
                      }`}>
                        {isReel ? <Film className="w-3 h-3 text-rose-300" /> : <Layers className="w-3 h-3 text-blue-300" />}
                        <span>{item.tag}</span>
                      </span>
                    </div>

                    {/* Direct External Link Icon */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-105 cursor-pointer"
                      title="Open on Instagram"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Center Play Button for Reels */}
                  {isReel && (
                    <div className="relative z-10 my-auto flex flex-col items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl transition-all duration-300 group-hover:scale-115 group-hover:bg-white/25">
                        <Play className="w-7 h-7 fill-white translate-x-0.5 text-white" />
                      </div>
                      
                      {/* Live Audio Waveform Animation */}
                      <div className="flex items-center gap-1 mt-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15">
                        <Volume2 className="w-3 h-3 text-pink-400" />
                        <div className="flex items-end gap-0.5 h-2.5">
                          <span className="w-0.5 h-2 bg-pink-400 animate-pulse" style={{ animationDuration: '0.6s' }} />
                          <span className="w-0.5 h-3 bg-pink-400 animate-pulse" style={{ animationDuration: '0.9s' }} />
                          <span className="w-0.5 h-1.5 bg-pink-400 animate-pulse" style={{ animationDuration: '0.4s' }} />
                          <span className="w-0.5 h-2.5 bg-pink-400 animate-pulse" style={{ animationDuration: '0.7s' }} />
                        </div>
                        <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest ml-1">Reel Audio</span>
                      </div>
                    </div>
                  )}

                  {/* Bottom Meta & Caption */}
                  <div className="relative z-10 p-5 pt-0">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-tight leading-snug mb-2 group-hover:text-pink-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs text-slate-300 font-normal leading-relaxed line-clamp-2 mb-4">
                      {item.caption}
                    </p>

                    {/* Interactive Action Bar (Like Heart, Comment, Share, Instagram Icon) */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10 text-white text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLike(item.id, e)}
                          className={`flex items-center gap-1.5 transition-all hover:scale-110 active:scale-95 ${
                            isLiked ? "text-rose-500 font-bold" : "text-slate-300 hover:text-white"
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                          <span className="text-[11px]">{item.likes + (isLiked ? 1 : 0)}</span>
                        </button>

                        <div className="flex items-center gap-1 text-slate-400">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span className="text-[11px]">{item.comments}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
                        <Instagram className="w-3.5 h-3.5 text-pink-400" />
                        <span>View Reel</span>
                      </div>
                    </div>
                  </div>

                  {/* Subtle Border Glow on Hover */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-pink-500/40 pointer-events-none transition-all duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-slate-50 border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md shrink-0">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black uppercase text-slate-950 tracking-tight">
                Want to see our day-to-day deployments?
              </h4>
              <p className="text-xs text-slate-600 font-normal mt-0.5">
                We share code sprints, UI designs, system benchmarks, and startup building playbooks daily.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/vntech_global/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-[#1b67b2] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all duration-300 shrink-0"
          >
            <span>Open @vntech_global Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Lightbox / Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div 
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Media Preview Column */}
              <div className="w-full md:w-1/2 bg-black relative flex items-center justify-center min-h-[300px] md:min-h-full">
                <img 
                  src={selectedPost.image} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover max-h-[60vh] md:max-h-full"
                />

                {selectedPost.type === "reel" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                      <Play className="w-7 h-7 fill-white translate-x-0.5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Content Column */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div>
                  {/* Account Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-white/10 mb-4">
                    <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden p-1">
                        <Image 
                          src="/vnt-logo.png" 
                          alt="Verve Nova Technologies" 
                          width={24} 
                          height={24}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-white uppercase tracking-wider">vntech_global</span>
                        <CheckCircle2 className="w-3 h-3 text-blue-400 fill-blue-400/20" />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{selectedPost.date}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                    {selectedPost.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal mb-4">
                    {selectedPost.caption}
                  </p>

                  {/* Hashtags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {selectedPost.hashtags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold">{selectedPost.likes} Likes • {selectedPost.comments} Comments</span>
                    <button
                      onClick={() => handleCopy(selectedPost.url)}
                      className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedLink ? "Link Copied" : "Copy Link"}</span>
                    </button>
                  </div>

                  <a
                    href={selectedPost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-95 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Watch / Open on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
