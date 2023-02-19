import type { Request, Response } from 'express'
import UserAuth from 'models/userAuth.model'
import passport from 'passport'
import { IUserAuth } from 'types/user'

export const register = async (req: Request, res: Response) => {
  UserAuth.register(new UserAuth({ email: req.body.email }), req.body.password,
    async (err, user: IUserAuth) => {
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