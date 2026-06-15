-- =============================================
-- SETUPBRASIL — SCHEMA
-- Execute no Supabase: SQL Editor → New query
-- =============================================

-- CATEGORIAS
CREATE TABLE IF NOT EXISTS categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT '📦',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO categories (name, slug, icon, description) VALUES
  ('Monitores',  'monitores',  '🖥️', 'Reviews e comparativos de monitores'),
  ('Teclados',   'teclados',   '⌨️', 'Teclados mecânicos e de membrana'),
  ('Mouses',     'mouses',     '🖱️', 'Mouses gamer e de produtividade'),
  ('Cadeiras',   'cadeiras',   '🪑', 'Cadeiras gamer e ergonômicas'),
  ('Headsets',   'headsets',   '🎧', 'Fones e headsets'),
  ('Notebooks',  'notebooks',  '💻', 'Notebooks e laptops'),
  ('Acessórios', 'acessorios', '🔌', 'Hubs, cabos e acessórios'),
  ('Iluminação', 'iluminacao', '💡', 'Luminárias e iluminação para setup')
ON CONFLICT (slug) DO NOTHING;

-- POSTS
CREATE TABLE IF NOT EXISTS posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  category_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON posts;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Leitura pública
CREATE POLICY "Leitura pública categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Leitura pública posts"      ON posts      FOR SELECT USING (true);

-- Escrita apenas para usuários autenticados
CREATE POLICY "Admin categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin posts"      ON posts      FOR ALL USING (auth.role() = 'authenticated');
