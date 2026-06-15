import { createSupabaseServerClient } from '@/lib/supabase/server'
import PostEditor from '@/components/PostEditor'

export default async function NovoPostPage() {
  const supabase = createSupabaseServerClient()
  const { data: categories } = await supabase.from('categories').select('id, name').order('name')
  return <PostEditor categories={categories || []} />
}
