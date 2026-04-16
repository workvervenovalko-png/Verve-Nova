"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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
      <section className="py-32 bg-background relative overflow-hidden section-glow">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="max-w-lg mb-12">
             <Skeleton className="h-4 w-32 mb-4" />
             <Skeleton className="h-12 w-64" />
           </div>
           <BlogSkeleton />
        </div>
      </section>
    );
  }
  if (blogs.length === 0) return null;

  return (
    <section className="py-32 bg-background relative overflow-hidden section-glow">
      {/* Ambient orb */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/[0.03] blur-[120px] rounded-full -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Intelligence Reports</p>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">
              Latest <span className="text-white/10">Insights.</span>
            </h2>
          </div>
          
          <Link 
            href="/blog" 
            className="group flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest hover:text-indigo-400 transition-colors"
          >
            Explore All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 glass-card">
                  {post.coverImage ? (
                    <img 
                      src={post.coverImage} 
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-70 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#111113]">
                      <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em]">No Visual Intelligence</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/[0.05] backdrop-blur-md rounded-full border border-white/[0.06] shadow-xl">
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Research</span>
                  </div>
                </div>

                <div className="px-2">
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-white/15" />
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-wider">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-white/15" />
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-wider">5 Min Read</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-white/80 mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/25 font-light line-clamp-2 leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="h-[1px] w-full bg-white/[0.04] group-hover:bg-indigo-500/30 transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
