import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rawPath = path.join(process.cwd(), 'db')
  const userJSON = await fs.readFileSync(rawPath + '/user.json', 'utf-8')
  const tweetJSON = await fs.readFileSync(rawPath + '/tweet.json', 'utf-8')
  await fs.writeFileSync('/tmp/user.json', userJSON, { encoding: 'utf-8' })
  await fs.writeFileSync('/tmp/tweet.json', tweetJSON, { encoding: 'utf-8' })
  res.status(200)
}