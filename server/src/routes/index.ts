import { Request, Response, Router } from "express"
import userRouter from './user.route'
import clubRouter from "./club.route"
import documentRouter from "./document.route"
import memberRouter from "./member.route"
import officerRouter from "./officer.route"
import eventRouter from "./event.route";
import settingsRouter from "./settings.route"
import transactionRouter from "./transaction.route"
import logRouter from "./log.route"
import { verifyUser } from "../config/auth"
import electionRouter from "./election.route"

const rootRouter = Router()

export const ping = async (req: Request, res: Response) => {
  return res.status(200).send('pong')
}
rootRouter.get('/ping', verifyUser, ping)

rootRouter.use('/users', userRouter)
rootRouter.use('/members', memberRouter)
rootRouter.use('/clubs', clubRouter)
rootRouter.use('/officers', officerRouter)
rootRouter.use('/documents', documentRouter)
rootRouter.use('/events', eventRouter)
rootRouter.use('/settings', settingsRouter)
rootRouter.use('/transactions', transactionRouter)
rootRouter.use('/logs', logRouter)
rootRouter.use('/elections', electionRouter)

export default rootRouter