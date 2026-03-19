export type AppUser = 'Shobhit' | 'Vidhi'

function pick(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── SHOBHIT messages (feels like Vidhi wrote them) ───────────────────────

const shobhitMorning = [
  "Good morning Shobhit! ☀️ Vidhi ne aaj ka breakfast already plan kar diya — kyunki someone needs supervision 😄",
  "Rise and shine, Mutku! 🌅 Vidhi's already decided what you're eating today. As always.",
  "Subah ho gayi Shobhit! Vidhi says eat properly today — no bhindi for breakfast though 😂",
  "Good morning! Vidhi wanted me to remind you — khana khao, daant mat khao 🙏",
  "Uthho Shobhit! Today's meals are planned and Vidhi has opinions about all of them 👑",
  "Morning Mutku! ☀️ Vidhi ne plan kiya, tumhara kaam sirf khana hai. Easy life hai yaar 😌",
  "Good morning! Vidhi's already three steps ahead of you — meal plan ready hai ✅",
  "Shobhit! Aaj ka din healthy rehna chahiye — Vidhi's orders 💚",
]

const shobhitAfternoon = [
  "Lunch time, Mutku! 🍽️ Vidhi planned something good — don't you dare skip it",
  "Oi Shobhit! Vidhi specifically planned today's lunch. Eat it. All of it. 😄",
  "Afternoon check-in 👀 Has Shobhit eaten yet? Vidhi would like to know.",
  "Lunch break! Vidhi says — 'Mutku khana khao, kaam baad mein' 🍛",
  "Hey Shobhit, it's that time again. Vidhi planned it, you eat it. Simple deal 😌",
  "Lunchtime! And no, bhindi every day is not a balanced diet, Shobhit 😂",
  "Afternoon Mutku! 🌞 Today's lunch was personally approved by Vidhi — high standards maintained",
]

const shobhitEvening = [
  "Dinner time! 🌙 Vidhi decided what's cooking tonight — as is tradition in this household 👑",
  "Evening Mutku! Vidhi ne dinner plan kar diya. Your job? Show up and eat. You're welcome 😄",
  "Good evening Shobhit! Tonight's dinner is Vidhi-approved ✨ She has taste, we know this.",
  "Dinner's planned! Vidhi's the boss, Shobhit sirf daant khata h — and we love this about you 😂",
  "🌙 Evening! Vidhi planned tonight's dinner while you were busy doing whatever it is you do.",
  "Dinner time, Mutku! Vidhi says eat well tonight 💚 She's looking out for you as always.",
  "Good evening! Tonight's menu has been decided by the real CEO of this kitchen 👩‍🍳 Vidhi.",
]

const shobhitNoMeal = [
  "Shobhit... nothing's planned for today 😬 Remember the flying chole kulche incident? Plan karo before history repeats itself 🙏",
  "Uh oh. No meal planned. Vidhi hasn't decided yet — which means YOU might have to think of something 😂 All the best.",
  "Empty slot alert! 🚨 Last time you two winged it, your favourite chole kulche shop was PERMANENTLY CLOSED. Don't repeat history.",
  "No plan yet, Mutku 😅 Better add something before Vidhi asks what's for dinner and you have no answer.",
  "Nothing planned here! Quick, add something before Vidhi finds out 👀",
  "Blank slate! This is your chance to suggest something, Shobhit. Vidhi might even approve it 😄",
]

const shobhitBhindi = [
  "BHINDI ON THE MENU! 🎉 Shobhit's favourite. Vidhi planned it just for you, Mutku 💚",
  "Look who's having bhindi today! 😍 Vidhi knows how to keep you happy, doesn't she?",
  "Bhindi! The only vegetable Shobhit has ever truly loved 😂 Enjoy, Mutku!",
  "Vidhi put bhindi on the menu and honestly? We respect the dedication to your happiness 💚",
]

const shobhitGoalHit = [
  "🎉 Calorie goal hit! Shobhit you actually did it — Vidhi would be proud. She planned it, you executed. Teamwork!",
  "Goal achieved! ✅ Balanced diet, balanced life. Vidhi's meal planning skills + Shobhit's eating skills = perfection 😄",
  "You hit your target today, Mutku! 🏆 Vidhi's plan worked. As usual.",
]

const shobhitOverTarget = [
  "Shobhit... thoda zyada ho gaya aaj 😅 Vidhi would say something here but we'll let the numbers do the talking.",
  "Over target today! It's okay Mutku — bhindi ke baad sab maaf hai 😂",
  "Calories exceeded! Vidhi didn't plan for this but aap toh ho hi aaise 😄 Tomorrow is a new day!",
]

// ─── VIDHI messages (feels like Shobhit wrote them) ───────────────────────

const vidhiMorning = [
  "Good morning Vidhi! ☀️ Shobhit says eat well today — he needs you strong enough to keep making decisions 😄",
  "Rise and shine, Mutku! 🌅 The kitchen awaits its true leader. Today's plan is all yours.",
  "Good morning Vidhi! Your loyal food executor (Shobhit) is ready and waiting 🙋‍♂️",
  "Subah ho gayi! ☀️ Vidhi, aaj ka plan ready hai — Shobhit will eat whatever you decide, as always 😌",
  "Morning Mutku! 🌸 Shobhit is already grateful for whatever you're planning to feed him today.",
  "Good morning! The CEO of this kitchen has logged in 👑 Vidhi, what's the plan today?",
  "Rise and shine! Shobhit wanted to say — thanks for always deciding what to eat. Life would be cereal otherwise 😂",
]

const vidhiAfternoon = [
  "Lunch time, Vidhi! 🍜 Shobhit is patiently waiting for your decision 😄",
  "Afternoon Mutku! Hope you're planning something with noodles today 🍝 We know that's what you really want.",
  "Lunch break! Vidhi, the real question is — chowmein today? 👀",
  "Hey boss! 👑 Lunchtime. Shobhit will eat whatever you've planned, obviously.",
  "Afternoon check-in! Vidhi, Shobhit just wants you to know — your food choices are always correct 🙌",
  "Lunchtime! 🌞 Shobhit says: 'Mutku, aaj kya khilayegi?' — his eternal question 😂",
]

const vidhiEvening = [
  "Dinner time, Mutku! 🌙 Shobhit is ready to eat whatever the CEO has decided for tonight.",
  "Evening Vidhi! Tonight's dinner decision is yours — as it always is, as it always will be 👑",
  "Good evening! Shobhit is already excited for tonight's dinner. He doesn't know what it is, but he's excited 😄",
  "🌙 Evening Mutku! The kitchen is yours. Shobhit's job is just to appreciate — and he does 💚",
      "Dinner time! Vidhi, Shobhit wanted to remind you — you're the best cook in this house. (He's also the only other cook so take that as you will 😂)",
  "Evening! 🌸 Whatever you've planned for dinner, Vidhi — Shobhit will love it. He always does.",
]

const vidhiNoodles = [
  "NOODLES ON THE MENU! 🍜 Vidhi we see you, Mutku 😍 This was definitely your idea.",
  "Chowmein/noodles spotted! 🍝 Vidhi's happiest day of the week 😄 Enjoy every bite, Mutku!",
  "Noodles!! 🎉 Vidhi planned noodles and honestly the whole house is better for it.",
  "Look at that — noodles on the menu! Shobhit planned this for you Vidhi 🥹 (or did you plan it yourself? we'll never know 😂)",
]

const vidhiNoMeal = [
  "Nothing planned yet, Vidhi! 😬 And you know what happens when things aren't planned... flying chole kulche, permanently closed 😭",
  "Empty slot! Quick Mutku, decide before Shobhit tries to suggest something 😂",
  "No meal here yet! Vidhi, the kitchen needs its CEO to make a call 👑",
  "Unplanned meal alert! 🚨 You two improvised once and ended up starving outside a closed chole kulche shop. Just saying.",
  "Nothing planned! Vidhi, this is your moment. Shobhit is waiting (patiently, for once) 😄",
]

const vidhiGoalHit = [
  "🎉 Goal achieved, Mutku! Balanced day, happy Vidhi! Shobhit would be proud if he understood macros 😂",
  "Hit your calorie target today! ✅ Vidhi you're absolutely killing it — noodles AND balanced nutrition? Iconic.",
  "Goal hit! 🏆 The CEO of this kitchen delivered results today. Outstanding performance.",
]

const vidhiOverTarget = [
  "Slightly over today Vidhi! But if noodles were involved, we completely understand 🍜 No regrets.",
  "Over target! It happens Mutku 😊 Tomorrow we reset. Tonight we digest.",
  "Numbers are a bit high today 😅 Shobhit won't say a word though — he knows better 😂",
]

// ─── FULL WEEK PLANNED ─────────────────────────────────────────────────────

export const weekComplete = [
  "Full week planned! 🏆 Shobhit & Vidhi are absolutely winning at this adulting thing 💚",
  "Entire week sorted! 🎉 Vidhi planned, Shobhit will eat. The perfect system.",
  "Week ka plan ready hai! ✅ You two are goals — not just couple goals, literal calorie goals 😄",
  "Full week locked in! 🔒 The flying chole kulche shop can stay closed — you're prepared 😂",
]

// ─── PUBLIC API ────────────────────────────────────────────────────────────

export function getGreeting(user: AppUser, timeOfDay: 'morning' | 'afternoon' | 'evening'): string {
  if (user === 'Shobhit') {
    if (timeOfDay === 'morning') return pick(shobhitMorning)
    if (timeOfDay === 'afternoon') return pick(shobhitAfternoon)
    return pick(shobhitEvening)
  } else {
    if (timeOfDay === 'morning') return pick(vidhiMorning)
    if (timeOfDay === 'afternoon') return pick(vidhiAfternoon)
    return pick(vidhiEvening)
  }
}

export function getNoMealMessage(user: AppUser): string {
  return pick(user === 'Shobhit' ? shobhitNoMeal : vidhiNoMeal)
}

export function getSpecialFoodMessage(user: AppUser, mealName: string): string | null {
  const lower = mealName.toLowerCase()
  if (user === 'Shobhit' && lower.includes('bhindi')) return pick(shobhitBhindi)
  if (user === 'Vidhi' && (lower.includes('noodle') || lower.includes('chowmein') || lower.includes('hakka') || lower.includes('schezwan') || lower.includes('sevaiyan'))) return pick(vidhiNoodles)
  return null
}

export function getCalorieMessage(user: AppUser, hit: boolean): string {
  if (user === 'Shobhit') return pick(hit ? shobhitGoalHit : shobhitOverTarget)
  return pick(hit ? vidhiGoalHit : vidhiOverTarget)
}

export function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
}
