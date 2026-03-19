'use client'

import { useState } from 'react'
import type { Meal, MealType, MealPlanEntry } from '@/lib/types'
import { Search, Shuffle, Plus } from 'lucide-react'

interface MealPickerProps {
  meals: Meal[]
  mealType: MealType
  existingEntries: MealPlanEntry[]  // already added items in this slot
  onAdd: (meal: Meal | null, customName?: string) => void
  onClose: () => void
}

const MEAL_TYPE_LABELS: Record<MealType, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snack: 'Snack',
}

type FoodCategory = Meal['food_category']

// Pairing rules: given what's already in the slot, what categories make sense to add next
function getSuggestedCategories(existingCategories: FoodCategory[]): FoodCategory[] | null {
  const has = (c: FoodCategory) => existingCategories.includes(c)

  // Slot is empty — anything goes
  if (existingCategories.length === 0) return null

  // Already has a standalone — only allow raita/salad/soup alongside
  if (has('standalone')) return ['raita', 'salad', 'soup']

  // Has curry but no base → strongly suggest base or dal
  if (has('curry') && !has('base') && !has('dal')) return ['base', 'dal', 'raita', 'salad']

  // Has dal but no base → suggest base or curry
  if (has('dal') && !has('base') && !has('curry')) return ['base', 'curry', 'raita', 'salad']

  // Has base but no curry/dal → suggest curry or dal
  if (has('base') && !has('curry') && !has('dal')) return ['curry', 'dal']

  // Has base + curry → suggest dal or raita/salad
  if (has('base') && has('curry') && !has('dal')) return ['dal', 'raita', 'salad']

  // Has base + dal → suggest curry or raita
  if (has('base') && has('dal') && !has('curry')) return ['curry', 'raita', 'salad']

  // Has everything → only accompaniments
  return ['raita', 'salad', 'soup']
}

function getCategoryLabel(cats: FoodCategory[]): string {
  const labels: Record<string, string> = {
    base: 'roti/rice',
    curry: 'sabzi/curry',
    dal: 'dal',
    raita: 'raita',
    salad: 'salad',
    soup: 'soup',
  }
  return cats.map(c => labels[c!] ?? c).join(' or ')
}

export default function MealPicker({ meals, mealType, existingEntries, onAdd, onClose }: MealPickerProps) {
  const [search, setSearch] = useState('')
  const [customMode, setCustomMode] = useState(false)
  const [customName, setCustomName] = useState('')

  // Get categories already in this slot
  const existingCategories = existingEntries
    .map(e => e.meal?.food_category ?? null)
    .filter(Boolean) as FoodCategory[]

  const suggestedCategories = getSuggestedCategories(existingCategories)

  // Filter meals suitable for this meal type
  const suitableMeals = meals.filter(m =>
    !m.suitable_for?.length || m.suitable_for.includes(mealType)
  )

  // Apply pairing filter if we have context
  const pairedMeals = suggestedCategories
    ? suitableMeals.filter(m => suggestedCategories.includes(m.food_category))
    : suitableMeals

  // Apply search on top
  const filtered = pairedMeals.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  // Also show non-paired results when searching (so user can override)
  const allSearched = search
    ? suitableMeals.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    : []
  const extraResults = allSearched.filter(m => !filtered.find(f => f.id === m.id))

  function handleSurprise() {
    if (pairedMeals.length === 0) return
    const pick = pairedMeals[Math.floor(Math.random() * pairedMeals.length)]
    onAdd(pick)
  }

  function handleCustomSave() {
    if (customName.trim()) {
      onAdd(null, customName.trim())
      setCustomName('')
      setCustomMode(false)
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Add to <span className="font-medium text-gray-300">{MEAL_TYPE_LABELS[mealType]}</span>
        </p>
        {suggestedCategories && (
          <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-full">
            Suggest: {getCategoryLabel(suggestedCategories)}
          </span>
        )}
      </div>

      {!customMode ? (
        <>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search meals..."
                autoFocus
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-green-800/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-[#0f1f0f] text-white placeholder-gray-600"
              />
            </div>
            <button
              onClick={handleSurprise}
              title="Surprise me with a smart suggestion!"
              className="px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors flex items-center gap-1 text-xs font-medium shrink-0"
            >
              <Shuffle size={14} />
              Surprise
            </button>
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto">
            {filtered.length === 0 && !search ? (
              <p className="text-center text-gray-500 text-sm py-6">No suggestions — try searching</p>
            ) : (
              <>
                {filtered.map(meal => (
                  <MealOption key={meal.id} meal={meal} onAdd={onAdd} />
                ))}

                {/* Show other results below a divider when searching */}
                {extraResults.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 py-1">
                      <div className="flex-1 h-px bg-green-900/40" />
                      <span className="text-xs text-gray-500">Other results</span>
                      <div className="flex-1 h-px bg-green-900/40" />
                    </div>
                    {extraResults.map(meal => (
                      <MealOption key={meal.id} meal={meal} onAdd={onAdd} muted />
                    ))}
                  </>
                )}
              </>
            )}
          </div>

          <div className="border-t border-green-900/40 pt-3">
            <button
              onClick={() => setCustomMode(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 border border-dashed border-green-800/50 text-gray-500 hover:border-green-400 hover:text-green-600 rounded-xl text-sm transition-colors"
            >
              <Plus size={14} />
              Add custom item
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <input
            value={customName}
            onChange={e => setCustomName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCustomSave() }}
            placeholder="e.g. Leftover khichdi"
            autoFocus
            className="w-full px-3 py-2.5 rounded-xl border border-green-800/50 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-[#0f1f0f] text-white placeholder-gray-600"
          />
          <div className="flex gap-2">
            <button onClick={() => setCustomMode(false)}
              className="flex-1 py-2 border border-green-800/50 text-gray-400 rounded-xl text-sm hover:bg-green-900/20 transition-colors">
              Back
            </button>
            <button onClick={handleCustomSave} disabled={!customName.trim()}
              className="flex-1 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-xl text-sm transition-colors">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function MealOption({ meal, onAdd, muted = false }: { meal: Meal; onAdd: (m: Meal) => void; muted?: boolean }) {
  return (
    <button
      onClick={() => onAdd(meal)}
      className={`w-full text-left px-3 py-2.5 rounded-xl border transition-colors ${
        muted
          ? 'border-green-900/40 bg-[#1a2e1a] hover:border-green-800/50 opacity-60'
          : 'border-green-900/40 hover:border-green-600 hover:bg-green-900/30 bg-[#1a2e1a]'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-white">{meal.name}</span>
        {meal.cuisine && <span className="text-xs text-gray-500">{meal.cuisine}</span>}
      </div>
      {meal.calories && (
        <div className="text-xs text-gray-500 mt-0.5">
          {meal.calories} kcal
          {meal.protein ? ` · ${meal.protein}g P` : ''}
          {meal.carbs ? ` · ${meal.carbs}g C` : ''}
          {meal.fat ? ` · ${meal.fat}g F` : ''}
        </div>
      )}
    </button>
  )
}
