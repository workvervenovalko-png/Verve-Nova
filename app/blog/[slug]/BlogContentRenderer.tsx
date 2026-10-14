"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, Tag, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface BlogContentRendererProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category?: string;
    author?: string;
    coverImage?: string;
    tags?: string[];
    readTime?: string;
    createdAt: string;
  };
}

export function BlogContentRenderer({ post }: BlogContentRendererProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Article link copied to clipboard!");
    }
  };

  // Helper to render markdown content with clean styling
  const renderFormattedContent = (content: string) => {
    const lines = content.trim().split("\n");
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <div key={`code-${index}`} className="my-6 rounded-2xl bg-slate-950 p-5 text-slate-200 font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between text-slate-500 pb-2 mb-3 border-b border-slate-800 text-xs">
                <span>{codeLanguage || "code"}</span>
                <span className="text-emerald-400 font-semibold">Production Ready</span>
              </div>
              <pre><code>{codeBuffer.join("\n")}</code></pre>
            </div>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // H2 Headings
      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={index} className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-12 mb-4 tracking-tight border-b border-slate-200 pb-3">
            {line.replace("## ", "")}
          </h2>
        );
        return;
      }

      // H3 Headings
      if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3 tracking-tight">
            {line.replace("### ", "")}
          </h3>
        );
        return;
      }

      // Checklist item
      if (line.startsWith("- [ ] ") || line.startsWith("- [x] ")) {
        const isChecked = line.startsWith("- [x] ");
        const text = line.replace(/- \[[ x]\] /, "");
        elements.push(
          <div key={index} className="flex items-start gap-3 my-2 text-slate-800 text-sm sm:text-base">
            <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${isChecked ? "text-emerald-600" : "text-[#1b67b2]"}`} />
            <span>{text}</span>
          </div>
        );
        return;
      }

      // Standard Bullet point
      if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="ml-6 list-disc text-slate-700 text-base leading-relaxed my-1.5">
            {line.replace("- ", "")}
          </li>
        );
        return;
      }

      // Horizontal Rule
      if (line === "---") {
        elements.push(<hr key={index} className="my-10 border-slate-200" />);
        return;
      }

      // Paragraph
      if (line.trim() !== "") {
        elements.push(
          <p key={index} className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed my-4">
            {line}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <>
      {/* Reading Progress Indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#1b67b2] z-[110] origin-left"
        style={{ scaleX }}
      />

      <article className="pt-32 sm:pt-36 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          
          {/* Navigation & Breadcrumb */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#1b67b2] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Articles</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-950 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-[#1b67b2] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-md">
                {post.category || "Software Engineering"}
              </span>
              <div className="h-px w-6 bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-[#1b67b2]" />
                <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 ml-2">
                <Clock className="w-3.5 h-3.5 text-[#1b67b2]" />
                <span>{post.readTime || "7 min read"}</span>
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.18] mb-6">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed border-l-4 border-[#1b67b2] pl-6 mb-8 bg-blue-50/40 py-4 rounded-r-2xl">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-5 border-y border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1b67b2] flex items-center justify-center text-white font-black shadow-md text-base">
                  VN
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-950 leading-tight">Verve Nova Technologies</p>
                  <p className="text-xs font-medium text-slate-500 leading-tight mt-0.5">Software Engineering & Cloud Architecture</p>
                </div>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verified Dispatch</span>
              </div>
            </div>
          </header>

          {/* Formatted Article Body */}
          <div className="max-w-none mb-16">
            {renderFormattedContent(post.content)}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 border-t border-slate-200 mb-16">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Topic Tags</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                  >
                    <Tag className="w-3 h-3 text-[#1b67b2]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Card & CTA */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-50/80 via-slate-50 to-blue-50/40 border border-slate-200 shadow-md text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#1b67b2] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
              VN
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              Ready to Build Scalable Software with Verve Nova?
            </h3>
            <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
              Partner with our senior software architects, DevOps specialists, and digital engineering team to build custom web, mobile, or enterprise SaaS systems.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#1b67b2] hover:bg-[#15528e] text-white font-bold text-sm tracking-wide shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Schedule Architecture Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all duration-200"
              >
                Explore All Services
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
