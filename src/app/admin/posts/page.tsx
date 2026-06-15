import { createSupabaseServerClient } from '@/lib/supabase/server'
import { deletePost } from '@/actions'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminPostsPage() {
  const supabase = createSupabaseServerClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{posts?.length || 0} posts</p>
        </div>
        <Link
          href="/admin/posts/novo"
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: '#ff5722' }}
        >
          + Novo post
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {posts && posts.length > 0 ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {posts.map((post) => (
              <div key={post.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    {post.categories && (
                      <span className="text-xs text-gray-400">{post.categories.name}</span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published
                        ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {post.published ? 'Publicado' : 'Rascunho'}
                    </span>
                    {post.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    href={`/post/${post.slug}`}
                    target="_blank"
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Ver
                  </Link>
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Editar
                  </Link>
                  <form action={deletePost.bind(null, post.id)}>
                    <button
                      type="submit"
                      onClick={(e) => { if (!confirm('Deletar este post?')) e.preventDefault() }}
                      className="text-xs px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Deletar
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 dark:text-gray-600">
            <div className="text-4xl mb-3">📝</div>
            <p className="font-medium">Nenhum post ainda</p>
            <Link
              href="/admin/posts/novo"
              className="inline-block mt-4 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: '#ff5722' }}
            >
              Criar o primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
