import { Router } from 'express'

import { getSelf, login, logout, refresh, register } from 'controllers/user.controller'
import passport from 'passport'
import { verifyUser } from 'config/auth'

const userRouter = Router()

/*
User Routes:
  - /users GET (JWT token, refresh token): returns self
  - /register POST (email, password): returns new user, JWT, refresh tokens
  - /login POST (email, password): returns user, JWT, refresh tokens
  - /refresh POST (refresh token): returns new JWT, refresh tokens
  - /logout POST (JWT token, refresh token): logs user out (revokes their tokens)

All other routes will require JWT tokens
*/

userRouter.get('/', verifyUser, getSelf)
userRouter.post('/register', register)
userRouter.post('/login', passport.authenticate('local'), login)
userRouter.post('/refresh', refresh)
userRouter.post('/logout', verifyUser, logout)

export default userRouter