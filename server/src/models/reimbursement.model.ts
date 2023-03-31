import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IReimbursement } from "../types/reimbursement";

const ReimbursementSchema = new Schema<IReimbursement>({
  name: {
    type: SchemaTypes.String, 
    required: true,
  },
  amount: {
    type: SchemaTypes.Number,
    required: true
  },
  creditor: {
    type: SchemaTypes.String,
    required: true
  },
  link: SchemaTypes.String,
  paid: SchemaTypes.Boolean,
  club_id: SchemaTypes.ObjectId
})

const Reimbursement = model('reimbursement', ReimbursementSchema) as Model<IReimbursement>

export default Reimbursement