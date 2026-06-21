import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Quem está por trás do SetupBrasil e por que esse site existe.',
}

export default function SobrePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-14">
        <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white mb-8">SOBRE NÓS</h1>

        <div className="post-content">
          <p>
            O SetupBrasil nasceu de uma frustração simples: virou rotina abrir o Mercado Livre pra comprar
            um teclado ou um monitor e cair em quinze anúncios prometendo ser &quot;o melhor do mercado&quot;,
            sem nenhum deles dizer de verdade o que vem na caixa, o que costuma quebrar primeiro, ou se o
            preço bate com o que o produto realmente entrega.
          </p>
          <p>
            Então decidimos fazer esse trabalho manualmente: ler a ficha técnica até o fim (não só o resumo
            bonito do anúncio), conferir reclamações de quem já comprou, comparar preço com o que produtos
            parecidos oferecem, e escrever o que a gente diria pra um amigo que perguntasse &quot;vale a
            pena?&quot;. Às vezes a resposta é sim. Às vezes é &quot;sim, mas só se...&quot;. E às vezes é
            não — mesmo quando isso significa abrir mão de uma comissão.
          </p>
          <h2>Como o site se sustenta</h2>
          <p>
            Usamos links de afiliados do Mercado Livre e da Amazon. Quando você compra um produto através de
            um desses links, a loja paga uma pequena comissão pra gente — sem nenhum custo extra pra você. É
            assim que mantemos o site no ar e continuamos produzindo conteúdo. Mas essa comissão nunca decide
            o que escrevemos: um produto ruim continua sendo chamado de ruim aqui, com ou sem comissão
            envolvida.
          </p>
          <h2>O que você vai encontrar aqui</h2>
          <p>
            Reviews de monitores, teclados, mouses, cadeiras, headsets e outros itens de setup, sempre com
            foco em custo-benefício real — não em quem paga mais pela divulgação. Quando um produto tiver
            ressalvas importantes (base frágil, calibração de fábrica ruim, suporte lento da marca), você vai
            ler isso aqui antes de comprar, não depois.
          </p>
          <p>
            Se você quer montar um setup decente sem se sentir enganado no processo, é exatamente pra isso
            que esse site existe.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
