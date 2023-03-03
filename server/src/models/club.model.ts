import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IClub } from "types/club";

const ClubSchema = new Schema<IClub>({
  name: {
    type: SchemaTypes.String, 
    required: true,
  },
  description: SchemaTypes.String,
  tag_ids: [SchemaTypes.ObjectId],
  role_ids: [SchemaTypes.ObjectId],
  tran_ids: [SchemaTypes.ObjectId],
  reim_ids: [SchemaTypes.ObjectId],
  member_ids: [SchemaTypes.ObjectId],
  officer_ids: [SchemaTypes.ObjectId],
  event_ids: [SchemaTypes.ObjectId],
  owner_id: SchemaTypes.ObjectId
})

const Club = model('club', ClubSchema) as Model<IClub>

export default Club