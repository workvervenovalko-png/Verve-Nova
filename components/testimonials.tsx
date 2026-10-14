"use client";

import React, { useState, useEffect } from "react";
import { Star, ArrowRight, ShieldCheck, ExternalLink, Smartphone, CheckCircle2, Globe, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import { Testimonial } from "@/lib/testimonials-data";
import { getPublishedReviews } from "@/app/actions/reviews";
import { motion } from "framer-motion";

const LIVE_VERIFIED_PROJECTS = [
  {
    name: "ServiceHub",
    tag: "Live Android App",
    platform: "Google Play Store",
    desc: "On-demand technician dispatch, live tracking & OTP workflow engineered in production.",
    url: "https://play.google.com/store/apps/details?id=com.sahil.servicehub&pcampaignid=web_share",
  },
  {
    name: "Advance Transcription",
    tag: "AI Speech-to-Text Platform",
    platform: "Live Web Platform",
    desc: "High-throughput audio ingestion, diarization & sub-second streaming websockets.",
    url: "https://www.advancetranscription.com/",
  },
  {
    name: "Siora Infra Design",
    tag: "3D Architecture Portal",
    platform: "Enterprise CMS",
    desc: "High-resolution architectural renders, blueprint viewer & client enquiry pipeline.",
    url: "https://siorainfradesign.com/",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await getPublishedReviews();
        if (res.success && res.reviews) {
          const formatted: Testimonial[] = res.reviews.map((r: any) => ({
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
            verificationBadge: "Verified Client",
            verificationUrl: r.linkedIn || r.websiteUrl || undefined,
            submittedAt: r.submittedAt,
          }));
          setReviews(formatted);
        }
      } catch (e) {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length <= 3) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 3 >= reviews.length ? 0 : prev + 3));
    }, 7000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const displayReviews = reviews.slice(index, index + 3);

  return (
    <section className="py-20 bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-14">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1b67b2] text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Real Client Feedback
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] uppercase tracking-tight">
              Client Reviews & <span className="text-[#1b67b2]">Live Deployed Systems</span>
            </h2>
          </div>

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase text-[#1b67b2] hover:text-[#15538e] tracking-wider"
          >
            <span>View All Client Reviews</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Case 1: When real reviews exist in database */}
        {reviews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 min-h-[380px]">
              {displayReviews.map((review, i) => (
                <motion.div
                  key={review.id || `${review.name}-${i}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-8 hover:border-[#1b67b2] hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
                >
                  <div>
                    {/* Top Header: Stars & Verified Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(review.stars || 5)].map((_, s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>

                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold tracking-tight">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Project Client</span>
                      </span>
                    </div>

                    {/* Project Tag */}
                    <div className="mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {review.projectName}
                      </span>
                    </div>

                    {/* Problem Solved Snippet if provided */}
                    {review.problemStatement && (
                      <div className="mb-3 p-3 rounded-xl bg-blue-50/50 border border-blue-100 text-xs">
                        <span className="font-bold text-[#1b67b2] block text-[10px] uppercase tracking-wider mb-0.5">
                          Problem Solved:
                        </span>
                        <p className="text-slate-600 line-clamp-2">
                          {review.problemStatement}
                        </p>
                      </div>
                    )}

                    {/* Quote Text */}
                    <p className="text-sm sm:text-[14px] text-[#475569] font-normal leading-relaxed mb-6">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Website / Live Link */}
                    {review.websiteUrl && (
                      <div className="mb-4">
                        <a
                          href={review.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#1b67b2] hover:underline font-bold"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Client Website / App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Author Strip */}
                  <div className="pt-5 border-t border-[#e2e8f0] flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#1b67b2] leading-snug">
                        {review.name}
                      </h4>
                      <p className="text-xs text-[#64748b] font-medium mt-0.5">
                        {review.role} {review.company ? `• ${review.company}` : ""}
                      </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white border border-[#e2e8f0] flex items-center justify-center text-[#1b67b2] font-black text-sm shadow-sm shrink-0">
                      {review.name.charAt(0)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination if more than 3 */}
            {reviews.length > 3 && (
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, dot) => (
                  <button
                    key={dot}
                    onClick={() => setIndex(dot * 3)}
                    className={`transition-all duration-300 ${
                      Math.floor(index / 3) === dot
                        ? "w-8 h-2 rounded-full bg-[#1b67b2]"
                        : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                    }`}
                    aria-label={`Go to slide ${dot + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Case 2: Zero dummy reviews state -> Shows Live Verified Projects + Direct Verification Notice */
          <div className="space-y-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  100% Anti-Fabrication Policy Active
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight mb-2">
                  Reviews are collected exclusively via authenticated client links
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We do not show dummy or stock testimonials. Real reviews from our clients appear here in real-time as project milestones are completed and verified.
                </p>
              </div>

              <Link
                href="/testimonials"
                className="px-6 py-3.5 rounded-xl bg-[#1b67b2] hover:bg-[#15538e] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm shrink-0"
              >
                View Client Review Portal
              </Link>
            </div>

            {/* Live Verified Client Works Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LIVE_VERIFIED_PROJECTS.map((proj) => (
                <a
                  key={proj.name}
                  href={proj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#1b67b2] hover:shadow-lg transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1b67b2] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
                        {proj.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {proj.platform}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-950 uppercase mb-2 group-hover:text-[#1b67b2] transition-colors flex items-center gap-1.5">
                      <span>{proj.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#1b67b2]" />
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1b67b2]">
                    <span>Inspect Live Deployment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
