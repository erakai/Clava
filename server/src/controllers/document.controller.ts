import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from '../models/club.model'
import ClubDocument from '../models/document.model'
import Role from '../models/role.model'
import { getRolesFromUser, hasPermission, hasRole, isOwner } from '../modules/Permissions'
import { IClubDocument } from '../types/document'

export const getDocuments = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }
  
  ClubDocument.find({
    club_id: club_id
  }, async (err, documents) => {
    if (err) {
      return res.status(500).send({err})
    }

    const [errOwner, isUserOwner] = await to(isOwner((req.user as any)._id, club_id.toString()))
    if (errOwner) { return res.status(500).json({errOwner})}
    if (isUserOwner) {
      return res.status(200).json({documents})
    }

    // O(d*r) doc search
    // Only give up documents that the user requesting has a role too
    var _docs : IClubDocument[] = []
    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i]
      for (let j = 0; j < doc.role_ids.length; j++) {
        const role_id = doc.role_ids[j]
        const [errRole, hasUserRole] = await to(hasRole(role_id, club_id, req.user))
        if (errRole) {return res.status(500).json({errRole})}
        if ((hasUserRole && !_docs.includes(doc))) {
          _docs.push(doc)
        }
      }
    }

    documents = documents.filter((el : IClubDocument) => {
      return _docs.some((f : IClubDocument) => {
        return f._id.toString() === el._id.toString();
      });
    });
    res.status(200).json({documents})
  })
}

export const documentPost = async (req: Request, res: Response) => {
  let { name, link, club_id, } = req.body
  
  if (!club_id) {
    console.log("no club_id !?!?!?!?")
    return res.status(500).json({error: 'no club id provided'})
  }
  
  if (name == "" || link == "") {
    return res.status(500).json({error: 'no doc name or doc link provided'})
  }

  const [errUserHasPerm, userHasPerm] = await to(hasPermission("EDIT_DOCUMENTS", club_id, req.user))
  if (!userHasPerm) {
    return res.status(401).json({error: 'user does not have permission to do this.'})
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

  const [errRoles, userRoles] = await to(getRolesFromUser((req.user as any)._id, club_id))
  if (errRoles) { res.status(500).send({errRoles})}

  var role_ids = []
  userRoles.forEach((role) =>{
    role_ids.push(role.id)
  })

  // add the new document to the club
  
  ClubDocument.create({
    name, link, club_id, role_ids
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
    return res.status(500).json({error: 'no doc with _id exists'})
  }


  ClubDocument.findByIdAndDelete({
    _id
  }, async (err, document) => {
    if (err) {
      return res.status(500).send({err})
    }
    return res.status(200).json({document})
  })
}

export const documentPut = async (req: Request, res: Response) => {
  let { club_id,  } = req.query
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }
  
  ClubDocument.find({
    club_id: club_id
  }, async (err, documents) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({documents})
  })
  let { newName, newLink, _id } = req.body
  if (!newName || !newLink || !_id) {
    return res.status(500).json({error: 'invalid request format, missing id or newName or newLink'})
  }

  ClubDocument.findByIdAndUpdate({
    _id
  }, {name: newName, link: newLink}, {new: true}, async (err, document) => {
    if (err) {
      return res.status(500).send(err)
    }
    //console.log("printed from backend", document)
    return res.status(200).json({document})
  })
}

// roles
export const getDocumentRoles = async (req: Request, res: Response) => {
  let { _id } = req.query

  if (!_id) {
    return res.status(500).json({error: 'no _id provided'})
  }

  ClubDocument.findById({
    _id
  }, async (err, document) => {
    if (err) {
      return res.status(500).send({err})
    }
    const role_ids = (document as IClubDocument).role_ids
    const [rolesErr, roles] = await to(Role.find({ '_id': { $in: role_ids } }).exec())
    if (rolesErr) {
      return res.status(500).send({err})
    }

    return res.status(200).json({roles})
  })
}

export const documentRolePost = async (req: Request, res: Response) => {
  let { _id, role_id } = req.body
  ClubDocument.findByIdAndUpdate(_id, { $push: {"role_ids": role_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      return res.status(200).json({result})
    }
  })
}

export const documentRoleDelete = async (req: Request, res: Response) => {
  let { _id, role_id } = req.body
  ClubDocument.findByIdAndUpdate(_id, { $pull: {"role_ids": role_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      return res.status(200).json({result})
    }
  })
}