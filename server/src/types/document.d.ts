import { Document } from "mongoose"

interface IClubDocument extends Document {
  document_id: number,
  name: string,
  link: string,
  club_id: number,
}