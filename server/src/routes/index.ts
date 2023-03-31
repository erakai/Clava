import { Request, Response, Router } from "express"
import userRouter from './user.route'
import clubRouter from "./club.route"
import documentRouter from "./document.route"
import memberRouter from "./member.route"
import officerRouter from "./officer.route"
import eventRouter from "./event.route";
import settingsRouter from "./settings.route"
import transactionRouter from "./transaction.route"
import { verifyUser } from "../config/auth"


const rootRouter = Router()

export const ping = async (req: Request, res: Response) => {
  return res.status(200).send('pong')
}
rootRouter.get('/ping', ping)

rootRouter.use('/users', userRouter)
rootRouter.use('/members', memberRouter)
rootRouter.use('/clubs', clubRouter)
rootRouter.use('/officers', officerRouter)
rootRouter.use('/documents', documentRouter)
rootRouter.use('/events', eventRouter)
rootRouter.use('/settings', settingsRouter)
rootRouter.use('/transactions', transactionRouter)

export default rootRouter