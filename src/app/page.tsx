import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const supabase = createSupabaseServerClient()

  const [{ data: featured }, { data: recent }, { data: categories }] = await Promise.all([
    supabase
      .from('posts')
      .select('*, categories(name, slug)')
      .eq('published', true)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from('posts')
      .select('*, categories(name, slug)')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(9),
    supabase
      .from('categories')
      .select('*')
      .order('name'),
  ])

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">

        {/* POST DESTAQUE */}
        {featured && (
          <section className="mb-12">
            <Link href={`/post/${featured.slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[360px] flex items-end">
                {featured.cover_image && (
                  <img
                    src={featured.cover_image}
                    alt={featured.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                  />
                )}
                <div className="relative z-10 p-8">
                  {featured.categories && (
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full text-white mb-3" style={{ background: '#ff5722' }}>
                      {featured.categories.name}
                    </span>
                  )}
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 group-hover:text-orange-200 transition-colors">
                    {featured.title}
                  </h1>
                  {featured.excerpt && (
                    <p className="text-gray-300 max-w-2xl line-clamp-2">{featured.excerpt}</p>
                  )}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* CATEGORIAS */}
        {categories && categories.length > 0 && (
          <section className="mb-10">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categoria/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-brand hover:text-brand dark:hover:border-brand transition-colors whitespace-nowrap text-sm text-gray-600 dark:text-gray-400"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* POSTS RECENTES */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Publicações recentes
          </h2>
          {recent && recent.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recent.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400 dark:text-gray-600">
              <div className="text-5xl mb-4">🖥️</div>
              <p className="text-lg font-medium">Nenhum post publicado ainda.</p>
              <p className="text-sm mt-1">Em breve conteúdo novo por aqui.</p>
            </div>
          )}
        </section>

      </main>
      <Footer />
    </>
  )
}
