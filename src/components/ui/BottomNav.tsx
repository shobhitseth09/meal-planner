'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useActiveUser } from '@/lib/user-context'
import { createClient } from '@/lib/supabase'
import { Home, CalendarDays, BookOpen, LogOut } from 'lucide-react'

const tabs = [
  { href: '/home',    label: 'Home',    icon: Home },
  { href: '/planner', label: 'Planner', icon: CalendarDays },
  { href: '/meals',   label: 'Meals',   icon: BookOpen },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { clearActiveUser } = useActiveUser()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    clearActiveUser()
    router.push('/login')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1f0f] border-t border-green-900/40 px-4 pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors">
              <Icon size={22} className={active ? 'text-green-400' : 'text-gray-600'} />
              <span className={`text-xs font-medium ${active ? 'text-green-400' : 'text-gray-600'}`}>{label}</span>
            </Link>
          )
        })}
        <button onClick={handleSignOut} className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors">
          <LogOut size={22} className="text-gray-600" />
          <span className="text-xs font-medium text-gray-600">Exit</span>
        </button>
      </div>
    </div>
  )
}
