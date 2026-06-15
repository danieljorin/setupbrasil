'use client'
import { useRef, useState } from 'react'
import { savePost } from '@/actions'

interface Category { id: number; name: string }
interface Post {
  id?: number; title?: string; slug?: string; excerpt?: string;
  content?: string; cover_image?: string; category_id?: number;
  published?: boolean; featured?: boolean;
}

function slugify(text: string) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export default function PostEditor({ post, categories }: { post?: Post; categories: Category[] }) {
  const [title, setTitle] = useState(post?.title || '')
  const [slug, setSlug] = useState(post?.slug || '')
  const [slugEdited, setSlugEdited] = useState(!!post?.slug)

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (!slugEdited) setSlug(slugify(v))
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {post?.id ? 'Editar post' : 'Novo post'}
        </h1>
      </div>

      <form action={savePost} className="space-y-6">
        {post?.id && <input type="hidden" name="id" value={post.id} />}

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="title" required value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Título do post"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug (URL) <span className="text-red-500">*</span>
          </label>
          <input
            type="text" name="slug" required value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true) }}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
            placeholder="meu-post"
          />
          <p className="text-xs text-gray-400 mt-1">setupbrasil.com/post/{slug || 'meu-post'}</p>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Resumo</label>
          <textarea
            name="excerpt" rows={2} defaultValue={post?.excerpt || ''}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            placeholder="Breve descrição do post (aparece na listagem e no SEO)"
          />
        </div>

        {/* Imagem de capa */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL da imagem de capa</label>
          <input
            type="url" name="cover_image" defaultValue={post?.cover_image || ''}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
          <select
            name="category_id" defaultValue={post?.category_id || ''}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Sem categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Conteúdo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Conteúdo (HTML)
          </label>
          <textarea
            name="content" rows={18} defaultValue={post?.content || ''}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm resize-y"
            placeholder="<h2>Introdução</h2><p>Texto do post...</p>"
          />
          <p className="text-xs text-gray-400 mt-1">Suporta HTML. Use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;a href&gt;, etc.</p>
        </div>

        {/* Opções */}
        <div className="flex items-center gap-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox" name="published" value="true"
              defaultChecked={post?.published}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Publicar</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox" name="featured" value="true"
              defaultChecked={post?.featured}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Destaque na home</span>
          </label>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#ff5722' }}
          >
            {post?.id ? 'Salvar alterações' : 'Criar post'}
          </button>
          <a
            href="/admin/posts"
            className="px-6 py-2.5 rounded-lg font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  )
}
