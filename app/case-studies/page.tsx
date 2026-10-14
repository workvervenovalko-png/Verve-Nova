"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Layers, Database, ShoppingBag, Wrench, Store, Bell, Smartphone, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "ChotU (छोटू) Quick Commerce",
      subtitle: "Revolutionizing Local Kirana Commerce with Zero-Commission Architecture",
      image: "/projects/chotu.png",
      challenge: "Traditional dark-store quick-commerce giants impose heavy commissions (15-25%) and platform fees on local shopkeepers while charging inflated prices to customers. Local kirana store owners lacked a low-cost, direct digital marketplace to capture neighborhood delivery demands within 1-5km radius.",
      solution: [
        "Architected a zero-commission hyperlocal marketplace platform connecting customers directly with neighborhood grocery stores.",
        "Implemented barcode-assisted instant inventory cataloging, enabling merchant onboarding in under 60 seconds.",
        "Engineered transparent delivery fee distribution (100% credited to merchant delivery helper) alongside automated daily ledger settlements via payment gateways."
      ],
      result: "Empowered traditional kirana stores to digitalize operations without profit margin erosion, achieving high store retention, instant neighborhood delivery, and direct merchant payouts.",
      icons: [ShoppingBag, Store],
      link: "/contact?service=quick-commerce",
      ctaText: "Request Platform Demo"
    },
    {
      title: "ServiceHub Platform",
      subtitle: "Architecting an On-Demand Home Service & Repair Ecosystem",
      image: "/projects/servicehub.png",
      challenge: "Coordinating multi-role home service dispatching (Customer, Technician, Admin, Shop Owner) required real-time job allocation, reliable background wake-up push notifications, dynamic inventory stock deduction, and real-time wallet payout settlements.",
      solution: [
        "Built a cross-platform mobile suite powered by Supabase Realtime for sub-second booking stream propagation and live technician tracking.",
        "Created custom database functions for camelCase stock deduction and dynamic low-stock alerts on shop owner dashboards.",
        "Configured FCM data-only payload push notifications to wake up background/terminated devices with custom loud siren sounds for incoming service bookings."
      ],
      result: "Delivered a full-stack, enterprise service dispatch platform featuring seamless wallet settlement, 100% background notification reliability, and real-time order tracking.",
      icons: [Wrench, Smartphone],
      link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
      ctaText: "View On Play Store"
    },
    {
      title: "Siora Infra Design",
      subtitle: "Delivering a Next-Gen 3D Web Experience",
      image: "/projects/siora.png",
      challenge: "In today's digital landscape, static websites fail to capture user attention. Siora needed a premium, modern web presence that offered a \"Wow\" factor to elevate their brand value, requiring interactive 3D elements and smooth animations without compromising load speed.",
      solution: [
        "Leveraged Next.js to ensure lightning-fast load speeds and optimized SEO.",
        "Integrated Three.js and React Three Fiber for interactive 3D graphics that react to user scroll and mouse movements.",
        "Utilized Framer Motion and Lenis for buttery-smooth scrolling and animations."
      ],
      result: "Siora's website transformed into an immersive digital experience. User engagement time doubled, and the premium feel significantly boosted brand trust.",
      icons: [Zap, Layers],
      link: "https://siorainfradesign.com/"
    },
    {
      title: "Advance Transcription",
      subtitle: "Building a Scalable & Secure Full-Stack Platform",
      image: "/projects/transcription.png",
      challenge: "Advance Transcription required a robust web platform to securely store and manage audio and text data. They needed a secure backend for user data safety alongside a highly responsive and smooth frontend experience.",
      solution: [
        "Built the frontend with Next.js for seamless navigation and fast load times.",
        "Integrated Supabase for a highly secure and scalable database solution, streamlining user authentication and real-time syncing.",
        "Automated emails and notifications using the Resend API."
      ],
      result: "Advance Transcription now operates a highly secure and fast web application. Data management is fully automated, saving significant manual effort, and the system is fully scalable to handle growing user bases.",
      icons: [ShieldCheck, Database],
      link: "https://www.advancetranscription.com/"
    }
  ];

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Header */}
      <section className="pt-36 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight mb-6 text-slate-950">
            Our <span className="text-[#1b67b2]">Case Studies</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Discover how we solve complex business challenges using cutting-edge technologies.
          </p>
        </div>
      </section>

      {/* Case Studies Content */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-16">
        {caseStudies.map((study, i) => (
          <div 
            key={study.title}
            className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center p-8 md:p-12 rounded-3xl bg-white border border-slate-200 shadow-md hover:border-[#1b67b2] hover:shadow-xl transition-all"
          >
            {/* Image Column */}
            <div className={`w-full lg:w-1/2 ${i % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className={`relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-sm group flex items-center justify-center p-8 ${
                study.image.includes('chotu') 
                  ? 'bg-gradient-to-br from-[#0c2447] via-[#061429] to-[#0c2447]' 
                  : study.image.includes('servicehub')
                  ? 'bg-gradient-to-br from-[#08152D] via-[#102958] to-[#050C1A]'
                  : 'bg-slate-900'
              }`}>
                {study.image.endsWith('.png') && (study.image.includes('chotu') || study.image.includes('servicehub')) ? (
                  <div className={`relative z-20 flex items-center justify-center ${study.image.includes('servicehub') ? 'bg-white p-4 rounded-2xl shadow-md' : 'bg-black/50 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-md'}`}>
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="max-h-24 md:max-h-32 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                  />
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className={`w-full lg:w-1/2 flex flex-col ${i % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-slate-900">
                {study.title}
              </h2>
              <h3 className="text-xs font-bold text-[#1b67b2] uppercase tracking-wider mb-6">
                {study.subtitle}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-[#1b67b2] uppercase tracking-widest mb-2">The Challenge</h4>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                    {study.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-black text-[#1b67b2] uppercase tracking-widest mb-2">Our Solution</h4>
                  <ul className="space-y-2.5">
                    {study.solution.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                        <span className="text-slate-600 text-sm md:text-base leading-relaxed font-normal">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200">
                  <h4 className="text-xs font-black text-[#1b67b2] uppercase tracking-widest mb-2">The Result</h4>
                  <p className="text-slate-800 text-sm md:text-base leading-relaxed font-semibold">
                    {study.result}
                  </p>
                </div>

                <a 
                  href={study.link}
                  target={study.link.startsWith("/") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex h-11 px-6 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all rounded-xl w-max active:scale-95"
                >
                  <span>{study.ctaText || "View Live Project"}</span>
                  <ArrowUpRight className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto rounded-3xl p-10 md:p-16 text-center border border-slate-200 bg-white relative overflow-hidden shadow-lg">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 text-slate-950">
            Ready to Write <br /> <span className="text-[#1b67b2]">Your Success Story?</span>
          </h2>
          <p className="text-slate-600 text-base md:text-lg mb-8 max-w-xl mx-auto font-normal">
            Let's transform your complex challenges into our next big case study.
          </p>
          <Link 
            href="/#contact" 
            className="inline-flex h-14 px-10 items-center bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/25 transition-all rounded-xl active:scale-95"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
