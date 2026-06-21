import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Fale com o SetupBrasil.',
}

export default function ContatoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-14">
        <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white mb-8">CONTATO</h1>
        <div className="post-content">
          <p>Em breve você vai poder falar com a gente diretamente por aqui.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
