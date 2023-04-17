import to from 'await-to-js'
import type { Request, Response } from 'express'
import { ElectionResults } from '../models/election.model'
import { Election } from '../models/election.model'

export const getResults = async (req: Request, res: Response) => {
  let { election_id } = req.query
  if (!election_id) return res.status(400).json({error: "no election_id provided"})

  const [err, results] = await to(ElectionResults.find({ election_id: election_id }).exec())
  if (err) return res.status(500).send({err})

  if (!results || !results.length) {
    const [err2, election] = await to(Election.findById(election_id).exec())
    if (err2) return res.status(500).send({err2})

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
    if (err3) return res.status(500).send({err3})
    return res.status(200).json({results})
  }
  return res.status(200).json({results: results[0]})
}

export const vote = async (req: Request, res: Response) => {
  let { election_id, name, amount } = req.body
  if (!election_id || !name || !amount) return res.status(400).json({error: "fields not provided"})

  const doc = await ElectionResults.findOneAndUpdate({ election_id: election_id})
  if (!doc) return res.status(500).json({error: 'something went wrong'})

  doc.candidates.forEach(c => {
    if (c.name == name) {
      c.votes += amount
    }
  })

  await doc.save()
  return res.status(200).json({})
}