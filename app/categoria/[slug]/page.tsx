import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import Navbar from '../../components/Navbar';

export const revalidate = 60;

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!category) notFound();

  const { data: posts } = await supabase
    .from('posts')
    .select('*, category:categories(*)')
    .eq('category_id', category.id)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const hasPosts = (posts?.length ?? 0) > 0;

  return (
    <>
      <Navbar />

      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="container">
          <Link href="/" className="post-back" style={{ marginBottom: 24, display: 'inline-block' }}>
            ← Todas categorias
          </Link>
          <div className="hero-tag">
            <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
            <span>Categoria</span>
          </div>
          <h1>
            {category.name.split(' ').slice(0, -1).join(' ')}{' '}
            <em>{category.name.split(' ').slice(-1)}</em>
          </h1>
          {category.description && (
            <p className="hero-sub">{category.description}</p>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {hasPosts ? (
            <div className="posts-grid">
              {posts!.map((post) => (
                <Link key={post.id} href={`/post/${post.slug}`} className="post-card">
                  <div className={`post-img ${post.cover_gradient || 'gradient-1'}`}>
                    {post.cover_icon || '📝'}
                  </div>
                  <div className="post-body">
                    <span className="post-cat">{post.category?.name}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <div className="post-meta">
                      <span>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString('pt-BR', {
                              day: 'numeric',
                              month: 'short',
                            })
                          : 'Recente'}{' '}
                        · {post.reading_time} min
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="icon">{category.icon}</div>
              <h3>Sem reviews ainda em {category.name}</h3>
              <p>
                Estamos preparando os primeiros conteúdos dessa categoria. Volte em
                breve!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
