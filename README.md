# SetupBrasil — Blog Next.js + Supabase (v2)

Blog de afiliados Amazon + Mercado Livre com nicho Setup Tech. Sistema completo com painel admin, autenticação real e banco de dados.

## ✅ O que está pronto

- ✅ Estrutura Next.js 14 (App Router) + TypeScript
- ✅ Conexão real com Supabase
- ✅ Homepage dinâmica (lê posts do banco)
- ✅ Página individual de posts (`/post/[slug]`)
- ✅ Página de categoria (`/categoria/[slug]`)
- ✅ Login REAL com Supabase Auth
- ✅ Painel admin protegido (rotas `/admin/*`)
- ✅ Dashboard com dados REAIS do banco (zerados se vazio)
- ✅ Editor de posts (criar, editar, deletar)
- ✅ Rascunhos, publicação e agendamento
- ✅ Histórico de versões (revisions)
- ✅ Tema dark/light com toggle
- ✅ Logo Setup Mark (favicon.png)

## 🚀 Como subir (passo a passo)

### 1. Apagar arquivos antigos do GitHub

No repositório `danieljorin/setupbrasil`:
1. Apaga TODOS os arquivos antigos (`index.html`, `login.html`, `admin.html`, `links.html`)
2. Pode manter o `favicon.png` antigo ou substituir pelo novo

### 2. Subir os novos arquivos

Sobe TODOS os arquivos dessa pasta `setupbrasil-v2` (incluindo subpastas) pro GitHub.

⚠️ **NÃO suba o `.env.local.example`** com valores reais — a Vercel pega de outro lugar.

### 3. Configurar variáveis de ambiente na Vercel

1. Vai em **vercel.com** → projeto **setupbrasil**
2. **Settings** → **Environment Variables**
3. Adiciona:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://cuhlopbeyseotjdjouoq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_aDMujmfvI2ByFMEU6Fc4vA_k08gQgqq` |

4. **Save** em cada uma
5. **Deployments** → último → **Redeploy**

### 4. Criar usuário admin no Supabase

1. **supabase.com/dashboard** → projeto **setupbrasil**
2. **Authentication** → **Users** → **Add user** → **Create new user**
3. Preenche email + senha (anota!)
4. ✅ Marca **"Auto Confirm User"**
5. **Create user**

Agora loga em `setupbrasil.com/login` com esse email/senha.

## 📝 Como criar posts

1. Login em `/login`
2. **Novo Post** no menu
3. Preenche título (slug auto-gerado)
4. Escreve em **Markdown simples**:
   - `## texto` → subtítulo
   - `**texto**` → negrito
   - `*texto*` → itálico
5. Escolhe categoria, capa (emoji + gradiente)
6. **Salvar rascunho** ou **Publicar agora**

## ⏳ Próximos incrementos

- Editor rich-text (toolbar com botões)
- Upload de imagens
- Gerenciamento de produtos afiliados
- Newsletter funcional
- Analytics integrado
