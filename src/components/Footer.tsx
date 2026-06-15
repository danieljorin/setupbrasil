import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#ff5722' }}>
              <span className="text-white text-xs font-bold">SB</span>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">SetupBrasil</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Reviews e guias de setup gamer e produtividade.{' '}
            <span className="block md:inline">Alguns links são de afiliados — sem custo extra pra você.</span>
          </p>
          <Link
            href="/admin"
            className="text-xs text-gray-400 dark:text-gray-600 hover:text-brand transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
