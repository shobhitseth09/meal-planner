'use client'

import { useState } from 'react'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'
import { createClient } from '@/lib/supabase'
import type { Meal, MealType, MealPlanEntry } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import MealPicker from './MealPicker'
import { ChevronLeft, ChevronRight, Share2, Plus, Flame, X, RefreshCw } from 'lucide-react'

const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack']
const MEAL_TYPE_EMOJI: Record<MealType, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
}
const MEAL_TYPE_LABEL: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

interface WeeklyPlannerProps {
  meals: Meal[]
  initialEntries: MealPlanEntry[]
}

export default function WeeklyPlanner({ meals, initialEntries }: WeeklyPlannerProps) {
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [entries, setEntries] = useState<MealPlanEntry[]>(initialEntries)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<{ date: string; mealType: MealType } | null>(null)
  const [replacingEntry, setReplacingEntry] = useState<MealPlanEntry | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  function getSlotEntries(date: Date, mealType: MealType): MealPlanEntry[] {
    const dateStr = format(date, 'yyyy-MM-dd')
    return entries
      .filter(e => e.plan_date === dateStr && e.meal_type === mealType)
      .sort((a, b) => a.item_order - b.item_order)
  }

  function getItemName(entry: MealPlanEntry): string {
    if (entry.meal) return entry.meal.name
    if (entry.custom_meal_name) return entry.custom_meal_name
    return ''
  }

  function openPicker(date: Date, mealType: MealType) {
    setPickerTarget({ date: format(date, 'yyyy-MM-dd'), mealType })
    setPickerOpen(true)
  }

  async function handleAdd(meal: Meal | null, customName?: string) {
    if (!pickerTarget) return
    const { date, mealType } = pickerTarget

    // Replace mode — update existing entry
    if (replacingEntry) {
      const { data } = await supabase
        .from('meal_plan')
        .update({
          meal_id: meal?.id ?? null,
          custom_meal_name: customName ?? null,
        })
        .eq('id', replacingEntry.id)
        .select('*, meal:meals(*)')
        .single()

      if (data) {
        setEntries(prev => prev.map(e => e.id === replacingEntry.id ? data : e))
      }
      setReplacingEntry(null)
    } else {
      // Add new item
      const existing = entries.filter(e => e.plan_date === date && e.meal_type === mealType)
      const nextOrder = existing.length

      const { data } = await supabase
        .from('meal_plan')
        .insert({
          plan_date: date,
          meal_type: mealType,
          meal_id: meal?.id ?? null,
          custom_meal_name: customName ?? null,
          notes: null,
          item_order: nextOrder,
        })
        .select('*, meal:meals(*)')
        .single()

      if (data) {
        setEntries(prev => [...prev, data])
      }
    }

    setPickerOpen(false)
    setPickerTarget(null)
  }

  function openReplace(entry: MealPlanEntry) {
    setReplacingEntry(entry)
    setPickerTarget({ date: entry.plan_date, mealType: entry.meal_type })
    setPickerOpen(true)
  }

  async function handleRemoveEntry(entry: MealPlanEntry) {
    await supabase.from('meal_plan').delete().eq('id', entry.id)
    setEntries(prev => prev.filter(e => e.id !== entry.id))
  }

  function getDayCalories(date: Date): number {
    return MEAL_TYPES.flatMap(mt => getSlotEntries(date, mt))
      .reduce((sum, entry) => sum + (entry.meal?.calories ?? 0), 0)
  }

  function handleShareWeek() {
    const lines: string[] = [`📅 *Meal Plan: Week of ${format(weekStart, 'dd MMM yyyy')}*\n`]
    days.forEach(day => {
      lines.push(`*${format(day, 'EEEE, dd MMM')}*`)
      MEAL_TYPES.forEach(mt => {
        const slotEntries = getSlotEntries(day, mt)
        if (slotEntries.length > 0) {
          const names = slotEntries.map(e => getItemName(e)).join(' + ')
          lines.push(`  ${MEAL_TYPE_EMOJI[mt]} ${MEAL_TYPE_LABEL[mt]}: ${names}`)
        }
      })
      const cal = getDayCalories(day)
      if (cal > 0) lines.push(`  🔥 ${cal} kcal`)
      lines.push('')
    })

    const text = lines.join('\n')
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  const today = new Date()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Weekly Planner</h1>
          <p className="text-gray-500 text-sm">{format(weekStart, 'dd MMM')} – {format(addDays(weekStart, 6), 'dd MMM yyyy')}</p>
        </div>
        <button
          onClick={handleShareWeek}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Share2 size={14} />
          Share
        </button>
      </div>

      {/* Week navigation */}
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setWeekStart(d => addDays(d, -7))}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))}
          className="flex-1 text-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
        >
          This week
        </button>
        <button onClick={() => setWeekStart(d => addDays(d, 7))}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Days */}
      <div className="space-y-3">
        {days.map(day => {
          const isToday = isSameDay(day, today)
          const totalCal = getDayCalories(day)

          return (
            <div key={day.toISOString()}
              className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${isToday ? 'border-green-300' : 'border-gray-100'}`}
            >
              {/* Day header */}
              <div className={`px-4 py-2.5 flex items-center justify-between ${isToday ? 'bg-green-50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${isToday ? 'text-green-700' : 'text-gray-700'}`}>
                    {format(day, 'EEEE')}
                  </span>
                  <span className={`text-xs ${isToday ? 'text-green-500' : 'text-gray-400'}`}>
                    {format(day, 'dd MMM')}
                  </span>
                  {isToday && <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">Today</span>}
                </div>
                {totalCal > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Flame size={11} className="text-orange-400" />
                    {totalCal} kcal
                  </span>
                )}
              </div>

              {/* Meal slots */}
              <div className="divide-y divide-gray-50">
                {MEAL_TYPES.map(mealType => {
                  const slotEntries = getSlotEntries(day, mealType)

                  return (
                    <div key={mealType} className="px-4 py-2.5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-base w-5 text-center">{MEAL_TYPE_EMOJI[mealType]}</span>
                        <span className="text-xs text-gray-400 font-medium">{MEAL_TYPE_LABEL[mealType]}</span>
                        <button
                          onClick={() => openPicker(day, mealType)}
                          className="ml-auto p-1 rounded-lg text-gray-300 hover:text-green-500 hover:bg-green-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {slotEntries.length === 0 ? (
                        <button
                          onClick={() => openPicker(day, mealType)}
                          className="w-full text-left text-xs text-gray-300 hover:text-green-500 transition-colors pl-7"
                        >
                          + Add item
                        </button>
                      ) : (
                        <div className="space-y-1.5 pl-7">
                          {slotEntries.map(entry => (
                            <div key={entry.id} className="flex items-center justify-between gap-2">
                              <div className="min-w-0 flex-1">
                                <span className="text-sm font-medium text-[#1a1a1a] truncate block">
                                  {getItemName(entry)}
                                </span>
                                {entry.meal?.calories && (
                                  <span className="text-xs text-gray-400">{entry.meal.calories} kcal</span>
                                )}
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <button
                                  onClick={() => openReplace(entry)}
                                  title="Swap meal"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors"
                                >
                                  <RefreshCw size={12} />
                                </button>
                                <button
                                  onClick={() => handleRemoveEntry(entry)}
                                  title="Remove"
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Picker modal */}
      <Modal
        open={pickerOpen}
        onClose={() => { setPickerOpen(false); setPickerTarget(null); setReplacingEntry(null) }}
        title={replacingEntry ? `Swap: ${getItemName(replacingEntry)}` : 'Add to meal'}
      >
        {pickerTarget && (
          <MealPicker
            meals={meals}
            mealType={pickerTarget.mealType}
            existingEntries={entries.filter(e =>
              e.plan_date === pickerTarget.date && e.meal_type === pickerTarget.mealType
            )}
            onAdd={handleAdd}
            onClose={() => { setPickerOpen(false); setPickerTarget(null) }}
          />
        )}
      </Modal>
    </div>
  )
}
