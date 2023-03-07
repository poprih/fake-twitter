
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '@/utils/server'
import type { Tweet } from '@/type'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const tweetDB: Tweet[] | [] = await getData('/tweet.json')
    const pageNo = (req.query.pageNo || 1) as number
    const pageSize = 10 // default
    const data = tweetDB.reverse().slice((pageNo - 1) * pageSize, pageSize)
    res.status(200).json({
      valid: true,
      data,
      total: tweetDB.length
    })
  } else {
    res.status(404)
  }
}