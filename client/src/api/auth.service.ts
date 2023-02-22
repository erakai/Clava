import api from './api'
import TokenService from './token.service'

const register = (name: String, email: String, password: String) => {
  return api.post("/register", {
    name,
    email,
    password
  })
}

const login = (email: String, password: String) => {
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

const logout = () => {
  TokenService.removeUser()
}

const getCurrentUser = () => {
  return TokenService.getUser()
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService