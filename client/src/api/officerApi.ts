import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

type GetOfficersResponse = { officers: Officer[] }

const OfficerInstance = axios.create({
  baseURL: `http://localhost:8080/officers`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(OfficerInstance, getRefreshToken)

export const getOfficers = (club_id: string) => {
  return OfficerInstance.get<GetOfficersResponse>('/', { params: { club_id: club_id }})
}

export const _sendOfficerInvite = ({ name, email, club_id }: AddOfficerRequest) => {
  return OfficerInstance.post('/', { name, email, club_id })
}
