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
    <footer className="relative border-t border-cyber-border bg-cyber-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-12">

          {/* Marca */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/brand/logo-mark.png" alt="SetupBrasil" className="w-11 h-11" />
              <span className="font-orbitron font-black text-base text-white">SETUP BRASIL</span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 max-w-[220px] font-space">
              Reviews honestos e comparativos de custo-benefício pra você montar um setup bom sem gastar mal.
            </p>
            <div className="flex gap-2 mt-5">
              <a href="https://instagram.com/setupbrasil" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-md border border-cyber-border flex items-center justify-center text-sm hover:border-cyber-cyan hover:text-cyber-cyan transition">
                📸
              </a>
              <a href="https://youtube.com/@setupbrasil" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-md border border-cyber-border flex items-center justify-center text-sm hover:border-cyber-cyan hover:text-cyber-cyan transition">
                ▶️
              </a>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white mb-4 uppercase tracking-widest">Categorias</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categoria/${cat.slug}`} className="text-xs text-gray-500 hover:text-cyber-cyan transition font-space">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white mb-4 uppercase tracking-widest">Institucional</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre Nós', href: '/sobre' },
                { label: 'Contato', href: '/contato' },
                { label: 'Política de Privacidade', href: '/privacidade' },
                { label: 'Termos de Uso', href: '/termos' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-xs text-gray-500 hover:text-cyber-cyan transition font-space">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter mini */}
          <div>
            <h4 className="font-orbitron text-xs font-bold text-white mb-4 uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-4 font-space">Receba os melhores achados toda semana.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 min-w-0 bg-cyber-dark border border-cyber-border focus:border-cyber-cyan outline-none rounded-md px-3 py-2 text-xs text-gray-200 placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-cyber-cyan hover:to-petroleum-500 hover:text-cyber-dark text-white font-orbitron text-xs font-bold transition"
              >
                →
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-cyber-border pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-gray-600 font-space">
            © {new Date().getFullYear()} SetupBrasil. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-gray-600 font-space">
            Alguns links são de afiliados — sem custo extra pra você.
          </p>
        </div>
      </div>
    </footer>
  )
}
