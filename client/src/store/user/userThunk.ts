import { createAsyncThunk }from '@reduxjs/toolkit'
import to from 'await-to-js'
import { AxiosError } from 'axios'

import {
  _getUser,
  _login,
  _logout,
  _register,
} from '../../api/userApi'
import { AuthResponse } from '../../api/config'
import { errorT } from './userSlice'

type Error = {
  rejectValue: errorT
}

export const getUser = createAsyncThunk<{ user: User }, void, Error>('users/getSelf', 
  async (_, { rejectWithValue }) => {
    const [error, res] = await to(_getUser())

    if (error) {
      const { response } = error as AxiosError
      return rejectWithValue((response?.data) as errorT)
    }

    return res.data
  }
)

export const register = createAsyncThunk<AuthResponse, UserRequest, Error>('user/register', 
  async (req, { rejectWithValue}) => {
    const [error, res] = await to(_register(req))

    if (error) {
      const { response } = error as AxiosError
      return rejectWithValue((response?.data) as errorT)
    }

    return res.data
  }
)

export const login = createAsyncThunk<AuthResponse, UserRequest, Error>('user/login',
  async (req, { rejectWithValue }) => {
    const [error, res] = await to(_login(req))

    if (error) {
      const { response } = error as AxiosError
      return rejectWithValue((response?.data) as errorT)
    }

    return res.data
  }
)

export const logout = createAsyncThunk<void, void, Error>('user/logout',
  async (_, { rejectWithValue }) => {
    const [error] = await to(_logout())

    if (error) {
      const { response } = error as AxiosError
      return rejectWithValue((response?.data) as errorT)
    }
  }
)