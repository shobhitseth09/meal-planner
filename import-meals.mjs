import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://lgirceiwqqphdmyvacfl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXJjZWl3cXFwaGRteXZhY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDgyNTAsImV4cCI6MjA4OTQ4NDI1MH0.N0QO0P3kBp7HM-xMn-WX8K_EZzcCw-k4GqaHYmgAgpY'
)

const meals = [
  // Breakfast
  { name: 'Vegetable Poha', diet_tags: ['vegetarian', 'light'] },
  { name: 'Dosa', diet_tags: ['vegetarian'] },
  { name: 'Idli Sambar', diet_tags: ['vegetarian', 'light'] },
  { name: 'Muesli', diet_tags: ['vegetarian', 'light'] },
  { name: 'Moong Paneer Chilla', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Appe (Vegetable)', diet_tags: ['vegetarian', 'light'] },
  { name: 'Paneer Cheela', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Poha', diet_tags: ['vegetarian', 'light'] },
  { name: 'Sevaiyan', diet_tags: ['vegetarian'] },
  { name: 'Suji Uttapam', diet_tags: ['vegetarian'] },
  { name: 'Bhelpuri', diet_tags: ['vegetarian', 'light'] },
  { name: 'Paneer Paratha', diet_tags: ['vegetarian'] },
  { name: 'Aloo Sandwich', diet_tags: ['vegetarian'] },
  { name: 'Sabudana Khichdi', diet_tags: ['vegetarian'] },
  { name: 'Upma', diet_tags: ['vegetarian', 'light'] },

  // Lunch / Main meals
  { name: 'Dal Makhni + Roti', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Moong Dal + Ghiya/Tori Sabzi', diet_tags: ['vegetarian', 'light', 'low-carb'] },
  { name: 'Palak Paneer + Roti', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Chole Chawal + Hummus', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Kadhi + Mix Veg Sabzi + Roti', diet_tags: ['vegetarian'] },
  { name: 'Bhindi Tur Dal Rice', diet_tags: ['vegetarian'] },
  { name: 'Baingan Bharta', diet_tags: ['vegetarian', 'low-carb'] },
  { name: 'Kadai Paneer', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Kadi', diet_tags: ['vegetarian', 'light'] },
  { name: 'Bhindi', diet_tags: ['vegetarian', 'low-carb', 'light'] },
  { name: 'Ghiya Sabzi', diet_tags: ['vegetarian', 'light', 'low-carb'] },
  { name: 'Rajma', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Chole', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Dal Makhni', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Tur Dal', diet_tags: ['vegetarian', 'high-protein', 'light'] },
  { name: 'Mung Dal', diet_tags: ['vegetarian', 'high-protein', 'light'] },
  { name: 'Paneer Pulao', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Paneer Bhurji', diet_tags: ['vegetarian', 'high-protein'] },
  { name: 'Idli Fry', diet_tags: ['vegetarian'] },
  { name: 'Hummus Wrap', diet_tags: ['vegetarian'] },
  { name: 'Pasta', diet_tags: ['vegetarian'] },

  // Salads & light
  { name: 'Pasta Salad', diet_tags: ['vegetarian', 'light'] },
  { name: 'Kala Chana Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
  { name: 'Rajma Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
  { name: 'Moong Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
  { name: 'Moong Chana Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
  { name: 'Chole Paneer Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
  { name: 'Chola Salad', diet_tags: ['vegetarian', 'high-protein', 'low-carb'] },
]

async function importMeals() {
  console.log(`Importing ${meals.length} meals...`)

  const { data, error } = await supabase
    .from('meals')
    .insert(meals.map(m => ({
      ...m,
      ingredients: [],
    })))
    .select()

  if (error) {
    console.error('Error importing meals:', error.message)
  } else {
    console.log(`✅ Successfully imported ${data.length} meals!`)
  }
}

importMeals()
