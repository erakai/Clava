import axios from "axios"
import TokenService from "./token.service"

// This script intercepts responses and requests

const instance = axios.create({
  baseURL: `${process.env.SERVER_URL}/users`,
  headers: { 
    "Content-Type": "application/json"
  }
})

// what to do when a request happens
instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken()
    if (token) {
      config.headers["x-access-token"] = token
    }
    return config
    
  }, 
  (error) => {
    return Promise.reject(error)
  }
)

// what to do when a response is returned
instance.interceptors.response.use(
  // response is always returned
  (res) => {
    return res
  },
  async (err) => {
    const originalConfig = err.config

    if (originalConfig.url !== "/users/login" && err.response) {// TODO probably have to change url
      // Access Token is expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/users/refresh", { // TODO change url
            refreshToken: TokenService.getLocalRefreshToken()
          })

          const { accessToken } = rs.data
          TokenService.updateLocalAccessToken(accessToken)

          return instance(originalConfig)
        } catch (_error) {
          return Promise.reject(err)
        }
      }
    }
    return Promise.reject(err)
  }
)

export default instance;