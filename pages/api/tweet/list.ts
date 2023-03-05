
import type { NextApiRequest, NextApiResponse } from 'next'
import tweetDB from '@/db/tweet'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  if (method === 'GET') {
    res.status(200).json({
      valid: true,
      data: tweetDB.reverse()
    })
  } else {
    res.status(404)
  }
}