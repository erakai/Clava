import { Schema, SchemaTypes, model } from "mongoose";

// figure out how to store passwords?
const UserSchema = new Schema<User>({
  name: SchemaTypes.String,
  email: SchemaTypes.String,
  club_ids: [SchemaTypes.ObjectId],
  officer_ids: [SchemaTypes.ObjectId]
})

const User = model('user', UserSchema)

export default User