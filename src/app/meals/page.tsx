'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import BottomNav from '@/components/ui/BottomNav'
import AuthGuard from '@/components/ui/AuthGuard'
import MealsClient from './MealsClient'
import type { Meal } from '@/lib/types'

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient() as any
    supabase.from('meals').select('*').order('name').then(({ data }: any) => {
      setMeals(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0f1f0f] pb-24">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-500 text-sm">Loading meals...</p>
            </div>
          ) : (
            <MealsClient initialMeals={meals} />
          )}
        </div>
        <BottomNav />
      </div>
    </AuthGuard>
  )
}
