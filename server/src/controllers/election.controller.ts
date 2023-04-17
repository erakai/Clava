import type { Request, Response } from 'express'
import { Election } from '../models/election.model'
import to from 'await-to-js'

export const getElections = async (req: Request, res: Response) => {
  let { club_id } = req.query
  if (!club_id) return res.status(400).json({error: 'no club id'})

  const [err, elections] = await to(Election.find({club_id: club_id}).exec())
  if (err) return res.status(500).send({err})
  
  return res.status(200).json({elections})
}

export const postElection = async (req: Request, res: Response) => {
  if (req.body.election_id) return updateElection(req, res)
  return addElection(req, res)
}

export const addElection = async (req: Request, res: Response) => {
  let electionReq = req.body.election
  if (!electionReq) return res.status(400).json({error: 'no election'})
  if (!electionReq.club_id || !electionReq.name || !electionReq.description) {
    return res.status(400).json({error: 'provided required fields'})
  }
  
  const [err, election] = await to(Election.create(electionReq))
  if (err) return res.status(500).send({err})

  return res.status(200).json({election})
}

export const updateElection = async (req: Request, res: Response) => {
  let { election_id } = req.body
  let electionReq = req.body.election
  if (!election_id || !electionReq) return res.status(400).json({error: 'no request'})

  const [err, election] = await to(Election.findByIdAndUpdate(election_id, electionReq, {new: true}).exec())
  if (err) return res.status(500).send({err})

  return res.status(200).json({election})
}

export const removeElection = async (req: Request, res: Response) => {
  let { election_ids } = req.body
  if (!election_ids || election_ids.length == 0) {
    return res.status(400).json({error: 'no elections provided'})
  }

  const [err] = await to(Election.deleteMany({ '_id': { '$in': election_ids  }}).exec())
  if (err) return res.status(500).send({err})

  return res.status(200).json({})
}