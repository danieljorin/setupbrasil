import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Navbar from '../../components/Navbar';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('title, excerpt, meta_title, meta_description')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) return { title: 'Post não encontrado' };

  return {
    title: post.meta_title || `${post.title} — SetupBrasil`,
    description: post.meta_description || post.excerpt || '',
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .single();

  if (!post) notFound();

  // Incrementar views (fire and forget)
  supabase
    .from('posts')
    .update({ views: (post.views || 0) + 1 })
    .eq('id', post.id)
    .then(() => {});

  return (
    <>
      <Navbar />

      <article className="post-page">
        <div className="container" style={{ maxWidth: 760, padding: '60px 24px' }}>
          <Link href="/" className="post-back">← Voltar</Link>

          {post.category && (
            <span className="post-tag">{post.category.name}</span>
          )}

          <h1 className="post-page-title">{post.title}</h1>

          <div className="post-page-meta">
            <span>
              📅{' '}
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Rascunho'}
            </span>
            <span className="dot-sep"></span>
            <span>⏱️ {post.reading_time} min de leitura</span>
            <span className="dot-sep"></span>
            <span>👤 {post.author_name}</span>
          </div>

          <div className={`post-page-hero ${post.cover_gradient || 'gradient-1'}`}>
            {post.cover_icon || '📝'}
          </div>

          <div className="post-page-content">
            {/* Conteúdo em markdown simples — quebra por parágrafo */}
            {post.content.split('\n\n').map((block: string, i: number) => {
              const trimmed = block.trim();
              if (!trimmed) return null;
              if (trimmed.startsWith('## ')) {
                return <h2 key={i}>{trimmed.replace('## ', '')}</h2>;
              }
              if (trimmed.startsWith('# ')) {
                return <h2 key={i}>{trimmed.replace('# ', '')}</h2>;
              }
              return (
                <p
                  key={i}
                  dangerouslySetInnerHTML={{
                    __html: trimmed
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.+?)\*/g, '<em>$1</em>')
                      .replace(/\n/g, '<br>'),
                  }}
                />
              );
            })}
          </div>
        </div>
      </article>
    </>
  );
}
