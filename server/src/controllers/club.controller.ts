import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import User from 'models/user.model'
import { IUser } from 'types/user'
import { IClub } from 'types/club'

export const getClubs = async (req: Request, res: Response) => {
  let { user_id } = req.query

  if (!user_id) {
    return res.status(500).json({error: 'no user id'})
  }
  
  const user: IUser = await User.findById(user_id)

  if(!user) return res.status(401).send('Unauthorized')
  
  const club_ids = user.club_ids;

  const clubs = []
  
  for(let i=0; i<club_ids.length; i++) {
    const club: IClub = await Club.findById(club_ids[i])
    
    if(!club) return res.status(401).send('Unauthorized')
    
    clubs.push(club)
    
  }

  return res.status(200).json({clubs})
}

export const getClub = async (req: Request, res: Response) => {
  let { club_id } = req.query
  
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }
    
  const club: IClub = await Club.findById(club_id)
  
  if(!club) return res.status(401).send('Unauthorized')
    
  return res.status(200).json({club})
}

export const createClub = async (req: Request, res: Response) => {
  let { name, description, owner_id } = req.body

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  if (!description) {
    description = "No description"
  }

  if (!owner_id) {
    return res.status(500).json({error: 'no club owner'})
  }

  Club.create({
    name, description, owner_id
  }, async (err, club) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({club})
  })
}

export const addClubToUser = async (req: Request, res: Response) => {
  let { user_id, club_id } = req.body
  
  console.log("im back")

  if (!user_id) {
    return res.status(500).json({error: 'no user id provided'})
  }

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  User.findByIdAndUpdate(user_id, { $push: {"club_ids": club_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      return res.status(200).json({result})
    }

  })
}

export const removeClubFromUser = async (req: Request, res: Response) => {
  let { user_id, club_id } = req.body
  
  console.log("im back")

  if (!user_id) {
    return res.status(500).json({error: 'no user id provided'})
  }

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  User.findByIdAndUpdate(user_id, { $pull: {"club_ids": club_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      return res.status(200).json({result})
    }

  })
}