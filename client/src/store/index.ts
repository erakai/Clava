import { configureStore } from "@reduxjs/toolkit";
import { inject } from "../api/config";
import userReducer, { setToken } from './user/userSlice'
import settingsReducer from './settings/settingsSlice'

// https://redux-toolkit.js.org/tutorials/quick-start
// https://github.com/reduxjs/cra-template-redux-typescript/tree/master/template/src/features/counter
// https://github.com/Hack-the-Future/mern-boilerplate/tree/main/client/src/api/auth

const store = configureStore({
  reducer:{
    userState: userReducer,
    settingsState: settingsReducer
  }
})

inject(store, setToken)

export type errorT = {
  name: string,
  message: string
}

export type Error = {
  rejectValue: errorT
}

export type StoreState = ReturnType<typeof store.getState>
export default store