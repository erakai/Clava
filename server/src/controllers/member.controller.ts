import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Member from 'models/member.model'
import { hasPermission } from "modules/Permissions"

export const getMembers = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(400).json({error: 'no club id'})
  }

  const [permLookupErr, canViewMembers] = await to(hasPermission("VIEW_MEMBERS", club_id, req.user));
  if (permLookupErr) { res.status(500); }
  if (!canViewMembers) {
    return res.status(403);
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

  const [permLookupErr, canEditMembers] = await to(hasPermission("EDIT_MEMBERS", club_id, req.user));
  if (permLookupErr) { res.status(500); }
  if (!canEditMembers) {
    return res.status(403);
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

  const [membersErr, members] = await to(Member.find({'_id' : { $in: member_ids }}).exec())
  if (membersErr) { res.status(400).json({error: 'issue finding members'}) }
  var club_id = members[0].club_id
  for (let i = 1; i < members.length; i++) {
    if (club_id !== members[i].club_id) {
      return res.status(400).json({error: "requested members in different clubs"})
    }
  }

  const [permLookupErr, canEditMembers] = await to(hasPermission("EDIT_MEMBERS", club_id, req.user));
  if (permLookupErr) { return res.status(500); }
  if (!canEditMembers) {
    return res.status(403);
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

export const updateMember = async (req: Request, res: Response) => {
  let { member_id, name, email } = req.body

  if (!member_id) {
    return res.status(500).json({error: 'no member_id provided'})
  }

  const [membersErr, member] = await to(Member.findById(member_id).exec())
  if (membersErr) { res.status(500).json({error: 'issue finding the member provided'}) }

  const club_id = member.club_id
  const [permLookupErr, canEditMembers] = await to(hasPermission("EDIT_MEMBERS", club_id, req.user));
  if (permLookupErr) { res.status(500); }
  if (!canEditMembers) {
    return res.status(403);
  }

  Member.findByIdAndUpdate(member_id, 
    {"name" : name, "email" : email},
    async (err, result) => {
      if (err) {
        res.status(500).json({error : err})
      }
      return res.status(200).json({result: result})
    }
  )
  
}