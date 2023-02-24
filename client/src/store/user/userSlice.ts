import { createAction, createSlice } from "@reduxjs/toolkit"
import { StoreState } from "store"
import { login, logout, register, getUser } from "./userThunk"

export enum UserState {
  NONE,
  LOGGING_IN,
  LOGGING_OUT,
  REGISTERING
}

export type errorT = {
  name: string,
  message: string
}

export interface IUserState {
  user: User | null
  token: string | null
  state: UserState
  loading: boolean
  success: boolean
  error: errorT | null
}

const initialState: IUserState = {
  user: null,
  token: null,
  state: UserState.NONE,
  loading: false,
  success: false,
  error: null
}

// The below reducers are verbatim from the MERN Boilerplate tutorial
// linked in store/index.ts. (MIT License)
export const setToken = createAction<{ token: string }>('user/setToken')
export const userStateSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setToken, (state, action) => {
      state.token = action.payload.token
    })
    builder.addCase(register.pending, (state) => {
      state.state = UserState.REGISTERING
      state.loading = true
      state.error = null
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.state = UserState.NONE
    })
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.state = UserState.NONE
      state.token = null
    })
    builder.addCase(login.pending, (state) => {
      state.loading = true
      state.error = null
      state.state = UserState.LOGGING_IN
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.state = UserState.NONE
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.token = null
      state.state = UserState.NONE
    })
    builder.addCase(logout.pending, (state) => {
      state.loading = true
      state.error = null
      state.state = UserState.LOGGING_OUT
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false
      state.success = true
      state.user = null
      state.state = UserState.NONE
      state.token = null
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.state = UserState.NONE
    })
    builder.addCase(getUser.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.success = true
      state.user = action.payload.user
      state.state = UserState.NONE
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.state = UserState.NONE
    })
  }
})

export const userStateSelector = (state: StoreState) => state.userState
export default userStateSlice.reducer