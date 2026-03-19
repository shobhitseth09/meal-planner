'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useActiveUser } from '@/lib/user-context'
import type { AppUser } from '@/lib/messages'
import Image from 'next/image'

export default function LoginPage() {
  const [step, setStep] = useState<'who' | 'login'>('who')
  const [selectedUser, setSelectedUser] = useState<AppUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setActiveUser } = useActiveUser()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setActiveUser(selectedUser!)
      router.push('/home')
    }
  }

  function handleUserSelect(user: AppUser) {
    setSelectedUser(user)
    setStep('login')
  }

  return (
    <div className="min-h-screen bg-[#0f1f0f] flex flex-col">
      {/* Hero photo */}
      <div className="relative h-[45vh] w-full overflow-hidden">
        <Image
          src="/couple.jpg"
          alt="Shobhit & Vidhi"
          fill
          className="object-cover object-top"
          style={{ transform: 'scale(1.0)', transformOrigin: 'center' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1f0f]/40 to-[#0f1f0f]" />
        <div className="absolute bottom-6 left-0 right-0 text-center">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">Shobhit & Vidhi's Kitchen</h1>
          <p className="text-green-300 text-sm mt-1">🍽️ Khana, pyaar, aur planning</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4 pb-8">
        {step === 'who' ? (
          <div>
            <p className="text-center text-gray-300 text-lg font-medium mb-2">Confess karo 👀</p>
            <p className="text-center text-gray-500 text-sm mb-8">Kaun hai aaj?</p>

            <div className="grid grid-cols-2 gap-4">
              {(['Shobhit', 'Vidhi'] as AppUser[]).map(user => (
                <button
                  key={user}
                  onClick={() => handleUserSelect(user)}
                  className="bg-[#1a2e1a] border border-green-800/50 rounded-2xl p-6 flex flex-col items-center gap-3 hover:bg-[#1f3a1f] hover:border-green-600 transition-all active:scale-95"
                >
                  <div className="text-5xl">{user === 'Shobhit' ? '🧔' : '👩‍🦱'}</div>
                  <span className="text-white font-semibold text-lg">{user}</span>
                  <span className="text-gray-500 text-xs text-center">
                    {user === 'Shobhit' ? 'The grateful eater 😄' : 'The kitchen boss 👑'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setStep('who')}
              className="text-green-400 text-sm mb-6 flex items-center gap-1"
            >
              ← Back
            </button>
            <p className="text-white text-xl font-bold mb-1">Welcome, {selectedUser}! 👋</p>
            <p className="text-gray-400 text-sm mb-6">Sign in to see your meal plan</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a2e1a] border border-green-800/50 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 text-sm"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#1a2e1a] border border-green-800/50 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 text-sm"
                  placeholder="••••••••"
                />
              </div>
              {error && <p className="text-red-400 text-sm text-center">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm mt-2"
              >
                {loading ? 'Signing in...' : `Let's go, ${selectedUser}! 🚀`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
