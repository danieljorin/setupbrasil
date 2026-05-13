# SetupBrasil - Blog Next.js

Blog de afiliados Amazon + Mercado Livre com nicho Setup Tech.

## ⚠️ ATENÇÃO: Estado atual

Esta é a **PRIMEIRA versão do Next.js** (V1). Ainda tem partes em construção:

✅ Já feito:
- Estrutura base do projeto Next.js 14 + TypeScript
- Conexão com Supabase
- Homepage dinâmica (lê posts do banco)
- Tema dark/light com toggle
- Estado vazio elegante (sem dados falsos)
- Logo do Setup Mark

⏳ Pendente (próximas sessões):
- Sistema de login real (Supabase Auth)
- Painel admin completo
- Editor rico de posts
- Página individual de post
- Página de categoria
- Upload de imagens
- Posts em rascunho/agendamento

## 🚀 Como subir pra Vercel

### 1. Subir os arquivos pro GitHub

Apaga os arquivos antigos do repositório `setupbrasil` no GitHub e sobe TODOS esses arquivos no lugar.

⚠️ IMPORTANTE: NÃO suba o arquivo `.env.local.example` com valores reais. Vamos configurar as variáveis na Vercel.

### 2. Configurar variáveis de ambiente na Vercel

Quando o Vercel for fazer o deploy, vai dar erro porque falta as chaves do Supabase. Faz assim:

1. Vai em **vercel.com** → projeto setupbrasil
2. Settings → Environment Variables
3. Adiciona estas 2 variáveis:

```
NEXT_PUBLIC_SUPABASE_URL = https://cuhlopbeyseotjdjouoq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = sb_publishable_aDMujmfvI2ByFMEU6Fc4vA_k08gQgqq
```

4. Salva e clica em "Redeploy"

## 📁 Estrutura

```
setupbrasil/
├── app/
│   ├── components/
│   │   └── Navbar.tsx       (navegação com toggle de tema)
│   ├── login/
│   │   └── page.tsx         (placeholder até fazer auth real)
│   ├── globals.css          (todos os estilos)
│   ├── layout.tsx           (layout raiz)
│   └── page.tsx             (homepage)
├── lib/
│   └── supabase/
│       └── client.ts        (cliente Supabase + tipos)
├── public/
│   └── favicon.png          (vai ser adicionado)
├── .env.local.example       (modelo de variáveis - não usar em prod)
├── .gitignore
├── next.config.js
├── package.json
└── tsconfig.json
```

## 🔌 Banco de dados

Tabelas no Supabase (já criadas via SQL):
- `categories` — 8 categorias pré-cadastradas
- `posts` — 1 post de exemplo
- `tags`
- `post_tags`
- `products`
- `post_revisions`
- `newsletter_subscribers`
