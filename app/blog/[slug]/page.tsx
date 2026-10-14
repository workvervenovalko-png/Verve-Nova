import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getBlogBySlug } from "@/app/actions/admin";
import { BlogContentRenderer } from "./BlogContentRenderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result.success || !result.data) {
    return {
      title: "Article Not Found | Verve Nova Technologies",
      description: "The requested engineering article could not be found.",
    };
  }

  const post = result.data;
  const baseUrl = "https://vervenovatech.com";
  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.seoKeywords || [
      "software engineering",
      "cloud architecture",
      "verve nova technologies",
      "saas development",
    ],
    authors: [{ name: post.author || "Verve Nova Engineering Team" }],
    creator: "Verve Nova Technologies",
    publisher: "Verve Nova Technologies",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: canonicalUrl,
      siteName: "Verve Nova Technologies",
      locale: "en_US",
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt || post.createdAt,
      authors: [post.author || "Verve Nova Engineering Team"],
      tags: post.tags || [],
      images: [
        {
          url: post.coverImage || `${baseUrl}/vnt-logo.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.coverImage || `${baseUrl}/vnt-logo.png`],
      creator: "@vervenovatech",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogReaderPage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getBlogBySlug(slug);

  if (!result.success || !result.data) {
    notFound();
  }

  const post = result.data;

  // Schema.org Structured Data (JSON-LD) for Google Rich Results
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || "https://vervenovatech.com/vnt-logo.png",
    author: {
      "@type": "Organization",
      name: post.author || "Verve Nova Engineering Team",
      url: "https://vervenovatech.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Verve Nova Technologies",
      logo: {
        "@type": "ImageObject",
        url: "https://vervenovatech.com/vnt-logo.png",
      },
    },
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vervenovatech.com/blog/${post.slug}`,
    },
    keywords: post.seoKeywords?.join(", ") || "",
  };

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-500/20">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      <BlogContentRenderer post={post} />
      <Footer />
    </main>
  );
}
