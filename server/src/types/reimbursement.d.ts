import { Document } from "mongoose"

interface IReimbursement extends Document {
  name: string,
  amount: number,
  link: string,
  paid: boolean,
  club_id: string
}