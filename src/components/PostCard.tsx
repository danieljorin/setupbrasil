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
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="glass-panel rounded-xl overflow-hidden h-full flex flex-col glow-hover transition-all duration-300">
        {/* Imagem */}
        <div className="relative aspect-video bg-cyber-dark overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-20">🖥️</span>
            </div>
          )}
          {post.categories && (
            <span className="absolute top-3 left-3 bg-cyber-dark/80 border border-cyber-cyan/40 px-3 py-1 text-[10px] font-orbitron font-bold text-cyber-cyan rounded">
              {post.categories.name.toUpperCase()}
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-5 flex flex-col flex-1">
          <span className="text-[11px] text-petroleum-400 font-space mb-2">{date}</span>
          <h2 className="font-orbitron font-bold text-base text-white group-hover:text-cyber-cyan transition-colors line-clamp-2 mb-2">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-xs text-gray-400 font-space leading-relaxed line-clamp-2 flex-1 mb-3">
              {post.excerpt}
            </p>
          )}
          <span className="text-left font-orbitron text-[11px] font-bold text-cyber-cyan group-hover:text-white transition flex items-center gap-1">
            LER ARTIGO <span aria-hidden>→</span>
          </span>
        </div>
      </article>
    </Link>
  )
}
