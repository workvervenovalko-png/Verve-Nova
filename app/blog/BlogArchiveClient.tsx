"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Search, Sparkles, BookOpen, Clock, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogArchiveClientProps {
  initialBlogs: any[];
}

export function BlogArchiveClient({ initialBlogs }: BlogArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Software Engineering",
    "Cloud & DevOps",
    "Mobile Applications",
    "Enterprise Systems",
    "AI & Automation",
    "Cybersecurity & VAPT"
  ];

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
      {/* Search & Category Filter Bar */}
      <div className="max-w-4xl mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" /> Newsroom & Engineering Insights
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight uppercase leading-tight mb-6">
          Engineering <span className="text-[#1b67b2]">Insights & Blog</span>
        </h1>
        <p className="text-slate-600 text-base md:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
          Technical case studies, cloud architectures, FinOps playbooks, and system design viewpoints curated by the engineering team at Verve Nova.
        </p>

        {/* Search Input */}
        <div className="relative max-w-xl mb-6">
          <Input 
            placeholder="Search articles by title, keywords or tech stack..." 
            className="h-14 rounded-2xl border-slate-300 bg-white px-6 text-xs sm:text-sm font-semibold pl-12 text-slate-900 placeholder:text-slate-400 focus:border-[#1b67b2] shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#1b67b2] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 mb-1">No matching articles found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search query or switching categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((post) => (
            <article
              key={post._id || post.slug}
              className="group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col"
            >
              <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                
                {/* Header Banner */}
                <div className="p-6 pb-2 flex-grow flex flex-col">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1b67b2] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                      {post.category || "Engineering"}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-[#1b67b2]" />
                      <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-3 group-hover:text-[#1b67b2] transition-colors tracking-tight leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-3 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                      {post.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1b67b2] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
