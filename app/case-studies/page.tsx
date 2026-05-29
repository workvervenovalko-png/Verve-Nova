"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Layers, Database } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Siora Infra Design",
      subtitle: "Delivering a Next-Gen 3D Web Experience",
      image: "/projects/siora.png",
      challenge: "In today's digital landscape, static websites fail to capture user attention. Siora needed a premium, modern web presence that offered a \"Wow\" factor to elevate their brand value, requiring interactive 3D elements and smooth animations without compromising load speed.",
      solution: [
        "Leveraged Next.js to ensure lightning-fast load speeds and optimized SEO.",
        "Integrated Three.js and React Three Fiber for interactive 3D graphics that react to user scroll and mouse movements.",
        "Utilized Framer Motion and Lenis for buttery-smooth scrolling and animations."
      ],
      result: "Siora's website transformed into an immersive digital experience. User engagement time doubled, and the premium feel significantly boosted brand trust.",
      icons: [Zap, Layers],
      link: "https://siorainfradesign.com/"
    },
    {
      title: "Advance Transcription",
      subtitle: "Building a Scalable & Secure Full-Stack Platform",
      image: "/projects/transcription.png",
      challenge: "Advance Transcription required a robust web platform to securely store and manage audio and text data. They needed a secure backend for user data safety alongside a highly responsive and smooth frontend experience.",
      solution: [
        "Built the frontend with Next.js for seamless navigation and fast load times.",
        "Integrated Supabase for a highly secure and scalable database solution, streamlining user authentication and real-time syncing.",
        "Automated emails and notifications using the Resend API."
      ],
      result: "Advance Transcription now operates a highly secure and fast web application. Data management is fully automated, saving significant manual effort, and the system is fully scalable to handle growing user bases.",
      icons: [ShieldCheck, Database],
      link: "https://www.advancetranscription.com/"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0C0C0F] text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-6"
          >
            Success Stories
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            Our <span className="text-gradient">Case Studies</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Discover how we solve complex business challenges using cutting-edge technologies.
          </motion.p>
        </div>
      </section>

      {/* Case Studies Content */}
      <section className="py-20 px-6 max-w-6xl mx-auto space-y-32">
        {caseStudies.map((study, i) => (
          <motion.div 
            key={study.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
          >
            {/* Image Column */}
            <div className={`w-full lg:w-1/2 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="relative aspect-video lg:aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content Column */}
            <div className={`w-full lg:w-1/2 flex flex-col ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 text-white group-hover:text-indigo-400 transition-colors">
                {study.title}
              </h2>
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-8">
                {study.subtitle}
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-3">The Challenge</h4>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                    {study.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-white/50 uppercase tracking-[0.2em] mb-3">Our Solution</h4>
                  <ul className="space-y-3">
                    {study.solution.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-white/70 text-sm md:text-base leading-relaxed font-light">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h4 className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em] mb-3">The Result</h4>
                  <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                    {study.result}
                  </p>
                </div>

                <a 
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 px-8 items-center bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white transition-all rounded-full w-max border border-white/10 hover:border-transparent"
                >
                  View Live Project <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Ready to Write <br /> <span className="text-gradient">Your Success Story?</span></h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-medium">Let's transform your complex challenges into our next big case study.</p>
          <Link 
            href="/contact" 
            className="inline-flex h-16 px-12 items-center bg-white text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all rounded-2xl"
          >
            Start Your Project <ArrowUpRight className="ml-3 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
