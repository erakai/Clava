import to from 'await-to-js'
import type { Request, Response } from 'express'
import Transaction from 'models/transanction.model'

export const getTransactions = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) return res.status(400).json({error: 'no club id'})

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