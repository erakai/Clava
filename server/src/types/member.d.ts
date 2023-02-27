import { Document } from "mongoose"

interface IMember extends Document {
  name: string,
  email: string,
  expiration: Date,
  club_id: number,
  tag_ids: Array<number> 
}