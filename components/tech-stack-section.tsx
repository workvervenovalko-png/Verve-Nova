"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Server, Smartphone, Cloud, Database, Cpu } from "lucide-react";

export function TechStackSection() {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "mobile" | "cloud" | "database" | "ai">("frontend");

  const tabs = [
    { id: "frontend", label: "Frontend", icon: Code2 },
    { id: "backend", label: "Backend", icon: Server },
    { id: "mobile", label: "Mobile Apps", icon: Smartphone },
    { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
    { id: "database", label: "Databases", icon: Database },
    { id: "ai", label: "AI & ML", icon: Cpu },
  ] as const;

  const stackData = {
    frontend: [
      { name: "React.js", badge: "SPA Architecture", color: "text-sky-500", bg: "bg-sky-50" },
      { name: "Next.js", badge: "Server-Side SSR", color: "text-slate-900", bg: "bg-slate-100" },
      { name: "TypeScript", badge: "Type Safety", color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Vue.js / Nuxt", badge: "Reactive UI", color: "text-emerald-500", bg: "bg-emerald-50" },
      { name: "Tailwind CSS", badge: "Atomic Design", color: "text-cyan-500", bg: "bg-cyan-50" },
      { name: "Three.js / WebGL", badge: "3D Kinetic Render", color: "text-purple-600", bg: "bg-purple-50" },
    ],
    backend: [
      { name: "Node.js", badge: "Event-Driven I/O", color: "text-emerald-600", bg: "bg-emerald-50" },
      { name: "Python / FastAPI", badge: "High-Throughput APIs", color: "text-yellow-600", bg: "bg-yellow-50" },
      { name: "Go (Golang)", badge: "Microservices", color: "text-cyan-600", bg: "bg-cyan-50" },
      { name: "Java / Spring Boot", badge: "Enterprise Grade", color: "text-orange-600", bg: "bg-orange-50" },
      { name: ".NET Core", badge: "Mission Critical", color: "text-indigo-600", bg: "bg-indigo-50" },
      { name: "GraphQL", badge: "Unified Schema", color: "text-pink-600", bg: "bg-pink-50" },
    ],
    mobile: [
      { name: "Flutter", badge: "Cross-Platform", color: "text-blue-500", bg: "bg-blue-50" },
      { name: "React Native", badge: "Native Bridge", color: "text-sky-600", bg: "bg-sky-50" },
      { name: "Swift / iOS", badge: "Apple Native", color: "text-orange-500", bg: "bg-orange-50" },
      { name: "Kotlin / Android", badge: "Android Native", color: "text-purple-600", bg: "bg-purple-50" },
      { name: "PWA Systems", badge: "Offline-First", color: "text-teal-600", bg: "bg-teal-50" },
      { name: "Capacitor", badge: "Hybrid Runtime", color: "text-blue-700", bg: "bg-blue-50" },
    ],
    cloud: [
      { name: "Amazon Web Services", badge: "Premier Partner", color: "text-[#f9661b]", bg: "bg-orange-50" },
      { name: "Docker & Kubernetes", badge: "Containerization", color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Terraform", badge: "Infrastructure as Code", color: "text-purple-600", bg: "bg-purple-50" },
      { name: "GitHub Actions", badge: "Automated CI/CD", color: "text-slate-800", bg: "bg-slate-100" },
      { name: "Cloudflare", badge: "Edge Security & CDN", color: "text-amber-600", bg: "bg-amber-50" },
      { name: "Datadog", badge: "APM Telemetry", color: "text-indigo-600", bg: "bg-indigo-50" },
    ],
    database: [
      { name: "PostgreSQL", badge: "ACID Relational", color: "text-blue-700", bg: "bg-blue-50" },
      { name: "MongoDB", badge: "NoSQL Document", color: "text-emerald-600", bg: "bg-emerald-50" },
      { name: "Redis", badge: "In-Memory Caching", color: "text-red-600", bg: "bg-red-50" },
      { name: "Amazon DynamoDB", badge: "Serverless KV", color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Milvus / Pinecone", badge: "Vector Embeddings", color: "text-purple-600", bg: "bg-purple-50" },
      { name: "Elasticsearch", badge: "Full-Text Search", color: "text-teal-600", bg: "bg-teal-50" },
    ],
    ai: [
      { name: "OpenAI GPT-4o", badge: "LLM Orchestration", color: "text-emerald-700", bg: "bg-emerald-50" },
      { name: "Claude 3.5 Sonnet", badge: "Complex Reasoning", color: "text-amber-700", bg: "bg-amber-50" },
      { name: "LangChain & LlamaIndex", badge: "RAG Pipelines", color: "text-blue-600", bg: "bg-blue-50" },
      { name: "PyTorch & TensorFlow", badge: "Neural Training", color: "text-orange-600", bg: "bg-orange-50" },
      { name: "AWS Bedrock", badge: "Enterprise GenAI", color: "text-[#f9661b]", bg: "bg-orange-50" },
      { name: "Hugging Face", badge: "Open Weights Models", color: "text-yellow-600", bg: "bg-yellow-50" },
    ],
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-4">
            Technical Architecture
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Future-Ready Technology Stack for Enterprise Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We leverage battle-tested languages, high-performance runtimes, and resilient cloud providers to ensure zero tech debt and maximum scale.
          </p>
        </div>

        {/* AppSquadz Style Pill Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-[#1b67b2] text-white shadow-md shadow-blue-500/25 scale-105"
                    : "bg-[#f1f5f9] text-[#334155] border border-[#e2e8f0] hover:bg-[#e2e8f0]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Technology Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {stackData[activeTab].map((tech, index) => (
            <div
              key={index}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-5 flex flex-col items-center text-center justify-between hover:bg-white hover:border-[#1b67b2] hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${tech.bg} ${tech.color} flex items-center justify-center font-bold text-sm mb-3 group-hover:scale-110 transition-transform`}>
                <Code2 className="w-6 h-6" />
              </div>

              <h3 className="text-sm font-bold text-[#0f172a] mb-1 group-hover:text-[#1b67b2] transition-colors">
                {tech.name}
              </h3>

              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white border border-[#e2e8f0] text-[#64748b]">
                {tech.badge}
              </span>
            </div>
          ))}
        </div>

        {/* AppSquadz Centered CTA Button */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#1b67b2] hover:bg-[#15538e] text-white rounded-[10px] uppercase font-semibold text-xs sm:text-sm px-8 py-3.5 transition-all shadow-md shadow-blue-600/20"
          >
            <span>Consult Our Tech Architects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
