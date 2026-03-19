'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Meal } from '@/lib/types'
import { ALL_CUISINES } from '@/lib/types'
import Modal from '@/components/ui/Modal'
import MealForm from '@/components/meals/MealForm'
import { Plus, Pencil, Trash2, Search, Flame, Beef, Wheat, Droplets } from 'lucide-react'

const CUISINE_EMOJI: Record<string, string> = {
  'North Indian': '🍛',
  'South Indian': '🥘',
  'Punjabi': '🫓',
  'Rajasthani': '🏜️',
  'Gujarati': '🥗',
  'Maharashtrian': '🌶️',
  'Indo-Chinese': '🥢',
  'Italian': '🍝',
  'Street Food': '🛺',
  'Continental': '🥙',
}

interface MealsClientProps {
  initialMeals: Meal[]
}

export default function MealsClient({ initialMeals }: MealsClientProps) {
  const [meals, setMeals] = useState<Meal[]>(initialMeals)
  const [search, setSearch] = useState('')
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState<Meal | undefined>()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  const filtered = meals.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchesCuisine = !selectedCuisine || m.cuisine === selectedCuisine
    return matchesSearch && matchesCuisine
  })

  const cuisinesInUse = Array.from(new Set(meals.map(m => m.cuisine).filter(Boolean)))

  async function handleDelete(meal: Meal) {
    if (!confirm(`Delete "${meal.name}"?`)) return
    await supabase.from('meals').delete().eq('id', meal.id)
    setMeals(prev => prev.filter(m => m.id !== meal.id))
  }

  async function refreshMeals() {
    const { data } = await supabase.from('meals').select('*').order('name')
    setMeals(data ?? [])
    setModalOpen(false)
    setEditingMeal(undefined)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold">Meal Library</h1>
          <p className="text-gray-500 text-sm">{meals.length} meals saved</p>
        </div>
        <button
          onClick={() => { setEditingMeal(undefined); setModalOpen(true) }}
          className="flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add meal
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-3">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search meals..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
        />
      </div>

      {/* Cuisine filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedCuisine(null)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !selectedCuisine ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {cuisinesInUse.map(cuisine => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(selectedCuisine === cuisine ? null : cuisine)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCuisine === cuisine ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {CUISINE_EMOJI[cuisine!] ?? ''} {cuisine}
          </button>
        ))}
      </div>

      {/* Meal grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-4xl mb-3">🥗</div>
          <p className="font-medium">{search || selectedCuisine ? 'No meals match your filter' : 'No meals yet'}</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map(meal => (
            <div key={meal.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-1">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1a1a1a] truncate">{meal.name}</h3>
                  {meal.cuisine && (
                    <span className="text-xs text-gray-400">
                      {CUISINE_EMOJI[meal.cuisine] ?? ''} {meal.cuisine}
                    </span>
                  )}
                </div>
                <div className="flex gap-1 ml-2 shrink-0">
                  <button
                    onClick={() => { setEditingMeal(meal); setModalOpen(true) }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(meal)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {meal.calories && (
                <div className="flex gap-3 text-xs text-gray-500 mt-2">
                  <span className="flex items-center gap-1"><Flame size={11} className="text-orange-400" />{meal.calories} kcal</span>
                  {meal.protein && <span className="flex items-center gap-1"><Beef size={11} className="text-red-400" />{meal.protein}g P</span>}
                  {meal.carbs && <span className="flex items-center gap-1"><Wheat size={11} className="text-yellow-500" />{meal.carbs}g C</span>}
                  {meal.fat && <span className="flex items-center gap-1"><Droplets size={11} className="text-blue-400" />{meal.fat}g F</span>}
                </div>
              )}

              {meal.diet_tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {meal.diet_tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingMeal(undefined) }}
        title={editingMeal ? 'Edit meal' : 'Add new meal'}
      >
        <MealForm
          meal={editingMeal}
          onSaved={refreshMeals}
          onCancel={() => { setModalOpen(false); setEditingMeal(undefined) }}
        />
      </Modal>
    </>
  )
}
