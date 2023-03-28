import axios from 'axios'
import { AuthResponse, Token } from './config';
import { intercepts } from './config';
import { getRefreshToken } from "./userApi"


const UserInstance = axios.create({
  baseURL: `http://localhost:8080/events`,
  timeout: 1000,
  withCredentials: true,
})

/* Very important - embeds tokens! */
intercepts(UserInstance, getRefreshToken)

export const _createEvent = ({ name, description, date, club_id }: CreateEventRequest) => {
  if (!description) {
    return UserInstance.post<AuthResponse>('/', { name, date, club_id })
  } 
  return UserInstance.post<AuthResponse>('/', { name, description, date, club_id })
}


