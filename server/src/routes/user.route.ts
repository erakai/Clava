import { Router } from 'express'

import { login, logout, register } from 'controllers/user.controller'
import passport from 'passport'

const userRouter = Router()

// Note that in reality we don't want to allow someone to get every user
userRouter.post('/login', passport.authenticate('local'), login)
userRouter.post('/register', register)
userRouter.post('/logout', logout)

export default userRouter