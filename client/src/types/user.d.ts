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