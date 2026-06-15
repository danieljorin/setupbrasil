import Link from 'next/link'

const categories = [
  { name: 'Monitores', slug: 'monitores' },
  { name: 'Teclados', slug: 'teclados' },
  { name: 'Mouses', slug: 'mouses' },
  { name: 'Cadeiras', slug: 'cadeiras' },
  { name: 'Headsets', slug: 'headsets' },
  { name: 'Notebooks', slug: 'notebooks' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 16px 32px' }}>

        {/* Grid principal */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Coluna 1 — Marca */}
          <div>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ff5722', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>SB</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 17, color: 'white' }}>SetupBrasil</span>
            </Link>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: '#64748b', maxWidth: 220 }}>
              O seu guia definitivo para montar o setup perfeito. Reviews honestos, comparativos e dicas para gamers e profissionais.
            </p>
            {/* Redes sociais */}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <a href="https://instagram.com/setupbrasil" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 16, transition: 'background 0.2s' }}
                className="hover:bg-orange-500">
                📸
              </a>
              <a href="https://youtube.com/@setupbrasil" target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 16, transition: 'background 0.2s' }}
                className="hover:bg-orange-500">
                ▶️
              </a>
            </div>
          </div>

          {/* Coluna 2 — Categorias */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categorias</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }} className="hover:text-orange-400">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Institucional */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Institucional</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Sobre Nós', href: '/sobre' },
                { label: 'Contato', href: '/contato' },
                { label: 'Política de Privacidade', href: '/privacidade' },
                { label: 'Termos de Uso', href: '/termos' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} style={{ fontSize: 13, color: '#64748b', textDecoration: 'none', transition: 'color 0.15s' }} className="hover:text-orange-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Newsletter mini */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: 14, marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Newsletter</h4>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, marginBottom: 14 }}>Receba os melhores conteúdos toda semana.</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" placeholder="seu@email.com"
                style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #1e293b', background: '#1e293b', color: 'white', fontSize: 13, outline: 'none', minWidth: 0 }} />
              <button style={{ padding: '9px 14px', borderRadius: 8, background: '#ff5722', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'opacity 0.2s' }} className="hover:opacity-90">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Rodapé base */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#475569' }}>
            © {new Date().getFullYear()} SetupBrasil. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: 12, color: '#475569' }}>
            Alguns links são de afiliados — sem custo extra pra você.
          </p>
          <span style={{ fontSize: 12, color: '#1e293b' }}>© {new Date().getFullYear()} SetupBrasil</span>
        </div>
      </div>
    </footer>
  )
}
