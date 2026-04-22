"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <Navbar />
      
      {/* Header Area */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-indigo-400 uppercase tracking-[0.5em] mb-6"
          >
            Connect With Excellence
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-8"
          >
            Contact <span className="text-gradient">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Whether you have a vision to build or a problem to solve, our specialists are ready to help you navigate the future of technology.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Email Us", val: "contact@vervenovatech.com", icon: Mail, color: "text-indigo-400" },
            { label: "Call Us", val: "+91 99999 99999", icon: Phone, color: "text-violet-400" },
            { label: "Headquarters", val: "Lucknow, India", icon: MapPin, color: "text-cyan-400" },
            { label: "Web", val: "www.vervenovatech.com", icon: Globe, color: "text-emerald-400" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.04] transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">{item.label}</p>
              <p className="text-sm font-black text-white/70 uppercase tracking-tight">{item.val}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      <Footer />
    </main>
  );
}
