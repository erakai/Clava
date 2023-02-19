import { PassportLocalDocument } from "mongoose";

type Session = string

interface IUser extends PassportLocalDocument {
  name: string,
  email: string,
  password: string,
  club_ids: Array<number>,
  officer_ids: Array<number>,
  sessionTokens: Array<Session>
}