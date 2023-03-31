import { model, Schema, SchemaTypes } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({
  name: SchemaTypes.String,
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  refreshTokens: [SchemaTypes.String],
  club_ids: [SchemaTypes.ObjectId],
}) 

// Enable passport authentication using email as username
UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameCaseInsensitive: 'true'
})

// Remove information we don't need the client to have access to
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.refreshTokens
    delete ret.salt 
    delete ret.hash
    return ret
  }
})

const User = model('user', UserSchema)

export default User