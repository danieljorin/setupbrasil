import Link from 'next/link'
import Image from 'next/image'

interface Post {
  id: number
  title: string
  slug: string
  excerpt?: string
  cover_image?: string
  created_at: string
  categories?: { name: string; slug: string }
}

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

  return (
    <Link href={`/post/${post.slug}`} className="group block">
      <article className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-brand dark:hover:border-brand transition-colors h-full flex flex-col">
        {/* Imagem */}
        <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-20">🖥️</span>
            </div>
          )}
          {post.categories && (
            <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full text-white" style={{ background: '#ff5722' }}>
              {post.categories.name}
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-4 flex flex-col flex-1">
          <h2 className="font-bold text-gray-900 dark:text-white group-hover:text-brand transition-colors line-clamp-2 mb-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1 mb-3">
              {post.excerpt}
            </p>
          )}
          <time className="text-xs text-gray-400 dark:text-gray-600">{date}</time>
        </div>
      </article>
    </Link>
  )
}
