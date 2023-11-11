import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebScraperU',
  description: 'A personalized WebScraper that allows anyone to look for specific words or phrases on any website.',
  keywords: ['Web Scraper', 'Word Finder', 'Sentence Finder', 'Web Scraper U', 'WebScraperU', 'scrape web', 'WebScraperU.com', 'web scrape'],
  authors: [{name: 'Romulus Khalil'}],
  creator: 'Romulus Khalil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
