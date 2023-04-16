import type { Request, Response } from 'express'
import Member from '../models/member.model'
import Officer from '../models/officer.model'
import User from '../models/user.model'
import {IOfficer} from "../types/officer";
import {IUser} from "../types/user";
import {sendOfficerInvitationEmail} from "../modules/Emailing";
import * as async_hooks from "async_hooks";
import to from "await-to-js";
import Event from "../models/event.model";

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

export const deleteOfficers = async (req: Request, res: Response) => {
	let { officer_ids } = req.body

	if (!officer_ids || officer_ids.length == 0) {
		return res.status(500).send("No officer ids provided.")
	}

	// Erase club_id from the connected user's club_id list
	for (let i = 0; i < officer_ids.length; i++) {
		const [err, officer] = await to(Officer.findOne({"_id": officer_ids[i]}).exec())
		if (!err) {
			const connected_user_id = officer.user_id
			const connected_club_id = officer.club_id

			// Remove club_id from user object
			User.findOne({"_id": connected_user_id}, async (userErr, user: IUser) => {
				if (!userErr && user) {
					let new_user_club_ids = []
					let user_club_ids = user.club_ids

					for (let x = 0; x < user_club_ids.length; x++) {
						if (user_club_ids[x].toString() != connected_club_id.toString()) {
							new_user_club_ids.push(user_club_ids[x])
						}
					}

					user.$set({club_ids: new_user_club_ids})
					user.save()
				}
			})
		}
	}

	const [err] = await to(Officer.deleteMany({ '_id': { '$in': officer_ids }}).exec())
	if (err) {
		return res.status(500).send({err})
	}
	return res.status(200).send("Deletion success.")
}

export const requestAddOfficer = async (req: Request, res: Response) => {
	let { name, email, club_id } = req.body

	let user_id = null // null until invitation acceptence
	const expiration = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)); // officer invitation will expire

	if (!name || !club_id) {
		return res.status(400).send('No name or club provided.')
	}

	User.findOne({email: email}, async (err, user) => {
		if (err) {
			return res.status(500).send({err})
		}
		if (!user) {
			return res.status(500).send("No user with this email found.")
		} else {
			user_id = user._id

			Officer.findOne({email: email, club_id: club_id}, async (err, officer) => {
				if (err) {
					return res.status(500).send({err})
				}

				if (officer) {
					return res.status(400).send('An officer with this email already exists.')
				} else {
					// add to officer
					Officer.create({
						name: name, club_id: club_id, expiration: expiration, user_id: user_id, email: email
					}, async (err, officer) => {
						if (err) {
							return res.status(500).send({err})
						}
						User.findOne({email: email}, async (err, user) => {
							if (err) {
								return res.status(500).send({err})
							}
							let clubs_arr = user.club_ids
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
	})
}
