import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

export type GetOfficersResponse = { officers: Officer[] }
export type GetOfficeInviteResponse = { officer: Officer }
export type DeleteOfficerResponse = {}

const OfficerInstance = axios.create({
  baseURL: `http://localhost:8080/officers`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(OfficerInstance, getRefreshToken)

export const getOfficers = (club_id: string) => {
  return OfficerInstance.get<GetOfficersResponse>('/', { params: { club_id: club_id }})
}

export const _deleteOfficers = (officer_ids: string[]) => {
  return OfficerInstance.delete<DeleteOfficerResponse>('/', { data : { officer_ids }})
}

export const _sendOfficerInvite = ({ name, email, club_id }: AddOfficerRequest) => {
  return OfficerInstance.post<GetOfficeInviteResponse>('/', { name: name, email: email, club_id: club_id })
}
