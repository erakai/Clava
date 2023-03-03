import { Router } from "express"
import userRouter from 'routes/user.route'
import clubRouter from "./club.route"
import memberRouter from "./member.route"
import officerRouter from "./officer.route"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/members', memberRouter)
rootRouter.use('/clubs', clubRouter)
rootRouter.use('/officers', officerRouter)

export default rootRouter