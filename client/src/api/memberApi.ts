import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetMembersResponse = { members: Member[] }
type CreateMemberResponse = { member: Member }
type DeleteMemberResponse = {}
type UpdateMemberResponse = {}

// for tags
type GetTagsResponse = { tags: Tag[] }
type CreateTagResponse = { tag: Tag }
type DeleteTagResponse = { tag: Tag }
type EditTagResponse = { tag: Tag }

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

export const updateMember = ({name, email, member_id} : MemberUpdateRequest) => {
  return MemberInstance.put<UpdateMemberResponse>('/', { name, email, member_id })
}


export const getTags = (club_id: string) => {
  return MemberInstance.get<GetTagsResponse>('/tags/', { params: { club_id: club_id }})
}

export const createTag = ({ name, color, club_id }: CreateTagRequest) => {
  return MemberInstance.post<CreateTagResponse>('/tags/', { name, color, club_id })
}

export const deleteTag = ({ _id }: DeleteTagRequest) => {
  return MemberInstance.delete<DeleteTagResponse>('/tags/', { data: { _id }})
}

export const editTag = ({ newName, newColor, _id }: EditTagRequest) => {
  return MemberInstance.put<EditTagResponse>('/tags/', { newName, newColor, _id })
}