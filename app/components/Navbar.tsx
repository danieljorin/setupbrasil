'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    setTheme(saved);
  }, []);

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="logo">
          <div className="logo-mark">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="36" height="22" rx="3" fill="white" />
              <rect x="20" y="32" width="8" height="6" fill="white" />
              <rect x="14" y="38" width="20" height="3" rx="1.5" fill="white" />
            </svg>
          </div>
          <div className="logo-text">
            <span>SetupBrasil</span>
            <span className="small">REVIEWS &amp; GUIAS</span>
          </div>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/categorias">Categorias</Link></li>
          <li><Link href="/sobre">Sobre</Link></li>
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} title="Trocar tema" suppressHydrationWarning>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <Link href="/login" className="login-btn">Entrar</Link>
        </div>
      </div>
    </nav>
  );
}
