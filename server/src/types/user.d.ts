interface User {
  user_id: number,
  name: string,
  email: string,
  password: string,
  club_ids: Array<number>,
  officer_ids: Array<number>
}