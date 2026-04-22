import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use your actual standard routing here
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/careers',
    '/blog',
    '/contact',
    '/products',
    '/industries',
    '/ai-automation',
    '/cybersecurity',
    '/cloud-infrastructure',
    '/digital-experience',
    '/enterprise-solutions',
    '/software-engineering',
    '/testimonials',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `https://vervenovatech.com${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  })) as MetadataRoute.Sitemap
}
