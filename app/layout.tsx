import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getCategories } from '@/lib/cosmic'
import Navigation from '@/components/Navigation'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fortnite Gaming Hub - Latest News, Guides & Tournaments',
  description: 'Your ultimate destination for Fortnite news, battle royale guides, creative mode content, and esports tournament coverage.',
  keywords: 'Fortnite, Battle Royale, Gaming, Esports, Tournaments, Guides, News',
  authors: [{ name: 'Fortnite Gaming Hub' }],
  creator: 'Fortnite Gaming Hub',
  publisher: 'Fortnite Gaming Hub',
  openGraph: {
    title: 'Fortnite Gaming Hub',
    description: 'Your ultimate destination for Fortnite news, guides, and tournaments',
    url: 'https://fortnite-hub.vercel.app',
    siteName: 'Fortnite Gaming Hub',
    images: [
      {
        url: 'https://imgix.cosmicjs.com/88ab7900-a045-11ed-81f2-f50e185dd248-78A265wPiO4.jpg?w=1200&h=630&fit=crop&auto=format,compress',
        width: 1200,
        height: 630,
        alt: 'Fortnite Gaming Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fortnite Gaming Hub',
    description: 'Your ultimate destination for Fortnite news, guides, and tournaments',
    images: ['https://imgix.cosmicjs.com/88ab7900-a045-11ed-81f2-f50e185dd248-78A265wPiO4.jpg?w=1200&h=630&fit=crop&auto=format,compress'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories()
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        {/* Console capture script for dashboard debugging */}
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-background">
          <Navigation categories={categories} />
          <main className="flex-1">
            {children}
          </main>
          <CosmicBadge bucketSlug={bucketSlug} />
        </div>
      </body>
    </html>
  )
}