import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { supabase } from '../lib/initSupabase'
import { AppContext } from '../lib/context'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={{ supabase }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
