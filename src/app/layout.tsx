import type { Metadata } from 'next'
import './globals.css'
import PcbBackground from '@/components/PcbBackground'

export const metadata: Metadata = {
  title: { default: 'SetupBrasil — Setup bom, sem gastar mal', template: '%s | SetupBrasil' },
  description: 'Reviews honestos e comparativos de custo-benefício. Monitores, teclados, cadeiras, headsets e muito mais — sem precisar gastar uma fortuna.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col relative text-gray-100">
        <PcbBackground />
        <div className="fixed top-0 left-0 w-full h-full -z-20 bg-gradient-to-t from-cyber-dark via-transparent to-cyber-dark/80 pointer-events-none" />
        {children}
      </body>
    </html>
  )
}
