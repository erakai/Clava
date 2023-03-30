import { model, Model, Schema, SchemaTypes } from "mongoose";
import { ITransaction } from "types/finance";

const TransactionSchema = new Schema<ITransaction>({
  club_id: SchemaTypes.String,
  source: SchemaTypes.String,
  amount: SchemaTypes.Number,
  date: SchemaTypes.Number,
})

const Transaction = model('transaction', TransactionSchema) as Model<ITransaction>

export default Transaction