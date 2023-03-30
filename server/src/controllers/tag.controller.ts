import type { Request, Response } from 'express'
import Tag from 'models/tag.model'
import Club from 'models/club.model'
import { IClub } from 'types/club'
import Member from 'models/member.model'

export const getTags = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  Tag.find({
    club_id: club_id
  }, async (err, tags) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({tags})
  })
}

export const tagPost = async (req: Request, res: Response) => {
  if (req.body.member_ids) return addTagToMember(req, res)

  let { name, color, club_id, } = req.body

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  
  if (name == "" || color == "") {
    console.log("no tag or color")
    return res.status(500).json({error: 'no tag name or tag color provided'})
  }
  
  // verify that the club exists

  Club.find({
    club_id: club_id
  }, async (err) => {
    if (err) {
      console.log("no club")
      return res.status(500).send({err})
    }
  })

  // add the new tag to the club
  
  Tag.create({
    name, color, club_id
  }, async (err, tag) => {
    if (err) {
      console.log("couldnt make tag")
      return res.status(500).send({err})
    }
    return res.status(200).json({tag})
  })
}

export const tagDelete = async (req: Request, res: Response) => {
  if (req.body.member_id) return removeTagFromMember(req, res)

  let { _id, } = req.body
  if (!_id) {
    return res.status(500).json({error: 'no tag with _id exists'})
  }

  Tag.findByIdAndDelete({
    _id
  }, async (err, tag) => {
    if (err) {
      return res.status(500).send({err})
    }
    console.log("success deleting tag\n" + tag)
    return res.status(200).json({tag})
  })
}

export const tagPut = async (req: Request, res: Response) => {
  let { newName, newColor, _id } = req.body
  if (!newName || !newColor || !_id) {
    return res.status(500).json({error: 'invalid request format, missing id or newName or newColor'})
  }

  Tag.findByIdAndUpdate({
    _id
  }, {name: newName, color: newColor}, async (err, tag) => {
    if (err) {
      return res.status(500).send(err)
    }
    console.log("updated tag\n")
    return res.status(200).json(tag)
  })
}

export const removeTagFromMember = async (req: Request, res: Response) => {
  let { member_id, tag_id } = req.body

  if (!member_id) return res.status(500).json({error: 'no member id provided'})
  if (!tag_id) return res.status(500).json({error: 'no tag id provided'})

  Member.findByIdAndUpdate(member_id, { $pull: {"tag_ids": tag_id}}, async (err, result) => {
    if (err) return res.status(500).send({err})
    return res.status(200).json({result})
  })
}

export const addTagToMember = async (req: Request, res: Response) => {
  let { member_ids, tag_id } = req.body

  if (!member_ids) return res.status(500).json({error: 'no member id provided'})
  if (!tag_id) return res.status(500).json({error: 'no tag id provided'})

  // TODO: Check that they do not already have the tag

  let conditions = (member_id) => { return {
    _id: member_id,
    'tag_ids': { $nin: tag_id }
  }}

  member_ids.forEach(member_id => {
    Member.findOneAndUpdate(conditions(member_id), { $push: {"tag_ids": tag_id}},  async (err, result) => {
      if (err) return res.status(500).send({err})
    })
  })

  return res.status(200).json({success: "true"})
}