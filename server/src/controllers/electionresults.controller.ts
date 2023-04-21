import to from 'await-to-js'
import type { Request, Response } from 'express'
import { ElectionResults } from '../models/election.model'
import { Election } from '../models/election.model'
import Member from '../models/member.model'
import {IMember} from "../types/member";
import {sendElectionResultEmail, sendEventScheduleEmail} from "../modules/Emailing";

const createResultsIfNecessary = async (election_id: string) => {
  const [err, results] = await to(ElectionResults.find({ election_id: election_id }).exec())
  if (err) return [err, -1]

  if (!results || !results.length) {
    const [err2, election] = await to(Election.findById(election_id).exec())
    if (err2) return [err2, -1]

    let canres: any[] = [];
    election.candidates.forEach(e => {
      canres.push({ name: e.name, votes: 0})
    })

    let newres = {
      election_id: election_id,
      name: election.name,
      candidates: canres
    }

    const [err3, results] = await to(ElectionResults.create(newres))
    if (err3) return [err3, -1]
    return [null, results]
  }

  return [null, results[0]]
}

export const getResults = async (req: Request, res: Response) => {
  let { election_id } = req.query
  if (!election_id) return res.status(400).json({error: "no election_id provided"})

  const created: any[] = await createResultsIfNecessary(election_id as string)
  if (created[0]) return res.status(500).send(created[0])

  return res.status(200).json({results: created[1]})
}

export const vote = async (req: Request, res: Response) => {
  let { election_id, name, amount } = req.body
  if (!election_id || !name || !amount) return res.status(400).json({error: "fields not provided"})

  const [err, _] = await createResultsIfNecessary(election_id)
  if (err) return res.status(500).send(err)

  const [err2, results] = await to(ElectionResults.findOne({ election_id: election_id }).exec())
  if (err2) return res.status(500).send(err) 

  let newcan = [...results.candidates]
  newcan.forEach(c => {
    if (c.name == name) {
      c.votes += amount
    }
  })

  const [err3, l] = await to(ElectionResults.findByIdAndUpdate(results._id, { candidates: newcan }).exec())
  if (err3) return res.status(500).send({err})

  return res.status(200).json({})
}

export const notifyMembers = async (req: Request, res: Response) => {
  let { message, club_id } = req.body

  let recipients = ""
  Member.find({club_id: club_id}, async (err, members) => {
    if (err) {
      return res.status(500).send({err})
    }

    members.forEach((e: IMember) => {
      recipients += e.email + ", "
    })

    if (recipients == "") {
      return res.status(500).send("No members found")
    }

    recipients = recipients.slice(0, -2)

    sendElectionResultEmail(recipients, message)
    return res.status(200).send("Members were successfully notified")
  })
}