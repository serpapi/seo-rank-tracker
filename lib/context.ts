import { SupabaseClient } from '@supabase/supabase-js'
import { createContext } from 'react'

type AppContextType = {
  supabase: SupabaseClient | null
}

export const AppContext = createContext<AppContextType>({ supabase: null })