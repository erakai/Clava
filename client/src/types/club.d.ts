interface Club {
  _id: string,
  name: string,
  description: string,
  tag_ids: Array<number>,
  role_ids: Array<number>,
  tran_ids: Array<number>,
  reim_ids: Array<number>,
  member_ids: Array<number>,
  officer_ids: Array<number>,
  event_ids: Array<number>,
}

interface ClubRequest {
  name: string,
  description: string
}

interface ClubToUserRequest {
  user_id: string,
  club_id: string
}