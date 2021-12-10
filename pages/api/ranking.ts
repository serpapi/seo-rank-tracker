// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  position: number
} | {
  error: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (!req.query['keyword']) {
    return res.status(422).json({ error: 'keyword is required' })
  } else if (!req.query['domain']) {
    return res.status(422).json({ error: 'domain is required' })
  }

  try {
    const response = await axios.get('https://serpapi.com/search', {
      params: {
        q: req.query['keyword'],
        output: `rank:${req.query['domain']}`,
        location: req.query['location'],
        google_domain: 'google.com',
        num: 100,
        api_key: 'aea237118285025a3faef7ffdc5f2dea48077cae5279f5c544dfc3f29c4ad9c4'
      }
    });
    res.status(200).json({ position: response.data })
  } catch(e: any) {
    res.status(422).json({ error: e.response.data.error || e.message })
  }
}
