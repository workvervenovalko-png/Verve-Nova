import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/maintenance'],
    },
    sitemap: 'https://vervenovatech.com/sitemap.xml',
  }
}
