"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Testimonial } from "@/lib/testimonials-data";
import { getPublishedReviews } from "@/app/actions/reviews";
import { 
  Quote, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Smartphone, 
  Briefcase, 
  Award, 
  Globe,
  Building2,
  Lock,
  ThumbsUp,
  Linkedin,
  Layers,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const VERIFIED_DEPLOYMENTS = [
  {
    name: "ServiceHub",
    client: "Sahil (Founder)",
    type: "On-Demand Service Booking App",
    platform: "Google Play Store (Live App)",
    link: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
    highlight: "Real-time dispatch, rider websockets & OTP verification workflow."
  },
  {
    name: "Advance Transcription",
    client: "Vivek Mishra (Engineering Lead)",
    type: "AI Speech-to-Text Transcription Platform",
    platform: "Live Web & Cloud Platform",
    link: "https://www.advancetranscription.com/",
    highlight: "High-throughput audio processing, custom diarization & REST APIs."
  },
  {
    name: "Siora Infra Design",
    client: "Ar. S. Agnihotri (Principal Partner)",
    type: "3D Architecture Portfolio & Client CMS",
    platform: "Enterprise Web Architecture",
    link: "https://siorainfradesign.com/",
    highlight: "Interactive 3D blueprint rendering, enquiry funnel & cloud hosting."
  },
];

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await getPublishedReviews();
        if (res.success && res.reviews) {
          const list: Testimonial[] = res.reviews.map((r: any) => ({
            id: r.id,
            name: r.name,
            role: r.role,
            company: r.company,
            projectName: r.projectName,
            projectGoal: r.projectGoal,
            problemStatement: r.problemStatement,
            serviceExperience: r.serviceExperience,
            websiteUrl: r.websiteUrl,
            text: r.text,
            stars: r.stars,
            highlights: r.highlights,
            verificationBadge: "Verified Client via Project Link",
            verificationUrl: r.linkedIn || r.websiteUrl || undefined,
            submittedAt: r.submittedAt,
          }));
          setReviews(list);
        }
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white relative overflow-hidden border-b border-slate-200">
        <div className="absolute top-[20%] right-1/4 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#1b67b2] text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Project Reviews
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight uppercase leading-[0.95] mb-6">
                Client Reviews & <br /> <span className="text-[#1b67b2]">Problem Solved.</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                Every review on this page is submitted directly by our clients through authenticated project invitation links. We detail what was built, the challenge solved, and verified live URLs.
              </p>
            </div>

            {/* Anti-Fabrication Pledge Badge */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" /> Zero-Fake-Review Guarantee
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                No stock names or bought testimonials. Reviews only appear after milestone delivery and client verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Reviews Container */}
      <section className="py-16 px-6 bg-slate-50/40">
        <div className="max-w-6xl mx-auto">
          
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id || i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-[#1b67b2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-5">
                    {/* Top Row: Stars + Verified Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.stars || 5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-1.5 font-mono">
                          {review.stars}.0 / 5.0
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold tracking-tight">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Client Verified via Link</span>
                      </span>
                    </div>

                    {/* Project Name & Goal (Wo kya karwane aaye the) */}
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Project & Goal
                      </span>
                      <h3 className="text-base font-black text-slate-900 uppercase">
                        {review.projectName}
                      </h3>
                      {review.projectGoal && (
                        <p className="text-xs text-[#1b67b2] font-semibold mt-0.5">
                          Scope: {review.projectGoal}
                        </p>
                      )}
                    </div>

                    {/* Problem Statement (Uski problem kya thi) */}
                    {review.problemStatement && (
                      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 text-xs">
                        <span className="font-bold text-amber-900 block text-[10px] uppercase tracking-wider mb-1">
                          Challenge Faced Before Verve Nova:
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {review.problemStatement}
                        </p>
                      </div>
                    )}

                    {/* Service Experience (Verve Nova Tech ki service kaisi lagi) */}
                    {review.serviceExperience && (
                      <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 text-xs">
                        <span className="font-bold text-[#1b67b2] block text-[10px] uppercase tracking-wider mb-1">
                          How Verve Nova Solved It:
                        </span>
                        <p className="text-slate-700 leading-relaxed">
                          {review.serviceExperience}
                        </p>
                      </div>
                    )}

                    {/* Written Testimonial Message */}
                    <div className="relative">
                      <Quote className="w-8 h-8 text-slate-200 absolute -top-3 -left-2 -z-0 pointer-events-none" />
                      <p className="text-slate-700 text-sm leading-relaxed relative z-10 font-normal italic pl-4 border-l-2 border-[#1b67b2]">
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>

                    {/* Highlights Pills */}
                    {review.highlights && review.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {review.highlights.map((h, hi) => (
                          <span
                            key={hi}
                            className="text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Client's Live Website or App Link */}
                    {review.websiteUrl && (
                      <div className="pt-2">
                        <a
                          href={review.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#1b67b2] hover:underline font-bold bg-blue-50/70 border border-blue-100 px-3 py-1.5 rounded-xl"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>View Client Live Website / App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Author Footer */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#1b67b2] transition-colors">
                        {review.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {review.role} {review.company ? `• ${review.company}` : ""}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#1b67b2] font-black text-sm shadow-xs shrink-0 group-hover:bg-blue-50 transition-colors">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Empty State: Zero dummy reviews, show verified live projects */
            <div className="space-y-12">
              <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-center max-w-3xl mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 text-[#1b67b2] flex items-center justify-center mx-auto mb-6 shadow-xs border border-blue-100">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Anti-Fabrication & 100% Genuine Policy Active
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-3">
                  Client Reviews Are Submitted Exclusively via Authenticated Links
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-8 font-normal">
                  We do not manufacture or purchase dummy client testimonials. As clients complete project milestones and submit their feedback through their private review links, their verified testimonials will appear here automatically.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/registry"
                    className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Inspect MSME Registry
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                  >
                    Start a Project With Us
                  </Link>
                </div>
              </div>

              {/* Independently Verifiable Projects Section */}
              <div>
                <div className="text-center mb-8">
                  <p className="text-xs font-bold text-[#1b67b2] uppercase tracking-[0.3em] mb-2">Live Verification</p>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
                    Explore Live Deployed Software & Client Products
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {VERIFIED_DEPLOYMENTS.map((deploy) => (
                    <div
                      key={deploy.name}
                      className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:border-[#1b67b2] hover:shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            {deploy.platform}
                          </span>
                        </div>

                        <h4 className="text-lg font-black text-slate-950 uppercase mb-1">
                          {deploy.name}
                        </h4>
                        <p className="text-xs text-[#1b67b2] font-bold mb-3">
                          Client: {deploy.client}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                          {deploy.highlight}
                        </p>
                      </div>

                      <a
                        href={deploy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 text-slate-800 hover:text-[#1b67b2] text-xs font-bold transition-all border border-slate-200"
                      >
                        <span>Open Live Deployment</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Bottom Security & IP Covenant Banner */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1b67b2] mb-2">
                <Lock className="w-3.5 h-3.5" /> 100% Client Code & IP Transfer
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-950 uppercase tracking-tight mb-2">
                Milestone-Backed Engineering Standard
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                All client relationships are governed by mutual Non-Disclosure Agreements (NDAs) and full intellectual property transfer upon milestone settlement. No proprietary vendor lock-in.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/terms"
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider transition-all"
              >
                Review Terms & IP
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                Hire Our Team
              </Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
