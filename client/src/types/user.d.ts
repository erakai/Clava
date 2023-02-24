interface User {
  user_id: number,
  name: string,
  email: string,
  club_ids: Array<number>,
  officer_ids: Array<number>
}

interface Member {
  member_id: string,
  name: string,
  expiration: number,
  club_id: string,
  tag_ids: Array<number> 
}