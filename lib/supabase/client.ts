import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_icon: string;
  cover_gradient: string;
  category_id: number | null;
  status: 'draft' | 'published' | 'scheduled';
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
  views: number;
  reading_time: number;
  rating: number;
  meta_title: string | null;
  meta_description: string | null;
  author_name: string;
  category?: Category;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
};
