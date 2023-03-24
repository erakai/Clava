import { verifyUser } from "config/auth"
import { addTransaction, getTransactions } from "controllers/transanction.controller"
import { Router } from "express"

/**
Transaction Routes:
  - /transactions GET (club_id): get all transactions for that club
  - /transactions POST (club_id, source, amount, date): create new transaction for that club and return it
*/

const transactionRouter = Router()

transactionRouter.get('/', verifyUser, getTransactions)
transactionRouter.post('/', verifyUser, addTransaction)

export default transactionRouter