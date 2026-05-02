"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
     getAdminData,
     updateApplicationStatus,
     scheduleInterview,
     createBlog,
     deleteBlog,
     searchCandidateByVnId,
     issueDocument,
     generateDocument
} from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { VNTLoader } from "@/components/vnt-loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
     Users, Mail, ShieldCheck, Briefcase, Calendar,
     Search, Filter, ExternalLink, CheckCircle2,
     XCircle, Clock, Save, Database,
     Github,
     Linkedin,
     Globe,
     Monitor,
     GraduationCap as GradIcon,
     Building as BuildingIcon,
     Code2,
     X,
     FileSearch,
     User2,
     Calendar as CalendarIcon,
     Plus,
     Trash2,
     BookOpen,
     UploadCloud,
     FileText
} from "lucide-react";

import { toast } from "sonner";
import {
     Dialog,
     DialogContent,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
     DialogFooter
} from "@/components/ui/dialog";
import {
     Popover,
     PopoverContent,
     PopoverTrigger
} from "@/components/ui/popover";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


export default function AdminDashboardPage() {
     const [activeTab, setActiveTab] = useState<"applications" | "leads" | "blogs" | "issuance">("applications");
     const [applications, setApplications] = useState<any[]>([]);
     const [leads, setLeads] = useState<any[]>([]);
     const [blogs, setBlogs] = useState<any[]>([]);

     // Issuance State
     const [searchVnId, setSearchVnId] = useState("");
     const [searchResult, setSearchResult] = useState<any>(null);
     const [docType, setDocType] = useState<"offer_letter" | "certificate" | "joining_letter">("offer_letter");
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [isSearching, setIsSearching] = useState(false);
     const [issuanceMode, setIssuanceMode] = useState<"upload" | "generate">("upload");
     const [genData, setGenData] = useState({
          startDate: "",
          endDate: "",
          stipend: "",
          performance: "",
          domainName: "",
          domain: "WD"
     });

     const handleSearchCandidate = async () => {
          if (!searchVnId) return;
          setIsSearching(true);
          setSearchResult(null);
          const res = await searchCandidateByVnId(searchVnId);
          if (res.success) {
               setSearchResult(res.data);
               
               // Auto-fetch application details for pre-filling
               const app = applications.find(a => a.userId?._id === res.data._id || a.userId === res.data._id);
               if (app) {
                    const today = new Date().toISOString().split('T')[0];
                    const threeMonthsLater = new Date();
                    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
                    
                    setGenData({
                         startDate: today,
                         endDate: threeMonthsLater.toISOString().split('T')[0],
                         stipend: "Performance Based",
                         performance: `During this tenure, ${res.data.name} demonstrated exceptional technical growth and contributed significantly to our ${app.roleSlug?.replace('-', ' ')} projects.`,
                         domainName: app.roleSlug?.replace('-', ' ').toUpperCase() || "WEB DEVELOPMENT",
                         domain: app.roleSlug?.split('-').map((word: string) => word[0]).join('').toUpperCase() || "WD"
                    });
               }
               
               toast.success("Candidate located and details pre-filled.");
          } else {
               toast.error(res.error || "Candidate not found.");
          }
          setIsSearching(false);
     };

     const handleGenerateDocument = async () => {
          if (!searchResult) return;
          setIsSubmitting(true);
          
          // Find the candidate's application to link the document to
          const app = applications.find(a => a.userId?._id === searchResult._id || a.userId === searchResult._id);
          if (!app) {
               toast.error("Active application not found for this candidate.");
               setIsSubmitting(false);
               return;
          }

          const res = await generateDocument(app._id, docType, genData);
          if (res.success) {
               toast.success(`Verification ID Generated: ${res.verificationId}`);
               setIssuanceMode('upload');
               setSearchVnId("");
               setSearchResult(null);
               fetchData();
          } else {
               toast.error(res.error || "Generation failed.");
          }
          setIsSubmitting(false);
     };

     const handleDispatchDocument = async () => {
          if (!searchResult || !selectedFile) {
               toast.error("Candidate and document are required.");
               return;
          }
          setIsSubmitting(true);
          const formData = new FormData();
          formData.append("email", searchResult.email);
          formData.append("name", searchResult.name);
          formData.append("docType", docType);
          formData.append("file", selectedFile);
          
          const res = await issueDocument(formData);
          if (res.success) {
               toast.success("Official document dispatched.");
               setSelectedFile(null);
               setSearchVnId("");
               setSearchResult(null);
          } else {
               toast.error(res.error || "Dispatch failed.");
          }
          setIsSubmitting(false);
     };

     const [isLoading, setIsLoading] = useState(true);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isAdmin, setIsAdmin] = useState(false);
     const { data: session, status: authStatus } = useSession();

     const router = useRouter();

     useEffect(() => {
          if (authStatus === "loading") return;

          if (authStatus === "unauthenticated" || (session?.user as any)?.role !== "ADMIN") {
               toast.error("Access Denied. Administrative clearance required.");
               router.push("/profile");
               return;
          }

          setIsAdmin(true);
          fetchData();
     }, [authStatus, session, router]);

     const fetchData = async () => {
          setIsLoading(true);
          const result = await getAdminData();

          if (result.success && result.data) {
               setApplications(result.data.applications);
               setLeads(result.data.leads);
               setBlogs(result.data.blogs || []);
          } else {
               toast.error(result.error || "Failed to retrieve master logs.");
          }
          setIsLoading(false);
     };

     const handleDeleteBlog = async (id: string) => {
          if (!confirm("Are you sure you want to annihilate this record?")) return;

          const result = await deleteBlog(id);
          if (result.success) {
               toast.success("Blog deleted.");
               fetchData();
          } else {
               toast.error(result.error || "Deletion failed.");
          }
     };

     const updateStatus = async (appId: string, status: string) => {
          const result = await updateApplicationStatus(appId, status);

          if (!result.success) toast.error("Update failed.");
          else {
               toast.success(`Status updated to ${status}`);
               fetchData();
          }
     };

     const setInterview = async (id: string, date?: any, link?: string, triggerEmail: boolean = false) => {
          if (!date && !link) return;
          if (triggerEmail) setIsSubmitting(true);
          const result = await scheduleInterview(id, date, link, triggerEmail);
          
          if (triggerEmail) {
               setIsSubmitting(false);
               if (result.success) toast.success("Interview Invitation Dispatched.");
               else toast.error("Failed to send invitation.");
               fetchData();
          } else {
               if (result.success) toast.success("Details updated.");
               else toast.error("Update failed.");
               fetchData();
          }
     };

     if (isLoading) {
          return (
               <div className="min-h-screen bg-background flex items-center justify-center">
                    <VNTLoader size="lg" />
               </div>
          );
     }

     return (
          <main className="min-h-screen bg-background selection:bg-indigo-500/30 text-white">
               <Navbar />

               <section className="relative pt-48 pb-32 px-6">
                    {/* Ambient Glow */}
                    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

                    <div className="max-w-7xl mx-auto relative z-10">
                         {/* Admin Header */}
                         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                              <div>
                                   <div className="flex items-center gap-3 mb-4">
                                        <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center shadow-lg shadow-indigo-500/10 overflow-hidden shrink-0">
                                             <img src="/vnt-logo.png" alt="VNT Logo" className="w-12 h-12 object-contain" />
                                        </div>
                                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                                             Admin <span className="text-gradient">Dashboard.</span>
                                        </h1>
                                   </div>
                                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Manage your company operations & documents</p>
                              </div>

                              <div className="flex flex-wrap gap-2 p-1.5 bg-white/[0.03] border border-white/[0.08] rounded-[1.5rem] backdrop-blur-xl">
                                   <button
                                        onClick={() => setActiveTab("applications")}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'applications' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/[0.05]'}`}
                                   >
                                        Applications
                                   </button>
                                   <button
                                        onClick={() => setActiveTab("leads")}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'leads' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/[0.05]'}`}
                                   >
                                        Leads
                                   </button>
                                   <button
                                        onClick={() => setActiveTab("blogs")}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/[0.05]'}`}
                                   >
                                        Blogs
                                   </button>
                                   <button
                                        onClick={() => setActiveTab("issuance")}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'issuance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/[0.05]'}`}
                                   >
                                        Documents
                                   </button>

                              </div>
                         </div>

                         {activeTab === "blogs" && (
                              <div className="flex justify-end mb-8">
                                   <Button 
                                             onClick={() => router.push('/admin/new-blog')}
                                             className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] text-white rounded-xl px-8 h-14 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 border-0"
                                        >
                                             <Plus className="w-4 h-4" /> New Blog
                                        </Button>
                              </div>
                         )}

                         <div className="glass-card rounded-[2.5rem] border-white/[0.06] shadow-2xl overflow-hidden min-h-[400px]">
                              {activeTab === "applications" ? (
                                   <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                             <thead>
                                                  <tr className="bg-white/[0.02] border-b border-white/[0.04]">
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Candidate</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Role Track</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Assets</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Status</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Interview Module</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] text-right">Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="divide-y divide-white/[0.02]">
                                                  {applications.map((app) => (
                                                       <tr key={app._id} className="hover:bg-white/[0.02] transition-colors group">
                                                            <td className="px-8 py-8">
                                                                  <div className="flex flex-col gap-1">
                                                                       <span className="text-sm font-black text-white uppercase leading-none">{app.userId?.name}</span>
                                                                       <span className="text-[10px] font-mono text-indigo-400 font-bold tracking-tighter leading-none">{app.userId?.vn_id}</span>
                                                                  </div>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                  <div className="flex items-center gap-3">
                                                                       <Briefcase className="w-4 h-4 text-white/10" />
                                                                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">{app.roleSlug?.replace('-', ' ')}</span>
                                                                  </div>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                  <div className="flex items-center gap-3">
                                                                       {app.links?.linkedIn && (
                                                                            <a href={app.links.linkedIn.startsWith('http') ? app.links.linkedIn : `https://${app.links.linkedIn}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-white/20 hover:text-indigo-400 transition-all">
                                                                                 <Linkedin className="w-3.5 h-3.5" />
                                                                            </a>
                                                                       )}
                                                                       {app.links?.github && (
                                                                            <a href={app.links.github.startsWith('http') ? app.links.github : `https://${app.links.github}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-white/20 hover:text-indigo-400 transition-all">
                                                                                 <Github className="w-3.5 h-3.5" />
                                                                            </a>
                                                                       )}
                                                                       {app.links?.portfolio && (
                                                                            <a href={app.links.portfolio.startsWith('http') ? app.links.portfolio : `https://${app.links.portfolio}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-indigo-600/20 text-white/20 hover:text-indigo-400 transition-all">
                                                                                 <Globe className="w-3.5 h-3.5" />
                                                                            </a>
                                                                       )}
                                                                       {!app.links?.linkedIn && !app.links?.github && !app.links?.portfolio && <span className="text-[8px] font-bold text-white/5 uppercase tracking-widest">No Links</span>}
                                                                  </div>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                  <select
                                                                       className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest text-indigo-400 outline-none cursor-pointer"
                                                                       value={app.status}
                                                                       onChange={(e) => updateStatus(app._id, e.target.value)}
                                                                  >
                                                                       <option value="Reviewing" className="bg-[#09090B]">Reviewing</option>
                                                                       <option value="Interviewing" className="bg-[#09090B]">Interviewing</option>
                                                                       <option value="Accepted" className="bg-[#09090B]">Accepted</option>
                                                                       <option value="Rejected" className="bg-[#09090B]">Rejected</option>
                                                                  </select>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                  <div className="flex flex-col gap-3 min-w-[220px]">
                                                                       <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                 <Button
                                                                                      variant="outline"
                                                                                      className={cn(
                                                                                           "h-10 text-[9px] font-bold border-white/[0.06] bg-white/[0.02] uppercase rounded-lg justify-start text-left hover:bg-white/[0.1] hover:text-white transition-all",
                                                                                           !app.interviewDate && "text-white/20"
                                                                                      )}
                                                                                 >
                                                                                      <CalendarIcon className="mr-2 h-3.5 w-3.5 text-indigo-400/50" />
                                                                                      {app.interviewDate ? format(new Date(app.interviewDate), "PPP") : <span>Set Interview Date</span>}
                                                                                 </Button>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0 rounded-3xl border-white/[0.08] shadow-2xl bg-[#09090B]" align="start">
                                                                                 <CalendarUI
                                                                                      mode="single"
                                                                                      selected={app.interviewDate ? new Date(app.interviewDate) : undefined}
                                                                                      onSelect={(date) => {
                                                                                           if (date) setInterview(app._id, date.toISOString(), app.interviewLink, false);
                                                                                      }}
                                                                                      initialFocus
                                                                                      className="p-4"
                                                                                 />
                                                                            </PopoverContent>
                                                                       </Popover>
                                                                       <div className="relative group">
                                                                            <Input
                                                                                 type="text"
                                                                                 placeholder="MEET LINK / URL"
                                                                                 className="h-10 text-[9px] font-bold border-white/[0.06] bg-white/[0.02] uppercase rounded-lg pr-10 focus:border-indigo-600 transition-all text-white placeholder:text-white/10"
                                                                                 defaultValue={app.interviewLink || ''}
                                                                                 onBlur={(e) => setInterview(app._id, app.interviewDate, e.target.value, false)}
                                                                            />
                                                                            <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/10 group-focus-within:text-indigo-600 transition-colors" />
                                                                       </div>
                                                                        {app.status === 'Interviewing' && (
                                                                             <Button
                                                                                  disabled={!app.interviewDate || !app.interviewLink || isSubmitting}
                                                                                  onClick={() => setInterview(app._id, app.interviewDate, app.interviewLink, true)}
                                                                                  className="h-10 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all w-full mt-2"
                                                                             >
                                                                                  {isSubmitting ? <VNTLoader size="sm" /> : <Mail className="w-3 h-3 mr-2" />}
                                                                                  Send Invite
                                                                             </Button>
                                                                        )}
                                                                  </div>
                                                            </td>
                                                            <td className="px-8 py-8 text-right">
                                                                  <div className="flex justify-end gap-2">
                                                                       <Dialog>
                                                                            <DialogTrigger asChild>
                                                                                 <Button
                                                                                      variant="ghost"
                                                                                      size="icon"
                                                                                      className="rounded-xl hover:bg-white/[0.05] text-white/20 hover:text-emerald-400"
                                                                                      onClick={() => {
                                                                                           setSearchResult(app.userId);
                                                                                           const today = new Date().toISOString().split('T')[0];
                                                                                           const threeMonthsLater = new Date();
                                                                                           threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
                                                                                           setGenData({
                                                                                                startDate: today,
                                                                                                endDate: threeMonthsLater.toISOString().split('T')[0],
                                                                                                stipend: "Performance Based",
                                                                                                performance: `Exceptional technical growth during the ${app.roleSlug?.replace('-', ' ')} internship.`,
                                                                                                domainName: app.roleSlug?.replace('-', ' ').toUpperCase() || "WEB DEVELOPMENT",
                                                                                                domain: app.roleSlug?.split('-').map((word: string) => word[0]).join('').toUpperCase() || "WD"
                                                                                           });
                                                                                      }}
                                                                                 >
                                                                                      <FileText className="w-5 h-5" />
                                                                                 </Button>
                                                                            </DialogTrigger>
                                                                            <DialogContent className="bg-[#09090B] border-white/10 rounded-3xl p-8 max-w-md">
                                                                                 <DialogHeader>
                                                                                      <DialogTitle className="text-xl font-black uppercase tracking-tighter text-white">Issue Document</DialogTitle>
                                                                                 </DialogHeader>
                                                                                 <div className="space-y-6 mt-6">
                                                                                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                                                                           <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-1">Intern Name</p>
                                                                                           <p className="text-sm font-bold text-white uppercase">{app.userId?.name}</p>
                                                                                           <p className="text-[9px] font-mono text-white/40">{app.userId?.vn_id}</p>
                                                                                      </div>
                                                                                      <div className="space-y-2">
                                                                                           <label className="text-[9px] font-black uppercase text-white/20 tracking-widest">Document Type</label>
                                                                                           <select 
                                                                                                className="w-full h-12 bg-white/[0.05] border border-white/10 rounded-xl text-white px-4 text-[10px] font-bold tracking-widest uppercase outline-none focus:border-indigo-600"
                                                                                                value={docType}
                                                                                                onChange={(e: any) => setDocType(e.target.value as any)}
                                                                                           >
                                                                                                <option value="offer_letter" className="bg-[#09090B]">Offer Letter</option>
                                                                                                <option value="joining_letter" className="bg-[#09090B]">Joining Letter</option>
                                                                                                <option value="certificate" className="bg-[#09090B]">Certificate</option>
                                                                                           </select>
                                                                                      </div>
                                                                                      <Button 
                                                                                           onClick={handleGenerateDocument}
                                                                                           disabled={isSubmitting}
                                                                                           className="w-full h-14 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[10px] tracking-[0.2em] rounded-xl"
                                                                                      >
                                                                                           {isSubmitting ? <VNTLoader size="sm" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                                                                                           Send Document
                                                                                      </Button>
                                                                                      <p className="text-[8px] text-center text-white/20 uppercase tracking-widest leading-relaxed">
                                                                                           Auto-fills Domain: {app.roleSlug?.toUpperCase()} <br/>
                                                                                           Verification ID will be generated & sent via mail.
                                                                                      </p>
                                                                                 </div>
                                                                            </DialogContent>
                                                                       </Dialog>
                                                                       <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="rounded-xl hover:bg-white/[0.05] text-white/20 hover:text-indigo-400"
                                                                            onClick={() => router.push(`/careers/audit/${app._id}`)}
                                                                       >
                                                                            <FileSearch className="w-5 h-5" />
                                                                       </Button>
                                                                  </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                              ) : activeTab === "leads" ? (
                                   <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                             <thead>
                                                  <tr className="bg-white/[0.02] border-b border-white/[0.04]">
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Client</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Email</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Message</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] text-right">Date</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="divide-y divide-white/[0.02]">
                                                  {leads.map((lead) => (
                                                       <tr key={lead._id} className="hover:bg-white/[0.02] transition-colors">
                                                            <td className="px-8 py-8 font-black text-white uppercase text-sm leading-none">{lead.name}</td>
                                                            <td className="px-8 py-8 text-[10px] font-bold text-indigo-400 leading-none">{lead.email}</td>
                                                            <td className="px-8 py-8">
                                                                 <p className="text-xs text-white/30 font-light max-w-md line-clamp-2">{lead.message}</p>
                                                            </td>
                                                            <td className="px-8 py-8 text-right text-[10px] font-bold text-white/10 uppercase tracking-widest leading-none">
                                                                 {new Date(lead.createdAt).toLocaleDateString()}
                                                            </td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                              
                              ) : activeTab === "issuance" ? (
                                   <div className="p-8 md:p-12">
                                        <div className="max-w-3xl mx-auto space-y-12">
                                             <div className="space-y-4">
                                                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Issue New Document</h3>
                                                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Search and issue verified Offer Letters and Internship Certificates.</p>
                                             </div>

                                             <div className="space-y-6">
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] pl-2">Search Candidate</label>
                                                       <div className="flex gap-4">
                                                            <div className="relative group flex-1">
                                                                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-indigo-400 transition-colors" />
                                                                 <Input 
                                                                      placeholder="ENTER VN-ID (e.g. VN-2026-ABCD)"
                                                                      className="h-14 pl-12 bg-white/[0.02] border-white/10 rounded-xl text-white placeholder:text-white/10 text-[11px] font-black tracking-widest uppercase focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all"
                                                                      value={searchVnId}
                                                                      onChange={(e) => setSearchVnId(e.target.value)}
                                                                      onKeyDown={(e) => e.key === 'Enter' && handleSearchCandidate()}
                                                                 />
                                                            </div>
                                                            <Button 
                                                                 onClick={handleSearchCandidate}
                                                                 disabled={isSearching || !searchVnId}
                                                                 className="h-14 px-8 bg-white/5 hover:bg-indigo-600 text-white font-bold rounded-xl tracking-widest uppercase text-[10px] transition-all"
                                                            >
                                                                 {isSearching ? <VNTLoader size="sm" /> : "Verify"}
                                                            </Button>
                                                       </div>
                                                  </div>

                                                  {searchResult && (
                                                       <motion.div 
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20"
                                                       >
                                                            <div className="flex justify-between items-start mb-6">
                                                                 <div>
                                                                      <p className="text-[9px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-1">Candidate Found</p>
                                                                      <h4 className="text-lg font-black text-white uppercase">{searchResult.name}</h4>
                                                                      <p className="text-xs text-white/50 font-bold tracking-widest">{searchResult.email}</p>
                                                                 </div>
                                                                 <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/50">{searchResult.role}</span>
                                                            </div>

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5">
                                                                 <div className="space-y-2">
                                                                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Document Type</label>
                                                                      <select 
                                                                           className="w-full h-12 bg-white/[0.02] border border-white/10 rounded-xl text-white px-4 text-[10px] font-bold tracking-widest uppercase focus:outline-none focus:border-indigo-500/50"
                                                                           value={docType}
                                                                           onChange={(e: any) => setDocType(e.target.value)}
                                                                      >
                                                                           <option value="offer_letter" className="bg-[#09090B]">Offer Letter</option>
                                                                           <option value="joining_letter" className="bg-[#09090B]">Joining Letter</option>
                                                                           <option value="certificate" className="bg-[#09090B]">Internship Certificate</option>
                                                                      </select>
                                                                 </div>

                                                                 <div className="space-y-2">
                                                                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Issuance Mode</label>
                                                                      <div className="flex gap-2 p-1 bg-white/[0.02] border border-white/10 rounded-xl">
                                                                           <button 
                                                                                onClick={() => setIssuanceMode('upload')}
                                                                                className={cn("flex-1 h-10 text-[9px] font-bold uppercase rounded-lg transition-all", issuanceMode === 'upload' ? "bg-indigo-600 text-white" : "text-white/30 hover:bg-white/5")}
                                                                           >
                                                                                Manual Upload
                                                                           </button>
                                                                           <button 
                                                                                onClick={() => setIssuanceMode('generate')}
                                                                                className={cn("flex-1 h-10 text-[9px] font-bold uppercase rounded-lg transition-all", issuanceMode === 'generate' ? "bg-indigo-600 text-white" : "text-white/30 hover:bg-white/5")}
                                                                           >
                                                                                Auto-Generate
                                                                           </button>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            {issuanceMode === 'upload' ? (
                                                                 <div className="mt-6 space-y-2">
                                                                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Attachment (PDF/Image)</label>
                                                                      <div className="relative">
                                                                           <input 
                                                                                type="file"
                                                                                accept="application/pdf,image/*"
                                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                                                           />
                                                                           <div className="w-full h-14 bg-white/[0.02] border border-white/10 border-dashed rounded-xl flex items-center justify-center gap-2 hover:border-indigo-500/50 transition-colors">
                                                                                {selectedFile ? (
                                                                                     <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase truncate px-4">{selectedFile.name}</span>
                                                                                ) : (
                                                                                     <>
                                                                                          <UploadCloud className="w-4 h-4 text-white/30" />
                                                                                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Select File for Manual Dispatch</span>
                                                                                     </>
                                                                                )}
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            ) : (
                                                                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-white/[0.02] border border-white/5">
                                                                      <div className="space-y-2">
                                                                           <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Start Date</label>
                                                                           <Input 
                                                                                type="date"
                                                                                className="bg-white/[0.03] border-white/10 text-white h-12 rounded-lg"
                                                                                value={genData.startDate}
                                                                                onChange={(e) => setGenData({...genData, startDate: e.target.value})}
                                                                           />
                                                                      </div>
                                                                      <div className="space-y-2">
                                                                           <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">End Date (For Cert)</label>
                                                                           <Input 
                                                                                type="date"
                                                                                className="bg-white/[0.03] border-white/10 text-white h-12 rounded-lg"
                                                                                value={genData.endDate}
                                                                                onChange={(e) => setGenData({...genData, endDate: e.target.value})}
                                                                           />
                                                                      </div>
                                                                      <div className="space-y-2">
                                                                           <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Domain (e.g. Web Development)</label>
                                                                           <Input 
                                                                                placeholder="WEB DEVELOPMENT"
                                                                                className="bg-white/[0.03] border-white/10 text-white h-12 rounded-lg uppercase text-[10px] font-bold"
                                                                                value={genData.domainName}
                                                                                onChange={(e) => setGenData({...genData, domainName: e.target.value})}
                                                                           />
                                                                      </div>
                                                                      <div className="space-y-2">
                                                                           <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Stipend (For Offer)</label>
                                                                           <Input 
                                                                                placeholder="RS. 5000 / MONTH"
                                                                                className="bg-white/[0.03] border-white/10 text-white h-12 rounded-lg uppercase text-[10px] font-bold"
                                                                                value={genData.stipend}
                                                                                onChange={(e) => setGenData({...genData, stipend: e.target.value})}
                                                                           />
                                                                      </div>
                                                                      <div className="md:col-span-2 space-y-2">
                                                                           <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Performance Review (Optional)</label>
                                                                           <Textarea 
                                                                                placeholder="DESCRIBE CANDIDATE'S PERFORMANCE..."
                                                                                className="bg-white/[0.03] border-white/10 text-white min-h-[100px] rounded-xl text-[10px] font-medium"
                                                                                value={genData.performance}
                                                                                onChange={(e) => setGenData({...genData, performance: e.target.value})}
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            )}

                                                            <div className="mt-8 flex justify-end">
                                                                 <Button 
                                                                      onClick={issuanceMode === 'upload' ? handleDispatchDocument : handleGenerateDocument}
                                                                      disabled={isSubmitting || (issuanceMode === 'upload' && !selectedFile)}
                                                                      className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] text-white font-bold rounded-xl tracking-[0.2em] uppercase text-[10px] transition-all border-0"
                                                                 >
                                                                      {isSubmitting ? <VNTLoader size="sm" /> : <FileText className="w-4 h-4 mr-2" />}
                                                                      {issuanceMode === 'upload' ? "Upload & Send" : "Generate"}
                                                                 </Button>
                                                            </div>
                                                       </motion.div>
                                                  )}
                                             </div>
                                        </div>
                                   </div>

                              ) : (
                                   /* Blogs Table */
                                   <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                             <thead>
                                                  <tr className="bg-white/[0.02] border-b border-white/[0.04]">
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Article</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Metadata</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] text-right">Actions</th>
                                                  </tr>
                                             </thead>
                                             <tbody className="divide-y divide-white/[0.02]">
                                                  {blogs.map((blog) => (
                                                       <tr key={blog._id} className="hover:bg-white/[0.02] transition-colors">
                                                            <td className="px-8 py-8">
                                                                 <div className="flex flex-col gap-1">
                                                                      <span className="text-sm font-black text-white uppercase leading-none">{blog.title}</span>
                                                                      <span className="text-[10px] font-mono text-indigo-400 leading-none">/{blog.slug}</span>
                                                                 </div>
                                                            </td>
                                                            <td className="px-8 py-8">
                                                                 <div className="flex items-center gap-6">
                                                                      <div className="flex items-center gap-2">
                                                                           <Calendar className="w-3.5 h-3.5 text-white/10" />
                                                                           <span className="text-[10px] font-bold text-white/20 uppercase leading-none">{new Date(blog.createdAt).toLocaleDateString()}</span>
                                                                      </div>
                                                                      <div className="flex items-center gap-2">
                                                                           <User2 className="w-3.5 h-3.5 text-white/10" />
                                                                           <span className="text-[10px] font-bold text-white/20 uppercase leading-none">Admin</span>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className="px-8 py-8 text-right">
                                                                 <div className="flex justify-end gap-2">
                                                                      <Button
                                                                           variant="ghost"
                                                                           size="icon"
                                                                           className="rounded-xl hover:bg-red-500/10 hover:text-red-500 text-white/10"
                                                                           onClick={() => handleDeleteBlog(blog._id)}
                                                                      >
                                                                           <Trash2 className="w-4 h-4" />
                                                                      </Button>
                                                                      <Button
                                                                           variant="ghost"
                                                                           size="icon"
                                                                           className="rounded-xl hover:bg-white/[0.05] text-white/10 hover:text-indigo-400"
                                                                           onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                                                                      >
                                                                           <ExternalLink className="w-4 h-4" />
                                                                      </Button>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  ))}
                                                  {blogs.length === 0 && (
                                                       <tr>
                                                            <td colSpan={3} className="px-8 py-20 text-center">
                                                                 <div className="flex flex-col items-center gap-6">
                                                                      <BookOpen className="w-12 h-12 text-white/5" />
                                                                      <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest leading-none">No blogs published yet.</p>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  )}
                                             </tbody>
                                        </table>
                                   </div>
                              )}
                         </div>
                    </div>
               </section>

               <Footer />
          </main>
     );
}
