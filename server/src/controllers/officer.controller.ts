import type { Request, Response } from 'express'
import Member from 'models/member.model'
import Officer from 'models/officer.model'

export const getOfficers = async (req: Request, res: Response) => {
	console.log(req.query)
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
	let { name, club_id, email } = req.body
	
	const expiration = new Date(new Date().getTime() + (24 * 60 * 60 * 1000)); // officer invitation will expire

	// TODO: Verify club_id is a valid id

	if (!name || !club_id) {
		return res.status(400).json({error: 'no name or club provided'})
	}

	// if member already exists, no need to add
	Member.find({
      name: name, email: email
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
		  }

		  return res.status(200).json({member})
		})
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
		    name, club_id, expiration
		  }, async (err, officer) => {
		    if (err) {
		      return res.status(500).send({err})
		    }

		    return res.status(200).json({officer})
		  })
		}
	})
}