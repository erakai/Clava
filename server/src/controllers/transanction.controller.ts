import to from 'await-to-js'
import type { Request, Response } from 'express'
import Transaction from '../models/transanction.model'
import { hasPermission } from '../modules/Permissions'

export const getTransactions = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) return res.status(400).json({error: 'no club id'})

  const [errPerm, hasFinancePermission] = await to(hasPermission("VIEW_FINANCES", club_id, req.user))
  if (errPerm) { res.status(500).send({errPerm}) }
  if (!hasFinancePermission) {
    return res.status(403).json({error: "403: no perm to view finances"})
  }

  const [err, transactions] = await to(Transaction.find({club_id: club_id}).exec())
  if (err) return res.status(400).send({err})

  return res.status(200).json({transactions})
}

export const addTransaction = async (req: Request, res: Response) => {
  let { club_id, source, amount, date } = req.body
  if (!club_id || !source|| !amount) {
    return res.status(400).json({error: 'not all fields'})
  }

  const [err, transaction] = await to(Transaction.create({ club_id, source, amount, date }))
  if (err) return res.status(400).send({err})

  return res.status(200).json({transaction})
}

export const deleteTransactions = async (req: Request, res: Response) => {
  let { transaction_ids } = req.body
  
  if (!transaction_ids || transaction_ids.length == 0) {
    return res.status(500).json({error: 'no transaction_ids provided'})
  }

  const [err] = await to(Transaction.deleteMany({ '_id': { '$in': transaction_ids }}).exec())
  if (err) return res.status(500).send({err})
  return res.status(200).json({})
}