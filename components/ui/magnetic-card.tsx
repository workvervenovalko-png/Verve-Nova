"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function MagneticCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 100, damping: 20 });
  const sY = useSpring(mY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mX.set((clientX - centerX) * 0.1);
    mY.set((clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mX.set(0);
    mY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: sX, y: sY }}
      className={`specular-glow ${className}`}
    >
      {children}
    </motion.div>
  );
}
