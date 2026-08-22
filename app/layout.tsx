import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Lato, Playfair_Display } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
})

export const metadata: Metadata = {
  title: 'Flek die Friseure – Friseursalon in Riederich',
  description:
    'Flek die Friseure – Ihr Friseursalon in Riederich. Haarschnitte, Färbungen, Styling und mehr. Robert-Bosch-Straße 17, 72585 Riederich.',
  generator: 'v0.app',
  keywords: ['Friseur', 'Riederich', 'Haarschnitt', 'Friseursal on', 'Flek'],
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#8B5E3C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${lato.variable} ${playfair.variable} bg-background`} data-scroll-behavior="smooth">
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
