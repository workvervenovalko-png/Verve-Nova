"use client";

import * as React from "react";
import { ArrowRight, Fingerprint, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

function InteractiveLetter({ char, index, className }: { char: string; index: number; className?: string }) {
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 200, damping: 10 });
  const sY = useSpring(mY, { stiffness: 200, damping: 10 });

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const { clientX, clientY, currentTarget } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mX.set((clientX - (left + width / 2)) * 0.3);
        mY.set((clientY - (top + height / 2)) * 0.3);
      }}
      onMouseLeave={() => { mX.set(0); mY.set(0); }}
      style={{ x: sX, y: sY, display: "inline-block" }}
      className={`transition-colors cursor-default ${className}`}
    >
      {char}
    </motion.span>
  );
}

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const x1 = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const x2 = useTransform(springX, [-0.5, 0.5], [40, -40]);
  const y1 = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const y2 = useTransform(springY, [-0.5, 0.5], [20, -20]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#09090B] pt-24"
    >
      {/* 🌌 Atmospheric Backdrop & Editorial Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 mesh-gradient-1 opacity-30" />
        <div className="absolute inset-0 dot-grid opacity-20" />

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.div
            style={{ x: x2, y: y2 }}
            className="text-[30vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter"
          >
            VNT
          </motion.div>
        </div>

        <div className="absolute top-[25%] left-0 w-full h-px bg-white/[0.03]" />
        <div className="absolute bottom-[25%] left-0 w-full h-px bg-white/[0.03]" />
        <div className="absolute left-[20%] top-0 h-full w-px bg-white/[0.03]" />
        <div className="absolute right-[20%] top-0 h-full w-px bg-white/[0.03]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full min-h-[70vh] flex flex-col items-center justify-center">

        <div className="relative w-full max-w-7xl flex flex-col gap-12 lg:gap-0">

          {/* Top Cluster: VERVE + Description */}
          <motion.div
            style={{ x: x1, y: y1 }}
            className="relative z-20 flex flex-col items-center lg:items-start lg:ml-[5%] xl:ml-[10%] text-center lg:text-left"
          >

            <h1 className="sr-only">
              Verve Nova Tech (VNT) - Top Website Company and Software Company in Lucknow. VNT Global offers enterprise technology, AI solutions, and software development.
            </h1>
            <div role="heading" aria-level={2} className="text-[14vw] sm:text-[12vw] lg:text-[11vw] font-black text-white leading-[0.8] tracking-tighter uppercase select-none flex mb-6 md:mb-8">
              {"VERVE".split("").map((c, i) => (
                <InteractiveLetter key={i} char={c} index={i} className="text-white hover:text-indigo-400" />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="max-w-md lg:pl-4 flex flex-col items-center lg:items-start"
            >
              <div className="h-px w-20 bg-gradient-to-r from-indigo-500/30 to-transparent mb-6 hidden lg:block" />
              <p className="text-[10px] md:text-xs text-white/30 font-bold tracking-[0.3em] uppercase leading-relaxed max-w-[320px] md:max-w-[400px]">
                Engineering <span className="text-white">scalable digital solutions</span> that power modern businesses worldwide.
              </p>
            </motion.div>
          </motion.div>

          {/* Bottom Cluster: NOVA + Buttons */}
          <motion.div
            style={{ x: x2, y: y2 }}
            className="relative z-20 flex flex-col items-center lg:items-end lg:mr-[5%] xl:mr-[10%] lg:-mt-10 mt-6 lg:mt-0"
          >
            <div role="heading" aria-level={2} className="text-[14vw] sm:text-[12vw] lg:text-[11vw] font-black text-white leading-[0.8] tracking-tighter uppercase select-none flex mb-8 md:mb-10 drop-shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              {"NOVA".split("").map((c, i) => (
                <InteractiveLetter
                  key={i}
                  char={c}
                  index={i + 5}
                  className="text-gradient-aurora"
                />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 lg:pr-4"
            >
              <Link href="/projects">
                <Button
                  variant="secondary"
                  className="h-12 px-8 md:px-10 text-[9px] md:text-[10px] font-black tracking-[0.3em] rounded-lg !bg-white !text-black hover:!bg-white/90 transition-all uppercase border-0 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] opacity-100 group"
                >
                  View Projects
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-2" />
                </Button>
              </Link>
 
              <Link href="/contact" className="group flex items-center gap-4 text-[9px] font-black tracking-[0.4em] uppercase text-white transition-all py-2">
                <Fingerprint className="w-4 h-4 md:w-5 md:h-5 text-indigo-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)] transition-colors" />
                Contact Us
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Editorial Watermark */}
      <div className="absolute right-10 bottom-10 tech-signature hidden lg:block opacity-20">
        MN-PR-VN-ECOSYSTEM-VNT
      </div>

      <div className="noise-overlay" />
    </section>
  );
}
