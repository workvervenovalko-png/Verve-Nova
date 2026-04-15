"use client";

import { Linkedin, Twitter, ArrowUpRight, ShieldCheck, Mail, Send, Phone, Globe, Facebook, MessageCircle, Instagram } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    studio: [
      { name: "The Brief", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Success", href: "/testimonials" },
      { name: "Newsroom", href: "/blog" },
      { name: "Partners", href: "/registry" },
    ],
    expertise: [
      { name: "Software Eng.", href: "/software-engineering" },
      { name: "AI Automation", href: "/ai-automation" },
      { name: "Cloud Ops", href: "/cloud-infrastructure" },
      { name: "Cybersecurity", href: "/cybersecurity" },
      { name: "Enterprise Solutions", href: "/enterprise-solutions" },
    ],
    registry: [
      { name: "Privacy Protocol", href: "/privacy" },
      { name: "Service Terms", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "NDA Compliance", href: "/nda" },
      { name: "Govt. Udyam", href: "/registry" },
    ]
  };

  return (
    <footer className="relative pt-8 pb-4 border-t border-white/[0.04] overflow-hidden bg-[#0A0A0C]">
      {/* Cinematic Moving Background Text (Marquee) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex flex-col justify-center overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 md:gap-20"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="text-[12vh] md:text-[30vh] font-black text-white opacity-[0.01] tracking-tighter uppercase leading-none select-none">
                VERVE NOVA TECHNOLOGIES //
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Complex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 items-start">

          {/* High-Impact Identity */}
          <div className="lg:col-span-3 flex flex-col items-center text-center md:items-start md:text-left gap-10">
            <div className="flex flex-col items-center md:items-start gap-4 md:gap-5 px-4 md:px-0">
              <Link href="/" className="flex items-center gap-4 md:gap-5 group">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/[0.03] border border-white/[0.1] rounded-2xl group-hover:border-indigo-500/50 transition-all duration-500 glass-card overflow-hidden">
                  <img src="/icon.svg" alt="Verve Nova Logo" className="w-7 h-7 md:w-8 md:h-8 object-contain brightness-0 invert" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-base md:text-lg font-black tracking-widest text-white uppercase leading-none group-hover:text-indigo-400 transition-colors">Verve Nova</span>
                  <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.5em] mt-1.5 leading-none">Technologies</span>
                </div>
              </Link>
              <div className="h-px w-full max-w-[120px] bg-gradient-to-r from-indigo-500/30 to-transparent my-1 hidden md:block" />
              <p className="text-[9px] md:text-[10px] text-white/30 font-bold leading-relaxed max-w-xs uppercase tracking-widest">
                Global engineering / Specialized software systems / Mission-Critical Excellence.
              </p>
            </div>


            <div className="flex flex-col items-center md:items-start gap-6">
              <a href="tel:7380663685" className="flex items-center gap-4 group md:translate-x-[-4px]">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-white/[0.06]">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-black text-white/60 group-hover:text-indigo-400 transition-colors tracking-wider">+91 7380663685</span>
              </a>
              <a href="mailto:work.vervenova.lko@gmail.com" className="flex items-center gap-4 group md:translate-x-[-4px]">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm border border-white/[0.06]">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-black text-white/60 group-hover:text-indigo-400 transition-colors tracking-wider">work.vervenova.lko@gmail.com</span>
              </a>
            </div>

            <div className="flex justify-center md:justify-start gap-3">
              {[
                { icon: <Linkedin className="w-4 h-4" />, href: "#", hover: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20" },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
                    </svg>
                  ), href: "https://x.com/vervenova", hover: "hover:text-white hover:bg-white/10 hover:border-white/20"
                },
                { icon: <MessageCircle className="w-4 h-4" />, href: "https://wa.me/917380663685", hover: "hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20" },
                { icon: <Facebook className="w-4 h-4" />, href: "#", hover: "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/20" },
                { icon: <Instagram className="w-4 h-4" />, href: "#", hover: "hover:text-pink-400 hover:bg-pink-500/10 hover:border-pink-500/20" }
              ].map((item, i) => (
                <Link key={i} href={item.href} className={`w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center text-white/20 transition-all ${item.hover}`}>
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Studio Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left col-span-1">
            <h5 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-6 md:mb-12 border-l-2 md:border-l-2 border-indigo-500 md:pl-4 pl-0">The Studio</h5>
            <ul className="flex flex-col items-center md:items-start gap-4 md:gap-6">
              {footerLinks.studio.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[11px] md:text-xs font-black text-white/40 hover:text-indigo-400 uppercase tracking-widest transition-colors flex items-center gap-2 group">
                    {link.name} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left col-span-1">
            <h5 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-6 md:mb-12 border-l-2 md:border-l-2 border-white/10 md:pl-4 pl-0">Expertise</h5>
            <ul className="flex flex-col items-center md:items-start gap-4 md:gap-6">
              {footerLinks.expertise.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[11px] md:text-xs font-black text-white/40 hover:text-indigo-400 uppercase tracking-widest transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left col-span-1">
            <h5 className="text-[9px] md:text-[10px] font-black text-white/20 uppercase tracking-[0.5em] mb-6 md:mb-12 border-l-2 md:border-l-2 border-white/10 md:pl-4 pl-0">Governance</h5>
            <ul className="flex flex-col items-center md:items-start gap-4 md:gap-6">
              {footerLinks.registry.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-[11px] md:text-xs font-black text-white/40 hover:text-indigo-400 uppercase tracking-widest transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Registry */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start gap-8">
            <h5 className="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] mb-4 md:mb-6">Trust Registry</h5>

            <div className="flex flex-col items-center md:items-start gap-6 md:gap-8">
              <div className="flex items-center gap-5 md:gap-6 group">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img src="/msme-udyam-registration.jpeg" alt="MSME Logo" className="max-w-full max-h-full object-contain brightness-75 hover:brightness-100 transition-all" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] md:text-xs font-black text-white/60 uppercase tracking-widest leading-none">MSME REGISTERED</span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1.5 leading-none">CERTIFIED MINISTRY UNIT</span>
                </div>
              </div>

              <div className="flex items-center gap-5 md:gap-6 group">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <img src="/udyam.png" alt="Udyam Logo" className="max-w-full max-h-full object-contain brightness-75 hover:brightness-100 transition-all" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[11px] md:text-xs font-black text-white/60 uppercase tracking-widest leading-none">UDYAM COMPLIANT</span>
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1.5 leading-none">GOVERNMENT APPROVED</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] font-black text-white/15 tracking-[0.4em] uppercase">
              © {currentYear} VERVE NOVA TECHNOLOGIES
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
