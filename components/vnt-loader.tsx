"use client";

import { motion } from "framer-motion";

interface VNTLoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function VNTLoader({ className = "", size = "md" }: VNTLoaderProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-32 h-32",
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Delicate Rotating Arc */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute rounded-full border-t border-indigo-500/20 ${sizes[size]}`}
        style={{ width: "140%", height: "140%" }}
      />

      {/* Subtle Logo Pulse */}
      <motion.div
        animate={{
          scale: [0.98, 1, 0.98],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative z-10 ${sizes[size]}`}
      >
        <img
          src="/vnt-logo.png"
          alt="VNT Loader"
          className="w-full h-full object-contain grayscale-[0.2] opacity-90"
        />
      </motion.div>
    </div>
  );
}
