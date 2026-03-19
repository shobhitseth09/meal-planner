import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lgirceiwqqphdmyvacfl.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXJjZWl3cXFwaGRteXZhY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDgyNTAsImV4cCI6MjA4OTQ4NDI1MH0.N0QO0P3kBp7HM-xMn-WX8K_EZzcCw-k4GqaHYmgAgpY'

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}
