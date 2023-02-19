import { PassportLocalDocument } from "mongoose";

interface IUser {
  user_id: number,
  name: string,
  email: string,
  password: string,
  club_ids: Array<number>,
  officer_ids: Array<number>
}

type Session = string

interface IUserAuth extends PassportLocalDocument {
  email: string
  password: string
  sessionTokens: Array<Session>
}