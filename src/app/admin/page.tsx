import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = createSupabaseServerClient()

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { data: recentPosts },
  ] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', true),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('published', false),
    supabase.from('posts').select('id, title, published, created_at').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Total de posts', value: totalPosts || 0, color: '#ff5722' },
    { label: 'Publicados', value: publishedPosts || 0, color: '#22c55e' },
    { label: 'Rascunhos', value: draftPosts || 0, color: '#f59e0b' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Visão geral do blog</p>
        </div>
        <Link
          href="/admin/posts/novo"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: '#ff5722' }}
        >
          + Novo post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
            <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Posts recentes */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900 dark:text-white">Posts recentes</h2>
          <Link href="/admin/posts" className="text-sm text-brand hover:underline" style={{ color: '#ff5722' }}>
            Ver todos
          </Link>
        </div>
        {recentPosts && recentPosts.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentPosts.map((post) => (
              <div key={post.id} className="px-6 py-3 flex items-center justify-between">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-brand transition-colors truncate"
                  style={{ '--brand': '#ff5722' } as React.CSSProperties}
                >
                  {post.title}
                </Link>
                <span className={`text-xs px-2 py-0.5 rounded-full ml-4 flex-shrink-0 ${
                  post.published
                    ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-10 text-center text-gray-400 dark:text-gray-600 text-sm">
            Nenhum post ainda.{' '}
            <Link href="/admin/posts/novo" className="underline hover:text-brand" style={{ color: '#ff5722' }}>
              Criar o primeiro
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
