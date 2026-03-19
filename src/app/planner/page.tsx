import { createClient } from '@/lib/supabase-server'
import Navbar from '@/components/ui/Navbar'
import WeeklyPlanner from '@/components/planner/WeeklyPlanner'
import { startOfWeek, endOfWeek, format } from 'date-fns'

export default async function PlannerPage() {
  const supabase = await createClient()

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

  const [{ data: meals }, { data: entries }] = await Promise.all([
    supabase.from('meals').select('*').order('name'),
    supabase
      .from('meal_plan')
      .select('*, meal:meals(*)')
      .gte('plan_date', format(weekStart, 'yyyy-MM-dd'))
      .lte('plan_date', format(weekEnd, 'yyyy-MM-dd')),
  ])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-6">
        <WeeklyPlanner
          meals={meals ?? []}
          initialEntries={entries ?? []}
        />
      </main>
    </div>
  )
}
