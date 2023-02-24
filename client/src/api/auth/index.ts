import to from 'await-to-js'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import type { ActionCreatorWithPayload, Store } from 'axios'
import type { RootState } from 'store'

export type Token = string
export type AuthResponse = { user: UserRequest; token: Token }

let store: Store<RootState> | undefined
let setToken: ActionCreatorWithPayload<{ token: string}> | undefined

export const injectStore = (_store: Store) => {
  store = _store
}

export const injectSetToken = (
  _setToken: ActionCreatorWithPayload<{ token: string }>
) => {
  setToken = _setToken
}

const AuthInstance = axios.create({
  //baseURL: `${process.env.SERVER_URL}/users`,
  baseURL: `http://localhost:8080/users`,
  timeout: 1000,
  withCredentials: true,
  headers: { 
    "Content-Type": "application/json"
  }
})

AuthInstance.interceptors.request.use(
  (config) => {
    if (!store) return config

    const { authState } = store.getState()
    const { token } = authState
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

AuthInstance.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig: AxiosRequestConfig & { retry?:boolean } = err.config

    if (err.response) {
      // token was expired
      if (
        err.response.status === 401 &&
        !originalConfig.retry &&
        originalConfig.url !== '/refresh'
      ) {
        const [error, res] = await to<AxiosResponse<AuthResponse>, AxiosError>(
          getRefreshToken()
        )

        if (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data)
          }

          return Promise.reject(error)
        }
        if (!res) return
        const { token } = res.data
        if (store && setToken) store.dispatch(setToken({ token }))
        AuthInstance.defaults.headers.common.Authorization = `Bearer ${token}`

        return AuthInstance(originalConfig)
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data)
      }
    }
    return Promise.reject(err)
  }
)

export const register = ({ email, password }: UserRequest) =>
  AuthInstance.post<AuthResponse>('/register', { email, password })

export const login = ({ email, password }: UserRequest) =>
  AuthInstance.post<AuthResponse>('/login', { email, password })

export const getRefreshToken = () => 
  AuthInstance.post<AuthResponse>('/refresh')


export const getUser = () =>
  AuthInstance.get<Pick<AuthResponse, 'user'>>('/users')

export const logout = () => AuthInstance.post('/logout')