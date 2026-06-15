'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

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
    <header style={{ borderBottom: '1px solid #e5e7eb' }} className="sticky top-0 z-50 bg-white dark:bg-gray-950 dark:border-gray-800">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: '#ff5722', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: 14 }}>SB</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: 'inherit' }}>SetupBrasil</span>
          </Link>

          {/* Nav desktop */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categoria/${cat.slug}`}
                style={{ padding: '6px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: 'inherit', textDecoration: 'none', transition: 'background 0.15s' }}
                className="hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950 dark:hover:text-orange-400"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Ações */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggleTheme} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e5e7eb', background: 'transparent', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="dark:border-gray-700">
              {dark ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e5e7eb', background: 'transparent', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="md:hidden dark:border-gray-700">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div style={{ borderTop: '1px solid #e5e7eb', padding: '8px 0' }} className="md:hidden bg-white dark:bg-gray-950 dark:border-gray-800">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categoria/${cat.slug}`} onClick={() => setMenuOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', fontSize: 15, fontWeight: 500, color: 'inherit', textDecoration: 'none' }}
              className="hover:bg-gray-50 dark:hover:bg-gray-900">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
