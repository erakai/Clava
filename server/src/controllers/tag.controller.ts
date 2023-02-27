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

  // get all tags from tag_ids and put all tags into tag array 
  for (let i = 0; i < tag_ids.length; i++) {
    Tag.find({
      tag_id: tag_ids[i]
    }, async (err, tag) => {
      if (err) {
        return res.status(500).send({err})
      }
      // add tag to array of tags if was able to be found
      tags.push(tag)
    })
  }

  return res.status(200).json({tags})
}

export const createTag = async (req: Request, res: Response) => {
  let { club_id, tagName, tagColor, } = req.body

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  if (!tagName || !tagColor) {
    return res.status(500).json({error: 'no tag name or tag color provided'})
  }

  // TODO: verify that tag is unique

  Tag.create({
    tagName, tagColor
  }, async (err, tag) => {
    if (err) {
      return res.status(500).send({err})
    }
    return res.status(200).json({tag})
  })
}

export const isUniqueTagName = async (req: Request, res: Response) => {
  let { tagName, club_id } = req.body
  if (!club_id || !tagName) {
    return res.status(500).json({error: 'no club id or tag name provided'})
  }

  const club: IClub = await Club.findById(club_id)

  if (!club) {
    return res.status(401).send('Unauthorized')
  }

  const tag_ids = club.tag_ids

  const tags = []

  // get all tags from tag_ids and put all tags into tag array 
  for (let i = 0; i < tag_ids.length; i++) {
    Tag.find({
      tag_id: tag_ids[i]
    }, async (err, tag) => {
      if (err) {
        return res.status(500).send({err})
      }
      // add tag to array of tags if was able to be found
      tags.push(tag)
    })
  }
}
