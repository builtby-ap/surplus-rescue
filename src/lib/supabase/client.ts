import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If env vars are missing or placeholder, create client with dummy values
  // to prevent crashes. Auth operations will fail gracefully.
  if (!url || !key || url === 'your_supabase_url' || key === 'your_supabase_anon_key') {
    return createBrowserClient('http://localhost', 'placeholder-key')
  }

  return createBrowserClient(url, key)
}
