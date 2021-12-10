import { useEffect, useState } from "react"
import axios from 'axios'

type RankingLoaderProps = {
  domain: string;
  keyword: string;
}

const RankingLoader = ({ domain, keyword }: RankingLoaderProps) => {
  const [rank, setRank] = useState<number>()

  const checkRanking = async (domain: string, keyword: string) => {
    try {
      const response = await axios.get('/api/ranking', {
        params: {
          domain,
          keyword,
        }
      })
      return response.data.position || '-'
    } catch {
      return '-'
    }
  }

  useEffect(() => {
    const loadRanking = async () => {
      setRank(
        await checkRanking(domain, keyword)
      )
    }
    loadRanking()
  }, [domain, keyword])

  return (
    <div>{rank || 'Loading...'}</div>
  )
}

export default RankingLoader