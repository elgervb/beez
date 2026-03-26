import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

function readConfig() {
  const globalUrl = (globalThis as { __SUPABASE_URL__?: string }).__SUPABASE_URL__ ?? '';
  const globalAnonKey = (globalThis as { __SUPABASE_ANON_KEY__?: string }).__SUPABASE_ANON_KEY__ ?? '';
  const globalPublishableKey =
    (globalThis as { __SUPABASE_PUBLISHABLE_KEY__?: string }).__SUPABASE_PUBLISHABLE_KEY__ ?? '';

  const storageUrl = globalThis.localStorage?.getItem('beez-supabase-url') ?? '';
  const storageAnonKey = globalThis.localStorage?.getItem('beez-supabase-anon-key') ?? '';
  const storagePublishableKey = globalThis.localStorage?.getItem('beez-supabase-publishable-key') ?? '';

  const url = globalUrl || storageUrl;
  const anonKey = globalAnonKey || globalPublishableKey || storageAnonKey || storagePublishableKey;
  return { url, anonKey };
}

export function getSupabaseClient(): SupabaseClient {
  if (cachedClient) return cachedClient;

  const { url, anonKey } = readConfig();
  if (!url || !anonKey) {
    throw new Error(
      'Missing Supabase config. Provide URL and key via globalThis.__SUPABASE_URL__ plus __SUPABASE_PUBLISHABLE_KEY__ (or __SUPABASE_ANON_KEY__), or localStorage beez-supabase-url plus beez-supabase-publishable-key (or beez-supabase-anon-key).'
    );
  }

  cachedClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });

  return cachedClient;
}
