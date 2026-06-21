'use client'
import Link from 'next/link'
import { useState } from 'react'

const categories = [
  { name: 'Monitores', slug: 'monitores', icon: '🖥️' },
  { name: 'Teclados', slug: 'teclados', icon: '⌨️' },
  { name: 'Mouses', slug: 'mouses', icon: '🖱️' },
  { name: 'Cadeiras', slug: 'cadeiras', icon: '🪑' },
  { name: 'Headsets', slug: 'headsets', icon: '🎧' },
  { name: 'Notebooks', slug: 'notebooks', icon: '💻' },
  { name: 'Acessórios', slug: 'acessorios', icon: '🔌' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-border glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/brand/logo-mark.png"
            alt="SetupBrasil"
            className="w-12 h-12 transition-transform duration-300 group-hover:scale-105"
          />
          <div>
            <span className="font-orbitron font-black text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-petroleum-400">
              SETUP <span className="text-cyber-cyan">BRASIL</span>
            </span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-petroleum-400 font-orbitron font-semibold">
              Setup bom, sem gastar mal
            </span>
          </div>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 font-orbitron text-[11px] lg:text-xs">
          <Link href="/" className="px-3 py-2 text-cyber-cyan border-b-2 border-cyber-cyan transition duration-200">
            HOME
          </Link>
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="px-3 py-2 text-gray-300 hover:text-cyber-cyan border-b-2 border-transparent hover:border-petroleum-500/50 transition duration-200"
            >
              {cat.name.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Botão menu mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-cyber-cyan border border-cyber-border"
          aria-label="Abrir menu"
        >
          <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-cyber-border bg-cyber-dark/95 backdrop-blur-xl px-4 py-4 space-y-1 font-orbitron text-sm">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-cyber-cyan bg-petroleum-950/60 rounded-md">
            HOME
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-cyber-cyan hover:bg-petroleum-950/30 rounded-md"
            >
              <span>{cat.icon}</span>
              <span>{cat.name.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
