import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetMembersResponse = { members: Member[] }
type CreateMemberResponse = { member: Member }
type DeleteMemberResponse = {}

const MemberInstance = axios.create({
  baseURL: `http://localhost:8080/members`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(MemberInstance, getRefreshToken)

export const getMembers = (club_id: string) => {
  return MemberInstance.get<GetMembersResponse>('/', { params: { club_id: club_id }})
}

export const createMember = ({ name, email, expiration, club_id }: MemberRequest) =>  {
  if (expiration) {
    return MemberInstance.post<CreateMemberResponse>('/', { name, email, expiration, club_id })
  }
  return MemberInstance.post<CreateMemberResponse>('/', { name, email, club_id })
}

export const deleteMembers = (member_ids: string[]) => {
  return MemberInstance.delete<DeleteMemberResponse>('/', { data : { member_ids } })
}