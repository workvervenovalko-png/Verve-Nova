"use client";

import React from "react";
import { Search, Compass, PenTool, Code2, Rocket, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export function Process() {
  const steps = [
    {
      id: "01",
      icon: Search,
      title: "Discovery",
      desc: "We talk to you to understand your business goals and find the best digital solutions for your needs.",
    },
    {
      id: "02",
      icon: Compass,
      title: "Strategy",
      desc: "We create a clear project roadmap with fixed timelines and detailed technology planning.",
    },
    {
      id: "03",
      icon: PenTool,
      title: "Design",
      desc: "We design beautiful and easy-to-use screens that help your customers navigate effortlessly.",
    },
    {
      id: "04",
      icon: Code2,
      title: "Build",
      desc: "Rigorous engineering phase using cutting-edge stacks for speed, security, and scale.",
    },
    {
      id: "05",
      icon: Rocket,
      title: "Launch",
      desc: "We test everything thoroughly and launch your project smoothly with zero issues.",
    },
    {
      id: "06",
      icon: HeartHandshake,
      title: "Support",
      desc: "We provide 24/7 technical help to make sure your business grows without any technical hurdles.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact Verve Nova Strings + AppSquadz Layout) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
            Our Simple Process
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight mb-4">
            How We <span className="text-[#1b67b2]">Work</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            A structured, transparent roadmap from initial concept discovery to continuous cloud governance and scalability.
          </p>
        </div>

        {/* 6 Steps Grid (AppSquadz Style Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:bg-white hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center group-hover:bg-[#1b67b2] group-hover:text-white transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-[#1b67b2] transition-colors">
                      {step.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#1b67b2] transition-colors mb-3">
                    Phase {step.id}: {step.title}
                  </h3>

                  <p className="text-sm text-[#475569] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
