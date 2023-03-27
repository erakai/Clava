import { Document } from "mongoose"

interface IEvent extends Document {
  name: string
  date: Date
  started: boolean
  description: string
  attendance: number
  club_id: number
}