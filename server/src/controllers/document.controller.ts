import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Document from 'models/document.model'

export const getDocuments = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }
  
  Document.find({
    club_id: club_id
  }, async (err, documents) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({documents})
  })
}

export const documentPost = async (req: Request, res: Response) => {
  let { name, link, club_id, } = req.body
  
  if (!club_id) {
    console.log("no club_id !?!?!?!?")
    return res.status(500).json({error: 'no club id provided'})
  }

  
  if (name == "" || link == "") {
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
  
  Document.create({
    name, link, club_id
  }, async (err, document) => {
    if (err) {
      console.log("couldnt make document")
      return res.status(500).send({err})
    }
    return res.status(200).json({document})
  })
}

export const documentDelete = async (req: Request, res: Response) => {
  let { _id, } = req.body
  if (!_id) {
    return res.status(500).json({error: 'no tag with _id exists'})
  }

  Document.findByIdAndDelete({
    _id
  }, async (err, document) => {
    if (err) {
      return res.status(500).send({err})
    }
    console.log("success deleting tag\n" + document)
    return res.status(200).json({document})
  })
}

export const documentPut = async (req: Request, res: Response) => {
  let { newName, newLink, _id } = req.body
  if (!newName || !newLink || !_id) {
    return res.status(500).json({error: 'invalid request format, missing id or newName or newLink'})
  }

  Document.findByIdAndUpdate({
    _id
  }, {name: newName, link: newLink}, async (err, document) => {
    if (err) {
      return res.status(500).send(err)
    }
    console.log("updated tag\n")
    return res.status(200).json(document)
  })
}