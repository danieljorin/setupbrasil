import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SetupBrasil — Reviews honestos pro seu setup tech',
  description:
    'Reviews, comparativos e guias dos melhores periféricos, monitores, cadeiras e acessórios pro seu setup. Análises honestas em português.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('theme');
                if (saved) document.documentElement.setAttribute('data-theme', saved);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
