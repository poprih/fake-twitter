// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import userDB from '@/db/user'
import { SignInUp } from '@/enum'


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

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password, type } = req.body as AuthInfo
    const userInfo = userDB.find(_ => _.username === username)
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
        userDB.push(req.body)
        res.status(200).json({
          valid: true,
          token: '',
          msg: 'Sign up successfully'
        })
      }
    }

  } else {
    res.status(404)
  }
}
