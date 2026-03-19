'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useActiveUser } from '@/lib/user-context'
import { getGreeting, getTimeOfDay, getNoMealMessage, getSpecialFoodMessage, weekComplete } from '@/lib/messages'
import BottomNav from '@/components/ui/BottomNav'
import AuthGuard from '@/components/ui/AuthGuard'
import { format, addDays } from 'date-fns'
import { Flame, Beef, Wheat, Droplets, CalendarDays, ChevronRight, Zap } from 'lucide-react'
import type { MealPlanEntry, Meal } from '@/lib/types'
import Image from 'next/image'

const MEAL_EMOJI: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
}

export default function HomePage() {
  const { activeUser } = useActiveUser()
  const [todayEntries, setTodayEntries] = useState<MealPlanEntry[]>([])
  const [tomorrowEntries, setTomorrowEntries] = useState<MealPlanEntry[]>([])
  const [weekEntries, setWeekEntries] = useState<MealPlanEntry[]>([])
  const [greeting, setGreeting] = useState('')
  const [specialMessage, setSpecialMessage] = useState<string | null>(null)
  const router = useRouter()

  const today = format(new Date(), 'yyyy-MM-dd')
  const tomorrow = format(addDays(new Date(), 1), 'yyyy-MM-dd')

  useEffect(() => {
    if (!activeUser) return
    setGreeting(getGreeting(activeUser, getTimeOfDay()))

    const supabase = createClient() as any
    supabase
      .from('meal_plan')
      .select('*, meal:meals(*)')
      .gte('plan_date', today)
      .lte('plan_date', format(addDays(new Date(), 6), 'yyyy-MM-dd'))
      .then(({ data }: any) => {
        const all = data ?? []
        const todayData = all.filter((e: MealPlanEntry) => e.plan_date === today)
        const tomorrowData = all.filter((e: MealPlanEntry) => e.plan_date === tomorrow)
        setTodayEntries(todayData)
        setTomorrowEntries(tomorrowData)
        setWeekEntries(all)

        // Check for special food messages
        for (const entry of todayData) {
          const name = entry.meal?.name ?? entry.custom_meal_name ?? ''
          const msg = getSpecialFoodMessage(activeUser, name)
          if (msg) { setSpecialMessage(msg); break }
        }
      })
  }, [activeUser, today, tomorrow])

  // Calorie totals
  const todayCalories = todayEntries.reduce((s, e) => s + (e.meal?.calories ?? 0), 0)
  const todayProtein = todayEntries.reduce((s, e) => s + (e.meal?.protein ?? 0), 0)
  const todayCarbs = todayEntries.reduce((s, e) => s + (e.meal?.carbs ?? 0), 0)
  const todayFat = todayEntries.reduce((s, e) => s + (e.meal?.fat ?? 0), 0)
  const calorieTarget = 1150
  const caloriePercent = Math.min((todayCalories / calorieTarget) * 100, 100)

  // Week stats
  const plannedDays = new Set(weekEntries.map(e => e.plan_date)).size
  const isWeekComplete = plannedDays >= 7

  // Group today's entries by meal type
  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack']
  const todayByType: Record<string, MealPlanEntry[]> = {}
  mealTypes.forEach(mt => {
    todayByType[mt] = todayEntries.filter(e => e.meal_type === mt)
  })

  const getMealName = (entry: MealPlanEntry) => entry.meal?.name ?? entry.custom_meal_name ?? ''

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0f1f0f] pb-24">

        {/* Hero banner */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src="/couple.jpg"
            alt="Shobhit & Vidhi"
            fill
            className="object-cover object-center"
            style={{ transform: 'rotate(90deg) scale(1.6)', transformOrigin: 'center' }}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-[#0f1f0f]" />

          {/* Greeting overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-lg leading-snug drop-shadow-lg">
              {greeting || `Hey ${activeUser}! 👋`}
            </p>
          </div>
        </div>

        <div className="px-4 space-y-4 mt-2">

          {/* Special food message */}
          {specialMessage && (
            <div className="bg-green-900/40 border border-green-700/50 rounded-2xl px-4 py-3">
              <p className="text-green-300 text-sm">{specialMessage}</p>
            </div>
          )}

          {/* Week complete banner */}
          {isWeekComplete && (
            <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-2xl px-4 py-3">
              <p className="text-yellow-300 text-sm">
                {weekComplete[Math.floor(Math.random() * weekComplete.length)]}
              </p>
            </div>
          )}

          {/* Today's calories card */}
          <div className="bg-[#1a2e1a] rounded-2xl p-4 border border-green-900/40">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">Today's Calories</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-white text-3xl font-bold">{todayCalories}</span>
                  <span className="text-gray-500 text-sm">/ {calorieTarget} kcal</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-full border-4 border-green-800 flex items-center justify-center" style={{
                background: `conic-gradient(#22c55e ${caloriePercent * 3.6}deg, #1a2e1a 0deg)`
              }}>
                <span className="text-white text-xs font-bold">{Math.round(caloriePercent)}%</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-green-900/50 rounded-full mb-3">
              <div
                className="h-full bg-green-500 rounded-full transition-all"
                style={{ width: `${caloriePercent}%` }}
              />
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Protein', value: todayProtein, unit: 'g', icon: <Beef size={11} className="text-red-400" /> },
                { label: 'Carbs', value: todayCarbs, unit: 'g', icon: <Wheat size={11} className="text-yellow-400" /> },
                { label: 'Fat', value: todayFat, unit: 'g', icon: <Droplets size={11} className="text-blue-400" /> },
              ].map(({ label, value, unit, icon }) => (
                <div key={label} className="bg-[#0f1f0f]/60 rounded-xl p-2.5 text-center">
                  <div className="flex items-center justify-center gap-1 mb-0.5">{icon}<span className="text-gray-500 text-xs">{label}</span></div>
                  <p className="text-white text-sm font-semibold">{Math.round(value)}{unit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's meals */}
          <div className="bg-[#1a2e1a] rounded-2xl p-4 border border-green-900/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white font-semibold">Today's Meals</p>
              <button
                onClick={() => router.push('/planner')}
                className="flex items-center gap-1 text-green-400 text-xs"
              >
                Edit plan <ChevronRight size={12} />
              </button>
            </div>

            <div className="space-y-2">
              {mealTypes.map(mt => {
                const items = todayByType[mt]
                const hasItems = items.length > 0
                return (
                  <div key={mt} className="flex items-start gap-3">
                    <span className="text-base mt-0.5">{MEAL_EMOJI[mt]}</span>
                    <div className="flex-1">
                      <p className="text-gray-500 text-xs capitalize">{mt}</p>
                      {hasItems ? (
                        <p className="text-white text-sm">
                          {items.map(e => getMealName(e)).join(' + ')}
                        </p>
                      ) : (
                        <p className="text-gray-600 text-sm italic">
                          {getNoMealMessage(activeUser!).slice(0, 50)}...
                        </p>
                      )}
                    </div>
                    {hasItems && items[0].meal?.calories && (
                      <span className="text-gray-500 text-xs mt-1">
                        {items.reduce((s, e) => s + (e.meal?.calories ?? 0), 0)} kcal
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tomorrow preview */}
          {tomorrowEntries.length > 0 && (
            <div className="bg-[#1a2e1a] rounded-2xl p-4 border border-green-900/40">
              <p className="text-white font-semibold mb-3">Tomorrow's Plan 👀</p>
              <div className="space-y-2">
                {mealTypes.map(mt => {
                  const items = tomorrowEntries.filter(e => e.meal_type === mt)
                  if (!items.length) return null
                  return (
                    <div key={mt} className="flex items-center gap-3">
                      <span className="text-base">{MEAL_EMOJI[mt]}</span>
                      <div className="flex-1">
                        <p className="text-gray-500 text-xs capitalize">{mt}</p>
                        <p className="text-white text-sm">{items.map(e => getMealName(e)).join(' + ')}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Weekly progress */}
          <div className="bg-[#1a2e1a] rounded-2xl p-4 border border-green-900/40">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white font-semibold">This Week</p>
              <button onClick={() => router.push('/planner')} className="flex items-center gap-1 text-green-400 text-xs">
                Plan week <ChevronRight size={12} />
              </button>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 7 }, (_, i) => {
                const date = format(addDays(new Date(), i - new Date().getDay() + 1), 'yyyy-MM-dd')
                const hasEntries = weekEntries.some(e => e.plan_date === date)
                const isToday = date === today
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-gray-500 text-xs">{['M','T','W','T','F','S','S'][i]}</span>
                    <div className={`w-full h-1.5 rounded-full ${
                      hasEntries ? 'bg-green-500' : 'bg-green-900/50'
                    } ${isToday ? 'ring-1 ring-green-400' : ''}`} />
                  </div>
                )
              })}
            </div>
            <p className="text-gray-500 text-xs mt-2">{plannedDays}/7 days planned</p>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => router.push('/planner')}
              className="bg-green-700 hover:bg-green-600 rounded-2xl p-4 flex items-center gap-3 transition-colors"
            >
              <CalendarDays size={20} className="text-white" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Plan Week</p>
                <p className="text-green-200 text-xs">Schedule meals</p>
              </div>
            </button>
            <button
              onClick={() => router.push('/meals')}
              className="bg-[#1a2e1a] border border-green-900/40 hover:border-green-700 rounded-2xl p-4 flex items-center gap-3 transition-colors"
            >
              <Zap size={20} className="text-green-400" />
              <div className="text-left">
                <p className="text-white font-semibold text-sm">Meal Library</p>
                <p className="text-gray-500 text-xs">Browse & add</p>
              </div>
            </button>
          </div>

        </div>
      </div>
      <BottomNav />
    </AuthGuard>
  )
}
