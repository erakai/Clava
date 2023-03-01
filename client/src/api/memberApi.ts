import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetMembersResponse = { members: Member[] }
type CreateMemberResponse = { member: Member }

// for tags
type GetTagsResponse = { tag: Tag[] }
type CreateTagResponse = { tag: Tag }
type DeleteTagResponse = {}

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

export const getTags = (club_id: string) => {
  return MemberInstance.get<GetTagsResponse>('/tags/', { params: { club_id: club_id }})
}

export const createTag = ({ name, color, club_id }: CreateTagRequest) => {
  return MemberInstance.post<CreateTagResponse>('/tags/', { name, color, club_id })
}

export const deleteTag = ({ name, club_id }: DeleteTagRequest) => {
  return MemberInstance.delete<DeleteTagResponse>('/tags/', {data: { club_id, name }})
}