import os
import re

file_path = r"c:\Users\Lenovo\Desktop\Verve Nova\frontend\app\admin\page.tsx"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    'deleteBlog\n} from "@/app/actions/admin";',
    'deleteBlog,\n     searchCandidateByVnId,\n     issueDocument\n} from "@/app/actions/admin";'
)

if 'UploadCloud' not in content:
    content = content.replace('BookOpen\n}', 'BookOpen,\n     UploadCloud,\n     FileText\n}')

# 2. Update activeTab type
content = content.replace(
    'const [activeTab, setActiveTab] = useState<"applications" | "leads" | "blogs">("applications");',
    'const [activeTab, setActiveTab] = useState<"applications" | "leads" | "blogs" | "issuance">("applications");'
)

# 3. Add states and handlers
state_and_handlers = """
     // Issuance State
     const [searchVnId, setSearchVnId] = useState("");
     const [searchResult, setSearchResult] = useState<any>(null);
     const [docType, setDocType] = useState<"offer_letter" | "certificate">("offer_letter");
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [isSearching, setIsSearching] = useState(false);

     const handleSearchCandidate = async () => {
          if (!searchVnId) return;
          setIsSearching(true);
          setSearchResult(null);
          const res = await searchCandidateByVnId(searchVnId);
          if (res.success) {
               setSearchResult(res.data);
               toast.success("Candidate located.");
          } else {
               toast.error(res.error || "Candidate not found.");
          }
          setIsSearching(false);
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
"""

if '// Issuance State' not in content:
    content = content.replace(
        'const [blogs, setBlogs] = useState<any[]>([]);',
        'const [blogs, setBlogs] = useState<any[]>([]);\n' + state_and_handlers
    )

# 4. Add Issuance Tab Button
tab_button = """
                                   <button
                                        onClick={() => setActiveTab("issuance")}
                                        className={`px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all ${activeTab === 'issuance' ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/30 hover:bg-white/[0.05]'}`}
                                   >
                                        Issuance
                                   </button>
"""
if 'onClick={() => setActiveTab("issuance")}' not in content:
    content = content.replace('Blogs\n                                   </button>', 'Blogs\n                                   </button>' + tab_button)

# 5. Add Issuance Tab Content
issuance_content = """
                              ) : activeTab === "issuance" ? (
                                   <div className="p-8 md:p-12">
                                        <div className="max-w-3xl mx-auto space-y-12">
                                             <div className="space-y-4">
                                                  <h3 className="text-xl font-black text-white uppercase tracking-tighter">Document Dispatch Control</h3>
                                                  <p className="text-xs text-white/40 uppercase tracking-widest font-bold">Search and issue verified Offer Letters and Internship Certificates.</p>
                                             </div>

                                             <div className="space-y-6">
                                                  <div className="space-y-2">
                                                       <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] pl-2">Locate Candidate</label>
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
                                                                 {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
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
                                                                      <p className="text-[9px] font-black uppercase text-indigo-400 tracking-[0.3em] mb-1">Target Acquired</p>
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
                                                                           <option value="certificate" className="bg-[#09090B]">Internship Certificate</option>
                                                                      </select>
                                                                 </div>

                                                                 <div className="space-y-2">
                                                                      <label className="text-[9px] font-bold text-white/30 uppercase tracking-[0.3em]">Attachment (PDF/Image)</label>
                                                                      <div className="relative">
                                                                           <input 
                                                                                type="file"
                                                                                accept="application/pdf,image/*"
                                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                                                           />
                                                                           <div className="w-full h-12 bg-white/[0.02] border border-white/10 border-dashed rounded-xl flex items-center justify-center gap-2 group-hover:border-indigo-500/50 transition-colors">
                                                                                {selectedFile ? (
                                                                                     <span className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase truncate px-4">{selectedFile.name}</span>
                                                                                ) : (
                                                                                     <>
                                                                                          <UploadCloud className="w-4 h-4 text-white/30 group-hover:text-indigo-400" />
                                                                                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Select File</span>
                                                                                     </>
                                                                                )}
                                                                           </div>
                                                                      </div>
                                                                 </div>
                                                            </div>

                                                            <div className="mt-8 flex justify-end">
                                                                 <Button 
                                                                      onClick={handleDispatchDocument}
                                                                      disabled={isSubmitting || !selectedFile}
                                                                      className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-[0_0_24px_rgba(99,102,241,0.3)] text-white font-bold rounded-xl tracking-[0.2em] uppercase text-[10px] transition-all border-0"
                                                                 >
                                                                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                                                                      Dispatch to Target
                                                                 </Button>
                                                            </div>
                                                       </motion.div>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
"""

# Insert before blogs condition ends
if 'activeTab === "issuance" ?' not in content:
    content = content.replace(
        ') : (\n                                   /* Blogs Table */',
        issuance_content + '\n                              ) : (\n                                   /* Blogs Table */'
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Issuance patch applied successfully via python script.")
