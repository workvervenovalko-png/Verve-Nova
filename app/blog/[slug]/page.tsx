"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react";
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
      <Navbar />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-violet-600 z-[110] origin-left"
        style={{ scaleX }}
      />

      <article className="pt-48 pb-32">
        {/* Ambient Glow */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            href="/registry" 
            className="group inline-flex items-center gap-3 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] hover:text-white transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Collective
          </Link>

          <header className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-full">Systems Research</span>
              <div className="h-px w-12 bg-white/[0.08]" />
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9] mb-12">
              {post.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/30 font-light leading-relaxed border-l-2 border-indigo-500 pl-10 mb-16">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between py-10 border-y border-white/[0.06]">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black shadow-lg">VN</div>
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none mb-2">Verve Nova Intelligence</p>
                  <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] leading-none">Main Operations Office</p>
                </div>
              </div>
              <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all shadow-xl">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/20 hover:text-white hover:border-white transition-all shadow-xl">
                    <Bookmark className="w-4 h-4" />
                  </button>
              </div>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden mb-24 glass-card border-white/[0.06]">
              <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover grayscale opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
          )}

          <div className="max-w-none mb-32">
            <div className="text-lg md:text-xl text-white/50 font-light leading-[1.8] space-y-10 whitespace-pre-wrap">
              {post.content}
            </div>
            
            <div className="mt-24 pt-16 border-t border-white/[0.06]">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Regards,</p>
              <p className="text-3xl font-black text-indigo-400 uppercase tracking-tighter mb-2">Verve Nova Tech.</p>
              <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">Engineering the Future of Intelligence</p>
            </div>
          </div>

          <footer className="mt-48 pt-20 border-t border-white/[0.06] text-center">
            <div className="flex flex-col items-center gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-white/10" />
                  <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">End of Transmission</p>
                  <div className="w-8 h-px bg-white/10" />
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">Next Evolution.</h3>
                <Link 
                    href="/#contact" 
                    className="inline-flex items-center justify-center h-16 px-16 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[11px] font-black uppercase tracking-[0.4em] rounded-xl hover:shadow-[0_0_48px_rgba(99,102,241,0.4)] transition-all shadow-2xl border-0"
                >
                    Secure Your Project
                </Link>
            </div>
          </footer>
        </div>
      </article>

      <Footer />
    </main>
  );
}
