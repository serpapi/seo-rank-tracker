import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { AppContext } from '../lib/context'

const Home: NextPage = () => {
  const { supabase } = useContext(AppContext)

  return (
    <div>
      <Head>
        <title>SEO Rank Tracker</title>
        <meta name="description" content="Track your SEO ranking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        
      </main>
    </div>
  )
}

export default Home
