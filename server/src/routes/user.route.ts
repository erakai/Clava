import { Router } from 'express'

import {getUsers} from 'controllers/user.controller'

const userRouter = Router()

// Note that in reality we don't want to allow someone to get every user
userRouter.get('/', getUsers)

export default userRouter