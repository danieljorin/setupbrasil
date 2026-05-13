import { createSupabaseServerClient } from '@/lib/supabase/server';
import PostEditor from '@/app/components/PostEditor';

export default async function NovoPostPage() {
  const supabase = createSupabaseServerClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  return <PostEditor categories={categories || []} />;
}
