import type { Metadata } from 'next'
import { Orbitron, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteContent } from '@/lib/site-content'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap',
});

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
  icons: {
    icon: '/devrows.ico',
    shortcut: '/devrows.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CL" className={`${orbitron.variable} ${spaceMono.variable}`}>
      <body className="font-mono antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
