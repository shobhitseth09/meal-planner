import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendTelegramMessage } from '@/lib/telegram'
import type { MealPlanEntry } from '@/lib/types'

const MEAL_EMOJI: Record<string, string> = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snack: '🍎',
}
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack']

function getISTDate(offsetDays = 0): string {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000 + offsetDays * 86400000)
  return ist.toISOString().split('T')[0]
}

export async function GET(req: NextRequest) {
  // Verify this is a legitimate Vercel cron call
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const today = getISTDate()

  const { data: entries } = await supabase
    .from('meal_plan')
    .select('*, meal:meals(*)')
    .eq('plan_date', today)
    .order('item_order')

  const todayEntries: MealPlanEntry[] = entries ?? []

  // Build message
  const lines: string[] = []

  const morningMessages = [
    "Subah ho gayi! ☀️ Vidhi ne aaj ka plan ready kar diya hai 👑",
    "Rise and shine Shobhit & Vidhi! 🌅 Aaj ka khana dekho:",
    "Good morning you two! ☀️ Today's meal plan is ready — no excuses 😄",
    "Morning! Vidhi's plan is live, Shobhit just needs to eat it 😌",
    "Uthho dono! 🌅 Aaj ka plan ready hai, bhookhe mat rehna:",
  ]
  const greeting = morningMessages[Math.floor(Math.random() * morningMessages.length)]
  lines.push(`${greeting}\n`)

  let totalCal = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0
  let hasAnyMeal = false

  for (const mt of MEAL_TYPES) {
    const items = todayEntries.filter(e => e.meal_type === mt)
    if (!items.length) continue
    hasAnyMeal = true

    const names = items.map(e => e.meal?.name ?? e.custom_meal_name ?? '').join(' + ')
    const slotCal = items.reduce((s, e) => s + (e.meal?.calories ?? 0) * (e.portion ?? 1.0), 0)
    const portionNote = items.some(e => e.portion && e.portion !== 1.0)
      ? ` <i>(×${items[0].portion})</i>`
      : ''

    lines.push(`${MEAL_EMOJI[mt]} <b>${mt.charAt(0).toUpperCase() + mt.slice(1)}</b>`)
    lines.push(`   ${names}${portionNote}`)
    if (slotCal > 0) lines.push(`   🔥 ${Math.round(slotCal)} kcal`)
    lines.push('')

    totalCal += slotCal
    totalProtein += items.reduce((s, e) => s + (e.meal?.protein ?? 0) * (e.portion ?? 1.0), 0)
    totalCarbs += items.reduce((s, e) => s + (e.meal?.carbs ?? 0) * (e.portion ?? 1.0), 0)
    totalFat += items.reduce((s, e) => s + (e.meal?.fat ?? 0) * (e.portion ?? 1.0), 0)
  }

  if (!hasAnyMeal) {
    lines.push("😬 <b>Nothing planned for today!</b>")
    lines.push("Jaldi app kholo aur plan karo — chole kulche wala band na ho jaaye 😂")
  } else {
    lines.push('─────────────────────')
    lines.push(`🔥 <b>Total: ${Math.round(totalCal)} kcal</b> / 1150 kcal target`)

    const proteinTarget = 60
    const proteinStatus = totalProtein >= proteinTarget
      ? `✅ ${Math.round(totalProtein)}g (goal met!)`
      : `⚠️ ${Math.round(totalProtein)}g (${Math.round(proteinTarget - totalProtein)}g short)`
    lines.push(`💪 Protein: ${proteinStatus}`)
    lines.push(`🌾 Carbs: ${Math.round(totalCarbs)}g  |  💧 Fat: ${Math.round(totalFat)}g`)

    // Special food callouts
    const allNames = todayEntries.map(e => e.meal?.name ?? e.custom_meal_name ?? '').join(' ').toLowerCase()
    if (allNames.includes('bhindi')) lines.push('\n🎉 BHINDI ON THE MENU! Shobhit you lucky guy 💚')
    if (allNames.includes('noodle') || allNames.includes('chowmein') || allNames.includes('hakka')) {
      lines.push('\n🍜 NOODLES TODAY! Vidhi is having the best day 😍')
    }
  }

  await sendTelegramMessage(lines.join('\n'))
  return NextResponse.json({ ok: true, date: today, meals: todayEntries.length })
}
