import axios from 'axios'
import { AuthResponse, Token } from './config';
import { intercepts } from './config';


const UserInstance = axios.create({
  baseURL: `http://localhost:8080/users`,
  timeout: 1000,
  withCredentials: true,
})


export const _register = ({ email, password,name }: UserRequest) => {
  if (!name) {
    return UserInstance.post<AuthResponse>('/register', { email, password })
  } 
  return UserInstance.post<AuthResponse>('/register', { email, password, name })
}

export const _login = ({ email, password }: UserRequest) =>
  UserInstance.post<AuthResponse>('/login', { email, password })

export const _getUser = () => 
  UserInstance.get<Pick<AuthResponse, 'user'>>('/')

export const _logout = () => 
  UserInstance.post('/logout')

export const _resetRequest = ({ email }: UserResetRequest) =>
  UserInstance.post('/resetrequest', { email })

export const getRefreshToken = () => 
  UserInstance.post<AuthResponse>('/refresh')

/* Very important - embeds tokens! */
intercepts(UserInstance, getRefreshToken)