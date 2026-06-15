import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center">
          <div className="text-8xl font-black text-gray-100 dark:text-gray-800 mb-4">404</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Página não encontrada</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">O link pode estar errado ou o conteúdo foi removido.</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#ff5722' }}
          >
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
