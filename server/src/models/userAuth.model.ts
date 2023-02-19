import { model, Schema, SchemaTypes } from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose'
import { IUserAuth } from "types/user";

const UserAuthSchema = new Schema<IUserAuth>({
  email: SchemaTypes.String,
  sessionTokens: [SchemaTypes.String]
}) 

UserAuthSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
  usernameCaseInsensitive: 'true'
})

const UserAuth  = model('userAuth', UserAuthSchema)

export default UserAuth