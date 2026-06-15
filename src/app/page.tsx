import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function readingTime(content: string) {
  const words = (content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

function PostTag({ name }: { name: string }) {
  return (
    <span style={{ display: 'inline-block', background: '#fff3ef', color: '#ff5722', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 100, border: '1px solid #ffd5c8' }}>
      {name}
    </span>
  )
}

function CardSmall({ post }: { post: any }) {
  const mins = readingTime(post.content)
  return (
    <Link href={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <article style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: '1px solid #f3f4f6', alignItems: 'flex-start' }} className="dark:border-gray-800 group">
        <div style={{ width: 80, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#f3f4f6' }} className="dark:bg-gray-800">
          {post.cover_image
            ? <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} className="group-hover:scale-105" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, opacity: 0.3 }}>🖥️</div>
          }
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.4, marginBottom: 6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }} className="group-hover:text-orange-500" >
            {post.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {post.categories && <PostTag name={post.categories.name} />}
            <span style={{ fontSize: 11, color: '#9ca3af' }}>⏱️ {mins} min</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function CardLarge({ post }: { post: any }) {
  const mins = readingTime(post.content)
  const date = new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  return (
    <Link href={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{ borderRadius: 20, border: '1px solid #e5e7eb', background: 'white', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.25s', cursor: 'pointer' }} className="group hover:shadow-xl hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800">
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f3f4f6', overflow: 'hidden' }} className="dark:bg-gray-800">
          {post.cover_image
            ? <img src={post.cover_image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} className="group-hover:scale-105" />
            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: 0.2 }}>🖥️</div>
          }
          {post.categories && (
            <span style={{ position: 'absolute', top: 12, left: 12, background: '#ff5722', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
              {post.categories.name}
            </span>
          )}
        </div>
        <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, lineHeight: 1.45, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color 0.2s' }} className="group-hover:text-orange-500">
            {post.title}
          </h3>
          {post.excerpt && (
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.55, flex: 1, marginBottom: 12, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <time style={{ fontSize: 12, color: '#9ca3af' }}>{date}</time>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>·</span>
            <span style={{ fontSize: 12, color: '#9ca3af' }}>⏱️ {mins} min de leitura</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function HomePage() {
  const supabase = createSupabaseServerClient()

  const [{ data: allPosts }, { data: categories }, { data: popular }] = await Promise.all([
    supabase.from('posts').select('*, categories(name, slug)').eq('published', true).order('created_at', { ascending: false }).limit(20),
    supabase.from('categories').select('*').order('name'),
    supabase.from('posts').select('*, categories(name, slug)').eq('published', true).order('views', { ascending: false }).limit(5),
  ])

  const posts = allPosts || []
  const heroMain = posts.find(p => p.featured) || posts[0]
  const heroSide = posts.filter(p => p.id !== heroMain?.id).slice(0, 2)
  const restPosts = posts.filter(p => p.id !== heroMain?.id && !heroSide.find(s => s.id === p.id))

  // Agrupar posts por categoria
  const postsByCategory: Record<string, { cat: any; posts: any[] }> = {}
  restPosts.forEach(post => {
    if (post.categories) {
      const slug = post.categories.slug
      if (!postsByCategory[slug]) postsByCategory[slug] = { cat: post.categories, posts: [] }
      postsByCategory[slug].posts.push(post)
    }
  })

  const hasContent = posts.length > 0

  return (
    <>
      <Header />
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 16px' }}>

          {/* ===== HERO SECTION ===== */}
          {hasContent && heroMain ? (
            <section style={{ marginBottom: 56 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }} className="md:grid-cols-[3fr_2fr]">

                {/* Post principal */}
                <Link href={`/post/${heroMain.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#111827', minHeight: 400, display: 'flex', alignItems: 'flex-end', cursor: 'pointer' }} className="group">
                    {heroMain.cover_image && (
                      <img src={heroMain.cover_image} alt={heroMain.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'transform 0.5s ease, opacity 0.3s' }} className="group-hover:scale-105 group-hover:opacity-60" />
                    )}
                    <div style={{ position: 'relative', zIndex: 1, padding: '32px', background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', width: '100%' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        {heroMain.categories && (
                          <span style={{ background: '#ff5722', color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
                            {heroMain.categories.name}
                          </span>
                        )}
                        <span style={{ fontSize: 12, color: '#d1d5db' }}>⏱️ {readingTime(heroMain.content)} min de leitura</span>
                      </div>
                      <h1 style={{ fontSize: 'clamp(20px, 3vw, 34px)', fontWeight: 800, color: 'white', lineHeight: 1.25, marginBottom: 10, transition: 'color 0.2s' }} className="group-hover:text-orange-300">
                        {heroMain.title}
                      </h1>
                      {heroMain.excerpt && (
                        <p style={{ color: '#d1d5db', fontSize: 15, lineHeight: 1.6, maxWidth: 560, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {heroMain.excerpt}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>

                {/* 2 posts lado direito */}
                {heroSide.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {heroSide.map(post => (
                      <Link key={post.id} href={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'block' }}>
                        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', background: '#111827', height: '100%', minHeight: 180, display: 'flex', alignItems: 'flex-end', cursor: 'pointer' }} className="group">
                          {post.cover_image && (
                            <img src={post.cover_image} alt={post.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'transform 0.4s' }} className="group-hover:scale-105" />
                          )}
                          <div style={{ position: 'relative', zIndex: 1, padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', width: '100%' }}>
                            {post.categories && (
                              <span style={{ background: '#ff5722', color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100, display: 'inline-block', marginBottom: 8 }}>
                                {post.categories.name}
                              </span>
                            )}
                            <h2 style={{ fontSize: 15, fontWeight: 700, color: 'white', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color 0.2s' }} className="group-hover:text-orange-300">
                              {post.title}
                            </h2>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ) : (
            <section style={{ textAlign: 'center', padding: '80px 20px', marginBottom: 40 }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🖥️</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Nenhum post publicado ainda</h2>
              <p style={{ color: '#6b7280' }}>Em breve, novos conteúdos por aqui.</p>
            </section>
          )}

          {/* ===== CATEGORIAS PILLS ===== */}
          {categories && categories.length > 0 && (
            <section style={{ marginBottom: 48 }}>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {categories.map(cat => (
                  <Link key={cat.slug} href={`/categoria/${cat.slug}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 100, border: '1px solid #e5e7eb', textDecoration: 'none', color: 'inherit', fontWeight: 500, fontSize: 13, whiteSpace: 'nowrap', transition: 'all 0.15s', background: 'white' }}
                    className="hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:bg-gray-900 dark:border-gray-700 dark:hover:border-orange-500 dark:hover:text-orange-400 dark:hover:bg-orange-950">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ===== CONTEÚDO PRINCIPAL + SIDEBAR ===== */}
          {hasContent && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48, alignItems: 'start' }} className="lg:grid-cols-[1fr_300px]">

              {/* COLUNA PRINCIPAL */}
              <div>
                {/* Seções por categoria */}
                {Object.keys(postsByCategory).length > 0 ? (
                  Object.values(postsByCategory).map(({ cat, posts: catPosts }) => (
                    <section key={cat.slug} style={{ marginBottom: 52 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid #ff5722' }}>
                        <h2 style={{ fontSize: 18, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{categories?.find(c => c.slug === cat.slug)?.icon}</span>
                          <span>{cat.name}</span>
                        </h2>
                        <Link href={`/categoria/${cat.slug}`} style={{ fontSize: 13, color: '#ff5722', fontWeight: 600, textDecoration: 'none' }} className="hover:underline">
                          Ver todos →
                        </Link>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                        {catPosts.slice(0, 3).map(post => <CardLarge key={post.id} post={post} />)}
                      </div>
                    </section>
                  ))
                ) : restPosts.length > 0 ? (
                  <section style={{ marginBottom: 52 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, paddingBottom: 12, borderBottom: '2px solid #ff5722' }}>Publicações recentes</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                      {restPosts.slice(0, 6).map(post => <CardLarge key={post.id} post={post} />)}
                    </div>
                  </section>
                ) : null}
              </div>

              {/* SIDEBAR */}
              <aside style={{ position: 'sticky', top: 88 }}>

                {/* Mais lidos */}
                {popular && popular.length > 0 && (
                  <div style={{ borderRadius: 16, border: '1px solid #e5e7eb', background: 'white', padding: '20px', marginBottom: 24 }} className="dark:bg-gray-900 dark:border-gray-800">
                    <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, paddingBottom: 12, borderBottom: '2px solid #ff5722', display: 'inline-block' }}>
                      🔥 Mais lidos
                    </h3>
                    <div style={{ marginTop: 12 }}>
                      {popular.map((post, i) => (
                        <Link key={post.id} href={`/post/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }} className="group dark:border-gray-800">
                            <span style={{ fontSize: 22, fontWeight: 900, color: i === 0 ? '#ff5722' : '#e5e7eb', minWidth: 28, lineHeight: 1 }} className="dark:text-gray-700">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', transition: 'color 0.2s' }} className="group-hover:text-orange-500">
                              {post.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter */}
                <div style={{ borderRadius: 16, background: 'linear-gradient(135deg, #ff5722 0%, #e64a19 100%)', padding: '24px', color: 'white' }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>📬</div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Fique por dentro</h3>
                  <p style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, marginBottom: 16 }}>
                    Receba os melhores reviews e dicas de setup direto no seu e-mail.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', fontSize: 14, color: '#111827', outline: 'none' }}
                    />
                    <button style={{ width: '100%', padding: '10px 14px', borderRadius: 10, background: 'white', color: '#ff5722', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', transition: 'opacity 0.2s' }} className="hover:opacity-90">
                      Quero receber →
                    </button>
                  </div>
                  <p style={{ fontSize: 11, opacity: 0.75, marginTop: 10 }}>Sem spam. Cancele quando quiser.</p>
                </div>
              </aside>
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
