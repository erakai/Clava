import { Document } from "mongoose"

interface IRole extends Document {
  name: string,
  color: string,
  perms: Array<string>,
  club_id: string
}