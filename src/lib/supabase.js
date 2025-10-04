import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

// Debug logging
console.log('🔍 Environment Variables Check:');
console.log('SUPABASE_URL:', supabaseUrl ? 'SET ✅' : 'MISSING ❌');
console.log('SUPABASE_KEY:', supabaseAnonKey ? 'SET ✅' : 'MISSING ❌');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables - check your .env file and restart the server');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}