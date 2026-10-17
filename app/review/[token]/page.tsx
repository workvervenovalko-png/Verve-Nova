"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { 
  Star, 
  CheckCircle2, 
  Building2, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Globe,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  Linkedin,
  AlertCircle,
  Check
} from "lucide-react";
import { getReviewByToken, submitClientReview } from "@/app/actions/reviews";
import Link from "next/link";

const HIGHLIGHT_OPTIONS = [
  "On-Time Milestone Delivery",
  "Clean Code & Modern Architecture",
  "Proactive Communication",
  "Solved Complex Technical Problem",
  "Scalable Cloud & Database Setup",
  "Post-Launch Bug Fix Support",
  "Transparent Pricing & No Lock-in"
];

const SERVICE_GOAL_SUGGESTIONS = [
  "Custom Mobile App (Android / iOS)",
  "Full-Stack Web Application / Platform",
  "AI Integration & Automated Workflows",
  "Enterprise ERP / CRM / Billing Software",
  "Cloud Infrastructure & API Architecture",
  "UI/UX Redesign & Modern Web Overhaul"
];

export default function ClientReviewPage() {
  const params = useParams();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reviewData, setReviewData] = useState<any | null>(null);

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [projectGoal, setProjectGoal] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [serviceExperience, setServiceExperience] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientRole, setClientRole] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientLinkedIn, setClientLinkedIn] = useState("");
  const [selectedHighlights, setSelectedHighlights] = useState<string[]>([
    "On-Time Milestone Delivery",
    "Clean Code & Modern Architecture"
  ]);
  const [wouldRecommend, setWouldRecommend] = useState(true);

  useEffect(() => {
    async function loadReview() {
      if (!token) return;
      try {
        const res = await getReviewByToken(token);
        if (res.success && res.review) {
          setReviewData(res.review);
          if (res.review.clientName) setClientName(res.review.clientName);
          if (res.review.clientRole) setClientRole(res.review.clientRole);
          if (res.review.clientCompany) setClientCompany(res.review.clientCompany);
          if (res.review.projectGoal) setProjectGoal(res.review.projectGoal);
          if (res.review.problemStatement) setProblemStatement(res.review.problemStatement);
          if (res.review.serviceExperience) setServiceExperience(res.review.serviceExperience);
          if (res.review.websiteUrl) setWebsiteUrl(res.review.websiteUrl);
          if (res.review.reviewText) setReviewText(res.review.reviewText);
          if (res.review.rating) setRating(res.review.rating);
          if (res.review.highlights?.length) setSelectedHighlights(res.review.highlights);
          if (res.review.status === "submitted" || res.review.status === "published") {
            setSubmitted(true);
          }
        } else {
          setError(res.error || "Review link is invalid or expired.");
        }
      } catch (err: any) {
        setError(err.message || "Failed to load review link.");
      } finally {
        setLoading(false);
      }
    }
    loadReview();
  }, [token]);

  const toggleHighlight = (item: string) => {
    if (selectedHighlights.includes(item)) {
      setSelectedHighlights(selectedHighlights.filter((h) => h !== item));
    } else {
      setSelectedHighlights([...selectedHighlights, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!clientRole.trim()) {
      alert("Please enter your designation or role (e.g. Founder, CEO, Project Lead).");
      return;
    }
    if (!reviewText.trim() && !serviceExperience.trim()) {
      alert("Please provide your review message or feedback about Verve Nova Tech.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitClientReview(token, {
        clientName,
        clientRole,
        clientCompany,
        clientLinkedIn,
        projectGoal,
        problemStatement,
        websiteUrl,
        serviceExperience,
        reviewText: reviewText || serviceExperience,
        rating,
        highlights: selectedHighlights,
        wouldRecommend,
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        alert(res.error || "Failed to submit review.");
      }
    } catch (err: any) {
      alert(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1b67b2] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Loading Client Review Portal...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-2">
            Invalid Review Invitation
          </h2>
          <p className="text-xs text-slate-600 mb-6 leading-relaxed">
            {error}
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all"
          >
            Go to Verve Nova Home
          </Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xs border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-3 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Review Live & Published
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight mb-3">
            Thank You, {clientName || "Valued Partner"}!
          </h2>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Your review for <strong>{reviewData?.projectName || "your project"}</strong> has been recorded and <strong>automatically published live</strong> with verified client tags on our website.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between items-center text-slate-500">
              <span>Overall Rating:</span>
              <span className="font-bold text-amber-500 flex items-center gap-1">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                ({rating}.0 / 5.0)
              </span>
            </div>
            {websiteUrl && (
              <div className="flex justify-between items-center text-slate-500">
                <span>Verified Link:</span>
                <span className="font-bold text-slate-800 truncate max-w-[220px]">{websiteUrl}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/testimonials"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1b67b2] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#15538e] transition-all shadow-md flex-1"
            >
              <span>View On Live Website</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-all flex-1"
            >
              <span>Home Page</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const ratingDescriptions: Record<number, string> = {
    5: "5.0 - Exceptional Delivery & Outstanding Communication",
    4: "4.0 - Great Quality, Timely Delivery & Good Support",
    3: "3.0 - Satisfactory Performance, Met Core Requirements",
    2: "2.0 - Needed Several Iterations, Mixed Experience",
    1: "1.0 - Did Not Meet Agreed Milestone Expectations"
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1b67b2] text-[11px] font-bold uppercase tracking-wider mb-2 border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" /> Official Client Feedback Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 uppercase tracking-tight">
              Share Your Project Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Project Engagement: <strong className="text-[#1b67b2] uppercase">{reviewData?.projectName}</strong>
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1b67b2] font-black text-xl shrink-0 shadow-xs">
            VN
          </div>
        </div>

        {/* Review Submission Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          
          {/* 1. Star Rating (1 to 5) */}
          <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-3">
              1. Overall Rating (1 to 5 Stars) <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer focus:outline-none"
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isFilled
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold text-[#1b67b2]">
              {ratingDescriptions[hoverRating || rating]}
            </p>
          </div>

          {/* 2. Wo kya karwane aaye the (Project Goal / Service Required) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                2. What did you hire Verve Nova Tech for? (Project Goal)
              </label>
              <span className="text-[11px] text-slate-400">e.g. Android App, Web App, AI Automation</span>
            </div>
            <input
              type="text"
              placeholder="e.g. Android Service App with Real-time Tracking, or Custom Cloud ERP"
              value={projectGoal}
              onChange={(e) => setProjectGoal(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] focus:ring-2 focus:ring-blue-100 transition-all font-medium"
            />
            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {SERVICE_GOAL_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setProjectGoal(sug)}
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    projectGoal === sug
                      ? "bg-blue-50 text-[#1b67b2] border-blue-200"
                      : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Uski problem kya thi (Core Challenge / Problem Faced) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                3. What challenge or problem were you facing before working with us?
              </label>
              <span className="text-[11px] text-slate-400">Bottlenecks & difficulties</span>
            </div>
            <textarea
              rows={3}
              placeholder="e.g. Hamara purana software bohot slow tha, real-time OTP tracking nahi chal rahi thi, ya scalability aur high cloud costs ki dikkat thi..."
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] focus:ring-2 focus:ring-blue-100 transition-all resize-none font-normal"
            />
          </div>

          {/* 4. Verve Nova Tech ki service kaisi lagi (Experience & Solution) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                4. How was your experience working with Verve Nova Tech?
              </label>
              <span className="text-[11px] text-slate-400">How did we solve your problem?</span>
            </div>
            <textarea
              rows={3}
              placeholder="e.g. Verve Nova team ne requirements turant samjhi, sub-second latency wala backend banaya, aur project ko zero downtime ke saath deploy kar diya..."
              value={serviceExperience}
              onChange={(e) => setServiceExperience(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] focus:ring-2 focus:ring-blue-100 transition-all resize-none font-normal"
            />
          </div>

          {/* 5. Overall Review Message (Testimonial Quote) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700">
                5. Written Review / Testimonial Message <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-slate-400">Displayed on our live website</span>
            </div>
            <textarea
              rows={4}
              required
              placeholder="Share your overall recommendation or message for other business owners and founders..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] focus:ring-2 focus:ring-blue-100 transition-all resize-none font-normal"
            />
          </div>

          {/* 6. Website / App Live Link */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1b67b2]" />
                6. Website or Live App Link (Optional)
              </label>
              <span className="text-[11px] text-slate-400">For verifiable review tag</span>
            </div>
            <input
              type="url"
              placeholder="https://yourwebsite.com or Google Play Store link"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] focus:ring-2 focus:ring-blue-100 transition-all font-mono"
            />
          </div>

          {/* 7. Key Delivery Highlights */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
              7. What stood out the most? (Select highlights)
            </label>
            <div className="flex flex-wrap gap-2">
              {HIGHLIGHT_OPTIONS.map((item) => {
                const isSelected = selectedHighlights.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleHighlight(item)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 text-[#1b67b2] border-blue-300 shadow-xs"
                        : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {isSelected ? <Check className="w-3 h-3 text-[#1b67b2]" /> : null}
                    <span>{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8. Client Profile Information */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              8. Your Professional Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Puneet Kushwaha"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Designation / Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Founder & Operations Head"
                  value={clientRole}
                  onChange={(e) => setClientRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Company / Brand Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. ServiceHub Technologies"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1 flex items-center gap-1">
                  <Linkedin className="w-3 h-3 text-[#1b67b2]" />
                  LinkedIn Profile URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={clientLinkedIn}
                  onChange={(e) => setClientLinkedIn(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#1b67b2] transition-all font-mono"
                />
              </div>
            </div>
          </div>

          {/* 9. Would Recommend Toggle */}
          <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <ThumbsUp className="w-4 h-4 text-[#1b67b2]" />
              <span className="text-xs font-bold text-slate-800">
                Would you recommend Verve Nova Tech to other businesses?
              </span>
            </div>
            <button
              type="button"
              onClick={() => setWouldRecommend(!wouldRecommend)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                wouldRecommend
                  ? "bg-[#1b67b2] text-white shadow-xs"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {wouldRecommend ? "Yes, Highly Recommend" : "No"}
            </button>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-[#1b67b2] hover:bg-[#15538e] text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <span>Submitting Your Verified Review...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Verified Review</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-3">
              By submitting, you authorize Verve Nova Technologies to display your review and professional credentials on official channels.
            </p>
          </div>

        </form>

      </div>
    </main>
  );
}
