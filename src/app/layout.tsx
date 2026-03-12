import type { Metadata } from 'next'
import { Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Brady Architecture — Contemporary Design, Florida',
  description:
    'Dustin Brady designs singular residences, luxury condominiums, and architectural developments in Florida where structure, light, and landscape converge.',
  keywords: [
    'architect Florida',
    'luxury residential architecture',
    'Miami architect',
    'contemporary architecture',
    'high-end design',
  ],
  openGraph: {
    title: 'Brady Architecture',
    description: 'Space as intention. Contemporary architecture in Florida.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body>{children}</body>
    </html>
  )
}
