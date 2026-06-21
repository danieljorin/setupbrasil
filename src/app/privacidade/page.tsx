import Header from '@/components/Header'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o SetupBrasil coleta, usa e protege seus dados pessoais, em conformidade com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-14">
        <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white mb-3">POLÍTICA DE PRIVACIDADE</h1>
        <p className="text-sm text-gray-500 font-space mb-10">Última atualização: 21 de junho de 2026</p>

        <div className="post-content">
          <p>
            Esta Política de Privacidade explica como o SetupBrasil (&quot;nós&quot;) coleta, usa, armazena e
            protege os dados pessoais de quem visita ou utiliza o site setupbrasil.com (&quot;você&quot;), em
            conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>1. Quem é o controlador dos dados</h2>
          <p>
            O SetupBrasil é o controlador dos dados pessoais tratados através deste site, nos termos do art.
            5º, VI da LGPD. Para qualquer dúvida ou solicitação relacionada aos seus dados, use os canais
            indicados na seção 9 desta política.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>Coletamos os seguintes tipos de dados:</p>
          <ul>
            <li>
              <strong>Dados de navegação:</strong> endereço IP, tipo de dispositivo, navegador, páginas
              visitadas, tempo de permanência e origem do acesso, coletados automaticamente através de
              cookies e ferramentas de análise (como Google Analytics).
            </li>
            <li>
              <strong>Dados fornecidos voluntariamente:</strong> endereço de e-mail, quando você se inscreve
              na nossa newsletter.
            </li>
            <li>
              <strong>Dados de cliques em links de afiliados:</strong> quando você clica em um link do
              Mercado Livre ou da Amazon a partir do nosso site, essas plataformas podem registrar que o
              clique veio do SetupBrasil para fins de comissionamento. Não temos acesso a dados da sua compra
              em si — apenas as próprias lojas têm essa informação.
            </li>
          </ul>

          <h2>3. Para que usamos seus dados</h2>
          <p>Os dados coletados são utilizados para as seguintes finalidades, com a base legal correspondente prevista no art. 7º da LGPD:</p>
          <ul>
            <li><strong>Melhorar o conteúdo e a experiência do site</strong> — com base no legítimo interesse (art. 7º, IX).</li>
            <li><strong>Enviar a newsletter, quando você se inscreve voluntariamente</strong> — com base no seu consentimento (art. 7º, I), que pode ser revogado a qualquer momento.</li>
            <li><strong>Gerar métricas de audiência e desempenho de conteúdo</strong> — com base no legítimo interesse (art. 7º, IX).</li>
            <li><strong>Cumprir obrigações legais ou regulatórias</strong>, quando aplicável — com base no art. 7º, II.</li>
          </ul>

          <h2>4. Cookies</h2>
          <p>Utilizamos os seguintes tipos de cookies:</p>
          <ul>
            <li><strong>Cookies necessários:</strong> essenciais para o funcionamento básico do site.</li>
            <li><strong>Cookies de análise:</strong> usados por ferramentas como o Google Analytics para entender como o site é usado, de forma agregada e anonimizada sempre que possível.</li>
            <li><strong>Cookies de afiliados:</strong> usados pelo Mercado Livre e pela Amazon para identificar que uma compra teve origem em um link do SetupBrasil.</li>
          </ul>
          <p>
            Você pode bloquear ou apagar cookies diretamente nas configurações do seu navegador. Isso pode
            limitar algumas funcionalidades do site, mas não impede o seu acesso ao conteúdo.
          </p>

          <h2>5. Compartilhamento de dados com terceiros</h2>
          <p>Não vendemos seus dados pessoais. Compartilhamos dados de forma limitada com:</p>
          <ul>
            <li><strong>Google Analytics</strong>, para análise de tráfego e audiência.</li>
            <li><strong>Mercado Livre e Amazon</strong>, através do programa de afiliados, exclusivamente para fins de identificação de origem de cliques e comissionamento.</li>
            <li><strong>Provedores de e-mail marketing</strong>, exclusivamente para envio da newsletter a quem se inscreveu.</li>
          </ul>
          <p>Esses terceiros possuem suas próprias políticas de privacidade, que recomendamos consultar.</p>

          <h2>6. Por quanto tempo guardamos seus dados</h2>
          <p>
            Dados de navegação são mantidos pelo prazo padrão das ferramentas de análise utilizadas
            (tipicamente até 26 meses no caso do Google Analytics). E-mails de newsletter são mantidos até
            que você solicite a remoção ou cancele a inscrição.
          </p>

          <h2>7. Segurança dos dados</h2>
          <p>
            Adotamos medidas técnicas e administrativas razoáveis para proteger os dados pessoais sob nossa
            responsabilidade contra acessos não autorizados e situações acidentais ou ilícitas de destruição,
            perda, alteração, comunicação ou difusão.
          </p>

          <h2>8. Seus direitos como titular de dados</h2>
          <p>Nos termos do art. 18 da LGPD, você tem direito a:</p>
          <ul>
            <li>Confirmar a existência de tratamento dos seus dados;</li>
            <li>Acessar os dados que temos sobre você;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
            <li>Solicitar a portabilidade dos dados a outro fornecedor;</li>
            <li>Solicitar a eliminação dos dados tratados com base no seu consentimento;</li>
            <li>Obter informação sobre com quem compartilhamos seus dados;</li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>Se opor a um tratamento realizado com base em outra hipótese legal, caso identifique descumprimento da LGPD.</li>
          </ul>
          <p>Para exercer qualquer um desses direitos, use o canal de contato indicado na seção 9.</p>

          <h2>9. Como entrar em contato</h2>
          <p>
            Para dúvidas, solicitações ou reclamações relacionadas a esta política ou ao tratamento dos seus
            dados pessoais, entre em contato através da nossa página de{' '}
            <a href="/contato">Contato</a>.
          </p>

          <h2>10. Menores de idade</h2>
          <p>
            O SetupBrasil não é direcionado a menores de 18 anos e não coleta intencionalmente dados pessoais
            de crianças ou adolescentes.
          </p>

          <h2>11. Alterações nesta política</h2>
          <p>
            Esta política pode ser atualizada periodicamente para refletir mudanças nas nossas práticas ou na
            legislação aplicável. A data da última atualização está sempre indicada no topo desta página.
          </p>

          <blockquote>
            Este documento foi elaborado como um modelo de boa-fé alinhado às exigências da LGPD para um
            blog de conteúdo e afiliados. Não substitui orientação jurídica especializada — recomendamos
            revisão por um advogado à medida que o negócio crescer ou novas formas de tratamento de dados
            forem adotadas.
          </blockquote>
        </div>
      </main>
      <Footer />
    </>
  )
}
