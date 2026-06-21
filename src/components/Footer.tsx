import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative border-t border-cyber-border bg-cyber-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10 mb-10">

          {/* Marca */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <img src="/brand/logo-mark.png" alt="SetupBrasil" className="w-11 h-11" />
              <span className="font-orbitron font-black text-base text-white">SETUP BRASIL</span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 max-w-[260px] font-space">
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
