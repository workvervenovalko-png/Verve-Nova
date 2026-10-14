"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, Search, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicBlogs } from "@/app/actions/admin";

export default function BlogArchivePage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      const result = await getPublicBlogs();
      if (result.success) {
        setBlogs(result.data);
      }
      setIsLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />

      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          {/* Header */}
          <div className="max-w-4xl mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Newsroom & Engineering Insights
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 tracking-tight uppercase leading-tight mb-6">
              Engineering <span className="text-[#1b67b2]">Insights & Blog</span>
            </h1>
            <p className="text-slate-600 text-base md:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              Technical case studies, software architectures, and industry viewpoints curated by the engineering team at Verve Nova.
            </p>
            <div className="relative max-w-xl">
              <Input 
                placeholder="Search articles and technical reports..." 
                className="h-14 rounded-2xl border-slate-300 bg-white px-6 text-xs font-bold uppercase tracking-wider pl-12 text-slate-900 placeholder:text-slate-400 focus:border-[#1b67b2] shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-[#1b67b2] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="py-16 text-center bg-slate-50 rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">No articles found</h3>
              <p className="text-xs text-slate-500">Check back soon for upcoming engineering dispatches.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((post) => (
                <div
                  key={post._id}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 shadow-sm flex flex-col"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200">
                      {post.coverImage ? (
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
                          <Sparkles className="w-10 h-10 text-[#1b67b2]/40" />
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1b67b2] bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                          {post.category || "Engineering"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#1b67b2]" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-3 group-hover:text-[#1b67b2] transition-colors uppercase tracking-tight leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-3 leading-relaxed mb-6">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1b67b2] uppercase tracking-wider group-hover:translate-x-0.5 transition-transform">
                        <span>Read Full Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
