import type { Request, Response } from 'express'
import Club from 'models/club.model'

export const createClub = async (req: Request, res: Response) => {
  let { club_id, name, description } = req.body
 

  if (!name || !club_id) {
    return res.status(500).json({error: 'no name or club provided'})
  }

  Club.create({
    club_id, name, description
  }, async (err, club) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({club})
  })
}