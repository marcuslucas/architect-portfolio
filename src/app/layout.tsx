import type { Metadata } from 'next'
import { Archivo, Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-archivo',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
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
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  )
}
