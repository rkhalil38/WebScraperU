import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebScraperU | Web Scrape for Free',
  description: 'A personalized WebScraper that allows anyone to look for specific words or phrases on any website.',
  keywords: ['Web Scraper', 'Word Finder', 'Sentence Finder', 'Web Scraper U', 'WebScraperU', 'scrape web', 'WebScraperU.com', 'web scrape'],
  authors: [{name: 'Romulus Khalil'}],
  creator: 'Romulus Khalil',
  openGraph: {
    title: 'WebScraperU | Web Scrape for Free',
    description: 'A personalized WebScraper that allows anyone to look for specific words or phrases on any website.',
    url: 'https://www.webscraperu.com',
    type: 'website',
    siteName: 'WebScraperU',
    images: '/opengraph-image.png',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Analytics />
    </html>
  )
}
