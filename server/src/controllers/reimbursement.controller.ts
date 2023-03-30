import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Officer from 'models/officer.model'
import Reimbursement from 'models/reimbursement.model'
import { IClub } from 'types/club'

export const getReimbursements = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  const club: IClub = await Club.findById(club_id)

  if(!club) return res.status(401).send('Unauthorized')
  
  // make sure club exists

  Club.find({
    club_id: club_id
  }, async (err) => {
    if (err) {
      console.log("no club")
      return res.status(500).send({err})
    }
  })

  Reimbursement.find({
    club_id: club_id
  }, async (err, reimbursements) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({reimbursements})

  })
}

export const createReimbursement = async (req: Request, res: Response) => {

  let { name, amount, creditor, link, paid, club_id } = req.body

 

  if (!name || !amount || !club_id || !creditor) {
    return res.status(500).json({error: 'not all required fields specified'})
  }

  if (!link) {
    link = ""
  }

  if (!paid) {
    paid = false
  }

  Reimbursement.create({
    name, amount, creditor, link, paid, club_id
  }, async (err, reimbursement) => {
    if (err) {
      return res.status(500).send({err})
    }
    
    return res.status(200).json({reimbursement})
  })
}

export const editReimbursement = async (req: Request, res: Response) => {
  let { _id, name, amount, creditor, link, paid } = req.body
  if (!_id || !name || !amount || !creditor || !link || !paid) {
    return res.status(500).json({error: 'invalid request format'})
  }

  Reimbursement.findByIdAndUpdate({
    _id
  }, {name: name, amount: amount, creditor: creditor, link: link, paid: paid}, async (err, reimbursement) => {
    if (err) {
      return res.status(500).send(err)
    }
    console.log("updated role\n")
    return res.status(200).json(reimbursement)
  })
}