import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from '../models/club.model'
import User from '../models/user.model'
import { IUser } from '../types/user'
import { IClub } from '../types/club'
import Settings from '../models/settings.model'
import { getDefaultSettings } from 'http2'
import { defaultSettings } from './settings.controller'
import { isOwner, isUserOfClub } from '../modules/Permissions'
import Officer from "../models/officer.model";
import Member from '../models/member.model'
import ClubDocument from '../models/document.model'
import { Election, ElectionResults } from '../models/election.model'
import Reimbursement from '../models/reimbursement.model'
import Log from '../models/log.model'
import Role from '../models/role.model'
import Transaction from '../models/transanction.model'
import Tag from '../models/tag.model'

export const getClubs = async (req: Request, res: Response) => {
  let { user_id } = req.query

  if (!user_id) {
    return res.status(500).json({error: 'no user id'})
  }
  
  const user: IUser = await User.findById(user_id)

  if(!user) return res.status(401).send('Unauthorized')
  
  const club_ids = user.club_ids;

  const clubs = []
  
  for(let i=0; i<club_ids.length; i++) {
    const club: IClub = await Club.findById(club_ids[i])
    
    if(!club) return res.status(401).send('Unauthorized')
    
    clubs.push(club)
    
  }

  return res.status(200).json({clubs})
}

export const getClub = async (req: Request, res: Response) => {
  let { club_id } = req.query
  
  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }
  
  const [clubErr, club] = await to(Club.findById(club_id).exec())
  if (clubErr) return res.status(400).send()
  if(!club) return res.status(401).send('Unauthorized')
  
  // check if the user is a member of the club
  const _user : any = req.user;
  const [errUserOfClub, _isUserOfClub] = await to(isUserOfClub(_user._id, club_id.toString()))
  if (errUserOfClub) return false 
  if (!_isUserOfClub) {
    return res.status(403).send("error: not user of club")
  }

  return res.status(200).json({club})
}

export const createClub = async (req: Request, res: Response) => {
  let { name, description, owner_id } = req.body

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  if (!description) {
    description = "No description"
  }

  if (!owner_id) {
    return res.status(500).json({error: 'no club owner'})
  }

  Club.create({
    name, description, owner_id
  }, async (err, club) => {
    if (err) {
      return res.status(500).send({err})
    }

    const defSettings = defaultSettings()
    defSettings.club_id = club._id

    const [sErr, setting] = await to (Settings.create((defSettings)))
    if (sErr) {
      return res.status(500).send({err})
    }

    return res.status(200).json({club})
  })
}

export const addClubToUser = async (req: Request, res: Response) => {
  let { user_id, club_id } = req.body
  
  if (!user_id) {
    return res.status(500).json({error: 'no user id provided'})
  }

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  // check if the user (who requested) is a owner of the club
  const _user : any = req.user;
  const [errOwnerOfClub, _isOwnerOfClub] = await to(isOwner(_user._id, club_id.toString()))
  if (errOwnerOfClub) return false 
  if (!_isOwnerOfClub) {
    return res.status(403).json()
  }

  User.findByIdAndUpdate(user_id, { $push: {"club_ids": club_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      return res.status(200).json({result})
    }

  })
}

export const removeClubFromUser = async (req: Request, res: Response) => {
  let { user_id, club_id } = req.body
  
  if (!user_id) {
    return res.status(500).json({error: 'no user id provided'})
  }

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  // check if the user (who requested) is a owner of the club
  const _user : any = req.user;
  const [errOwnerOfClub, _isOwnerOfClub] = await to(isOwner(_user._id, club_id.toString()))
  if (errOwnerOfClub) return false 
  if (!_isOwnerOfClub) {
    //return res.status(403).json()
  }

  User.findByIdAndUpdate(user_id, { $pull: {"club_ids": club_id} }, async (err, result) => {

    if(err){
      return res.status(500).send({err})
    }
    else{
      Officer.findOneAndDelete({user_id: user_id, club_id: club_id}, async (officerErr, deleteRes) => {
        if (officerErr) {
          console.log(err)
        } else {
          console.log(deleteRes)
        }
      })
      return res.status(200).json({result})
    }

  })
}

export const deleteClub = async (req: Request, res: Response) => {
  let { club_id } = req.body

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  const [errOwner, isUserOwner] = await to(isOwner((req.user as any)._id, club_id))
  if (errOwner) { return res.status(500).send({errOwner}) }
  if (!isUserOwner) {
    return res.status(401).json({error: "incorrect perms to delete club"})
  }

  // PURGE
  await to(Officer.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Member.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(ClubDocument.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Election.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(ElectionResults.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Log.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Reimbursement.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Role.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Settings.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Tag.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  await to(Transaction.deleteMany({ 'club_id': { '$in': club_id }}).exec())
  // PURGE OVER

  const _id = club_id
  Club.findByIdAndDelete({
    _id
  }, async (err, role) => {
    if (err) {
      console.log("dying here", err.message)
      return res.status(500).send({err})
    }

    return res.status(200).json({role})
  })
}

export const transferOwnership = async (req: Request, res: Response) => {
  let { club_id, user_id } = req.body

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  if (!user_id) {
    return res.status(500).json({error: 'no user id provided'})
  }

  const [errOwner, isUserOwner] = await to(isOwner((req.user as any)._id, club_id))
  if (errOwner) { return res.status(500).send({errOwner}) }
  if (!isUserOwner) {
    return res.status(401).json({error: "incorrect perms to delete club"})
  }

  const _id = club_id
  const [err] = await to (Club.findOneAndUpdate(_id, {owner_id : user_id}).exec())
  if (err) { return res.status(500).send({err})}

  return res.status(200).json({})
}