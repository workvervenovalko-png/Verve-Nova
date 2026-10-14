import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getPublicBlogs } from "@/app/actions/admin";
import { BlogArchiveClient } from "./BlogArchiveClient";

export const metadata: Metadata = {
  title: "Engineering Blog & Tech Insights",
  description:
    "Explore in-depth technical blogs, cloud architecture guides, FinOps strategies, SaaS design patterns, and cybersecurity best practices written by Verve Nova engineers.",
  keywords: [
    "Verve Nova Engineering Blog",
    "SaaS Architecture",
    "Cloud Cost Optimization",
    "AWS EKS Kubernetes",
    "Next.js Development",
    "Flutter vs React Native",
    "VAPT Security Audit Checklist",
    "Enterprise ERP Development",
    "Custom CRM Architecture",
    "Core Web Vitals Optimization"
  ],
  alternates: {
    canonical: "https://vervenovatech.com/blog",
  },
  openGraph: {
    title: "Engineering Blog & Tech Insights | Verve Nova Technologies",
    description:
      "Deep dive into modern software engineering, AWS cloud architectures, generative AI, enterprise POS/ERP, and FinOps benchmarks.",
    url: "https://vervenovatech.com/blog",
    siteName: "Verve Nova Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & Tech Insights | Verve Nova Technologies",
    description:
      "Deep dive into modern software engineering, AWS cloud architectures, and enterprise systems.",
  },
};

export default async function BlogArchivePage() {
  const result = await getPublicBlogs();
  const blogs = result.success ? result.data : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Verve Nova Engineering Blog",
    description:
      "Technical publications on SaaS architecture, AWS cloud migration, mobile app engineering, VAPT audits, and enterprise systems.",
    url: "https://vervenovatech.com/blog",
    publisher: {
      "@type": "Organization",
      name: "Verve Nova Technologies",
      url: "https://vervenovatech.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vervenovatech.com/verve-nova-logo.png",
      },
    },
    hasPart: blogs.map((blog: any) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: `https://vervenovatech.com/blog/${blog.slug}`,
      datePublished: blog.createdAt,
      author: {
        "@type": "Organization",
        name: blog.author || "Verve Nova Engineering Team",
      },
    })),
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-500/20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <section className="pt-36 pb-20 px-6 relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/[0.05] blur-[140px] rounded-full pointer-events-none" />
        
        <BlogArchiveClient initialBlogs={blogs} />
      </section>

      <Footer />
    </main>
  );
}
