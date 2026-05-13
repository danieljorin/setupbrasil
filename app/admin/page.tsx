import Link from 'next/link';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export default async function AdminDashboard() {
  const supabase = createSupabaseServerClient();

  // Dados REAIS do banco
  const [{ count: publishedCount }, { count: draftCount }, { data: recentPosts }, { data: viewsData }] = await Promise.all([
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase
      .from('posts')
      .select('id, title, status, views, published_at, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('posts').select('views').eq('status', 'published'),
  ]);

  const totalViews = viewsData?.reduce((acc, p) => acc + (p.views || 0), 0) || 0;
  const isEmpty = (publishedCount || 0) === 0 && (draftCount || 0) === 0;

  return (
    <div className="admin-content">
      <header className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
        <Link href="/admin/posts/novo" className="primary-btn">
          + Novo Post
        </Link>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">📝 Posts publicados</div>
          <div className="stat-value">{publishedCount || 0}</div>
          <div className="stat-trend">
            {(publishedCount || 0) === 0 ? 'Nenhum ainda' : 'Total publicado'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">📋 Rascunhos</div>
          <div className="stat-value">{draftCount || 0}</div>
          <div className="stat-trend">
            {(draftCount || 0) === 0 ? 'Nenhum em andamento' : 'Em produção'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">👁️ Visualizações</div>
          <div className="stat-value">
            {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}k` : totalViews}
          </div>
          <div className="stat-trend">
            {totalViews === 0 ? 'Aguardando primeiros acessos' : 'Total acumulado'}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">💰 Comissões</div>
          <div className="stat-value">R$ 0</div>
          <div className="stat-trend">Conecte os afiliados</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Posts recentes</h3>
          <Link href="/admin/posts" className="panel-link">
            Ver todos →
          </Link>
        </div>

        {isEmpty ? (
          <div className="empty-state" style={{ margin: 24, border: 'none' }}>
            <div className="icon">✍️</div>
            <h3>Comece publicando seu primeiro post</h3>
            <p>
              Você ainda não tem nenhum post. Clique no botão abaixo para criar o
              primeiro.
            </p>
            <Link
              href="/admin/posts/novo"
              className="primary-btn"
              style={{ marginTop: 20, display: 'inline-block' }}
            >
              + Criar primeiro post
            </Link>
          </div>
        ) : (
          <div className="post-list">
            {recentPosts?.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="post-list-item"
              >
                <div className="post-list-info">
                  <div className="post-list-title">{post.title}</div>
                  <div className="post-list-meta">
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
        )}
      </div>
    </div>
  );
}
