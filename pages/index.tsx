import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../lib/context'
import DomainTable from '../components/DomainTable'

const Home: NextPage = () => {
  const { supabase } = useContext(AppContext)
  const [domains, setDomains] = useState<Array<any>>([])
  const [domain, setDomain] = useState('')

  const addDomain = async () => {
    const response = await supabase?.from('domains')
      .insert([
        { name: domain }
      ])
  }

  useEffect(() => {
    const loadDomain = async () => {
      const response = await supabase?.from('domains').select()
      setDomains(response?.data || [])
    }
    loadDomain()
  }, [supabase])

  return (
    <div>
      <Head>
        <title>SEO Rank Tracker</title>
        <meta name="description" content="Track your SEO ranking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h3 className='text-xl font-bold'>Add Domain</h3>
          <input value={domain} onInput={(e) => setDomain(e.currentTarget.value)} className='border rounded' type="text" />
          <button onClick={addDomain} className="border rounded bg-slate-800 text-white px-4">Add</button>
        </div>

        {domains.map(d => <DomainTable key={d.id} domain={d} />)}
      </main>
    </div>
  )
}

export default Home
