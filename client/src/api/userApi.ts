import axios from 'axios'
import { Token } from './config';
import { intercepts } from 'api/config';

export type AuthResponse = { user: User; token: Token }

const UserInstance = axios.create({
  baseURL: `http://localhost:8080/users`,
  timeout: 1000,
  withCredentials: true,
})

/* Very important - embeds tokens! */
intercepts(UserInstance)

export const _register = ({ email, password, name }: UserRequest) => {
  if (!name) {
    return UserInstance.post<AuthResponse>('/register', { email, password })
  } 
  return UserInstance.post<AuthResponse>('/register', { email, password, name })
}

export const _login = ({ email, password }: UserRequest) =>
  UserInstance.post<AuthResponse>('/login', { email, password })

export const _getUser = () => 
  UserInstance.get<Pick<AuthResponse, 'user'>>('/users')

export const _logout = () => 
  UserInstance.post('/logout')

export const getRefreshToken = () => 
  UserInstance.post<AuthResponse>('/refresh')