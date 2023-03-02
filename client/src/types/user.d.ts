interface User {
  user_id: string,
  name: string,
  email: string,
  club_ids: Array<number>,
  officer_ids: Array<number>
}

interface UserRequest {
  email: string
  password: string
  name?: string
}

interface Member {
  member_id: string,
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
  tag_ids: Array<number> 
}

interface MemberRequest {
  name: string,
  email: string,
  expiration?: number,
  club_id: string,
}

interface Tag {
  // tag_id: number,
  name: string,
  color: string,
  club_id: string,
}

interface CreateTagRequest {
  name: string,
  color: string,
  club_id: string,
}

interface EditTagRequest {
  newName: string,
  newColor: string,
  club_id: string,
}

interface DeleteTagRequest {
  name: string,
  club_id: string,
}