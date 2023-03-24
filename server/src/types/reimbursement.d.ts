import { Document } from "mongoose"

interface IReimbursement extends Document {
  name: string,
  amount: number,
  creditor: string,
  link: string,
  paid: boolean,
  club_id: string
}