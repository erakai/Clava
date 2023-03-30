import { PassportLocalDocument } from "mongoose";

interface IUser extends PassportLocalDocument {
  name: string,
  email: string,
  password: string,
  club_ids: Array<number>,
  refreshTokens: Array<string>
}
