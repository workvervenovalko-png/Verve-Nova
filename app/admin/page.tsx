"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
     getAdminData,
     updateApplicationStatus,
     scheduleInterview,
     createBlog,
     deleteBlog
} from "@/app/actions/admin";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
     Users, Mail, ShieldCheck, Briefcase, Calendar,
     Search, Filter, ExternalLink, CheckCircle2,
     XCircle, Clock, Save, Loader2, Database,
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
     BookOpen
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
     const [activeTab, setActiveTab] = useState<"applications" | "leads" | "blogs">("applications");
     const [applications, setApplications] = useState<any[]>([]);
     const [leads, setLeads] = useState<any[]>([]);
     const [blogs, setBlogs] = useState<any[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isAdmin, setIsAdmin] = useState(false);
     const { data: session, status: authStatus } = useSession();

     // Blog Form State
     const [blogForm, setBlogForm] = useState({
          title: "",
          excerpt: "",
          content: "",
          coverImage: ""
     });


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

     const handleCreateBlog = async () => {
          if (!blogForm.title || !blogForm.content) {
               toast.error("Title and Content are required.");
               return;
          }

          setIsSubmitting(true);
          const result = await createBlog(blogForm);
          setIsSubmitting(false);

          if (result.success) {
               toast.success("Blog published successfully.");
               setBlogForm({ title: "", excerpt: "", content: "", coverImage: "" });
               fetchData();
          } else {
               toast.error(result.error || "Failed to publish blog.");
          }
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

     const setInterview = async (id: string, date?: any, link?: string) => {
          if (!date && !link) return;
          const result = await scheduleInterview(id, date, link);


          if (!result.success) toast.error("Failed to set interview.");
          else {
               toast.success("Interview scheduled.");
               fetchData();
          }
     };

     if (isLoading) {
          return (
               <div className="min-h-screen bg-background flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
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
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                             <ShieldCheck className="w-6 h-6 text-white" />
                                        </div>
                                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                                             Master <span className="text-gradient">Console.</span>
                                        </h1>
                                   </div>
                                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Administrative Clearance Level 05 // System Controller</p>
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
                              </div>
                         </div>

                         {activeTab === "blogs" && (
                              <div className="flex justify-end mb-8">
                                   <Dialog>
                                        <DialogTrigger asChild>
                                             <Button className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] text-white rounded-xl px-8 h-14 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3 border-0">
                                                  <Plus className="w-4 h-4" /> New Publication
                                             </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl bg-[#09090B] border-white/[0.08] p-10 rounded-[2.5rem] shadow-2xl">
                                             <DialogHeader>
                                                  <DialogTitle className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-6">Draft New <span className="text-gradient">Insight</span></DialogTitle>
                                             </DialogHeader>
                                             <div className="grid gap-8 py-4">
                                                  <div className="grid gap-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">Headline</label>
                                                       <Input
                                                            placeholder="ENTER BLOG TITLE"
                                                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-[10px] font-bold uppercase text-white placeholder:text-white/10"
                                                            value={blogForm.title}
                                                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                                       />
                                                  </div>
                                                  <div className="grid gap-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">Excerpt (Short Summary)</label>
                                                       <Input
                                                            placeholder="BRIEF OVERVIEW FOR PREVIEW CARDS"
                                                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-xs text-white placeholder:text-white/10"
                                                            value={blogForm.excerpt}
                                                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                                       />
                                                  </div>
                                                  <div className="grid gap-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">Intel Content (Full Article)</label>
                                                       <Textarea
                                                            placeholder="WRITE YOUR BLOG CONTENT HERE..."
                                                            className="min-h-[220px] bg-white/[0.03] border-white/[0.06] rounded-[1.5rem] focus:bg-white/[0.05] text-sm leading-relaxed text-white placeholder:text-white/10"
                                                            value={blogForm.content}
                                                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                                       />
                                                  </div>
                                                  <div className="grid gap-2">
                                                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/20 ml-1">Cover Image URL</label>
                                                       <Input
                                                            placeholder="https://..."
                                                            className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] text-[10px] font-mono text-indigo-400 placeholder:text-white/10"
                                                            value={blogForm.coverImage}
                                                            onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                                                       />
                                                  </div>
                                             </div>
                                             <DialogFooter className="mt-8">
                                                  <Button
                                                       onClick={handleCreateBlog}
                                                       disabled={isSubmitting}
                                                       className="w-full h-16 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border-0"
                                                  >
                                                       {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Publication"}
                                                  </Button>
                                             </DialogFooter>
                                        </DialogContent>
                                   </Dialog>
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
                                                                                           if (date) setInterview(app._id, date.toISOString(), app.interviewLink);
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
                                                                                 onBlur={(e) => setInterview(app._id, app.interviewDate, e.target.value)}
                                                                            />
                                                                            <Globe className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/10 group-focus-within:text-indigo-600 transition-colors" />
                                                                       </div>
                                                                  </div>
                                                            </td>
                                                            <td className="px-8 py-8 text-right">
                                                                  <div className="flex justify-end gap-2">
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
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Digital Coord</th>
                                                       <th className="px-8 py-6 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Transmission</th>
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
                                                                      <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest leading-none">No intelligence reports published yet.</p>
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
