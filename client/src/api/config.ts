import { ActionCreatorWithPayload, Store } from "@reduxjs/toolkit";
import { AxiosInstance, AxiosResponse } from "axios";
import { ErrorInterceptor, injectSetToken, injectStore, JWTInterceptor } from "./intercepts";

export type Token = string

export type AuthResponse = { user: User; token: Token }

export const inject = (
  store: Store, 
  setToken: ActionCreatorWithPayload<{ token: string}> 
) => {
  injectStore(store)
  injectSetToken(setToken)
}

// This must be called on every axios instance we create in order to
// embed the JWT token into our requests (which authorizes it)
export const intercepts = <T extends AxiosInstance>(instance: T, refreshMethod: () => Promise<AxiosResponse<AuthResponse, any>>) => {
  instance.interceptors.request.use(
    JWTInterceptor, (error) => Promise.reject(error)
  )

  instance.interceptors.response.use(
    (res) => res, ErrorInterceptor(instance, refreshMethod)
  )
}