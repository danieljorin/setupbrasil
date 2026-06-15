import { createSupabaseServerClient } from '@/lib/supabase/server'
import { saveCategory, deleteCategory } from '@/actions'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriasPage() {
  const supabase = createSupabaseServerClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*, posts(count)')
    .order('name')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categorias</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{categories?.length || 0} categorias</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lista */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">Categorias existentes</h2>
          </div>
          {categories && categories.length > 0 ? (
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories.map((cat) => (
                <div key={cat.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{cat.name}</p>
                      <p className="text-xs text-gray-400">/{cat.slug}</p>
                    </div>
                  </div>
                  <form action={deleteCategory.bind(null, cat.id)}>
                    <button
                      type="submit"
                      onClick={(e) => { if (!confirm(`Deletar "${cat.name}"?`)) e.preventDefault() }}
                      className="text-xs px-3 py-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      Deletar
                    </button>
                  </form>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">Nenhuma categoria</div>
          )}
        </div>

        {/* Formulário nova categoria */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Nova categoria</h2>
          <form action={saveCategory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="name" required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ex: Monitores"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text" name="slug" required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-sm"
                placeholder="monitores"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ícone (emoji)</label>
              <input
                type="text" name="icon" defaultValue="📦"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
              <input
                type="text" name="description"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Breve descrição"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#ff5722' }}
            >
              Criar categoria
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
