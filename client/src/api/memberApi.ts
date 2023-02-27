import axios from "axios"
import { intercepts } from "./config"

type MemberResponse = { members: Member[] }

const MemberInstance = axios.create({
  baseURL: `http://localhost:8080/members`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(MemberInstance)

export const getMembers = (club_id: string) => {
  return MemberInstance.get<MemberResponse>('/', { params: { club_id: club_id }})
}

export const createMember = ({ name, email, expiration, club_id }: MemberRequest) =>  {
  if (expiration) {
    return MemberInstance.post<MemberResponse>('/', { name, email, expiration, club_id })
  }
  return MemberInstance.post<MemberResponse>('/', { name, email, club_id })
}