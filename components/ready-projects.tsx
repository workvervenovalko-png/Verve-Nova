"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";

export function ReadyProjects() {
  const projects = [
    {
      title: "Advance Transcription",
      desc: "An easy-to-use software that converts audio files into text quickly. Perfect for meetings and interviews.",
      image: "/projects/transcription.png",
      link: "https://www.advancetranscription.com/",
      icon: Headphones,
      features: ["Fast Conversion", "Simple Interface", "Secure Storage"]
    },
    {
      title: "Siora Infra Design",
      desc: "A complete professional portal for construction and design companies to manage projects.",
      image: "/projects/siora.png",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["Project Tracking", "Modern Design", "Client Dashboard"]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-[#0C0C0F] border-y border-white/[0.04] relative overflow-hidden">
      {/* Mesh glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/[0.04] blur-[100px] rounded-full" />
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-16 text-center md:text-left">
          <div className="max-w-lg flex flex-col items-center md:items-start">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-4">Pre-Built Software</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">
              Our <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-sm text-white/30 font-light leading-relaxed">
              Specialized tools and custom platforms we've built for high-growth businesses.
            </p>
          </div>
          <Link 
            href="/projects" 
            className="group flex items-center gap-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest hover:text-white transition-colors bg-white/5 px-6 py-3 rounded-full border border-white/10"
          >
            Explore All Projects <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group glass-card rounded-[2.5rem] overflow-hidden hover:glass-card-hover transition-all duration-500 flex flex-col h-full border border-white/5 bg-white/[0.02] shadow-2xl"
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F] via-transparent to-transparent" />
                <div className="absolute top-6 left-6 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    <project.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-sm text-white/40 font-medium leading-relaxed mb-8 line-clamp-2">{project.desc}</p>
                
                <div className="flex flex-wrap gap-3 mb-8 mt-auto">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                      {feat}
                    </div>
                  ))}
                </div>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 px-8 items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all rounded-2xl w-full justify-center"
                >
                  Visit Website <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
