"use client";

import { motion } from "framer-motion";
import { 
  Linkedin, 
  Instagram, 
  Facebook, 
  MessageCircle, 
  Phone, 
} from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: <Linkedin className="w-4 h-4" />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/verve-nova/",
    hoverBg: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Direct Call",
    href: "tel:7380663685",
    hoverBg: "hover:bg-neutral-900 hover:text-white hover:border-neutral-900",
  },
  {
    icon: <MessageCircle className="w-4 h-4" />,
    label: "WhatsApp",
    href: "https://wa.me/917380663685",
    hoverBg: "hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
      </svg>
    ),
    label: "X (Twitter)",
    href: "https://x.com/vervenova",
    hoverBg: "hover:bg-neutral-900 hover:text-white hover:border-neutral-900",
  },
  {
    icon: <Instagram className="w-4 h-4" />,
    label: "Instagram",
    hoverBg: "hover:bg-pink-600 hover:text-white hover:border-pink-600",
    handles: [
      { label: "Global", href: "https://www.instagram.com/vntech_global" },
      { label: "India", href: "https://www.instagram.com/vntech_india" },
      { label: "Lucknow", href: "https://www.instagram.com/vntech_lucknow" },
    ],
  },
  {
    icon: <Facebook className="w-4 h-4" />,
    label: "Facebook",
    href: "https://www.facebook.com/share/1CboBbz1bF/",
    hoverBg: "hover:bg-blue-700 hover:text-white hover:border-blue-700",
  },
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
          {link.handles ? (
            <div className="relative flex items-center justify-end">
              <div className="absolute right-full pr-4 flex flex-col gap-2 opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                {link.handles.map((h) => (
                  <Link
                    key={h.label}
                    href={h.href}
                    target="_blank"
                    className="px-4 py-2 bg-white border border-black/[0.08] text-neutral-800 text-[10px] font-mono uppercase tracking-wider rounded-xl hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all whitespace-nowrap shadow-lg"
                  >
                    {h.label}
                  </Link>
                ))}
              </div>
              <button
                className={`w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.08] flex items-center justify-center text-neutral-500 shadow-sm ${link.hoverBg} transition-all duration-300`}
                aria-label={link.label}
              >
                {link.icon}
              </button>
            </div>
          ) : (
            <>
              <Link
                href={link.href || "#"}
                target="_blank"
                className={`w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/[0.08] flex items-center justify-center text-neutral-500 shadow-sm ${link.hoverBg} transition-all duration-300`}
                aria-label={link.label}
              >
                {link.icon}
              </Link>

              <div className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white border border-black/[0.08] text-neutral-800 text-[10px] font-mono uppercase tracking-wider rounded-xl opacity-0 translate-x-3 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-lg whitespace-nowrap">
                {link.label}
              </div>
            </>
          )}
        </motion.div>
      ))}
      <div className="w-[1px] h-16 bg-neutral-300 mx-auto mt-2" />
    </div>
  );
}
