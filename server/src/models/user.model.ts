import { model, Schema, SchemaTypes } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import { IUser } from "types/user";

const UserSchema = new Schema<IUser>({
  name: SchemaTypes.String,
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  sessionTokens: [SchemaTypes.String],
  club_ids: [SchemaTypes.ObjectId],
  officer_ids: [SchemaTypes.ObjectId]
}) 

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameCaseInsensitive: 'true'
})

const User = model('user', UserSchema)

export default User