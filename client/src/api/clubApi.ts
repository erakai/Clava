import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetClubsResponse = { clubs: Club[] }
type GetClubResponse = { club: Club }
type CreateClubResponse = { club: Club }
type DeleteClubResponse = {}
type TransferClubResponse = {}

const ClubInstance = axios.create({
  baseURL: `http://localhost:8080/clubs`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(ClubInstance, getRefreshToken)

export const getClubs = (user_id: string) => {
  return ClubInstance.get<GetClubsResponse>('/', { params: { user_id: user_id }})
}

export const getClub = (club_id: string) => {
  return ClubInstance.get<GetClubResponse>('/id', { params: { club_id }})
}

export const createClub = ({ name, description, owner_id }: ClubRequest) =>  {
  if (description) {
    return ClubInstance.post<CreateClubResponse>('/', { name, description, owner_id })
  }
  return ClubInstance.post<CreateClubResponse>('/', { name })
}

export const addClubToUser = ({ user_id, club_id }: ClubToUserRequest) =>  {
  return ClubInstance.put<CreateClubResponse>('/', { user_id, club_id })
}

export const removeClubFromUser = ({ user_id, club_id }: ClubToUserRequest) =>  {
  return ClubInstance.put<CreateClubResponse>('/leave', { user_id, club_id })
}

export const deleteClub = ({ club_id }:  DeleteClubRequest) => {
  return ClubInstance.delete<DeleteClubResponse>('/', {data: { club_id }})
}

export const transferClub = ({ club_id, user_id }: ClubToUserRequest) => {
  return ClubInstance.put<TransferClubResponse>('/transfer', {club_id, user_id} )
}