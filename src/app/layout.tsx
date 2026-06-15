import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'SetupBrasil', template: '%s | SetupBrasil' },
  description: 'Reviews e guias de setup gamer e produtividade',
  openGraph: {
    siteName: 'SetupBrasil',
    type: 'website',
  },
}

const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var t = localStorage.getItem('theme');
            if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            }
          } catch(e) {}
        })();
      `,
    }}
  />
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
