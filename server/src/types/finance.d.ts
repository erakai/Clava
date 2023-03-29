import { Document } from 'mongoose'

interface ITransaction extends Document {
  club_id: string
  source: string,
  amount: number,
  date: number,  
}
