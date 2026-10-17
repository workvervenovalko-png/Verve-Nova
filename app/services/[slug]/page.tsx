import { Metadata } from "next";
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

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    return {
      title: "Service Not Found | Verve Nova Technologies",
    };
  }

  const canonicalUrl = `https://vervenovatech.com/services/${slug}`;

  return {
    title: `${service.title} | Enterprise Software & Cloud Solutions`,
    description: service.overview.length > 160 ? `${service.overview.slice(0, 157)}...` : service.overview,
    keywords: [
      service.title,
      `${service.title} services`,
      ...service.capabilities,
      "enterprise engineering",
      "Verve Nova Technologies",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} | Verve Nova Technologies`,
      description: service.subtitle,
      url: canonicalUrl,
      siteName: "Verve Nova Technologies",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${service.title} - Verve Nova Technologies`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | Verve Nova Technologies`,
      description: service.subtitle,
    },
  };
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
