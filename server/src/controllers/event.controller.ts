import to from 'await-to-js'
import type { Request, Response } from 'express'
import Club from 'models/club.model'
import Event from 'models/event.model'
import { IEvent } from 'types/event'
import { IClub } from 'types/club'

export const getEvents = async (req: Request, res: Response) => {
  let { club_id } = req.query

  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  Event.find({
    club_id: club_id
  }, async (err, events) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({events})
  })
}

export const getEvent = async (req: Request, res: Response) => {
  let { event_id } = req.query
  
  if (!event_id) {
    return res.status(500).json({error: 'no event id'})
  }
    
  const event: IEvent = await Event.findById(event_id)
  
  if(!event) return res.status(401).send('Unauthorized')
    
  return res.status(200).json({event})
}

export const createEvent = async (req: Request, res: Response) => {
  let { name, description, date, club_id } = req.body

  if (!name) {
    return res.status(500).json({error: 'no name provided'})
  }

  if (!description) {
    description = "No event description provided"
  }

  if (!date) {
    return res.status(500).json({error: 'no date provided'})
  }

  if (!club_id) {
    return res.status(500).json({error: 'no club id provided'})
  }

  Event.create({
    name: name,
    description: description,
    date: date,
    started: false,
    attendance: 0,
    club_id: club_id
  }, async (err, event) => {
    if (err) {
      return res.status(500).send({err})
    }

    return res.status(200).json({event})
  })
}
