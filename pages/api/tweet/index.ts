
import type { NextApiRequest, NextApiResponse } from 'next'
import { getData, setData } from '@/utils/server'
import type { Tweet } from '@/type'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // todo: auth
  const { method } = req
  if (method === 'POST') {
    createNewTweet(req, res)
  } else if (method === 'DELETE') {
    deleteTweet(req, res)
  } else if (method === 'PUT') {
    updateTweet(req, res)
  } else if (method === 'GET') {
    getTweet(req, res)
  }
}

async function getTweet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const tweetDB: Array<Tweet> = await getData('/tweet.json')
  const targetTweet = tweetDB.find(_ => _.id === id)
  res.status(200).json({ valid: true, data: targetTweet })
}

async function createNewTweet(req: NextApiRequest, res: NextApiResponse) {
  const { content, userId, username } = req.body
  const now = new Date()
  const id = `${now.getTime()}_${userId}`
  const tweetDB: Array<Tweet> = await getData('/tweet.json')
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

async function deleteTweet(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body
  const tweetDB: Array<Tweet> = await getData('/tweet.json')
  const targetTweetIndex = tweetDB.findIndex(_ => _.id === id)
  tweetDB.splice(targetTweetIndex, 1)
  await setData('/tweet.json', tweetDB)
  res.status(200).json({ valid: true })
}

async function updateTweet(req: NextApiRequest, res: NextApiResponse) {
  const { id, content } = req.body
  const now = new Date()
  const tweetDB: Array<Tweet> = await getData('/tweet.json')
  const targetTweet = tweetDB.find(_ => _.id === id) as Tweet
  Object.assign(targetTweet, {
    content,
    updateTime: now.toISOString(),
  })
  await setData('/tweet.json', tweetDB)
  res.status(200).json({ valid: true })
}