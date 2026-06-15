import { login } from '@/actions'

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: '#ff5722' }}>
            <span className="text-white font-bold text-lg">SB</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SetupBrasil Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Entre com sua conta</p>
        </div>

        <form action={login} className="space-y-4">
          {searchParams?.error && (
            <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3 text-sm text-red-700 dark:text-red-400">
              {searchParams.error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#ff5722' } as React.CSSProperties}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#ff5722' } as React.CSSProperties}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#ff5722' }}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
