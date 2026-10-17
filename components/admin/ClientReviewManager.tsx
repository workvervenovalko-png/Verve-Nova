"use client";

import React, { useState, useEffect } from "react";
import { 
  Star, 
  Plus, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  MessageSquare, 
  Globe, 
  Send, 
  Share2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  RefreshCw,
  Search,
  CheckCircle2,
  Clock
} from "lucide-react";
import { 
  createReviewLink, 
  getAdminReviews, 
  togglePublishReview, 
  deleteReview 
} from "@/app/actions/reviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DEFAULT_PROJECTS = [
  "ServiceHub (Play Store App)",
  "ChotU (Quick Commerce Logistics)",
  "Siora Infra Design (3D Architecture Portal)",
  "Advance Transcription (AI Speech Platform)",
  "VNT Billzer (Retail POS & Inventory Suite)",
  "Verve CRM (Intelligent Client Engine)",
  "Custom Project",
];

const PERMANENT_PROJECT_LINKS = [
  {
    name: "ServiceHub",
    slug: "servicehub",
    category: "Android & iOS App",
    desc: "Play Store Live App with real-time dispatch",
    badge: "Play Store Live",
    color: "from-blue-600/20 to-indigo-600/10 border-blue-500/30 text-blue-400"
  },
  {
    name: "ChotU (छोटू)",
    slug: "chotu",
    category: "Quick Commerce Logistics",
    desc: "Hyperlocal kirana grocery marketplace & delivery",
    badge: "Mobile App",
    color: "from-emerald-600/20 to-teal-600/10 border-emerald-500/30 text-emerald-400"
  },
  {
    name: "Siora Infra Design",
    slug: "siora",
    category: "3D Architecture CMS",
    desc: "Interactive 3D blueprint & construction portal",
    badge: "Web Platform",
    color: "from-amber-600/20 to-orange-600/10 border-amber-500/30 text-amber-400"
  },
  {
    name: "Advance Transcription",
    slug: "transcription",
    category: "AI Speech-to-Text Platform",
    desc: "High-throughput audio ingestion & AI diarization",
    badge: "AI Platform",
    color: "from-purple-600/20 to-pink-600/10 border-purple-500/30 text-purple-400"
  },
  {
    name: "VNT Billzer",
    slug: "billzer",
    category: "Retail POS & Inventory Suite",
    desc: "Enterprise billing software & stock management",
    badge: "Flagship SaaS",
    color: "from-indigo-600/20 to-cyan-600/10 border-indigo-500/30 text-indigo-400"
  },
  {
    name: "Verve CRM",
    slug: "crm",
    category: "Intelligent Client Engine",
    desc: "Sales automation & lead retention platform",
    badge: "SaaS CRM",
    color: "from-fuchsia-600/20 to-purple-600/10 border-fuchsia-500/30 text-fuchsia-400"
  },
  {
    name: "General / Any Project",
    slug: "general",
    category: "Universal Client Review",
    desc: "Open link for any custom software or web client",
    badge: "Universal Link",
    color: "from-slate-600/20 to-zinc-600/10 border-white/20 text-slate-300"
  }
];

