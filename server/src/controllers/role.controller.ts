import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Role from 'models/Role.model'
import Tag from 'models/tag.model'
import { IClub } from 'types/club'
import { IRole } from 'types/role'

export const getRoles = async (req: Request, res: Response) => {
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

  Role.find({
    club_id: club_id
  }, async (err, roles) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({roles})

  })
}

export const createRole = async (req: Request, res: Response) => {
  let { name, color, perms, club_id } = req.body

 

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  if (!color) {
    color = "#000000"
  }

  if (!perms) {
    perms = []
  }
  console.log("mom is fat " + club_id)
  Role.create({
    name, color, perms, club_id
  }, async (err, role) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({role})
  })
}

export const deleteRole = async (req: Request, res: Response) => {

  let { _id } = req.body

  console.log("hi")
 
  if (!_id) {
    return res.status(500).json({error: 'no id provided'})
  }

  Role.findByIdAndDelete({
    _id
  }, async (err, role) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({role})
  })
}