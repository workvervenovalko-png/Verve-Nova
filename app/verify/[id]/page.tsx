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
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfEngineLoaded, setPdfEngineLoaded] = useState(false);

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

  useEffect(() => {
    if (data && pdfEngineLoaded && documentRef.current && !pdfUrl) {
      const generatePdfBlob = async () => {
        setDownloading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 800)); // wait for images
          const html2pdf = (window as any).html2pdf;
          if (!html2pdf) return;

          const opt = {
            margin:       0,
            filename:     `VNT-${data.type.replace(/\s+/g, '-')}-${data.candidateName.replace(/\s+/g, '-')}.pdf`,
            image:        { type: 'jpeg', quality: 1 },
            html2canvas:  { scale: 2, useCORS: true },
            jsPDF:        { unit: 'px', format: data.type === 'Certificate' ? [1000, 750] : [800, 1131], orientation: data.type === 'Certificate' ? 'landscape' : 'portrait' },
            pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
          };

          const worker = html2pdf().set(opt).from(documentRef.current);
          const url = await worker.outputPdf('datauristring');
          setPdfUrl(url);
        } catch (err) {
          console.error("Failed to generate PDF Data URI:", err);
        } finally {
          setDownloading(false);
        }
      };
      generatePdfBlob();
    }
  }, [data, pdfEngineLoaded, pdfUrl]);

  const handleDownloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `VNT-${data.type.replace(/\s+/g, '-')}-${data.candidateName.replace(/\s+/g, '-')}.pdf`;
      link.click();
      toast.success("Downloaded successfully!");
    } else {
      toast.error("PDF is still generating. Please wait a moment.");
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
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" 
        strategy="afterInteractive" 
        onReady={() => setPdfEngineLoaded(true)}
        onLoad={() => setPdfEngineLoaded(true)} 
      />
      
      {/* Hidden HTML Template for PDF Generation */}
      <div className="absolute top-0 left-[-9999px] opacity-0 -z-50 overflow-hidden pointer-events-none">
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

      <main className="min-h-screen bg-[#111111] py-20 px-6 flex flex-col items-center">
        <div className="w-full max-w-[1000px] flex justify-between items-center mb-8">
          <Button 
            onClick={() => router.back()}
            variant="ghost" 
            className="text-white/40 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Verification
          </Button>
          <Button 
            onClick={handleDownloadPdf}
            disabled={downloading || !pdfUrl}
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

        {/* PDF Viewer */}
        <div className="w-full max-w-[1000px] h-[85vh] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden border border-white/10 flex items-center justify-center">
          {pdfUrl ? (
            <object 
              data={pdfUrl} 
              type="application/pdf"
              className="w-full h-full border-none"
              title="Document Preview"
            >
              <iframe src={pdfUrl} className="w-full h-full border-none" title="Document Preview" />
            </object>
          ) : (
            <div className="flex flex-col items-center text-white/50">
              <VNTLoader size="lg" />
              <p className="mt-4 text-xs tracking-[0.2em] uppercase font-bold">Rendering Document...</p>
            </div>
          )}
        </div>

        <div className="mt-12 text-center text-white/20 max-w-lg">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Official Digital Certification // Verve Nova Technologies</p>
          <p className="text-[8px] mt-2 italic">This document is digitally verified and requires no physical signature for authentication in its digital form. For official verification, visit vervenovatech.com/verify.</p>
        </div>
      </main>
    </>
  );
}
