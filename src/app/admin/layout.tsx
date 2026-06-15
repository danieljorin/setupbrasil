import Link from 'next/link'
import { logout } from '@/actions'

const navItems = [
  { href: '/admin', label: '📊 Dashboard', exact: true },
  { href: '/admin/posts', label: '📝 Posts' },
  { href: '/admin/categorias', label: '🏷️ Categorias' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Top bar */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#ff5722' }}>
                <span className="text-white text-xs font-bold">SB</span>
              </div>
              <span className="font-bold text-gray-900 dark:text-white hidden sm:block">SetupBrasil</span>
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {children}
      </main>
    </div>
  )
}
