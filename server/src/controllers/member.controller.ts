import type { Request, Response } from 'express'
import Member from 'models/member.model'

export const getMembers = async (req: Request, res: Response) => {
  let { club_id } = req.body
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  Member.find({ 
    club_id: club_id 
  }, async (err, members) => {
      if (err) {
        return res.status(500).send({err})
      }

      return res.status(200).json({members})
  })
}

export const createMember = async (req: Request, res: Response) => {
  let { name, club_id, expiration } = req.body
  if (!expiration) {
    expiration = new Date(0) // default is Jan 1 1970
  }

  // TODO: Verify club_id is a valid id

  if (!name || !club_id) {
    return res.status(500).json({error: 'no name or club provided'})
  }

  Member.create({
    name, club_id, expiration
  }, async (err, member) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({member})
  })
}