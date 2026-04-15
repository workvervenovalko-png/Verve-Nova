"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowRight, Calendar, Clock, Search, Tag } from "lucide-react";
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
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-48 pb-32 px-6 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-[20%] right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="max-w-4xl mb-16">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Archive // Knowledge Base</p>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-tight mb-8">
              Intelligence <span className="text-white/10">Reports.</span>
            </h1>
            <div className="relative max-w-xl">
              <Input 
                placeholder="SEARCH INTELLIGENCE BASE..." 
                className="h-16 rounded-2xl border-white/[0.06] bg-white/[0.03] px-8 text-xs font-bold uppercase tracking-widest pl-14 text-white placeholder:text-white/15 focus:border-indigo-500/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="py-20 flex justify-center">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredBlogs.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 glass-card">
                      {post.coverImage && (
                        <img 
                          src={post.coverImage} 
                          alt={post.title}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                    </div>

                    <div className="px-2">
                        <div className="flex flex-wrap gap-4 mb-6">
                            <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Systems</span>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-white/15" />
                                <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-white/80 mb-4 group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-tight">
                            {post.title}
                        </h3>
                        <p className="text-sm text-white/25 font-light line-clamp-3 leading-relaxed mb-8">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-white/40 uppercase tracking-widest group-hover:gap-4 group-hover:text-indigo-400 transition-all">
                            Read Full Report <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoading && filteredBlogs.length === 0 && (
              <div className="py-40 text-center">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">No intelligence matches your query.</p>
              </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
            className={`w-full bg-transparent border outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 ${className}`}
            {...props}
        />
    )
}
