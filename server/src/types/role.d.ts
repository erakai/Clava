import { Document } from "mongoose"

interface IRole extends Document {
  name: string,
  color: string,
  perms: Array<number>,
}