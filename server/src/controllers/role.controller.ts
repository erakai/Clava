import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Role from 'models/Role.model'
import { IClub } from 'types/club'
import { IRole } from 'types/role'

export const getRoles = async (req: Request, res: Response) => {
  let { club_id } = req.body
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  const club: IClub = await Club.findById(club_id)

  if(!club) return res.status(401).send('Unauthorized')

  const role_ids = club.role_ids;

  const roles = []

  for(let i=0; i<role_ids.length; i++) {
      
    const role = await Role.findById(role_ids[i])

    if(!role) return res.status(401).send('Unauthorized')

    roles.push(role)

  }

  return res.status(200).json({roles})
}

export const createClub = async (req: Request, res: Response) => {
  let { name, color, perms } = req.body
 

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  if (!color) {
    color = "#000000"
  }

  if (!perms) {
    perms = []
  }

  Role.create({
    name, color, perms
  }, async (err, role) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({role})
  })
}