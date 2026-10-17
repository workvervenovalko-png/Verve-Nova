import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Target, 
  Code2, 
  Users, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Mail, 
  Phone, 
  Layers,
  Cloud
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us & Leadership | Puneet Kushwaha - Founder & CEO",
  description:
    "Learn about Verve Nova Technologies and Founder & CEO Puneet Kushwaha—Principal Systems Architect and enterprise technology executive leading high-scale cloud and software engineering.",
  keywords: [
    "Puneet Kushwaha",
    "Puneet Kushwaha Verve Nova",
    "Puneet Kushwaha Founder CEO",
    "Verve Nova Technologies Leadership",
    "Enterprise Software Architect",
    "Principal Systems Architect",
    "VNT Billzer",
    "Verve CRM",
    "Verve ERP"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/about",
  },
  openGraph: {
    title: "About Verve Nova Technologies & Founder Puneet Kushwaha",
    description:
      "Engineered with architectural rigor. Meet Puneet Kushwaha, Founder & CEO at Verve Nova Technologies, Principal Systems Architect.",
    url: "https://vervenovatech.com/about",
    siteName: "Verve Nova Technologies",
    locale: "en_US",
    type: "profile",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Verve Nova Technologies & Leadership",
    url: "https://vervenovatech.com/about",
    description:
      "Verve Nova Technologies is an enterprise software engineering studio founded and led by Puneet Kushwaha, Principal Systems Architect and Technology Executive.",
    mainEntity: {
      "@type": "Person",
      name: "Puneet Kushwaha",
      jobTitle: "Founder & Chief Executive Officer",
      worksFor: {
        "@type": "Organization",
        name: "Verve Nova Technologies",
        url: "https://vervenovatech.com",
      },
      knowsAbout: [
        "Enterprise Cloud Systems Architecture",
        "Distributed Systems & Microservices",
        "High-Concurrency SaaS Engineering",
        "Next.js, TypeScript & Node.js Ecosystems",
        "Enterprise ERP & POS Platforms (VNT Billzer, Verve CRM, Verve ERP)",
        "Zero-Trust Cybersecurity & ISO 27001 Governance Standards"
      ],
      sameAs: [
        "https://www.linkedin.com/company/verve-nova/",
        "https://github.com/workvervenovalko-png"
      ]
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      {/* Cinematic Studio Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-[20%] left-1/3 w-[500px] h-[500px] bg-blue-500/[0.06] blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="flex flex-col items-center md:items-start gap-6 max-w-5xl text-center md:text-left mx-auto md:mx-0">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-[#1b67b2]" />
              <span className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em]">
                The Studio Profile // Engineering Excellence
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-[0.95] text-slate-950">
              Verve Nova <br /> <span className="text-[#1b67b2]">Technologies.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              We are an enterprise software engineering studio delivering high-performance, scalable cloud applications, custom ERPs, and digital platforms to businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Founder & Leadership Spotlight */}
      <section id="leadership" className="py-24 bg-white border-b border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          
          <div className="max-w-3xl mb-16 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Executive Leadership & Architecture
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight mb-4">
              Architected with Vision. <br className="hidden sm:block" />
              <span className="text-[#1b67b2]">Engineered for Scale.</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">
              Meet the executive technology leadership steering Verve Nova Technologies&apos; architectural precision, enterprise delivery, and proprietary product engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Executive Profile Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-3xl p-8 shadow-lg shadow-slate-100 flex flex-col items-center md:items-start text-center md:text-left relative">
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1b67b2]" />
                  Executive Leadership
                </span>
              </div>

              {/* Founder Avatar & Monogram */}
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#1b67b2] to-[#0d47a1] text-white flex items-center justify-center font-black text-3xl shadow-xl shadow-blue-500/20 mb-6 border-2 border-white">
                PK
              </div>

              <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-1">
                Puneet Kushwaha
              </h3>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#1b67b2] mb-1">
                Founder & Chief Executive Officer
              </p>
              <p className="text-[11px] font-mono text-slate-500 font-semibold uppercase tracking-wider mb-5">
                Principal Systems Architect
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-6">
                Technology executive and enterprise software architect with deep expertise in distributed cloud architectures, high-concurrency microservices, and mission-critical business platforms. Directs product strategy, systems engineering, and client delivery across Verve Nova Technologies.
              </p>

              {/* Executive Credentials Pillars */}
              <div className="flex flex-col gap-3 w-full mb-8 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <Terminal className="w-4 h-4 text-[#1b67b2] shrink-0" />
                  <span>Enterprise Cloud & Distributed Systems Architect</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <Cpu className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Principal Architect: VNT Billzer, Verve CRM & ERP</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <Cloud className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>High-Availability AWS & Kubernetes Infrastructure</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-Trust Cybersecurity & ISO 27001 Standards</span>
                </div>
              </div>

              {/* Verified Signature */}
              <div className="w-full pt-4 border-t border-slate-200 flex flex-col items-center md:items-start mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Executive Endorsement
                </span>
                <img 
                  src="/signatures/sign.png" 
                  alt="Puneet Kushwaha Official Signature" 
                  className="h-10 object-contain opacity-90"
                />
              </div>

              {/* Direct Executive Connect Links */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <Link
                  href="https://wa.me/917380663685?text=Hi%20Puneet%2C%20I%20would%20like%20to%20discuss%20an%20enterprise%20software%20project%20with%20Verve%20Nova."
                  target="_blank"
                  className="px-4 py-2.5 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Direct Call / Chat
                </Link>
                <Link
                  href="mailto:contact@vervenovatech.com"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider text-center transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" /> Corporate Email
                </Link>
              </div>
            </div>

            {/* Right Story & Vision Column */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative">
                <span className="text-4xl text-[#1b67b2]/30 font-serif absolute top-4 left-6">&ldquo;</span>
                <blockquote className="text-lg sm:text-xl font-bold text-slate-900 italic leading-relaxed pt-3">
                  In enterprise software engineering, architectural discipline is non-negotiable. We engineer systems that deliver measurable operational efficiency, sub-second latency, and uncompromising fault tolerance for high-growth businesses globally.
                </blockquote>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#1b67b2] uppercase tracking-wider">
                  <span>— Puneet Kushwaha, Founder & Chief Executive Officer</span>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-5 text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  As an enterprise systems architect and engineering leader, Puneet founded <strong>Verve Nova Technologies</strong> with a clear mandate: to eliminate the bloated, fragile, and unmaintainable code common in legacy IT services, replacing it with resilient cloud-native engineering, clean microservices, and high-performance user interfaces.
                </p>
                <p>
                  With an architectural foundation centered on <strong>Next.js, Node.js, distributed database sharding, and containerized cloud pipelines</strong>, Puneet oversees technical strategy and delivery across all enterprise client solutions—guaranteeing zero technical debt, rigorous security compliance, and long-term maintainability.
                </p>
                <p>
                  Under his leadership, Verve Nova has developed and deployed its suite of proprietary enterprise systems, including <strong>VNT Billzer</strong> (omnichannel retail billing, inventory synchronisation & POS), <strong>Verve CRM</strong> (high-velocity sales pipeline intelligence), and modular <strong>Verve ERP</strong> platforms tailored for manufacturing, supply chain, and retail enterprises.
                </p>
              </div>

              {/* Key Strategic Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Code2 className="w-4 h-4 text-[#1b67b2]" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-900">
                      Architectural Rigor
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Strict adherence to modular microservices, automated CI/CD pipelines, horizontal scalability, and comprehensive test coverage across every deployment.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5 mb-2">
                    <Users className="w-4 h-4 text-[#1b67b2]" />
                    <h4 className="text-xs font-extrabold uppercase tracking-wide text-slate-900">
                      Direct Executive Oversight
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    Enterprise partners collaborate directly with senior technical leadership, eliminating bureaucratic layers and accelerating milestone execution.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Mission & Philosophy */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 mb-6 text-center md:text-left flex flex-col items-center md:items-start">
              <h2 className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-4 border-l-4 border-[#1b67b2] pl-4">
                Our DNA
              </h2>
              <p className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-950 uppercase leading-tight tracking-tight">
                We don&apos;t just build apps. We engineer high-intensity technical ecosystems for the global enterprise.
              </p>
            </div>
            <div className="lg:col-span-12">
              <div className="flex flex-col gap-8 items-center md:items-start text-center md:text-left">
                <p className="text-base md:text-xl text-slate-600 font-normal leading-relaxed max-w-5xl">
                  Founded on the principles of surgical precision and modern architectures, Verve Nova Technologies is a specialized software engineering studio.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-200 w-full">
                  <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest block mb-2">
                      Precision First
                    </span>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">
                      Every line of code is optimized for performance, security, and long-term scalability across modern stacks.
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-start p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                    <span className="text-xs font-black text-[#1b67b2] uppercase tracking-widest block mb-2">
                      Modern Cloud & Mobile
                    </span>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">
                      Containerized microservices, high-throughput APIs, and production Android/web deployments engineered for scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Standards */}
      <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-[#1b67b2] uppercase tracking-[0.4em] mb-3">
              Engineering Standards
            </h2>
            <p className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight">
              Why Choose Verve Nova?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Surgical Design", desc: "No clutter. Just high-performance interfaces designed for professional business impact.", icon: Target },
              { title: "Enterprise Grade", desc: "Built with modern stacks (Next.js, Node/Python, AI Integrations, Cloud APIs) for extreme scale.", icon: ShieldCheck },
              { title: "Active Intelligence", desc: "Custom LLMs, neural models, and automated data pipelines built seamlessly into your business core.", icon: Zap }
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 md:p-10 rounded-3xl bg-white border border-slate-200 flex flex-col items-center md:items-start text-center md:text-left gap-6 group hover:border-[#1b67b2] hover:shadow-xl transition-all shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1b67b2] flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-black text-slate-950 uppercase tracking-tight leading-tight">
              Ready to Architect Your <br /> <span className="text-[#1b67b2]">Next Frontier?</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto font-normal">
              Partner with Puneet Kushwaha and the Verve Nova engineering collective to architect high-performance software systems that scale.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#1b67b2] hover:bg-[#15538e] text-white font-extrabold rounded-full transition-all uppercase text-xs tracking-widest shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <span>Schedule Architecture Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
