import { Document } from "mongoose"

interface IClub extends Document {
  name: string,
  description: string,
  tran_ids: Array<number>,
  reim_ids: Array<number>,
  member_ids: Array<number>,
  officer_ids: Array<number>,
  event_ids: Array<number>,
  owner_id: string,
}