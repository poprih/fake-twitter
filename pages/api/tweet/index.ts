
import type { NextApiRequest, NextApiResponse } from 'next'
import tweetDB from '@/db/tweet'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // todo: auth 
  const { method } = req
  if (method === 'POST') {
    createNewTweet(req, res)
  } else if (method === 'DELETE') {

  }
}

function createNewTweet(req: NextApiRequest, res: NextApiResponse) {
  const { content, userId, username } = req.body
  const now = new Date()
  const id = `${now.getTime()}_${userId}`
  tweetDB.push({
    content,
    id,
    userId,
    username,
    updateTime: '',
    createTime: now.toUTCString(),
  })
  res.status(200).json({ valid: true })
}