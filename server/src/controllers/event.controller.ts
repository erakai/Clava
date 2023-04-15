import to from 'await-to-js'
import type { Request, Response } from 'express'
import Member from '../models/member.model'
import Event from '../models/event.model'
import { IEvent } from '../types/event'
import { IMember } from '../types/member'
import {sendEventScheduleEmail} from "../modules/Emailing";

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

export const sendSchedule = async (req: Request, res: Response) => {
  const club_id = req.body.club_id
  const date = new Date(req.body.date)
  const header = req.body.header

  if (!club_id) {
    return res.status(500).json({error: 'no club id'})
  }

  Event.find({club_id: club_id}).sort("date").find(async (err, events) => {
    if (err) {
      return res.status(500).send({err})
    }

    if (events.length == 0) {
      return res.status(500).send("No created events")
    }

    let eventNames = []
    let eventDates = []

    const now = new Date()

    events.forEach((e: IEvent) => {
      if (e.date <= date && e.date > now) {
        eventNames.push(e.name)
        eventDates.push(e.date)
      }
    })

    if (eventNames.length == 0) {
      return res.status(500).send( "No events found in range")
    }

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

      sendEventScheduleEmail(recipients, header, eventNames, eventDates)
      return res.status(200).send("Members were successfully notified")
    })
  })
}

export const incrementAttendance = async (req: Request, res: Response) => {
  const event_id = req.body._id

  if (!event_id) {
    return res.status(500).json({error: 'no event id'})
  }

  Event.findById(event_id, async (err, event: IEvent) => {
    if (err || !event) {
      return res.status(500).json("Error: Event Not Found")
    }

    const now = new Date();
    if (event.date < now) {
      return res.status(200).send("Event already passed")
    }

    const currentAttendanceCount = event.attendance
    event.$set({attendance: currentAttendanceCount+1})
    event.save()
    return res.status(200).send("Attendance Recorded")
  })
}

export const deleteEvents = async (req: Request, res: Response) => {
  let { event_ids } = req.body

  if (!event_ids || event_ids.length == 0) {
    return res.status(500).json({error: 'no event_ids provided'})
  }

  const [err] = await to(Event.deleteMany({ '_id': { '$in': event_ids }}).exec())
  if (err) return res.status(500).send({err})
  return res.status(200).json({})
}

export const getEvent = async (req: Request, res: Response) => {
  let { event_id } = req.query
  
  if (!event_id) {
    return res.status(500).json({error: 'no event id'})
  }
    
  Event.findById(event_id, async (err, event: IEvent) => {
    if (err) {
      return res.status(500).send({err})
    }

    if(!event) {return res.status(500).send('Cannot find event')}

    return res.status(200).json({event})
  })
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
