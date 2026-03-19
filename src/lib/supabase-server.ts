import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    'https://lgirceiwqqphdmyvacfl.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXJjZWl3cXFwaGRteXZhY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDgyNTAsImV4cCI6MjA4OTQ4NDI1MH0.N0QO0P3kBp7HM-xMn-WX8K_EZzcCw-k4GqaHYmgAgpY',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
