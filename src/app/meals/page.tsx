import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/ui/Navbar'
import MealsClient from './MealsClient'

export default async function MealsPage() {
  const supabase = await createClient()
  const { data: meals } = await supabase
    .from('meals')
    .select('*')
    .order('name')

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <MealsClient initialMeals={meals ?? []} />
      </main>
    </div>
  )
}
