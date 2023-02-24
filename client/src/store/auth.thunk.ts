import { createAsyncThunk }from '@reduxjs/toolkit'
import to from 'await-to-js'

import {
  getCurrentUser as _getCurrentUser,
  login as _login,
  logout as _logout,
  register as _register,
} from '../api/auth.service'
