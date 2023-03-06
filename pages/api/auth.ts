// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SignInUp } from '@/enum'
import type { User } from '@/type'
import { getData, setData } from '@/utils/server'

export type AuthInfo = {
  username: string,
  password: string,
  type: SignInUp.Login | SignInUp.SignUp
}

export type AuthRes = {
  valid: boolean,
  msg: string
}

function loginHandle() {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password, type } = req.body as AuthInfo
    const userDB: User[] = await getData('/user.json')
    const userInfo: User | undefined = userDB.find(_ => _.username === username)
    if (type === SignInUp.Login) {
      if (!userInfo) {
        res.status(200).json({ valid: false, msg: 'User does not exist' })
      } else {
        const { password: pwd, ...rest } = userInfo
        if (password === pwd) {
          const token = '' // generate token
          res.status(200).json({ valid: true, data: { ...rest }, token })
        } else {
          res.status(200).json({ valid: false, msg: 'Password is wrong' })
        }
      }
    } else {
      if (userInfo) {
        res.status(200).json({
          valid: false,
          msg: 'Username has already been taken'
        })
      } else {
        const id = userDB.length + 1
        userDB.push({
          id,
          username,
          password
        })
        await setData('/user.json', userDB)
        res.status(200).json({
          valid: true,
          token: '',
          data: {
            id,
            username
          }
        })
      }
    }

  } else {
    res.status(404)
  }
}
