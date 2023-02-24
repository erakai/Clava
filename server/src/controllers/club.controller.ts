import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import User from 'models/user.model'
import { IUser } from 'types/user'

export const getClubs = async (req: Request, res: Response) => {
  let { user_id } = req.body
  if (!user_id) {
    return res.status(500).json({error: 'no user id'})
  }

  const user: IUser = await User.findById(user_id)

  if(!user) return res.status(401).send('Unauthorized')

  const club_ids = user.club_ids;

  const clubs = []

  for(let i=0; i<club_ids.length; i++) {
    Club.find({ 
      club_id: club_ids[i]
    }, async (err, club) => {
        if (err) {
          return res.status(500).send({err})
        }
  
        clubs.push(club)
    })
  }

  return res.status(200).json({clubs})
}

export const createClub = async (req: Request, res: Response) => {
  let { name, description } = req.body
 

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  Club.create({
    name, description
  }, async (err, club) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({club})
  })
}