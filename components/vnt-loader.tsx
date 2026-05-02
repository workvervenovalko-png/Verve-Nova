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
      {/* Ambient Glow Background */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute rounded-full bg-indigo-500/20 blur-xl ${sizes[size]}`}
      />

      {/* Rotating Ring (Sophisticated) */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute rounded-full border-t-2 border-r-2 border-indigo-500/30 ${sizes[size]}`}
        style={{ width: "120%", height: "120%" }}
      />

      {/* Main Logo with Pulse & Shimmer */}
      <motion.div
        animate={{
          scale: [0.95, 1.05, 0.95],
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
          className="w-full h-full object-contain"
        />
        
      </motion.div>
    </div>
  );
}
