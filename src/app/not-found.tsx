import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center">
          <div className="font-orbitron text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-petroleum-700 to-cyber-cyan/30 mb-4">
            404
          </div>
          <h1 className="font-orbitron text-xl font-bold text-white mb-2">PÁGINA NÃO ENCONTRADA</h1>
          <p className="text-gray-500 font-space mb-8">O link pode estar errado ou o conteúdo foi removido.</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-md bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-cyber-cyan hover:to-petroleum-500 hover:text-cyber-dark text-white font-orbitron text-xs font-bold tracking-widest transition-all duration-300"
          >
            VOLTAR AO INÍCIO
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
