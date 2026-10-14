"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ContactSection } from "@/components/contact-section";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Sparkles, Clock, ShieldCheck, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const contactDetails = [
    {
      label: "Official Email",
      val: "contact@vervenovatech.com",
      subtext: "Guaranteed executive response within 2–4 hours",
      icon: Mail,
      link: "mailto:contact@vervenovatech.com",
      accent: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      label: "Direct Phone & WhatsApp",
      val: "+91 7380663685",
      subtext: "Mon – Sat (9:30 AM – 7:00 PM IST) // Instant Chat",
      icon: Phone,
      link: "https://wa.me/917380663685?text=Hi%20Verve%20Nova%20Team%2C%20I%20would%20like%20to%20discuss%20a%20new%20software%20project.",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      label: "Registered Headquarters",
      val: "Sector 10, Indira Nagar, Lucknow",
      subtext: "Uttar Pradesh 226016, India (MSME: UDYAM-UP-10-0047070)",
      icon: MapPin,
      link: "https://maps.google.com/?q=Sector+10+Indira+Nagar+Lucknow+226016",
      accent: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Header Area */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Start Your Engineering Journey
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950"
          >
            Connect With <span className="text-[#1b67b2]">Our Architects</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Whether you have an early-stage concept, an RFP for custom software, or a legacy system needing overhaul, we are ready to assist.
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-12 px-6 bg-slate-50/50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactDetails.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-[#1b67b2] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.accent} group-hover:scale-105 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{item.label}</p>
                <p className="text-base font-extrabold text-slate-900 group-hover:text-[#1b67b2] transition-colors">{item.val}</p>
              </div>
              <p className="text-xs text-slate-500 font-normal mt-4 pt-4 border-t border-slate-100">{item.subtext}</p>
            </motion.a>
          ))}
        </div>

        {/* SLA & Reassurance Badges */}
        <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
            <Clock className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Fast Response Guarantee</span>
              <span className="text-slate-500">Every inquiry responded within 2–4 hours</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Strict Confidentiality</span>
              <span className="text-slate-500">Mutual NDA signed before discussing project data</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
            <MessageSquare className="w-5 h-5 text-indigo-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 block">Technical Consultation</span>
              <span className="text-slate-500">Free 30-minute architecture scoping call</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Form Section */}
      <ContactSection />

      <Footer />
    </main>
  );
}
