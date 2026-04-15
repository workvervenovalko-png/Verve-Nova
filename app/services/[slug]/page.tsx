import { notFound } from "next/navigation";
import { ServiceTemplate } from "@/components/service-template";
import { servicesData } from "@/lib/services-data";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for better performance (SSG)
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  return (
    <ServiceTemplate
      title={service.title}
      subtitle={service.subtitle}
      overview={service.overview}
      deliverables={service.deliverables}
      capabilities={service.capabilities}
      ctaText={service.ctaText}
      deliverableLabel={service.deliverableLabel}
    />
  );
}
