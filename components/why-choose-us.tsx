"use client";

import { Scale, Globe, Users, Lightbulb } from "lucide-react";

const reasons = [
  {
    icon: Scale,
    title: "Enterprise Reliability",
    description: "Battle-tested systems designed for 99.99% availability and mission-critical performance.",
  },
  {
    icon: Globe,
    title: "Global Delivery Model",
    description: "Distributed teams providing 24/7 support and development across multiple time zones.",
  },
  {
    icon: Users,
    title: "Domain Expertise",
    description: "Deep industry knowledge across financial, healthcare, and industrial sectors.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Innovation",
    description: "Bridging the gap between emerging technology and tangible business outcomes.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-32 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4">
            Why Choose Us
          </h2>
          <p className="text-4xl md:text-5xl font-bold text-white mb-6">
            The Partner of Choice <br className="hidden md:block" /> for Global Leaders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group p-8 rounded-2xl bg-[#141414] border border-[#262626] transition-all duration-500 hover:bg-[#1A1A1A] hover:border-primary/50 shadow-2xl hover:-translate-y-2"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-primary group-hover:scale-110">
                <reason.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {reason.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-white/80 transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



