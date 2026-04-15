"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Headphones, Building2 } from "lucide-react";
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
              Ready <span className="text-gradient">Solutions</span>
            </h2>
            <p className="text-sm text-white/30 font-light leading-relaxed">
              Specialized tools you can start using for your business right away.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="group flex items-center gap-2 text-[10px] font-bold text-white/50 uppercase tracking-widest hover:text-indigo-400 transition-colors"
          >
            Request Demo <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group glass-card rounded-[2rem] overflow-hidden hover:glass-card-hover transition-all duration-500"
            >
              <div className="aspect-[21/9] relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10">
                    <project.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col items-center text-center md:items-start md:text-left">
                <h3 className="text-xl font-black text-white uppercase mb-3">{project.title}</h3>
                <p className="text-xs text-white/40 font-light leading-relaxed mb-6 line-clamp-2">{project.desc}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2 text-[9px] font-bold text-white/30 uppercase tracking-widest">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {feat}
                    </div>
                  ))}
                </div>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 px-6 items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[9px] font-bold uppercase tracking-[0.3em] hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] transition-all rounded-xl"
                >
                  Visit Website <ArrowUpRight className="ml-2 w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
