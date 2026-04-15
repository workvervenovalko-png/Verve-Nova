"use client";

import { motion } from "framer-motion";
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Twitter,
  Phone,
  Hash
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: "LinkedIn",
    href: "https://linkedin.com/company/vervenova",
    color: "hover:bg-blue-600 hover:border-blue-600/30 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)]"
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Call Us",
    href: "tel:7380663685",
    color: "hover:bg-blue-600 hover:border-blue-600/30 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)]"
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    label: "WhatsApp",
    href: "https://wa.me/917380663685",
    color: "hover:bg-emerald-500 hover:border-emerald-500/30 hover:shadow-[0_0_16px_rgba(16,185,129,0.2)]"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
      </svg>
    ),
    label: "X",
    href: "https://x.com/vervenova",
    color: "hover:bg-white/10 hover:border-white/20"
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
    href: "https://instagram.com/vervenova",
    color: "hover:bg-pink-600 hover:border-pink-600/30 hover:shadow-[0_0_16px_rgba(219,39,119,0.2)]"
  },
  {
    icon: <Facebook className="w-4 h-4" />,
    label: "Facebook",
    href: "https://facebook.com/vervenova",
    color: "hover:bg-blue-800 hover:border-blue-800/30 hover:shadow-[0_0_16px_rgba(30,64,175,0.2)]"
  }
];

export function SocialSidebar() {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden xl:flex flex-col gap-3">
      {socialLinks.map((link, i) => (
        <motion.div
          key={link.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + i * 0.1 }}
          className="relative group"
        >
          <Link
            href={link.href}
            target="_blank"
            className={`w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/25 group-hover:text-white ${link.color} transition-all duration-300`}
          >
            {link.icon}
          </Link>
          
          <div className="absolute right-16 top-1/2 -translate-y-1/2 px-4 py-2 bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            {link.label}
          </div>
        </motion.div>
      ))}
      <div className="w-[1px] h-20 bg-gradient-to-b from-white/[0.06] to-transparent mx-auto mt-4" />
    </div>
  );
}
