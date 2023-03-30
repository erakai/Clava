import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IOfficer } from "types/officer";

const OfficerSchema = new Schema<IOfficer>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  expiration: SchemaTypes.Date,
  club_id: SchemaTypes.ObjectId,
  user_id : SchemaTypes.ObjectId,
  role_ids: [SchemaTypes.ObjectId]
})

const Officer = model('officer', OfficerSchema) as Model<IOfficer>

export default Officer