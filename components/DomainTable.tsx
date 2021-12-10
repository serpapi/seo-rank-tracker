import { useContext, useEffect, useState } from "react"
import { AppContext } from "../lib/context"
import RankingLoader from './RankingLoader'

type DomainTableProps = {
  domain: {
    id: number,
    name: string
  };
}

const DomainTable = ({ domain }: DomainTableProps) => {
  const { supabase } = useContext(AppContext)
  const [keywords, setKeywords] = useState<Array<any>>()
  const [keyword, setKeyword] = useState('')

  const addKeyword = async () => {
    const response = await supabase?.from('keywords')
      .insert([
        { domain_id: domain.id, name: keyword }
      ])
    console.log(response?.data)
    setKeywords([...keywords!, ...response?.data!])
  }

  useEffect(() => {
    const loadKeywords = async () => {
      const response = await supabase?.from('keywords').select().eq('domain_id', domain.id)
      setKeywords(response?.data || [])
    }
    loadKeywords()
  }, [supabase, domain])

  return (
    <div>
      <h2 className="text-xl font-bold">{domain.name}</h2>
      <div>
        <label>Add keyword</label>
        <input value={keyword} onInput={e => setKeyword(e.currentTarget.value)} className="border rounded" type="text" />
        <button onClick={addKeyword} className="border rounded px-4">Add</button>
      </div>
      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-300">No.</th>
            <th className="border border-gray-300">Keyword</th>
            <th className="border border-gray-300">Ranking</th>
          </tr>
        </thead>
        <tbody>
          {keywords?.map((key, index) => <tr key={key.id}>
            <td className="border border-gray-300">{index + 1}</td>
            <td className="border border-gray-300">{key.name}</td>
            <td className="border border-gray-300">
              <RankingLoader domain={domain.name} keyword={key.name} />
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default DomainTable