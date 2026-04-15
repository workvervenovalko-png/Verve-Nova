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
