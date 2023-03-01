import type { Request, Response } from 'express'
import Tag from 'models/tag.model'
import Club from 'models/club.model'
import { IClub } from 'types/club'

export const getTags = async (req: Request, res: Response) => {
  let { club_id } = req.body
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  const club: IClub = await Club.findById(club_id)

  if (!club) {
    return res.status(401).send('Unauthorized')
  }

  const tag_ids = club.tag_ids

  const tags = []

  Tag.find({
    club_id: club_id
  }, async (err, tags) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({tags})
  })
}

export const createTag = async (req: Request, res: Response) => {
  let { club_id, tag_name, tag_color, } = req.body

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  if (!tag_name || !tag_color) {
    return res.status(500).json({error: 'no tag name or tag color provided'})
  }

  // verify that the club exists

  Club.find({
    club_id: club_id
  }, async (err) => {
    if (err) {
      return res.status(500).send({err})
    }
  })

  // TODO: verify that tag is unique

  // add the new tag to the club
  Tag.create({
    tag_name, tag_color, club_id
  }, async (err, tag) => {
    if (err) {
      return res.status(500).send({err})
    }
    return res.status(200).json({tag})
  })

  
}