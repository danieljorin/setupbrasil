import { notFound } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import PostEditor from '@/app/components/PostEditor';

export default async function EditarPostPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();

  const [{ data: post }, { data: categories }] = await Promise.all([
    supabase.from('posts').select('*').eq('id', params.id).single(),
    supabase.from('categories').select('*').order('name'),
  ]);

  if (!post) notFound();

  return <PostEditor post={post} categories={categories || []} />;
}
