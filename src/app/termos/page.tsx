import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos e condições de uso do site SetupBrasil.',
}

export default function TermosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-14">
        <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white mb-3">TERMOS DE USO</h1>
        <p className="text-sm text-gray-500 font-space mb-10">Última atualização: 21 de junho de 2026</p>

        <div className="post-content">
          <p>
            Estes Termos de Uso regulam o acesso e a utilização do site setupbrasil.com. Ao acessar ou usar o
            site, você concorda com os termos descritos abaixo. Se não concordar, recomendamos que não utilize
            o site.
          </p>

          <h2>1. Sobre o serviço</h2>
          <p>
            O SetupBrasil é um site de conteúdo editorial independente focado em reviews, comparativos e
            recomendações de produtos de tecnologia e setup, com foco em custo-benefício. O conteúdo é de
            natureza informativa e não constitui consultoria técnica individualizada, nem garantia de
            resultado para qualquer compra realizada com base nele.
          </p>

          <h2>2. Divulgação de links de afiliados</h2>
          <p>
            O SetupBrasil participa de programas de afiliados do Mercado Livre e da Amazon. Isso significa
            que, ao clicar em determinados links e efetuar uma compra, podemos receber uma comissão da loja
            parceira, sem qualquer custo adicional para você. Essa relação comercial não influencia nossas
            avaliações: produtos com pontos negativos relevantes são apresentados como tal, independentemente
            de gerarem ou não comissão.
          </p>

          <h2>3. Uso permitido do site</h2>
          <p>Você pode acessar e utilizar o site para fins pessoais e não comerciais. É proibido:</p>
          <ul>
            <li>Copiar, reproduzir ou redistribuir o conteúdo do site sem autorização prévia por escrito;</li>
            <li>Utilizar o site para fins ilegais ou que violem direitos de terceiros;</li>
            <li>Tentar acessar áreas restritas do site (como o painel administrativo) sem autorização;</li>
            <li>Utilizar robôs, scrapers ou qualquer mecanismo automatizado para extrair conteúdo do site em larga escala sem autorização.</li>
          </ul>

          <h2>4. Propriedade intelectual</h2>
          <p>
            Todo o conteúdo original publicado no SetupBrasil — textos, comparativos, identidade visual e
            marca — é de propriedade do SetupBrasil, salvo quando indicado de outra forma. Marcas, logotipos
            e imagens de produtos de terceiros mencionados no site pertencem aos seus respectivos donos e são
            utilizados apenas para fins informativos e ilustrativos.
          </p>

          <h2>5. Isenção de responsabilidade sobre produtos e preços</h2>
          <p>
            As informações de preço, disponibilidade e especificações técnicas mencionadas nos posts são
            válidas na data de publicação ou atualização do conteúdo e podem ser alteradas pelas lojas e
            fabricantes sem aviso prévio. Recomendamos sempre confirmar preço, especificações e condições
            diretamente na página do produto antes de finalizar uma compra.
          </p>
          <p>
            O SetupBrasil não vende produtos diretamente, não processa pagamentos e não é parte na relação de
            compra e venda entre você e a loja onde a compra é realizada. Questões relacionadas a entrega,
            garantia, troca ou defeito de produto devem ser tratadas diretamente com a loja vendedora e/ou o
            fabricante.
          </p>

          <h2>6. Limitação de responsabilidade</h2>
          <p>
            O SetupBrasil se esforça para manter as informações do site precisas e atualizadas, mas não
            garante que o conteúdo esteja livre de erros. Na máxima extensão permitida pela lei, não nos
            responsabilizamos por danos diretos ou indiretos decorrentes do uso das informações publicadas ou
            de decisões de compra tomadas com base nelas.
          </p>

          <h2>7. Links para sites de terceiros</h2>
          <p>
            O site contém links para lojas e plataformas de terceiros (como Mercado Livre e Amazon). Não
            temos controle sobre o conteúdo, políticas ou práticas desses sites e não nos responsabilizamos
            por eles.
          </p>

          <h2>8. Privacidade</h2>
          <p>
            O tratamento de dados pessoais realizado através deste site é descrito em detalhes na nossa{' '}
            <a href="/privacidade">Política de Privacidade</a>, que é parte integrante destes Termos de Uso.
          </p>

          <h2>9. Alterações nestes termos</h2>
          <p>
            Estes Termos de Uso podem ser atualizados periodicamente. A data da última atualização está
            sempre indicada no topo desta página. O uso continuado do site após uma atualização representa
            aceitação dos novos termos.
          </p>

          <h2>10. Lei aplicável e foro</h2>
          <p>
            Estes Termos de Uso são regidos pelas leis brasileiras, incluindo o Código de Defesa do
            Consumidor (Lei nº 8.078/1990) e a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). Eventuais
            disputas serão submetidas ao foro do domicílio do consumidor, conforme previsto no CDC.
          </p>

          <h2>11. Contato</h2>
          <p>
            Para dúvidas sobre estes Termos de Uso, entre em contato através da nossa página de{' '}
            <a href="/contato">Contato</a>.
          </p>

          <blockquote>
            Este documento foi elaborado como um modelo de boa-fé para um blog de conteúdo e afiliados. Não
            substitui orientação jurídica especializada — recomendamos revisão por um advogado à medida que o
            negócio crescer.
          </blockquote>
        </div>
      </main>
      <Footer />
    </>
  )
}
