import { Document } from "mongoose"

interface ITag extends Document {
  tag_id: number,
  name: string,
  color: string
}