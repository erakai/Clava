interface User {
  _id: string,
  name: string,
  email: string,
  club_ids: Array<string>,
  officer_ids: Array<string>
}

interface UserRequest {
  email: string
  password: string
  name?: string
}

interface UserResetRequest {
  email: string
}

interface UserChangePasswordRequest {
  user_id: string
  password: string
}

interface Member {
  _id: string,
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
  tag_ids: Array<string> 
}

interface MemberRequest {
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
}

interface MemberUpdateRequest {
  name: string,
  email: string,
  member_id: string
}

interface Tag {
  _id: string,
  name: string,
  color: string,
}

interface CreateTagRequest {
  name: string,
  color: string,
  club_id: string,
}

interface EditTagRequest {
  newName: string,
  newColor: string,
  _id: string,
}

interface DeleteTagRequest {
  _id: string,
}

interface DeleteTagFromMemberRequest {
  tag_id: string
  member_id: string
}

interface AddTagToMemberRequest {
  tag_id: string
  member_ids: string[]
}