export function ClientReviewManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Form State
  const [selectedProject, setSelectedProject] = useState(DEFAULT_PROJECTS[0]);
  const [customProjectName, setCustomProjectName] = useState("");
  const [projectGoal, setProjectGoal] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // Generated Link Modal/State
  const [latestGenerated, setLatestGenerated] = useState<{
    token: string;
    url: string;
    projectName: string;
    clientName?: string;
  } | null>(null);

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "SUBMITTED" | "PENDING" | "PUBLISHED">("ALL");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    setLoading(true);
    try {
      const res = await getAdminReviews();
      if (res.success && res.reviews) {
        setReviews(res.reviews);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  }

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalProjectName = selectedProject === "Custom Project" ? customProjectName.trim() : selectedProject;

    if (!finalProjectName) {
      toast.error("Please specify a project name.");
      return;
    }

    setGenerating(true);
    try {
      const res = await createReviewLink({
        projectName: finalProjectName,
        projectGoal,
        clientName,
        clientPhone,
        clientEmail,
      });

      if (res.success && res.token) {
        const origin = typeof window !== "undefined" ? window.location.origin : "https://vervenovatech.com";
        const reviewUrl = `${origin}/review/${res.token}`;

        setLatestGenerated({
          token: res.token,
          url: reviewUrl,
          projectName: finalProjectName,
          clientName,
        });

        toast.success("Review link generated successfully!");
        setClientName("");
        setProjectGoal("");
        setClientPhone("");
        setClientEmail("");
        setCustomProjectName("");
        loadReviews();
      } else {
        toast.error(res.error || "Failed to generate link.");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to generate link.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyLink = (url: string, token: string) => {
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await togglePublishReview(id, !currentStatus);
      if (res.success) {
        toast.success(res.message);
        setReviews((prev) =>
          prev.map((r) => (r.id === id ? { ...r, isPublished: !currentStatus, status: !currentStatus ? "published" : "submitted" } : r))
        );
      } else {
        toast.error(res.error || "Failed to update review.");
      }
    } catch (err) {
      toast.error("Error updating review.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review request?")) return;
    try {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success("Review deleted.");
        setReviews((prev) => prev.filter((r) => r.id !== id));
      } else {
        toast.error(res.error || "Failed to delete review.");
      }
    } catch (err) {
      toast.error("Error deleting review.");
    }
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.clientName && r.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.reviewText && r.reviewText.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterStatus === "PUBLISHED") return r.isPublished;
    if (filterStatus === "SUBMITTED") return r.status === "submitted" || r.status === "published";
    if (filterStatus === "PENDING") return r.status === "pending";

    return true;
  });

  const origin = typeof window !== "undefined" ? window.location.origin : "https://vervenovatech.com";

  return (
    <div className="p-6 md:p-10 space-y-10">
      
      {/* Top Banner & Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Total Links</span>
            <span className="text-3xl font-black text-white mt-1 block">{reviews.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Share2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Submitted</span>
            <span className="text-3xl font-black text-emerald-400 mt-1 block">
              {reviews.filter((r) => r.status === "submitted" || r.status === "published").length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Published Live</span>
            <span className="text-3xl font-black text-cyan-400 mt-1 block">
              {reviews.filter((r) => r.isPublished).length}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Permanent Shareable Project Review Links */}
      <div className="p-8 rounded-3xl bg-[#0d0f17] border border-white/10 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-lg">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Permanent Shareable Project Review Links
              </h3>
              <p className="text-xs text-white/50">
                Send these direct links to clients anytime. Submissions are <strong>automatically published live</strong> to the website!
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold border border-emerald-500/20 self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Publish Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PERMANENT_PROJECT_LINKS.map((proj) => {
            const projectUrl = `${origin}/review/${proj.slug}`;
            const isCopied = copiedToken === `preset-${proj.slug}`;

            return (
              <div
                key={proj.slug}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-sm font-black text-white tracking-tight">
                      {proj.name}
                    </h4>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] text-white/70 border border-white/10 shrink-0">
                      {proj.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/40 mb-3 leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-slate-300 truncate mb-4 select-all">
                    /review/{proj.slug}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(projectUrl, `preset-${proj.slug}`)}
                    className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`/review/${proj.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10 flex items-center justify-center"
                    title="Preview Review Form"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 1. Generator Card */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 via-white/[0.02] to-transparent border border-indigo-500/20 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">
              Create Client Review Request Link
            </h3>
            <p className="text-xs text-white/40">
              Generate a custom review invitation link to send to clients via WhatsApp, Email, or Slack.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateLink} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Project Selection */}
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                Select Project <span className="text-red-400">*</span>
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/15 text-white text-xs font-bold uppercase focus:border-indigo-400 focus:outline-none"
              >
                {DEFAULT_PROJECTS.map((p) => (
                  <option key={p} value={p} className="bg-slate-900 text-white">
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Custom Project Name (if selected) */}
            {selectedProject === "Custom Project" ? (
              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                  Custom Project Name <span className="text-red-400">*</span>
                </label>
                <Input
                  required
                  placeholder="e.g. Fintech Mobile App"
                  value={customProjectName}
                  onChange={(e) => setCustomProjectName(e.target.value)}
                  className="h-12 bg-white/[0.05] border-white/15 text-white placeholder:text-white/20 text-xs font-medium rounded-xl"
                />
              </div>
            ) : (
              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                  Client Name (Optional)
                </label>
                <Input
                  placeholder="e.g. Puneet Kushwaha"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="h-12 bg-white/[0.05] border-white/15 text-white placeholder:text-white/20 text-xs font-medium rounded-xl"
                />
              </div>
            )}

            {/* Client Phone (for WhatsApp) */}
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                Client WhatsApp / Phone (Optional)
              </label>
              <Input
                placeholder="e.g. +91 9876543210"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="h-12 bg-white/[0.05] border-white/15 text-white placeholder:text-white/20 text-xs font-medium rounded-xl"
              />
            </div>

            {/* Client Email */}
            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                Client Email (Optional)
              </label>
              <Input
                type="email"
                placeholder="client@company.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="h-12 bg-white/[0.05] border-white/15 text-white placeholder:text-white/20 text-xs font-medium rounded-xl"
              />
            </div>

            {/* Project Scope / Goal */}
            <div className="md:col-span-2">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                Project Scope / Goal (Optional - e.g. Android Service App with Real-Time Tracking)
              </label>
              <Input
                placeholder="e.g. On-demand service booking app, or custom ERP & CRM migration"
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                className="h-12 bg-white/[0.05] border-white/15 text-white placeholder:text-white/20 text-xs font-medium rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={generating}
              className="h-12 px-8 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              {generating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Generating Link...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Generate Client Review Link</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Latest Generated Link Box */}
        {latestGenerated && (
          <div className="mt-8 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Live Link Ready for: {latestGenerated.projectName} {latestGenerated.clientName ? `(${latestGenerated.clientName})` : ""}
              </span>
              <button
                onClick={() => setLatestGenerated(null)}
                className="text-white/40 hover:text-white text-xs"
              >
                Dismiss
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 bg-black/40 p-2 rounded-xl border border-white/10">
              <code className="flex-1 text-xs text-indigo-200 font-mono px-3 py-2 truncate w-full">
                {latestGenerated.url}
              </code>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  onClick={() => handleCopyLink(latestGenerated.url, latestGenerated.token)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg px-4 flex items-center gap-1.5"
                >
                  {copiedToken === latestGenerated.token ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </Button>

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    `Hi ${latestGenerated.clientName || "there"}! Please share your valuable review for our work on ${latestGenerated.projectName}: ${latestGenerated.url}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={latestGenerated.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Open Link in New Tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Reviews Management List */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Client Reviews & Requests ({filteredReviews.length})
            </h3>
            <p className="text-xs text-white/40">
              Manage client responses, copy invitation links, or toggle live publishing on website.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <Input
                placeholder="Search project or client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-9 bg-white/[0.04] border-white/15 text-white placeholder:text-white/20 text-xs rounded-xl"
              />
            </div>

            <div className="flex items-center bg-white/[0.04] border border-white/15 p-1 rounded-xl">
              {(["ALL", "SUBMITTED", "PENDING", "PUBLISHED"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                    filterStatus === st ? "bg-indigo-600 text-white shadow-sm" : "text-white/40 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Cards List */}
        {loading ? (
          <div className="py-20 text-center">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto mb-3" />
            <p className="text-xs font-bold text-white/30 uppercase tracking-wider">Loading Reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-3xl bg-white/[0.01]">
            <MessageSquare className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-sm font-bold text-white/40 uppercase tracking-wider">No reviews found</p>
            <p className="text-xs text-white/20 mt-1">Generate a review link above to collect feedback from clients.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((rev) => {
              const fullUrl = `${origin}/review/${rev.token}`;
              const isSubmitted = rev.status === "submitted" || rev.status === "published";

              return (
                <div
                  key={rev.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    rev.isPublished
                      ? "bg-indigo-950/20 border-indigo-500/40 shadow-lg"
                      : isSubmitted
                      ? "bg-white/[0.03] border-emerald-500/30"
                      : "bg-white/[0.02] border-white/10"
                  }`}
                >
                  {/* Card Top */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-white uppercase tracking-tight">
                          {rev.projectName}
                        </span>
                        {rev.isPublished ? (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[9px] font-bold uppercase">
                            Published Live
                          </span>
                        ) : isSubmitted ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold uppercase">
                            Submitted
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-bold uppercase flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> Pending
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-white/60 font-bold">
                        {rev.clientName ? rev.clientName : <span className="text-white/30 italic">No client name entered</span>}
                        {rev.clientRole && <span className="text-white/40 font-normal"> • {rev.clientRole}</span>}
                        {rev.clientCompany && <span className="text-indigo-400 font-normal"> ({rev.clientCompany})</span>}
                      </p>
                    </div>

                    {isSubmitted && (
                      <div className="flex text-amber-400 shrink-0">
                        {[...Array(rev.rating || 5)].map((_, s) => (
                          <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Body / Review Content */}
                  {isSubmitted ? (
                    <div className="my-4 p-4 rounded-xl bg-black/30 border border-white/5 space-y-3">
                      {rev.projectGoal && (
                        <div className="text-[11px] text-indigo-300 font-semibold">
                          <span className="text-white/40 uppercase text-[9px] block">Project Goal:</span>
                          {rev.projectGoal}
                        </div>
                      )}

                      {rev.problemStatement && (
                        <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs">
                          <span className="text-amber-400 font-bold block text-[9px] uppercase tracking-wider mb-0.5">
                            Client Challenge / Problem:
                          </span>
                          <p className="text-white/80">{rev.problemStatement}</p>
                        </div>
                      )}

                      {rev.serviceExperience && (
                        <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20 text-xs">
                          <span className="text-blue-400 font-bold block text-[9px] uppercase tracking-wider mb-0.5">
                            How Verve Nova Solved It:
                          </span>
                          <p className="text-white/80">{rev.serviceExperience}</p>
                        </div>
                      )}

                      <div>
                        <span className="text-white/40 font-bold block text-[9px] uppercase tracking-wider mb-1">
                          Testimonial Message:
                        </span>
                        <p className="text-xs text-slate-200 italic leading-relaxed">
                          &ldquo;{rev.reviewText}&rdquo;
                        </p>
                      </div>

                      {rev.highlights && rev.highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {rev.highlights.map((h: string, hi: number) => (
                            <span key={hi} className="text-[9px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                              ✓ {h}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        {rev.websiteUrl && (
                          <a
                            href={rev.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:underline font-mono"
                          >
                            <Globe className="w-3 h-3" />
                            <span>Client Live URL: {rev.websiteUrl}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}

                        {rev.clientLinkedIn && (
                          <a
                            href={rev.clientLinkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:underline font-mono"
                          >
                            <span>Verified LinkedIn</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="my-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
                      <p className="text-xs text-amber-300/70">
                        Link generated. Client has not submitted feedback yet. Send link via WhatsApp or copy.
                      </p>
                    </div>
                  )}

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                    <span className="text-[10px] text-white/30 font-mono">
                      {rev.submittedAt
                        ? `Submitted ${new Date(rev.submittedAt).toLocaleDateString()}`
                        : `Created ${new Date(rev.createdAt).toLocaleDateString()}`}
                    </span>

                    <div className="flex items-center gap-2">
                      {isSubmitted && (
                        <Button
                          size="sm"
                          onClick={() => handleTogglePublish(rev.id, rev.isPublished)}
                          className={`text-xs font-bold rounded-lg px-3 h-8 flex items-center gap-1.5 ${
                            rev.isPublished
                              ? "bg-amber-600/20 text-amber-300 border border-amber-600/30 hover:bg-amber-600/30"
                              : "bg-cyan-600 hover:bg-cyan-500 text-white"
                          }`}
                        >
                          {rev.isPublished ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Unpublish</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Publish to Website</span>
                            </>
                          )}
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyLink(fullUrl, rev.token)}
                        className="text-white/40 hover:text-white rounded-lg h-8 px-2.5"
                        title="Copy Review Link"
                      >
                        {copiedToken === rev.token ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </Button>

                      <a
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-white/40 hover:text-white transition-colors"
                        title="Open Link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(rev.id)}
                        className="text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg h-8 px-2"
                        title="Delete Review"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
