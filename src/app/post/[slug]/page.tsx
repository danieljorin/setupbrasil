import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostCard from '@/components/PostCard'
import type { Metadata } from 'next'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createSupabaseServerClient()
  const { data: post } = await supabase
    .from('posts').select('title, excerpt').eq('slug', params.slug).single()
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = createSupabaseServerClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) notFound()

  supabase.from('posts').update({ views: (post.views || 0) + 1 }).eq('id', post.id).then(() => {})

  const { data: related } = await supabase
    .from('posts')
    .select('*, categories(name, slug)')
    .eq('published', true)
    .eq('category_id', post.category_id)
    .neq('id', post.id)
    .order('created_at', { ascending: false })
    .limit(3)

  const date = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })

  return (
    <>
      <Header />
      <main className="flex-1">
        {post.cover_image && (
          <div className="relative h-64 md:h-96 bg-cyber-dark overflow-hidden border-b border-cyber-border">
            <Image src={post.cover_image} alt={post.title} fill className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent" />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {post.categories && (
              <a
                href={`/categoria/${post.categories.slug}`}
                className="text-[11px] font-orbitron font-bold px-3 py-1 rounded-full text-cyber-cyan border border-cyber-cyan/40 bg-petroleum-500/10"
              >
                {post.categories.name.toUpperCase()}
              </a>
            )}
            <time className="text-sm text-gray-500 font-space">{date}</time>
            {post.views > 0 && (
              <span className="text-sm text-gray-500 font-space">{post.views} visualizações</span>
            )}
          </div>

          <h1 className="font-orbitron font-black text-2xl md:text-4xl text-white mb-4 leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg text-gray-400 font-space mb-8 pb-8 border-b border-cyber-border leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>

        {related && related.length > 0 && (
          <section className="border-t border-cyber-border mt-12">
            <div className="max-w-6xl mx-auto px-4 py-10">
              <h2 className="font-orbitron font-bold text-lg text-white mb-6">VEJA TAMBÉM</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((p) => <PostCard key={p.id} post={p} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
