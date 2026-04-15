"use client";

import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Global Core Banking Migration",
    category: "Enterprise Solutions",
    description: "Architecting a multi-region cloud migration for a Tier-1 financial institution, handling 10M+ daily active users.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "EcoSys Smart Grid AI",
    category: "AI & Infrastructure",
    description: "Neural network-based energy distribution system for metropolitan areas, reducing waste by 24% annually.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "OmniChannel Retail Mesh",
    category: "Digital Experience",
    description: "Unified commerce engine integrating global supply chains with real-time consumer touchpoints across 40 countries.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  },
];


export function Projects() {
  return (
    <section id="projects" className="py-32 px-4 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.2em] text-primary uppercase mb-4">
              Case Studies
            </h2>
            <p className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Enterprise Success <br /> at Global Scale
            </p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 group border-b border-primary/30 pb-1">
            View All Projects <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group relative flex flex-col bg-[#141414] border border-[#262626] rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 shadow-2xl shadow-black"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                  {project.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  {project.description}
                </p>
                <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">Read Full Story</span>
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


