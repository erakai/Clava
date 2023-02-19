import type { Request, Response } from 'express'
import User from 'models/user.model'
import { IUser } from 'types/user'

export const register = async (req: Request, res: Response) => {
  let { email, name, password } = req.body
  if (!name) {
    name = email
  }

  User.register(new User({ email, name }), password,
    async (err, user: IUser) => {
      if (err) {
        return res.status(500).send({err})
      }

      return res.json({ user })
    })
}

export const login = async (req: Request, res: Response) => {
  const user = req.user
  res.json({ user })
}

// what does this actually do if we don't have sesion tokens yet?
export const logout = async (req: Request, res: Response) => {
  req.logout(() => {
    res.status(200)
  })
}