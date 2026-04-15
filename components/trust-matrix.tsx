"use client";

import { motion, useSpring, useTransform, useInView, useMotionValueEvent } from "framer-motion";
import { Star, ShieldCheck, Award, MessageSquare, Cloud, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [roundedValue, setRoundedValue] = useState("0");

  const numericValue = parseFloat(value.match(/[\d.]+/)?.[0] || "0");
  const suffix = value.replace(/[\d.]+/, "");
  const isDecimal = value.includes(".");

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 100,
    damping: 30,
  });

  const display = useTransform(spring, (current) =>
    isDecimal ? current.toFixed(1) : Math.floor(current).toString()
  );

  useMotionValueEvent(display, "change", (latest) => {
    setRoundedValue(latest.toString());
  });

  useEffect(() => {
    if (isInView) {
      spring.set(numericValue);
    }
  }, [isInView, numericValue, spring]);

  return (
    <span ref={ref}>
      {roundedValue}
      {suffix}
    </span>
  );
}

export function TrustMatrix() {
  const stats = [
    {
      label: "Google Rating",
      value: "4.9/5.0",
      sub: "Verified Reviews",
      icon: Star,
      gradient: "from-amber-500 to-orange-500",
      glow: "rgba(245, 158, 11, 0.15)"
    },
    {
      label: "Upwork Success",
      value: "100%",
      sub: "Job Success Score",
      icon: Award,
      gradient: "from-emerald-500 to-teal-500",
      glow: "rgba(16, 185, 129, 0.15)"
    },
    {
      label: "Projects Done",
      value: "50+",
      sub: "Successful Deliveries",
      icon: MessageSquare,
      gradient: "from-indigo-500 to-violet-500",
      glow: "rgba(99, 102, 241, 0.15)"
    },
    {
      label: "Data Security",
      value: "NDA Ready",
      sub: "100% Confidentiality",
      icon: ShieldCheck,
      gradient: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.15)"
    },

    {
      label: "Global Reach",
      value: "12+ Countries",
      sub: "International Clients",
      icon: Globe,
      gradient: "from-violet-500 to-purple-500",
      glow: "rgba(139, 92, 246, 0.15)"
    }
  ];

  return (
    <section className="py-28 bg-background relative overflow-hidden section-glow">
      {/* Background Mesh */}
      <div className="absolute inset-0 mesh-gradient-1 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="text-center mb-20 px-4">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.5em] mb-5">Why Clients Trust Us</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-[0.9]">
            Proven Results & <br className="hidden md:block" />
            <span className="text-white/10">High Ratings</span>
          </h2>
        </div>

        <div className="flex lg:flex-nowrap flex-wrap justify-center gap-4 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 120 }}
              className="glass-card p-8 rounded-[2rem] hover:glass-card-hover transition-all duration-500 group flex flex-col items-center text-center cursor-default w-full sm:w-[240px]"
              style={{ "--glow": stat.glow } as React.CSSProperties}
            >
              <div className="flex items-center justify-center w-full mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_var(--glow)] transition-all`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                {stat.value.match(/\d/) ? (
                  <AnimatedNumber value={stat.value} />
                ) : (
                  stat.value
                )}
              </h3>
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
