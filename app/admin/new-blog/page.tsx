"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, PenTool } from "lucide-react";
import { toast } from "sonner";
import { createBlog } from "@/app/actions/admin";

export default function NewBlogPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [blogForm, setBlogForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        coverImage: ""
    });

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
            router.push("/admin");
        } else {
            toast.error(result.error || "Failed to publish blog.");
        }
    };

    return (
        <main className="min-h-screen bg-[#09090B] text-white selection:bg-indigo-500/30">
            <Navbar />
            <section className="relative pt-40 pb-32 px-6">
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto relative z-10">
                    <button 
                        onClick={() => router.push('/admin')}
                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Console
                    </button>

                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <PenTool className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter uppercase leading-none">
                                Draft <span className="text-gradient">Publication.</span>
                            </h1>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-2">Verve Nova Publishing System</p>
                        </div>
                    </div>

                    <div className="glass-card p-10 md:p-14 rounded-[2.5rem] border border-white/[0.06] shadow-2xl relative overflow-hidden bg-white/[0.01]">
                        <div className="grid gap-10">
                            <div className="grid gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Headline</label>
                                <Input
                                    placeholder="ENTER BLOG TITLE"
                                    className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-sm font-bold uppercase tracking-wide text-white placeholder:text-white/10 px-6"
                                    value={blogForm.title}
                                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Excerpt (Short Summary)</label>
                                <Input
                                    placeholder="BRIEF OVERVIEW FOR PREVIEW CARDS"
                                    className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-xs text-white placeholder:text-white/10 px-6"
                                    value={blogForm.excerpt}
                                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Intel Content (Full Article)</label>
                                <Textarea
                                    placeholder="WRITE YOUR LONG-FORM CONTENT HERE..."
                                    className="min-h-[300px] bg-white/[0.03] border-white/[0.06] rounded-[1.5rem] focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-sm leading-relaxed text-white placeholder:text-white/10 p-6 custom-scrollbar"
                                    value={blogForm.content}
                                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Cover Image URL</label>
                                <Input
                                    placeholder="https://images.unsplash.com/..."
                                    className="h-14 bg-white/[0.03] border-white/[0.06] rounded-xl focus:bg-white/[0.05] focus:border-indigo-500/50 transition-all text-xs font-mono text-indigo-400 placeholder:text-white/10 px-6"
                                    value={blogForm.coverImage}
                                    onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                                />
                            </div>

                            <div className="pt-6 border-t border-white/5 mt-4 flex justify-end">
                                <Button
                                    onClick={handleCreateBlog}
                                    disabled={isSubmitting || !blogForm.title || !blogForm.content}
                                    className="h-14 px-10 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_32px_rgba(99,102,241,0.3)] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-0"
                                >
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                                    Authorize Publication
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
