import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

function SideNewsItem({ post, index }: { post: any; index: number }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <div className="flex gap-3 items-start py-3 border-b border-cyber-border last:border-b-0">
        <span className="font-orbitron font-black text-lg text-petroleum-600 group-hover:text-cyber-cyan transition min-w-[28px] leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
        <p className="text-sm font-medium text-gray-300 leading-snug line-clamp-2 group-hover:text-cyber-cyan transition font-space">
          {post.title}
        </p>
      </div>
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
  const heroMain = posts.find((p) => p.featured) || posts[0]
  const heroSide = posts.filter((p) => p.id !== heroMain?.id).slice(0, 4)
  const restPosts = posts.filter((p) => p.id !== heroMain?.id && !heroSide.find((s) => s.id === p.id))

  const postsByCategory: Record<string, { cat: any; posts: any[] }> = {}
  restPosts.forEach((post) => {
    if (post.categories) {
      const slug = post.categories.slug
      if (!postsByCategory[slug]) postsByCategory[slug] = { cat: post.categories, posts: [] }
      postsByCategory[slug].posts.push(post)
    }
  })

  const hasContent = posts.length > 0
  const heroDate = heroMain ? new Date(heroMain.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }) : ''

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

          {/* ===== HERO ===== */}
          {hasContent && heroMain ? (
            <section className="mb-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* Destaque principal */}
                <Link
                  href={`/post/${heroMain.slug}`}
                  className="lg:col-span-8 relative glass-panel hud-corners rounded-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden group hover:border-cyber-cyan/50 transition-all duration-500 shadow-petroleum-glow hover:shadow-neon-glow"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      {heroMain.categories && (
                        <span className="bg-petroleum-500/20 text-cyber-cyan border border-cyber-cyan/40 px-3 py-1 rounded text-[11px] font-orbitron font-semibold tracking-wider">
                          {heroMain.categories.name.toUpperCase()}
                        </span>
                      )}
                      <span className="text-xs text-petroleum-400 font-orbitron">{heroDate}</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-orbitron font-black tracking-tight leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-petroleum-300">
                      {heroMain.title}
                    </h1>
                    {heroMain.excerpt && (
                      <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl font-space">
                        {heroMain.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="relative z-10 flex items-center justify-end pt-6 mt-6 border-t border-cyber-border">
                    <span className="px-6 py-3 rounded-md bg-gradient-to-r from-petroleum-600 to-petroleum-500 group-hover:from-cyber-cyan group-hover:to-petroleum-500 group-hover:text-cyber-dark font-orbitron text-xs font-bold tracking-widest transition-all duration-300">
                      LER REVIEW COMPLETO →
                    </span>
                  </div>

                  {heroMain.cover_image && (
                    <img
                      src={heroMain.cover_image}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-15 -z-0 group-hover:opacity-20 transition-opacity duration-500"
                    />
                  )}
                </Link>

                {/* Feed lateral */}
                <div className="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col">
                  <h2 className="font-orbitron font-bold text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-white mb-2">
                    ⚡ ÚLTIMAS ATUALIZAÇÕES
                  </h2>
                  <div className="flex-1">
                    {heroSide.length > 0 ? (
                      heroSide.map((post, i) => <SideNewsItem key={post.id} post={post} index={i} />)
                    ) : (
                      <p className="text-xs text-gray-500 font-space py-4">Mais conteúdos chegando em breve.</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="text-center py-20">
              <div className="text-5xl mb-4 opacity-40">🖥️</div>
              <h2 className="font-orbitron text-xl font-bold mb-2 text-white">Nenhum post publicado ainda</h2>
              <p className="text-gray-500 font-space">Em breve, novos conteúdos por aqui.</p>
            </section>
          )}

          {/* ===== CATEGORIAS ===== */}
          {categories && categories.length > 0 && (
            <section className="mb-14">
              <div className="flex gap-2 overflow-x-auto pb-1 font-orbitron text-[11px]">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categoria/${cat.slug}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-border text-gray-300 whitespace-nowrap hover:border-cyber-cyan hover:text-cyber-cyan transition"
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name.toUpperCase()}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ===== CONTEÚDO + SIDEBAR ===== */}
          {hasContent && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

              {/* Coluna principal */}
              <div>
                {Object.keys(postsByCategory).length > 0 ? (
                  Object.values(postsByCategory).map(({ cat, posts: catPosts }) => (
                    <section key={cat.slug} id={cat.slug} className="mb-14">
                      <div className="flex items-center justify-between mb-6 pb-3 border-b border-cyber-border">
                        <h2 className="font-orbitron font-black text-lg md:text-xl tracking-wide text-white flex items-center gap-2">
                          <span>{categories?.find((c) => c.slug === cat.slug)?.icon}</span>
                          <span>{cat.name.toUpperCase()}</span>
                        </h2>
                        <Link href={`/categoria/${cat.slug}`} className="text-xs font-orbitron font-bold text-cyber-cyan hover:text-white transition">
                          VER TODOS →
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {catPosts.slice(0, 4).map((post) => (
                          <PostCard key={post.id} post={post} />
                        ))}
                      </div>
                    </section>
                  ))
                ) : restPosts.length > 0 ? (
                  <section className="mb-14">
                    <h2 className="font-orbitron font-black text-lg mb-6 pb-3 border-b border-cyber-border text-white">
                      PUBLICAÇÕES RECENTES
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {restPosts.slice(0, 6).map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  </section>
                ) : null}
              </div>

              {/* Sidebar */}
              <aside className="sticky top-28 space-y-6">

                {popular && popular.length > 0 && (
                  <div className="glass-panel rounded-xl p-5">
                    <h3 className="font-orbitron font-bold text-sm text-cyber-cyan mb-3 pb-3 border-b border-cyber-border">
                      🔥 MAIS LIDOS
                    </h3>
                    {popular.map((post, i) => (
                      <Link key={post.id} href={`/post/${post.slug}`} className="group block">
                        <div className="flex gap-3 items-start py-2.5 border-b border-cyber-border last:border-b-0">
                          <span className="font-orbitron font-black text-lg min-w-[26px] leading-none" style={{ color: i === 0 ? '#00f0ff' : '#334155' }}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-xs font-semibold text-gray-300 leading-snug line-clamp-2 group-hover:text-cyber-cyan transition font-space">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <div className="glass-panel rounded-xl p-6 border-petroleum-500/30">
                  <div className="text-2xl mb-2">📬</div>
                  <h3 className="font-orbitron font-bold text-sm text-white mb-2">FIQUE POR DENTRO</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 font-space">
                    Receba os melhores reviews e achados de custo-benefício direto no seu e-mail.
                  </p>
                  <form className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      className="w-full bg-cyber-dark border border-cyber-border focus:border-cyber-cyan outline-none rounded-md px-3 py-2.5 text-sm text-gray-200 placeholder-gray-500"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-md bg-gradient-to-r from-petroleum-600 to-petroleum-500 hover:from-cyber-cyan hover:to-petroleum-500 hover:text-cyber-dark text-white font-orbitron text-xs font-bold tracking-wide transition"
                    >
                      QUERO RECEBER →
                    </button>
                  </form>
                  <p className="text-[11px] text-gray-500 mt-3 font-space">Sem spam. Cancele quando quiser.</p>
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
