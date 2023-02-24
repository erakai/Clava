import api from './api'
import TokenService from './token.service'


export type Token = string
export type AuthResponse = { user: User; token: Token }

export const register = (name: String, email: String, password: String) => {
  return api.post("/register", {
    name,
    email,
    password
  })
}

export const login = (email: String, password: String) => {
  return api
    .post("/login", {
      email,
      password
    })
    .then(response => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data)
      }

      // returns AKA the user
      return response.data
    })
}

export const logout = () => {
  TokenService.removeUser()
}

export const getUser = () => {
  return TokenService.getUser()
}