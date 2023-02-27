import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IMember } from "types/member";

const MemberSchema = new Schema<IMember>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  email: SchemaTypes.String,
  expiration: SchemaTypes.Date,
  club_id: SchemaTypes.ObjectId,
  tag_ids: [SchemaTypes.ObjectId]
})

const Member = model('member', MemberSchema) as Model<IMember>

export default Member