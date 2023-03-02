import type { Request, Response } from 'express'
import Member from 'models/member.model'

export const getMembers = async (req: Request, res: Response) => {
  let { club_id } = req.query
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
  let { name, email, club_id, expiration } = req.body
  if (!expiration) {
    expiration = new Date(0) // default is Jan 1 1970
  }

  // TODO: Verify club_id is a valid id

  if (!name || !club_id) {
    return res.status(500).json({error: 'no name or club provided'})
  }

  Member.find({
    name: name, email: email
  }, async (err, members) => {
    if (err) {
      return res.status(500).send({err})
    }

    if (members.length != 0) {
      return res.status(400).json({error: 'member already exists'})
    } else {
      Member.create({
        name, email, club_id, expiration
      }, async (err, member) => {
        if (err) {
          return res.status(500).send({err})
        }

        return res.status(200).json({member})
      })
    }
  })
}

export const deleteMembers = async (req: Request, res: Response) => {
  let { member_ids } = req.body

  if (member_ids.length == 0) {
    return res.status(500).json({error: 'no member_ids provided'})
  }

  // attempts to delete all given, does nothing if invalid id exists
  await Member.deleteMany({'_id':{'$in':member_ids}})
    .then(result => {
      if (result.deletedCount == 0) {
        return res.status(500).json({error: "found none member_ids provided"})
      }
      res.status(200).json({})
    })
    .catch(err => {
      return res.status(500).json({error: err})
    })

}