import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'

// https://redux-toolkit.js.org/tutorials/quick-start
// https://github.com/reduxjs/cra-template-redux-typescript/tree/master/template/src/features/counter
// https://github.com/Hack-the-Future/mern-boilerplate/tree/main/client/src/api/auth

const store = configureStore({
  reducer:{
    userState: userReducer
  }
})

export type StoreState = ReturnType<typeof store.getState>
export default store