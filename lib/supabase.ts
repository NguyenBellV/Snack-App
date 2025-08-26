import { createClient } from "@supabase/supabase-js"

// Browser client (public)
const publicUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!publicUrl || !anonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY")
}

export const supabase = createClient(publicUrl, anonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
})

// Server client (private)
export function createServerClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
