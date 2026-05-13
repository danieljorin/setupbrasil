import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminPosts() {
  const supabase = createSupabaseServerClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('*, category:categories(name)')
    .order('created_at', { ascending: false });

  const hasPosts = (posts?.length ?? 0) > 0;

  return (
    <div className="admin-content">
      <header className="admin-header">
        <h1 className="admin-title">Todos os posts</h1>
        <Link href="/admin/posts/novo" className="primary-btn">
          + Novo Post
        </Link>
      </header>

      {hasPosts ? (
        <div className="panel">
          <div className="post-list">
            {posts!.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="post-list-item"
              >
                <div className="post-thumb">{post.cover_icon || '📝'}</div>
                <div className="post-list-info">
                  <div className="post-list-title">{post.title}</div>
                  <div className="post-list-meta">
                    {post.category?.name || 'Sem categoria'} ·{' '}
                    {new Date(post.created_at).toLocaleDateString('pt-BR')} ·{' '}
                    {post.views || 0} views
                  </div>
                </div>
                <span className={`status-pill ${post.status}`}>
                  {post.status === 'published'
                    ? 'Publicado'
                    : post.status === 'draft'
                    ? 'Rascunho'
                    : 'Agendado'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="icon">📝</div>
          <h3>Nenhum post ainda</h3>
          <p>Crie seu primeiro post agora mesmo.</p>
          <Link
            href="/admin/posts/novo"
            className="primary-btn"
            style={{ marginTop: 20, display: 'inline-block' }}
          >
            + Criar primeiro post
          </Link>
        </div>
      )}
    </div>
  );
}
