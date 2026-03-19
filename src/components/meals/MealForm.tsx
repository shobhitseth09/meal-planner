'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Meal, DietTag, Cuisine } from '@/lib/types'
import { ALL_CUISINES } from '@/lib/types'
import { Plus, X } from 'lucide-react'

const DIET_TAGS: { tag: DietTag; label: string }[] = [
  { tag: 'vegetarian',    label: '🌿 Vegetarian' },
  { tag: 'vegan',         label: '🌱 Vegan' },
  { tag: 'balanced',      label: '⚖️ Balanced' },
  { tag: 'light',         label: '🪶 Light' },
  { tag: 'high-protein',  label: '💪 High Protein' },
  { tag: 'protein-heavy', label: '🥩 Protein Heavy' },
  { tag: 'low-carb',      label: '🚫🍞 Low Carb' },
  { tag: 'carb-heavy',    label: '🍚 Carb Heavy' },
  { tag: 'fiber-rich',    label: '🥦 Fiber Rich' },
  { tag: 'low-fat',       label: '💧 Low Fat' },
  { tag: 'high-fat',      label: '🧈 High Fat' },
]

interface MealFormProps {
  meal?: Meal
  onSaved: () => void
  onCancel: () => void
}

export default function MealForm({ meal, onSaved, onCancel }: MealFormProps) {
  const [name, setName] = useState(meal?.name ?? '')
  const [description, setDescription] = useState(meal?.description ?? '')
  const [cuisine, setCuisine] = useState<Cuisine | ''>(meal?.cuisine ?? '')
  const [calories, setCalories] = useState(meal?.calories?.toString() ?? '')
  const [protein, setProtein] = useState(meal?.protein?.toString() ?? '')
  const [carbs, setCarbs] = useState(meal?.carbs?.toString() ?? '')
  const [fat, setFat] = useState(meal?.fat?.toString() ?? '')
  const [fiber, setFiber] = useState(meal?.fiber?.toString() ?? '')
  const [dietTags, setDietTags] = useState<DietTag[]>(meal?.diet_tags ?? [])
  const [ingredients, setIngredients] = useState<string[]>(meal?.ingredients ?? [])
  const [newIngredient, setNewIngredient] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = createClient() as any

  function toggleTag(tag: DietTag) {
    setDietTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  function addIngredient() {
    const val = newIngredient.trim()
    if (val && !ingredients.includes(val)) {
      setIngredients(prev => [...prev, val])
      setNewIngredient('')
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    setError('')

    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      cuisine: cuisine || null,
      calories: calories ? parseInt(calories) : null,
      protein: protein ? parseFloat(protein) : null,
      carbs: carbs ? parseFloat(carbs) : null,
      fat: fat ? parseFloat(fat) : null,
      fiber: fiber ? parseFloat(fiber) : null,
      diet_tags: dietTags,
      ingredients,
    }

    const { error } = meal
      ? await supabase.from('meals').update(payload).eq('id', meal.id)
      : await supabase.from('meals').insert(payload)

    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      onSaved()
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Meal name *</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          placeholder="e.g. Palak Paneer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
        <select
          value={cuisine}
          onChange={e => setCuisine(e.target.value as Cuisine)}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm bg-white"
        >
          <option value="">Select cuisine...</option>
          {ALL_CUISINES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
          className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm resize-none"
          placeholder="Optional notes"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nutrition (per serving)</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Calories (kcal)', value: calories, set: setCalories },
            { label: 'Protein (g)',      value: protein,  set: setProtein },
            { label: 'Carbs (g)',        value: carbs,    set: setCarbs },
            { label: 'Fat (g)',          value: fat,      set: setFat },
            { label: 'Fiber (g)',        value: fiber,    set: setFiber },
          ].map(({ label, value, set }) => (
            <div key={label}>
              <label className="block text-xs text-gray-500 mb-1">{label}</label>
              <input
                type="number" min="0" value={value}
                onChange={e => set(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                placeholder="0"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
        <div className="flex flex-wrap gap-2">
          {DIET_TAGS.map(({ tag, label }) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                dietTags.includes(tag)
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
        <div className="flex gap-2 mb-2">
          <input
            value={newIngredient}
            onChange={e => setNewIngredient(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addIngredient() } }}
            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
            placeholder="Add ingredient"
          />
          <button type="button" onClick={addIngredient} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl">
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ingredients.map(ing => (
            <span key={ing} className="flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
              {ing}
              <button type="button" onClick={() => setIngredients(prev => prev.filter(x => x !== ing))}>
                <X size={12} className="text-gray-400 hover:text-gray-600" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button type="submit" disabled={saving}
          className="flex-1 py-2.5 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors">
          {saving ? 'Saving...' : meal ? 'Update meal' : 'Add meal'}
        </button>
      </div>
    </form>
  )
}
