import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lgirceiwqqphdmyvacfl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnaXJjZWl3cXFwaGRteXZhY2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MDgyNTAsImV4cCI6MjA4OTQ4NDI1MH0.N0QO0P3kBp7HM-xMn-WX8K_EZzcCw-k4GqaHYmgAgpY'

let client: ReturnType<typeof createSupabaseClient> | null = null

export function createClient() {
  if (!client) {
    client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  }
  return client
}
