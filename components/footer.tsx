"use client";

import { Linkedin, Twitter, ArrowUpRight, ShieldCheck, Mail, Send, Phone, Globe, Facebook, MessageCircle, Instagram, MapPin } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    studio: [
      { name: "About Us", href: "/about" },
      { name: "Pricing & Plans", href: "/pricing" },
      { name: "Client Reviews", href: "/testimonials" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "MSME Registry", href: "/registry" },
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
      { name: "Careers & Internships", href: "/careers" },
    ],
  };

  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-800 overflow-hidden bg-[#061429] text-white">
      {/* Moving Background Text (Marquee) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 flex flex-col justify-center overflow-hidden">
        <div className="flex whitespace-nowrap overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="flex gap-10 md:gap-20"
          >
            {[...Array(4)].map((_, i) => (
              <span
                key={i}
                className="text-[12vh] md:text-[25vh] font-black text-white opacity-[0.03] tracking-tighter uppercase leading-none select-none"
              >
                VERVE NOVA TECHNOLOGIES //
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Complex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12 items-start">
          {/* High-Impact Identity */}
          <div className="lg:col-span-3 flex flex-col items-center text-center md:items-start md:text-left gap-8">
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:scale-105 overflow-hidden">
                  <img src="/vnt-logo.png" alt="Verve Nova Logo" className="w-11 h-11 object-contain" />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="text-base md:text-lg font-black tracking-widest text-white uppercase leading-none group-hover:text-[#38bdf8] transition-colors">
                    Verve Nova
                  </span>
                  <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em] mt-1.5 leading-none">
                    Technologies
                  </span>
                </div>
              </Link>
              <div className="h-px w-full max-w-[140px] bg-gradient-to-r from-blue-500/50 to-transparent my-1 hidden md:block" />
              <p className="text-[11px] text-slate-300 font-semibold leading-relaxed max-w-xs uppercase tracking-wider">
                Full-Stack Software Engineering • Mobile Apps • AI & Cloud Infrastructure.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3 w-full">
              <a href="tel:+917380663685" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-200 group-hover:bg-[#1b67b2] group-hover:text-white transition-all shadow-sm border border-white/15">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-slate-200 group-hover:text-[#38bdf8] transition-colors tracking-wide">
                  +91 7380663685
                </span>
              </a>
              <a href="mailto:contact@vervenovatech.com" className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-200 group-hover:bg-[#1b67b2] group-hover:text-white transition-all shadow-sm border border-white/15">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-[#38bdf8] transition-colors tracking-wide break-all">
                  contact@vervenovatech.com
                </span>
              </a>
              <div className="flex items-start gap-3 text-left pt-1">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-200 shrink-0 shadow-sm border border-white/15">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-[11px] font-semibold text-slate-300 leading-snug">
                  Sector 10, Indira Nagar, Lucknow, Uttar Pradesh 226016, India
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-3">
              {[
                {
                  icon: <Linkedin className="w-4 h-4" />,
                  href: "https://www.linkedin.com/company/verve-nova/",
                  hover: "hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40",
                },
                {
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
                    </svg>
                  ),
                  href: "https://x.com/vervenova",
                  hover: "hover:text-white hover:bg-white/20 hover:border-white/40",
                },
                {
                  icon: <MessageCircle className="w-4 h-4" />,
                  href: "https://wa.me/917380663685",
                  hover: "hover:text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40",
                },
                {
                  icon: <Facebook className="w-4 h-4" />,
                  href: "https://www.facebook.com/share/1CboBbz1bF/",
                  hover: "hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40",
                },
                {
                  icon: <Instagram className="w-4 h-4" />,
                  hover: "hover:text-pink-400 hover:bg-pink-500/20 hover:border-pink-500/40",
                  handles: [
                    { label: "Global", href: "https://www.instagram.com/vntech_global" },
                    { label: "India", href: "https://www.instagram.com/vntech_india" },
                    { label: "Lucknow", href: "https://www.instagram.com/vntech_lucknow" },
                  ],
                },
              ].map((item, i) =>
                item.handles ? (
                  <div key={i} className="relative group/insta">
                    <button
                      className={`w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center text-slate-200 transition-all ${item.hover}`}
                    >
                      {item.icon}
                    </button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 opacity-0 pointer-events-none group-hover/insta:opacity-100 group-hover/insta:pointer-events-auto transition-all duration-300 z-50">
                      <div className="bg-[#0B1B36] border border-white/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl">
                        {item.handles.map((h) => (
                          <Link
                            key={h.label}
                            href={h.href}
                            target="_blank"
                            className="block px-4 py-2 text-[10px] font-bold text-slate-200 hover:text-pink-400 hover:bg-white/10 uppercase tracking-wider transition-colors whitespace-nowrap"
                          >
                            {h.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={i}
                    href={item.href || "#"}
                    target="_blank"
                    className={`w-9 h-9 rounded-xl border border-white/15 flex items-center justify-center text-slate-200 transition-all ${item.hover}`}
                  >
                    {item.icon}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Studio Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-[0.4em] mb-6 border-l-2 border-[#1b67b2] pl-3">
              The Studio
            </h5>
            <ul className="flex flex-col items-center md:items-start gap-4">
              {footerLinks.studio.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-[0.4em] mb-6 border-l-2 border-white/20 pl-3">
              Expertise
            </h5>
            <ul className="flex flex-col items-center md:items-start gap-4">
              {footerLinks.expertise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance Links */}
          <div className="lg:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
            <h5 className="text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-[0.4em] mb-6 border-l-2 border-white/20 pl-3">
              Governance
            </h5>
            <ul className="flex flex-col items-center md:items-start gap-4">
              {footerLinks.registry.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs font-bold text-slate-300 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust Registry */}
          <div className="lg:col-span-3 flex flex-col items-center md:items-start gap-6">
            <h5 className="text-[10px] font-extrabold text-[#38bdf8] uppercase tracking-[0.4em]">
              Trust Registry
            </h5>

            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/registry#msme-udyam" className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-14 h-14 rounded-xl bg-white/10 p-1.5 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/msme-udyam-registration.jpeg"
                    alt="MSME Registration"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-extrabold text-white uppercase tracking-wider leading-none group-hover:text-[#38bdf8] transition-colors">
                    MSME REGISTERED
                  </span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mt-1.5 leading-none">
                    CERTIFIED MINISTRY UNIT
                  </span>
                  <span className="text-[9px] font-mono text-emerald-400 mt-1">
                    UDYAM-UP-10-0047070
                  </span>
                </div>
              </Link>

              <Link href="/registry#msme-udyam" className="flex items-center gap-4 group p-2 rounded-xl hover:bg-white/5 transition-all">
                <div className="w-14 h-14 rounded-xl bg-white/10 p-1.5 border border-white/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <img
                    src="/udyam.png"
                    alt="Udyam Certificate"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-extrabold text-white uppercase tracking-wider leading-none group-hover:text-[#38bdf8] transition-colors">
                    UDYAM COMPLIANT
                  </span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider mt-1.5 leading-none">
                    GOVERNMENT APPROVED • VERIFY
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-slate-400 tracking-[0.3em] uppercase">
            © {currentYear} VERVE NOVA TECHNOLOGIES • ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
