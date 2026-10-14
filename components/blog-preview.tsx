"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import Link from "next/link";
import { getPublicBlogs } from "@/app/actions/admin";
import { BlogSkeleton } from "./skeletons/blog-skeleton";
import { Skeleton } from "./ui/skeleton";

export function BlogPreview() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getPublicBlogs();
      if (result.success) {
        setBlogs(result.data.slice(0, 3));
      }
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mb-12">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-10 w-64" />
          </div>
          <BlogSkeleton />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Exact Verve Nova Strings) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
              Intelligence Reports
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight">
              Latest <span className="text-[#1b67b2]">Insights</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#1b67b2] hover:text-[#15538e] tracking-wider"
          >
            <span>Explore All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post) => (
            <div
              key={post._id}
              className="bg-[#f8fafc] border border-slate-200 rounded-2xl overflow-hidden hover:bg-white hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-200">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                      <BookOpen className="w-8 h-8" />
                    </div>
                  )}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md text-[#1b67b2] text-[11px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    Research
                  </span>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      5 Min Read
                    </span>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-lg font-bold text-[#0f172a] group-hover:text-[#1b67b2] transition-colors leading-snug mb-3">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#1b67b2] hover:text-[#15538e] tracking-wider"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
