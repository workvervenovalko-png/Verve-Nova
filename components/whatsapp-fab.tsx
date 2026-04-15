"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  const phoneNumber = "917380663685";
  const message = "Hello Verve Nova, I am interested in your services.";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-4 rounded-2xl flex items-center gap-4 hover:shadow-[0_0_32px_rgba(16,185,129,0.15)] hover:border-emerald-500/20 hover:scale-105 transition-all duration-300 shadow-2xl"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#09090B] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
        </div>

        <div className="flex flex-col pr-2">
          <span className="text-[8px] font-bold text-white/25 uppercase tracking-widest leading-none mb-1">Online Support</span>
          <span className="text-[10px] font-black text-white uppercase tracking-wider leading-none">Chat Now</span>
        </div>
      </a>
    </motion.div>
  );
}
