import axios from "axios"
import { intercepts } from "./config"
import { getRefreshToken } from "./userApi"

export type GetSettingsResponse = { settings: Settings }
export type SetSettingsResponse = { settings: Settings }

const SettingsInstance = axios.create({
  baseURL: `http://localhost:8080/settings`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(SettingsInstance, getRefreshToken)

export const _getSettings = (club_id: string) => {
  return SettingsInstance.get<GetSettingsResponse>('/', { params: { club_id: club_id }})
}

export const _updateSettings = (req: UpdateSettingsRequest) => {
  return SettingsInstance.post<SetSettingsResponse>('/', req)
}