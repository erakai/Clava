import { Router } from 'express'

import { login, logout, refresh, register } from 'controllers/user.controller'
import passport from 'passport'

const userRouter = Router()

userRouter.post('/login', passport.authenticate('local'), login)
userRouter.post('/register', register)
userRouter.post('/logout', logout)
userRouter.post('/refresh', refresh)

export default userRouter