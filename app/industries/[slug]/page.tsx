import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IntelligenceBriefTemplate } from "@/components/intelligence-brief";
import { industriesData } from "@/lib/industries-data";

interface IndustryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for better performance (SSG)
export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData[slug];

  if (!industry) {
    return {
      title: "Industry Not Found | Verve Nova Technologies",
    };
  }

  const canonicalUrl = `https://vervenovatech.com/industries/${slug}`;

  return {
    title: `${industry.title} Enterprise Solutions & Architecture | Verve Nova`,
    description: industry.overview.length > 160 ? `${industry.overview.slice(0, 157)}...` : industry.overview,
    keywords: [
      industry.title,
      `${industry.title} software solutions`,
      ...industry.capabilities,
      "enterprise digital transformation",
      "Verve Nova Technologies",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${industry.title} Enterprise Solutions | Verve Nova Technologies`,
      description: industry.subtitle,
      url: canonicalUrl,
      siteName: "Verve Nova Technologies",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${industry.title} - Verve Nova Technologies`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.title} Enterprise Solutions | Verve Nova Technologies`,
      description: industry.subtitle,
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = industriesData[slug];

  if (!industry) {
    notFound();
  }

  return (
    <IntelligenceBriefTemplate
      title={industry.title}
      subtitle={industry.subtitle}
      overview={industry.overview}
      deliverables={industry.deliverables}
      capabilities={industry.capabilities}
      ctaText={industry.ctaText}
    />
  );
}
