
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData } from '@/utils/server'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === 'GET') {
    const tweetDB = await getData('/tweet.json')
    res.status(200).json({
      valid: true,
      data: tweetDB.reverse()
    })
  } else {
    res.status(404)
  }
}