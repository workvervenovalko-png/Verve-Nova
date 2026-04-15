import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Verve Nova Tech | Enterprise Technology & IT Solutions',
  description: 'Verve Nova Tech provides end-to-end technology solutions including software development, enterprise systems, AI, cloud infrastructure, and digital transformation at scale.',
  generator: 'v0.app',
}

import { Providers } from '@/components/providers'
import { SocialSidebar } from '@/components/social-sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} dark`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Providers>
          {children}
          <SocialSidebar />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
