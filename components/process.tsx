"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Search, Compass, PenTool, Code2, Rocket, HeartHandshake } from "lucide-react";
import { MagneticCard } from "@/components/ui/magnetic-card";

const steps = [
  { 
    id: "01",
    icon: Search, 
    title: "Discovery", 
    desc: "We talk to you to understand your business goals and find the best digital solutions for your needs.",
    gradient: "from-blue-500 to-indigo-600"
  },
  { 
    id: "02",
    icon: Compass, 
    title: "Strategy", 
    desc: "We create a clear project roadmap with fixed timelines and detailed technology planning.",
    gradient: "from-indigo-500 to-violet-600"
  },
  { 
    id: "03",
    icon: PenTool, 
    title: "Design", 
    desc: "We design beautiful and easy-to-use screens that help your customers navigate effortlessly.",
    gradient: "from-violet-500 to-purple-600"
  },
  { 
    id: "04",
    icon: Code2, 
    title: "Build", 
    desc: "Rigorous engineering phase using cutting-edge stacks for speed, security, and scale.",
    gradient: "from-purple-500 to-pink-600"
  },
  { 
    id: "05",
    icon: Rocket, 
    title: "Launch", 
    desc: "We test everything thoroughly and launch your project smoothly with zero issues.",
    gradient: "from-pink-500 to-rose-600"
  },
  { 
    id: "06",
    icon: HeartHandshake, 
    title: "Support", 
    desc: "We provide 24/7 technical help to make sure your business grows without any technical hurdles.",
    gradient: "from-rose-500 to-orange-600"
  }
];

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="py-40 px-6 bg-[#0C0C0F] relative overflow-hidden border-t border-white/[0.04]">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.01] -skew-x-12 translate-x-1/2 pointer-events-none" />
      <div className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-40 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/30" />
            <span className="text-[10px] font-mono font-bold text-white/25 uppercase tracking-[0.5em]">Our Simple Process</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-indigo-500/30" />
          </motion.div>
          
          <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
            How We <br /> <span className="text-gradient">Work.</span>
          </h3>
        </div>

        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-px h-full bg-white/[0.04] hidden md:block">
            <motion.div 
               style={{ height: pathHeight }}
               className="w-full bg-gradient-to-b from-indigo-500 to-violet-600 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            />
          </div>

          <div className="space-y-32 relative">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className="relative">
                  {/* Floating Number Overlay */}
                  <div className={`absolute top-0 ${isEven ? 'right-0 lg:right-[15%]' : 'left-0 lg:left-[15%]'} pointer-events-none opacity-[0.02]`}>
                    <span className="text-[12rem] lg:text-[20rem] font-black leading-none select-none tracking-tighter text-white">
                      {step.id}
                    </span>
                  </div>

                  <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Column */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="flex-1 space-y-6 text-center md:text-left"
                    >
                      <div className={`flex items-center gap-4 ${isEven ? 'md:flex-row-reverse' : ''} justify-center md:justify-start`}>
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                          <step.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-[10px] font-black text-white/15 uppercase tracking-widest leading-none">Phase {step.id}</span>
                      </div>

                      <h4 className="text-3xl lg:text-5xl font-black text-white/90 uppercase tracking-tighter">
                        {step.title}
                      </h4>
                      <p className="text-sm lg:text-lg text-white/30 font-light leading-relaxed max-w-md mx-auto md:mx-0">
                        {step.desc}
                      </p>
                    </motion.div>

                    {/* Center Node */}
                    <div className="relative z-20">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] border-2 border-background"
                      />
                    </div>

                    {/* Visual Column */}
                    <div className="flex-1 hidden md:flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="w-full max-w-[280px]"
                      >
                         <div className="glass-card p-8 rounded-[3rem] relative overflow-hidden group">
                           <div className="relative z-10 space-y-4">
                              <div className="w-full h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "100%" }}
                                  transition={{ duration: 1.5, delay: 0.5 }}
                                  className={`h-full bg-gradient-to-r ${step.gradient}`} 
                                />
                              </div>
                              <div className="flex justify-between text-[8px] font-bold text-white/15 uppercase tracking-widest">
                                <span>Optimization</span>
                                <span>Verified</span>
                              </div>
                           </div>
                         </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
