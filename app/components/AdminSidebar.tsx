'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  async function handleLogout() {
    if (!confirm('Sair do painel?')) return;
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/posts', label: 'Posts', icon: '📝' },
    { href: '/admin/posts/novo', label: 'Novo Post', icon: '✨' },
  ];

  return (
    <aside className="admin-sidebar">
      <Link href="/" className="sb-logo">
        <div className="sb-mark">
          <svg viewBox="0 0 48 48" fill="none">
            <rect x="6" y="10" width="36" height="22" rx="3" fill="white" />
            <rect x="20" y="32" width="8" height="6" fill="white" />
            <rect x="14" y="38" width="20" height="3" rx="1.5" fill="white" />
          </svg>
        </div>
        <div>
          <div className="sb-name">SetupBrasil</div>
          <div className="sb-tag">PAINEL ADMIN</div>
        </div>
      </Link>

      <nav className="sb-nav">
        <div className="sb-section-label">Geral</div>
        {links.map((link) => {
          const active =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`sb-link ${active ? 'active' : ''}`}
            >
              <span className="sb-icon">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sb-footer">
        <div className="sb-user">
          <div className="sb-avatar">{(email[0] || 'A').toUpperCase()}</div>
          <div className="sb-user-info">
            <div className="sb-user-name">Admin</div>
            <div className="sb-user-email">{email}</div>
          </div>
        </div>
        <button className="sb-logout" onClick={handleLogout}>
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}
