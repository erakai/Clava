import { Model, model, Schema, SchemaTypes } from "mongoose";
import { IMember } from "types/member";
import { IUser } from "types/user";

const MemberSchema = new Schema<IMember>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  expiration: SchemaTypes.Date,
  club_id: SchemaTypes.ObjectId,
  tag_ids: [SchemaTypes.ObjectId]
})

const Member = model('member', MemberSchema) as Model<IUser>

export default Member