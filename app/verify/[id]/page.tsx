"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { DocumentTemplates } from "@/components/documents/DocumentTemplates";
import { ArrowLeft, Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VNTLoader } from "@/components/vnt-loader";
import { useRef } from "react";
import { toast } from "sonner";

export default function DocumentPreviewPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const router = useRouter();
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/verify?id=${id}`);
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleDownloadPdf = async () => {
    if (!documentRef.current) return;
    
    setDownloading(true);
    const toastId = toast.loading("Generating high-quality PDF...");

    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      const html2pdf = (window as any).html2pdf;

      if (!html2pdf) {
        toast.error("PDF engine is still loading. Please try again.", { id: toastId });
        setDownloading(false);
        return;
      }

      const opt = {
        margin:       0,
        filename:     `VNT-${data.type.replace(/\s+/g, '-')}-${data.candidateName.replace(/\s+/g, '-')}.pdf`,
        image:        { type: 'jpeg', quality: 1 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'px', format: data.type === 'Certificate' ? [1000, 750] : [800, 1131], orientation: data.type === 'Certificate' ? 'landscape' : 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] }
      };

      await html2pdf().set(opt).from(documentRef.current).save();

      toast.success("Downloaded successfully!", { id: toastId });
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      toast.error("Failed to download PDF. Try again.", { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <VNTLoader size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#09090B] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-black uppercase mb-4">Record Missing</h1>
        <Button onClick={() => router.push('/verify')} variant="outline" className="border-white/10 text-white">Back to Portal</Button>
      </div>
    );
  }

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" strategy="lazyOnload" />
      <main className="min-h-screen bg-[#111111] py-20 px-6 flex flex-col items-center overflow-x-auto">
        <div className="w-full max-w-[1000px] flex justify-between items-center mb-8 sticky left-0">
          <Button 
            onClick={() => router.back()}
            variant="ghost" 
            className="text-white/40 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Verification
          </Button>
          <Button 
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 font-bold uppercase text-[10px] tracking-widest flex items-center gap-2"
          >
            {downloading ? (
              <VNTLoader size="sm" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {downloading ? "Generating PDF..." : "Save as PDF"}
          </Button>
        </div>

        {/* PDF Viewer Styling Wrapper */}
        <div className="w-full max-w-[1050px] bg-[#2a2a2a] p-8 rounded-lg border border-white/10 flex justify-center shadow-2xl relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
            <div className="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
          <div className="shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden rounded-sm border border-black/20">
            <div ref={documentRef} className="bg-[#ffffff]">
              <DocumentTemplates 
                type={data.type}
                candidateName={data.candidateName}
                vnId={data.vnId}
                verificationId={data.verificationId}
                issuedAt={data.issuedAt}
                metadata={data.metadata}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-white/20 max-w-lg sticky left-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Official Digital Certification // Verve Nova Technologies</p>
          <p className="text-[8px] mt-2 italic">This document is digitally verified and requires no physical signature for authentication in its digital form. For official verification, visit vervenovatech.com/verify.</p>
        </div>
      </main>
    </>
  );
}
