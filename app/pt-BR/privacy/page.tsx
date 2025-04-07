import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-bold">Voltar para Início</span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-12 max-w-3xl">
          <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>

          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-lg text-gray-500 mb-8">Última atualização: 6 de abril de 2025</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Introdução</h2>
            <p>
              Na Pixel Studio, respeitamos sua privacidade e estamos comprometidos com a proteção dos seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações ao usar nosso editor de pixel art, seja online ou como aplicativo de desktop.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Informações que Coletamos</h2>
            <h3 className="text-xl font-medium mt-6 mb-3">Dados Pessoais</h3>
            <p>Coletamos informações pessoais mínimas. Ao utilizar nosso aplicativo:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Não exigimos que você crie uma conta</li>
              <li>Não coletamos seu nome, e-mail ou outras informações de contato, a menos que você as forneça voluntariamente para suporte</li>
              <li>Não rastreamos sua localização</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-3">Dados de Uso</h3>
            <p>Podemos coletar dados anônimos de uso para melhorar nosso aplicativo, incluindo:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Informações técnicas como tipo de navegador, sistema operacional e tipo de dispositivo</li>
              <li>Padrões de uso de funcionalidades (quais ferramentas são usadas com mais frequência)</li>
              <li>Relatórios de erro para nos ajudar a corrigir falhas</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Como Usamos Suas Informações</h2>
            <p>Utilizamos as informações coletadas para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fornecer, manter e melhorar nosso aplicativo</li>
              <li>Desenvolver novas funcionalidades com base no comportamento dos usuários</li>
              <li>Corrigir bugs e resolver problemas técnicos</li>
              <li>Analisar padrões de uso para otimizar a experiência do usuário</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Armazenamento e Segurança dos Dados</h2>
            <p>Para a versão online do Pixel Studio:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Suas criações em pixel art são armazenadas localmente no armazenamento do seu navegador</li>
              <li>Não armazenamos sua arte em nossos servidores, a menos que você utilize explicitamente um recurso de compartilhamento ou salvamento na nuvem</li>
              <li>Todos os dados transmitidos entre seu dispositivo e nossos servidores são criptografados com protocolos SSL/TLS padrão da indústria</li>
            </ul>

            <p>Para a versão desktop do Pixel Studio:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Todas as suas criações são armazenadas localmente no seu dispositivo</li>
              <li>Não temos acesso aos arquivos criados com nosso aplicativo desktop</li>
              <li>As análises de uso são anônimas e não contêm informações pessoalmente identificáveis</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies e Rastreamento</h2>
            <p>
              Nosso site utiliza cookies para melhorar sua experiência e analisar padrões de uso. Você pode controlar as configurações de cookies através das preferências do seu navegador. Usamos os seguintes tipos de cookies:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cookies essenciais: necessários para o funcionamento básico</li>
              <li>Cookies de preferência: lembram suas configurações e preferências</li>
              <li>Cookies de análise: nos ajudam a entender como os usuários interagem com o aplicativo</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Serviços de Terceiros</h2>
            <p>
              Podemos utilizar serviços de terceiros para análises, relatórios de erros e monitoramento de desempenho. Esses serviços podem coletar dados anônimos de uso, sujeitos às suas próprias políticas de privacidade. Os provedores de serviços terceiros atuais incluem:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Google Analytics (para análise de uso do site)</li>
              <li>Sentry (para rastreamento de erros)</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Seus Direitos</h2>
            <p>
              Dependendo da sua localização, você pode ter certos direitos sobre suas informações pessoais, incluindo:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Direito de acessar as informações que temos sobre você</li>
              <li>Direito de solicitar a exclusão dos seus dados</li>
              <li>Direito de se opor ao processamento dos seus dados</li>
              <li>Direito à portabilidade dos dados</li>
              <li>Direito de retirar seu consentimento</li>
            </ul>
            <p>Para exercer qualquer um desses direitos, entre em contato conosco em privacy@pixelstudio.example.com.</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Privacidade das Crianças</h2>
            <p>
              Nosso aplicativo é adequado para usuários de todas as idades. Não coletamos intencionalmente informações pessoais de crianças menores de 13 anos. Se você é pai, mãe ou responsável e acredita que seu filho nos forneceu informações pessoais, entre em contato conosco para que possamos tomar as medidas apropriadas.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Alterações nesta Política de Privacidade</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova versão nesta página e atualizando a data de "Última atualização". Recomendamos que você revise esta política regularmente.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Fale Conosco</h2>
            <p>Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco:</p>
            <p className="mb-4">E-mail: privacy@pixelstudio.example.com</p>
            <p>
              Pixel Studio
              <br />
              Rua da Criatividade, 123
              <br />
              Cidade Digital, DC 10101
            </p>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-500">© 2024 Pixel Studio. Todos os direitos reservados.</p>
          <div className="flex gap-4">
            <Link href="https://github.com/pixel-studio/pixel-studio" className="text-sm text-gray-500 hover:underline">
              GitHub
            </Link>
            <Link href="/pt-BR/privacy" className="text-sm text-gray-500 hover:underline">
              Privacidade
            </Link>
            <Link href="/pt-BR/terms" className="text-sm text-gray-500 hover:underline">
              Termos
            </Link>
            <Link href="/pt-BR/about" className="text-sm text-gray-500 hover:underline">
              Sobre
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
