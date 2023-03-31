import type { Request, Response } from 'express'
import Member from '../models/member.model'
import Officer from '../models/officer.model'
import User from '../models/user.model'
import {sendOfficerInvitationEmail} from "../modules/Emailing";
import * as async_hooks from "async_hooks";

export const getOfficers = async (req: Request, res: Response) => {
	let { club_id } = req.query
	if (!club_id) {
		return res.status(500).json({error: 'no club id'})
	}

	Officer.find({
		club_id : club_id
	}, async (err, officers) => {
		if (err) {
			return res.status(500).send({err})
		}

		return res.status(200).json({officers})
	})
}

export const requestAddOfficer = async (req: Request, res: Response) => {
	let { name, email, club_id } = req.body


	const user_id = null // null until invitation acceptence
	const expiration = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)); // officer invitation will expire

	if (!name || !club_id) {
		return res.status(400).json({error: 'no name or club provided'})
	}

	// if member already exists, no need to add

	Member.find({
      email: email
    }, async (err, members) => {
      if (err) {
        return res.status(500).send({err})
      }

      if (members.length == 0) {
      	// add to member 
				Member.create({
					name, email, club_id, expiration
				}, async (err, member) => {
					if (err) {
						return res.status(500).send({err})
					}})
				}
    })

	Officer.find({
		name: name
	}, async (err, officer) => {
		if (err) {
		  return res.status(500).send({err})
		}

		if (officer.length != 0) {
		  return res.status(400).json({error: 'officer already exists'})
		} else {
		  // add to officer
		  Officer.create({
		    name, club_id, expiration, user_id
		  }, async (err, officer) => {
		    if (err) {
		      return res.status(500).send({err})
		    }
		  User.findOne({email: email}, async (err, user) => {
				if (err) {
					//TODO: Handle new user case
				}
				let clubs_arr = []
				for (let club in user.club_ids) {
					clubs_arr.push(club)
				}
				clubs_arr.push(club_id)
				user.$set({club_ids: clubs_arr})
				user.save()
			})

			const link = process.env.CLIENT_URL + "/" + club_id + "/members"
			sendOfficerInvitationEmail(email, name, link)
			return res.status(200).json({officer})
		  })
		}
	})
}
