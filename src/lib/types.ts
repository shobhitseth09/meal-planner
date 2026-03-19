export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export type DietTag =
  | 'balanced' | 'low-carb' | 'high-protein' | 'light' | 'vegetarian' | 'vegan'
  | 'carb-heavy' | 'protein-heavy' | 'fiber-rich' | 'low-fat' | 'high-fat'

export type Cuisine =
  | 'North Indian' | 'South Indian' | 'Punjabi' | 'Rajasthani'
  | 'Gujarati' | 'Maharashtrian' | 'Indo-Chinese' | 'Italian'
  | 'Street Food' | 'Continental'

export const ALL_CUISINES: Cuisine[] = [
  'North Indian', 'South Indian', 'Punjabi', 'Rajasthani',
  'Gujarati', 'Maharashtrian', 'Indo-Chinese', 'Italian',
  'Street Food', 'Continental',
]

export interface Meal {
  id: string
  name: string
  description: string | null
  calories: number | null
  protein: number | null
  carbs: number | null
  fat: number | null
  diet_tags: DietTag[]
  ingredients: string[]
  cuisine: Cuisine | null
  fiber: number | null
  suitable_for: MealType[]
  food_category: 'base' | 'curry' | 'dal' | 'standalone' | 'salad' | 'raita' | 'snack' | 'soup' | 'other' | null
  created_at: string
}

export interface MealPlanEntry {
  id: string
  plan_date: string
  meal_type: MealType
  meal_id: string | null
  custom_meal_name: string | null
  notes: string | null
  item_order: number
  meal?: Meal
}

export interface DayPlan {
  date: string
  entries: Record<MealType, MealPlanEntry | null>
}
