import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import Navbar from './components/Navbar';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const supabase = createSupabaseServerClient();

  // Buscar categorias e posts reais do banco
  const [{ data: categories }, { data: posts }] = await Promise.all([
    supabase.from('categories').select('*').order('id'),
    supabase
      .from('posts')
      .select('*, category:categories(*)')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(9),
  ]);

  const totalPosts = posts?.length ?? 0;
  const hasPosts = totalPosts > 0;

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-tag">
            <span className="dot"></span>
            <span>
              {hasPosts
                ? `${totalPosts} ${totalPosts === 1 ? 'review' : 'reviews'} publicado${totalPosts === 1 ? '' : 's'}`
                : 'Em construção · primeiros reviews em breve'}
            </span>
          </div>
          <h1>
            O setup <em>perfeito</em> começa
            <br />
            com a escolha certa.
          </h1>
          <p className="hero-sub">
            Reviews honestos, comparativos imparciais e guias completos sobre
            periféricos, monitores, cadeiras e tudo que faz parte do seu setup tech.
            Sem enrolação.
          </p>
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">
              Por <em>categoria</em>
            </h2>
          </div>
          <div className="cats-grid">
            {categories?.map((cat) => (
              <Link
                key={cat.id}
                href={`/categoria/${cat.slug}`}
                className="cat-card"
              >
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-name">{cat.name}</div>
                <div className="cat-count">Em breve</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS RECENTES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">
              Mais <em>recentes</em>
            </h2>
          </div>

          {hasPosts ? (
            <div className="posts-grid">
              {posts!.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="post-card"
                >
                  <div className={`post-img ${post.cover_gradient || 'gradient-1'}`}>
                    {post.cover_icon || '📝'}
                  </div>
                  <div className="post-body">
                    <span className="post-cat">
                      {post.category?.name || 'Geral'}
                    </span>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <span>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                              day: 'numeric',
                              month: 'short',
                            })
                          : 'Recente'}{' '}
                        · {post.reading_time} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">✍️</div>
              <h3>Primeiros reviews em breve</h3>
              <p>
                Estamos preparando os primeiros conteúdos. Volte em breve para conferir
                reviews e guias detalhados sobre setup tech.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <Link href="/" className="logo" style={{ display: 'inline-flex' }}>
                <div className="logo-mark">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="10" width="36" height="22" rx="3" fill="white" />
                    <rect x="20" y="32" width="8" height="6" fill="white" />
                    <rect x="14" y="38" width="20" height="3" rx="1.5" fill="white" />
                  </svg>
                </div>
                <div className="logo-text">
                  <span>SetupBrasil</span>
                  <span className="small">REVIEWS &amp; GUIAS</span>
                </div>
              </Link>
              <p>
                Reviews honestos e comparativos imparciais sobre tudo que faz parte
                do seu setup tech.
              </p>
            </div>
            <div className="footer-col">
              <h4>Site</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/categorias">Categorias</Link></li>
                <li><Link href="/sobre">Sobre</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Admin</h4>
              <ul>
                <li><Link href="/login">Entrar no painel</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} SetupBrasil. Todos os direitos reservados.</span>
            <span>Feito com ♥ no Brasil</span>
          </div>
        </div>
      </footer>
    </>
  );
}
