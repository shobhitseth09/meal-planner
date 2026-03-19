'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import BottomNav from '@/components/ui/BottomNav'
import AuthGuard from '@/components/ui/AuthGuard'
import WeeklyPlanner from '@/components/planner/WeeklyPlanner'
import { startOfWeek, endOfWeek, format } from 'date-fns'
import type { Meal, MealPlanEntry } from '@/lib/types'

export default function PlannerPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [entries, setEntries] = useState<MealPlanEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient() as any
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 })

    Promise.all([
      supabase.from('meals').select('*').order('name'),
      supabase.from('meal_plan')
        .select('*, meal:meals(*)')
        .gte('plan_date', format(weekStart, 'yyyy-MM-dd'))
        .lte('plan_date', format(weekEnd, 'yyyy-MM-dd')),
    ]).then(([{ data: mealsData }, { data: entriesData }]: any) => {
      setMeals(mealsData ?? [])
      setEntries(entriesData ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0f1f0f] pb-24">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500 text-sm">Loading your plan...</p>
            </div>
          ) : (
            <WeeklyPlanner meals={meals} initialEntries={entries} />
          )}
        </div>
        <BottomNav />
      </div>
    </AuthGuard>
  )
}
