import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'SetupBrasil — Seu guia definitivo de setup', template: '%s | SetupBrasil' },
  description: 'Reviews honestos, comparativos e dicas para montar o setup perfeito. Monitores, teclados, cadeiras, headsets e muito mais.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
        }} />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
