'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'E-mail ou senha incorretos'
        : error.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="login-page">
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <Link href="/" className="back-link">← Voltar ao site</Link>

      <div className="login-card">
        <div className="login-logo">
          <div className="login-mark">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="6" y="10" width="36" height="22" rx="3" fill="white" />
              <rect x="20" y="32" width="8" height="6" fill="white" />
              <rect x="14" y="38" width="20" height="3" rx="1.5" fill="white" />
            </svg>
          </div>
          <div>
            <div className="login-brand-name">SetupBrasil</div>
            <div className="login-brand-sub">PAINEL ADMIN</div>
          </div>
        </div>

        <h1>Bem-vindo de <em>volta</em></h1>
        <p className="subtitle">Entre na sua conta para gerenciar o blog.</p>

        {error && <div className="status-msg error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="field">
            <label>E-mail</label>
            <div className="field-wrap">
              <span className="field-icon">✉️</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="field">
            <label>Senha</label>
            <div className="field-wrap">
              <span className="field-icon">🔒</span>
              <input
                type={showPwd ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="show-pwd"
                onClick={() => setShowPwd(!showPwd)}
                tabIndex={-1}
              >
                {showPwd ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar no painel →'}
          </button>
        </form>

        <p className="hint">
          Ainda sem conta?{' '}
          <span style={{ color: 'var(--text-muted)' }}>
            Crie pelo Supabase Dashboard → Authentication → Users
          </span>
        </p>
      </div>
    </div>
  );
}
