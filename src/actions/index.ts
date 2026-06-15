'use server'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// ---- AUTH ----

export async function login(formData: FormData) {
  const supabase = createSupabaseServerClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/admin')
}

export async function logout() {
  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/login')
}

// ---- POSTS ----

export async function savePost(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const id = formData.get('id') as string
  const data = {
    title: formData.get('title') as string,
    slug: formData.get('slug') as string,
    excerpt: formData.get('excerpt') as string,
    content: formData.get('content') as string,
    cover_image: formData.get('cover_image') as string,
    category_id: formData.get('category_id') ? Number(formData.get('category_id')) : null,
    published: formData.get('published') === 'true',
    featured: formData.get('featured') === 'true',
  }

  if (id) {
    await supabase.from('posts').update(data).eq('id', id)
  } else {
    await supabase.from('posts').insert(data)
  }

  revalidatePath('/')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

export async function deletePost(id: number) {
  const supabase = createSupabaseServerClient()
  await supabase.from('posts').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin/posts')
  redirect('/admin/posts')
}

// ---- CATEGORIAS ----

export async function saveCategory(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const id = formData.get('id') as string
  const data = {
    name: formData.get('name') as string,
    slug: formData.get('slug') as string,
    icon: formData.get('icon') as string,
    description: formData.get('description') as string,
  }

  if (id) {
    await supabase.from('categories').update(data).eq('id', id)
  } else {
    await supabase.from('categories').insert(data)
  }

  revalidatePath('/admin/categorias')
  redirect('/admin/categorias')
}

export async function deleteCategory(id: number) {
  const supabase = createSupabaseServerClient()
  await supabase.from('categories').delete().eq('id', id)
  revalidatePath('/admin/categorias')
  redirect('/admin/categorias')
}
