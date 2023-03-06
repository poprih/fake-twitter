
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData, setData } from '@/utils/server'

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

async function createNewTweet(req: NextApiRequest, res: NextApiResponse) {
  const { content, userId, username } = req.body
  const now = new Date()
  const id = `${now.getTime()}_${userId}`
  const tweetDB = await getData('/tweet.json')
  tweetDB.push({
    content,
    id,
    userId,
    username,
    updateTime: '',
    createTime: now.toISOString(),
  })
  await setData('/tweet.json', tweetDB)
  res.status(200).json({ valid: true })
}