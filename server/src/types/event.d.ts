import { Document } from "mongoose"

interface IEvent extends Document {
  event_id: number
  name: string
  date: Date
  started: boolean
  description: string
  attendance: number
}