'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const categories = [
  { name: 'Monitores', slug: 'monitores' },
  { name: 'Teclados', slug: 'teclados' },
  { name: 'Mouses', slug: 'mouses' },
  { name: 'Cadeiras', slug: 'cadeiras' },
  { name: 'Headsets', slug: 'headsets' },
  { name: 'Notebooks', slug: 'notebooks' },
]

export default function Header() {
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    setDark(isDark)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Linha principal */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#ff5722' }}>
              <span className="text-white text-sm font-bold">SB</span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">SetupBrasil</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Alternar tema"
            >
              {dark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Nav categorias — desktop */}
        <nav className="hidden md:flex items-center gap-1 pb-2 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              className="px-3 py-1.5 text-sm rounded-full text-gray-600 dark:text-gray-400 hover:text-brand hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categoria/${cat.slug}`}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
