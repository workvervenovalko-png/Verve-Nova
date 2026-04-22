"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, CheckCircle2, Headphones, Building2, Globe, Cpu, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const allProjects = [
    {
      title: "Verve Ledger",
      category: "SaaS Product",
      desc: "Institutional-grade SaaS billing and inventory management platform for retail leaders and business owners.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2072&auto=format&fit=crop",
      link: "https://verve-ledger.vercel.app/",
      icon: LayoutDashboard,
      features: ["Neural Analytics", "Unified POS", "Stock Management"],
      isProduct: true
    },
    {
      title: "Verve CRM",
      category: "SaaS Product",
      desc: "Intelligent client relationship management system designed to automate sales and maximize lead retention.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "https://www.vervenovatechcrm.online/login",
      icon: Users,
      features: ["Sales Automation", "Lead Tracking", "Team Insights"],
      isProduct: true
    },
    {
      title: "Advance Transcription",
      category: "Utility Software",
      desc: "An easy-to-use software that converts audio files into text quickly. Perfect for meetings and interviews.",
      image: "/projects/transcription.png",
      link: "https://www.advancetranscription.com/",
      icon: Headphones,
      features: ["Fast Conversion", "Simple Interface", "Secure Storage"],
      isProduct: false
    },
    {
      title: "Siora Infra Design",
      category: "Industry Portal",
      desc: "A complete professional portal for construction and design companies to manage projects.",
      image: "/projects/siora.png",
      link: "https://siorainfradesign.com/",
      icon: Building2,
      features: ["Project Tracking", "Modern Design", "Client Dashboard"],
      isProduct: false
    },
    {
      title: "Global Core Banking Migration",
      category: "Enterprise Solutions",
      desc: "Architecting a multi-region cloud migration for a Tier-1 financial institution, handling 10M+ daily active users.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      icon: Globe,
      features: ["Cloud Migration", "High Availability", "Security First"],
      isProduct: false
    }
  ];

  const projects = allProjects.filter(p => !p.isProduct);

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
            Portfolio of Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            Our <span className="text-gradient">Projects</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Explore the custom solutions and transformative platforms we've engineered for industry leaders.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group glass-card rounded-[2.5rem] overflow-hidden hover:glass-card-hover transition-all duration-500 flex flex-col h-full border border-white/5 bg-white/[0.02] shadow-2xl"
            >
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-6 left-6 z-20">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/10 group-hover:border-indigo-500/50 transition-colors">
                    <project.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                </div>
                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0F] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                <p className="text-xs text-white/40 font-medium leading-relaxed mb-8">{project.desc}</p>
                
                <div className="flex flex-wrap gap-3 mb-8 mt-auto">
                  {project.features.map(feat => (
                    <div key={feat} className="flex items-center gap-1.5 text-[9px] font-bold text-white/30 uppercase tracking-widest bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                      {feat}
                    </div>
                  ))}
                </div>

                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 px-8 items-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-[1.02] transition-all rounded-2xl w-full justify-center"
                >
                  Visit Live Project <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[4rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">Ready to Build Your <br /> <span className="text-gradient">Next Vision?</span></h2>
          <p className="text-white/40 text-lg mb-12 max-w-xl mx-auto font-medium">Let's architect a solution that defines your industry. From concept to global deployment.</p>
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
