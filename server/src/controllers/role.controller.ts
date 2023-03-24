import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Officer from 'models/officer.model'
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
  if (req.body.officer_ids) return addRoleToOfficer(req, res)

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
  if (req.body.officer_id) return removeRoleFromOfficer(req, res)

  let { _id } = req.body

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

export const editRole = async (req: Request, res: Response) => {
  let { newName, newColor, _id } = req.body
  if (!newName || !newColor || !_id) {
    return res.status(500).json({error: 'invalid request format, missing id or newName or newColor'})
  }

  Role.findByIdAndUpdate({
    _id
  }, {name: newName, color: newColor}, async (err, role) => {
    if (err) {
      return res.status(500).send(err)
    }
    console.log("updated role\n")
    return res.status(200).json(role)
  })
}

export const removeRoleFromOfficer = async (req: Request, res: Response) => {
  let { officer_id, role_id } = req.body

  if (!officer_id) return res.status(500).json({error: 'no officer id provided'})
  if (!role_id) return res.status(500).json({error: 'no role id provided'})

  Officer.findByIdAndUpdate(officer_id, { $pull: {"role_ids": role_id}}, async (err, result) => {
    if (err) return res.status(500).send({err})
    return res.status(200).json({result})
  })
}

export const addRoleToOfficer = async (req: Request, res: Response) => {
  let { officer_ids, role_id } = req.body

  if (!officer_ids) return res.status(500).json({error: 'no officer id provided'})
  if (!role_id) return res.status(500).json({error: 'no tag role provided'})

  // TODO: Check that they do not already have the tag

  let conditions = (officer_id) => { return {
    _id: officer_id,
    'role_ids': { $nin: role_id }
  }}

  officer_ids.forEach(officer_id => {
    Officer.findOneAndUpdate(conditions(officer_id), { $push: {"role_ids": role_id}},  async (err, result) => {
      if (err) return res.status(500).send({err})
    })
  })

  return res.status(200).json({success: "true"})
}