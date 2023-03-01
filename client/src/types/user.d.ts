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

interface UserResetRequest {
  email: string
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