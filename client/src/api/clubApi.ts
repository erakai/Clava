import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetClubsResponse = { clubs: Club[] }
type CreateClubResponse = { Club: Club }

const ClubInstance = axios.create({
  baseURL: `http://localhost:8080/clubs`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(ClubInstance, getRefreshToken)

export const getClubs = (user_id: string) => {
  return ClubInstance.get<GetClubsResponse>('/', { params: { user_id: user_id }})
}

export const createClub = ({ name, description }: ClubRequest) =>  {
  if (description) {
    return ClubInstance.post<CreateClubResponse>('/', { name, description })
  }
  return ClubInstance.post<CreateClubResponse>('/', { name })
}