'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

type Category = { id: number; name: string; icon: string };
type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_icon: string;
  cover_gradient: string;
  category_id: number | null;
  status: 'draft' | 'published' | 'scheduled';
  scheduled_for: string | null;
  meta_title: string | null;
  meta_description: string | null;
};

const GRADIENTS = [
  { id: 'gradient-1', label: 'Azul' },
  { id: 'gradient-2', label: 'Rosa' },
  { id: 'gradient-3', label: 'Verde' },
  { id: 'gradient-4', label: 'Roxo' },
  { id: 'gradient-5', label: 'Laranja' },
  { id: 'gradient-6', label: 'Ciano' },
];

function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function PostEditor({
  post,
  categories,
}: {
  post?: Post;
  categories: Category[];
}) {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverIcon, setCoverIcon] = useState(post?.cover_icon || '📝');
  const [coverGradient, setCoverGradient] = useState(post?.cover_gradient || 'gradient-1');
  const [categoryId, setCategoryId] = useState<number | ''>(post?.category_id || '');
  const [scheduledFor, setScheduledFor] = useState(
    post?.scheduled_for ? post.scheduled_for.slice(0, 16) : ''
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Auto-gerar slug do título
  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit && !slug) setSlug(slugify(value));
  }

  async function save(status: 'draft' | 'published' | 'scheduled') {
    if (!title.trim()) {
      setMessage('⚠️ Título é obrigatório');
      return;
    }
    if (!content.trim()) {
      setMessage('⚠️ Conteúdo é obrigatório');
      return;
    }
    if (status === 'scheduled' && !scheduledFor) {
      setMessage('⚠️ Defina a data de agendamento');
      return;
    }

    setSaving(true);
    setMessage('');

    const finalSlug = slug || slugify(title);
    const readingTime = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    const payload = {
      title: title.trim(),
      slug: finalSlug,
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_icon: coverIcon,
      cover_gradient: coverGradient,
      category_id: categoryId || null,
      status,
      reading_time: readingTime,
      published_at:
        status === 'published'
          ? new Date().toISOString()
          : status === 'scheduled'
          ? null
          : null,
      scheduled_for: status === 'scheduled' ? new Date(scheduledFor).toISOString() : null,
    };

    let result;
    if (isEdit) {
      result = await supabase.from('posts').update(payload).eq('id', post.id).select().single();
    } else {
      result = await supabase.from('posts').insert(payload).select().single();
    }

    if (result.error) {
      setMessage(`❌ Erro: ${result.error.message}`);
      setSaving(false);
      return;
    }

    // Salvar revisão (histórico)
    if (result.data) {
      await supabase.from('post_revisions').insert({
        post_id: result.data.id,
        title: result.data.title,
        content: result.data.content,
        excerpt: result.data.excerpt,
      });
    }

    setMessage('✅ Salvo com sucesso!');
    setTimeout(() => {
      if (!isEdit && result.data) {
        router.push(`/admin/posts/${result.data.id}`);
      } else {
        router.refresh();
      }
    }, 800);
    setSaving(false);
  }

  async function deletePost() {
    if (!isEdit || !post) return;
    if (!confirm('Tem certeza? Essa ação não pode ser desfeita.')) return;

    const { error } = await supabase.from('posts').delete().eq('id', post.id);
    if (error) {
      setMessage(`❌ Erro ao deletar: ${error.message}`);
      return;
    }
    router.push('/admin/posts');
    router.refresh();
  }

  return (
    <div className="admin-content">
      <header className="admin-header">
        <div>
          <Link href="/admin/posts" className="post-back" style={{ display: 'inline-block', marginBottom: 8 }}>
            ← Voltar
          </Link>
          <h1 className="admin-title">{isEdit ? 'Editar post' : 'Novo post'}</h1>
        </div>
      </header>

      {message && <div className="status-msg" style={{ marginBottom: 20 }}>{message}</div>}

      <div className="editor-grid">
        <div className="editor-main">
          <div className="editor-field">
            <label>Título *</label>
            <input
              type="text"
              className="editor-input title-input"
              placeholder="Digite um título atrativo..."
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>

          <div className="editor-field">
            <label>Slug (URL) *</label>
            <input
              type="text"
              className="editor-input"
              placeholder="meu-post-incrivel"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              setupbrasil.com/post/{slug || 'seu-slug'}
            </small>
          </div>

          <div className="editor-field">
            <label>Resumo</label>
            <input
              type="text"
              className="editor-input"
              placeholder="Breve resumo (aparece nas listagens)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
            />
          </div>

          <div className="editor-field">
            <label>Conteúdo * (Markdown simples)</label>
            <textarea
              className="editor-input editor-textarea"
              placeholder={'Escreva aqui...\n\n## Subtítulo\n\nParágrafo com **negrito** e *itálico*.'}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              Use ## para subtítulos, **texto** para negrito, *texto* para itálico
            </small>
          </div>
        </div>

        <div className="editor-side">
          <div className="side-panel">
            <div className="side-panel-title">Publicação</div>
            <button
              className="side-action-btn"
              disabled={saving}
              onClick={() => save('draft')}
            >
              💾 Salvar rascunho
            </button>
            <button
              className="side-action-btn publish"
              disabled={saving}
              onClick={() => save('published')}
            >
              🚀 {saving ? 'Publicando...' : 'Publicar agora'}
            </button>
          </div>

          <div className="side-panel">
            <div className="side-panel-title">Agendar</div>
            <input
              type="datetime-local"
              className="editor-input"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
            />
            <button
              className="side-action-btn"
              disabled={saving || !scheduledFor}
              onClick={() => save('scheduled')}
              style={{ marginTop: 10 }}
            >
              📅 Agendar
            </button>
          </div>

          <div className="side-panel">
            <div className="side-panel-title">Categoria</div>
            <select
              className="editor-input"
              value={categoryId}
              onChange={(e) =>
                setCategoryId(e.target.value ? Number(e.target.value) : '')
              }
            >
              <option value="">Sem categoria</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="side-panel">
            <div className="side-panel-title">Capa</div>
            <input
              type="text"
              className="editor-input"
              placeholder="Emoji (ex: 🖥️)"
              value={coverIcon}
              onChange={(e) => setCoverIcon(e.target.value)}
              maxLength={4}
            />
            <select
              className="editor-input"
              value={coverGradient}
              onChange={(e) => setCoverGradient(e.target.value)}
              style={{ marginTop: 10 }}
            >
              {GRADIENTS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {isEdit && (
            <div className="side-panel">
              <div className="side-panel-title" style={{ color: 'var(--accent)' }}>
                Zona perigosa
              </div>
              <button
                className="side-action-btn"
                onClick={deletePost}
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  borderColor: '#ef4444',
                  color: '#ef4444',
                }}
              >
                🗑️ Deletar post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
