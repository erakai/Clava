import { Router } from "express"
import userRouter from 'routes/user.route'
import clubRouter from "./club.route"
import memberRouter from "./member.route"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/members', memberRouter)
rootRouter.use('/clubs', clubRouter)

export default rootRouter