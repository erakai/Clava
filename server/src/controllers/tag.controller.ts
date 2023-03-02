import type { Request, Response } from 'express'
import Tag from 'models/tag.model'
import Club from 'models/club.model'
import { IClub } from 'types/club'

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

export const createTag = async (req: Request, res: Response) => {
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
    console.log("made tag")
    return res.status(200).json({tag})
  })
}

export const deleteTag = async (req: Request, res: Response) => {
  let { _id, } = req.body
  if (!_id) {
    return res.status(500).json({error: 'no tag with _id exists'})
  }

  let delTag;

  Tag.findByIdAndDelete({
    _id
  }, async (err, tag) => {
    if (err) {
      return res.status(500).send({err})
    }
    console.log("success deleting tag\n" + delTag)
    return res.status(200).json({tag})
  })
}

// export const editTag = async (req: Request, res: Response) => {
//   let { newName, newColor, _id } = req.body
//   if (!newName || !newColor || !_id) {
//     return res.status(500).json({error: 'invalid request format, missing id or newName or newColor'})
//   }

//   Tag.findById({
//     _id
//   }, async (err, tag) => {
//     if (err) {
//       return res.status(500).send(err)
//     }
//     Tag.
//   })
// }
