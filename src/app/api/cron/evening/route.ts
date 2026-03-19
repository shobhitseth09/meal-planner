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
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const tomorrow = getISTDate(1)

  const { data: entries } = await supabase
    .from('meal_plan')
    .select('*, meal:meals(*)')
    .eq('plan_date', tomorrow)
    .order('item_order')

  const tomorrowEntries: MealPlanEntry[] = entries ?? []

  const lines: string[] = []

  const eveningMessages = [
    "🌙 Kal ka plan dekho — swap karo agar mood nahi hai:",
    "Evening! 🌙 Tomorrow's menu is ready — change it if you want while there's time:",
    "Good evening Shobhit & Vidhi! 🌙 Kal ke liye plan ready hai:",
    "🌙 Kal ka preview — agar kuch change karna ho toh abhi karo!",
    "Evening check-in! 🌙 Tomorrow's plan — Vidhi's orders stand unless someone objects 😄",
  ]
  const greeting = eveningMessages[Math.floor(Math.random() * eveningMessages.length)]
  lines.push(`${greeting}\n`)

  let totalCal = 0
  let totalProtein = 0
  let hasAnyMeal = false

  for (const mt of MEAL_TYPES) {
    const items = tomorrowEntries.filter(e => e.meal_type === mt)
    if (!items.length) continue
    hasAnyMeal = true

    const names = items.map(e => e.meal?.name ?? e.custom_meal_name ?? '').join(' + ')
    const slotCal = items.reduce((s, e) => s + (e.meal?.calories ?? 0) * (e.portion ?? 1.0), 0)

    lines.push(`${MEAL_EMOJI[mt]} <b>${mt.charAt(0).toUpperCase() + mt.slice(1)}</b>: ${names}`)
    if (slotCal > 0) lines.push(`   🔥 ${Math.round(slotCal)} kcal`)

    totalCal += slotCal
    totalProtein += items.reduce((s, e) => s + (e.meal?.protein ?? 0) * (e.portion ?? 1.0), 0)
  }

  if (!hasAnyMeal) {
    lines.push("😬 <b>Nothing planned for tomorrow!</b>")
    lines.push("Jaldi app kholo aur plan karo — subah bhaagna padega 😅")
  } else {
    lines.push('')
    lines.push('─────────────────────')
    lines.push(`🔥 <b>Total: ${Math.round(totalCal)} kcal</b> / 1150 kcal`)

    const proteinTarget = 60
    const proteinStatus = totalProtein >= proteinTarget
      ? `✅ ${Math.round(totalProtein)}g`
      : `⚠️ ${Math.round(totalProtein)}g (${Math.round(proteinTarget - totalProtein)}g short)`
    lines.push(`💪 Protein: ${proteinStatus}`)

    // Special food callouts
    const allNames = tomorrowEntries.map(e => e.meal?.name ?? e.custom_meal_name ?? '').join(' ').toLowerCase()
    if (allNames.includes('bhindi')) lines.push('\n🎉 Bhindi kal hai! Shobhit sweet dreams 💚')
    if (allNames.includes('noodle') || allNames.includes('chowmein') || allNames.includes('hakka')) {
      lines.push('\n🍜 Noodles tomorrow! Vidhi is already excited 😍')
    }
  }

  lines.push('\n<i>Swap via the app if mood changes 😄</i>')

  await sendTelegramMessage(lines.join('\n'))
  return NextResponse.json({ ok: true, date: tomorrow, meals: tomorrowEntries.length })
}
