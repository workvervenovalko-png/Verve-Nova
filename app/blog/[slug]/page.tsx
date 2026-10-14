"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, User, Clock, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getBlogBySlug } from "@/app/actions/admin";

export default function BlogReaderPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      const result = await getBlogBySlug(slug as string);
      if (result.success) {
        setPost(result.data);
      } else {
        router.push("/blog");
      }
      setIsLoading(false);
    };
    fetchPost();
  }, [slug, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#1b67b2] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen bg-white selection:bg-blue-500/20 text-slate-900 font-sans">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#1b67b2] z-[110] origin-left"
        style={{ scaleX }}
      />

      <article className="pt-36 pb-32">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            href="/blog" 
            className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#1b67b2] transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Newsroom
          </Link>

          <header className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-black uppercase tracking-wider text-[#1b67b2] bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-md">
                {post.category || "Engineering"}
              </span>
              <div className="h-px w-6 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight uppercase leading-[1.1] mb-8">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-slate-700 font-normal leading-relaxed border-l-4 border-[#1b67b2] pl-6 mb-10 bg-slate-50/50 py-3 rounded-r-xl">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-6 border-y border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#1b67b2] flex items-center justify-center text-white font-black shadow-md">VN</div>
                <div>
                  <p className="text-xs font-black text-slate-900 uppercase tracking-wider leading-none mb-1">Verve Nova Technologies</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Software Engineering Studio</p>
                </div>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-14 border border-slate-200 shadow-md">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="max-w-none mb-20">
            <div className="text-base md:text-lg text-slate-800 font-normal leading-relaxed space-y-6 whitespace-pre-wrap">
              {post.content}
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-200">
              <p className="text-xs font-black text-[#1b67b2] uppercase tracking-widest mb-1">Authored by:</p>
              <p className="text-2xl font-black text-slate-950 uppercase tracking-tight">Verve Nova Technologies</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Next-Gen Software Systems & Cloud Engineering</p>
            </div>
          </div>

          <footer className="mt-16 pt-16 border-t border-slate-200 text-center">
            <div className="p-10 md:p-14 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-6">
              <h3 className="text-2xl md:text-4xl font-black text-slate-950 uppercase tracking-tight">Ready to Build Your Project?</h3>
              <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
                Consult with our engineering architects to build custom web, mobile, or enterprise SaaS software.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center h-12 px-8 bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
              >
                Start Your Project
              </Link>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </main>
  );
}
