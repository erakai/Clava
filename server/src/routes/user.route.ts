import { Router } from 'express'

import { getSelf, login, logout, refresh, register, resetrequest } from 'controllers/user.controller'
import passport from 'passport'
import { verifyUser } from 'config/auth'

const userRouter = Router()

/*
User Routes:
  - /users GET (JWT token, refresh token): returns self
  - /users/register POST (email, password): returns new user, JWT, refresh tokens
  - /users/login POST (email, password): returns user, JWT, refresh tokens
  - /users/refresh POST (refresh token): returns new JWT, refresh tokens
  - /users/logout POST (JWT token, refresh token): logs user out (revokes their tokens)

All other routes will require JWT tokens
*/

userRouter.get('/', verifyUser, getSelf)
userRouter.post('/register', register)
userRouter.post('/login', passport.authenticate('local'), login)
userRouter.post('/refresh', refresh)
userRouter.post('/logout', verifyUser, logout)
userRouter.post('/resetrequest', resetrequest)

export default userRouter