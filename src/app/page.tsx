import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = createSupabaseServerClient()

  const [{ data: featured }, { data: recent }, { data: categories }] = await Promise.all([
    supabase.from('posts').select('*, categories(name, slug)').eq('published', true).eq('featured', true).order('created_at', { ascending: false }).limit(1).maybeSingle(),
    supabase.from('posts').select('*, categories(name, slug)').eq('published', true).order('created_at', { ascending: false }).limit(9),
    supabase.from('categories').select('*').order('name'),
  ])

  return (
    <>
      <Header />
      <main style={{ flex: 1, maxWidth: 1200, margin: '0 auto', width: '100%', padding: '32px 16px' }}>

        {/* POST DESTAQUE */}
        {featured && (
          <section style={{ marginBottom: 48 }}>
            <Link href={`/post/${featured.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#111827', minHeight: 380, display: 'flex', alignItems: 'flex-end' }}>
                {featured.cover_image && (
                  <img src={featured.cover_image} alt={featured.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
                )}
                <div style={{ position: 'relative', zIndex: 1, padding: '40px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', width: '100%' }}>
                  {featured.categories && (
                    <span style={{ display: 'inline-block', background: '#ff5722', color: 'white', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>
                      {featured.categories.name}
                    </span>
                  )}
                  <h1 style={{ fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: 10 }}>
                    {featured.title}
                  </h1>
                  {featured.excerpt && (
                    <p style={{ color: '#d1d5db', fontSize: 16, maxWidth: 600 }}>{featured.excerpt}</p>
                  )}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* CATEGORIAS */}
        {categories && categories.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
              {categories.map((cat) => (
                <Link key={cat.slug} href={`/categoria/${cat.slug}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 100, border: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit', fontWeight: 500, fontSize: 14, whiteSpace: 'nowrap', transition: 'all 0.15s' }}
                  className="hover:border-orange-500 hover:text-orange-600 dark:border-gray-700 dark:hover:border-orange-500 dark:hover:text-orange-400">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* POSTS RECENTES */}
        <section>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Publicações recentes</h2>
          {recent && recent.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {recent.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <article style={{ borderRadius: 16, border: '1px solid #e5e7eb', background: 'white', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}
                    className="hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800">
                    <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f3f4f6', overflow: 'hidden' }}>
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.2 }}>🖥️</div>
                      )}
                      {post.categories && (
                        <span style={{ position: 'absolute', top: 12, left: 12, background: '#ff5722', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
                          {post.categories.name}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.4, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.5, flex: 1, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {post.excerpt}
                        </p>
                      )}
                      <time style={{ fontSize: 12, color: '#9ca3af' }}>
                        {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </time>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🖥️</div>
              <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: '#374151' }}>Em breve, conteúdo novo por aqui.</p>
              <p style={{ fontSize: 14 }}>Vai no admin e cria o primeiro post.</p>
              <Link href="/admin" style={{ display: 'inline-block', marginTop: 20, padding: '10px 24px', background: '#ff5722', color: 'white', borderRadius: 12, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
                Ir para o admin
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
