import { Router } from "express"
import userRouter from 'routes/user.route'
import authRouter from "./auth.route"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/auth', authRouter)

export default rootRouter