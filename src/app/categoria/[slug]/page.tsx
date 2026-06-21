import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createSupabaseServerClient()
  const { data: cat } = await supabase
    .from('categories').select('name, description').eq('slug', params.slug).single()
  if (!cat) return {}
  return { title: cat.name, description: cat.description }
}

export default async function CategoriaPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient()

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) notFound()

  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('published', true)
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10">
        <div className="mb-10 pb-6 border-b border-cyber-border">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{category.icon}</span>
            <h1 className="font-orbitron font-black text-2xl md:text-3xl text-white">{category.name.toUpperCase()}</h1>
          </div>
          {category.description && (
            <p className="text-gray-400 ml-14 font-space text-sm">{category.description}</p>
          )}
          <p className="text-xs text-petroleum-400 ml-14 mt-1 font-orbitron">
            {posts?.length || 0} {posts?.length === 1 ? 'POST' : 'POSTS'}
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-40">{category.icon}</div>
            <p className="text-gray-400 font-space">Nenhum post nessa categoria ainda.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
