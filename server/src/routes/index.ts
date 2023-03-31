import { Router } from "express"
import userRouter from 'routes/user.route'
import clubRouter from "./club.route"
import documentRouter from "./document.route"
import memberRouter from "./member.route"
import officerRouter from "./officer.route"
import eventRouter from "./event.route";
import settingsRouter from "./settings.route"
import transactionRouter from "./transaction.route"
import logRouter from "./log.route"

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/members', memberRouter)
rootRouter.use('/clubs', clubRouter)
rootRouter.use('/officers', officerRouter)
rootRouter.use('/documents', documentRouter)
rootRouter.use('/events', eventRouter)
rootRouter.use('/settings', settingsRouter)
rootRouter.use('/transactions', transactionRouter)
rootRouter.use('/logs', logRouter)

export default rootRouter