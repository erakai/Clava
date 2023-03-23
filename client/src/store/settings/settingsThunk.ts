import { createAsyncThunk } from "@reduxjs/toolkit";
import to from "await-to-js";
import { AxiosError } from "axios";
import { errorT, Error } from '..'
import { GetSettingsResponse, SetSettingsResponse, _getSettings, _updateSettings } from "../../api/settingsApi";

export const getSettings = createAsyncThunk<
  GetSettingsResponse, GetSettingsRequest, Error>
  ('settings/getSettings', async (req, { rejectWithValue }) => {
    const [error, res] = await to(_getSettings(req.club_id))

    if (error) {
      const { response } = error as AxiosError
      return rejectWithValue((response?.data) as errorT)
    }

      return res.data
    }
)

export const updateSettings = createAsyncThunk<
    SetSettingsResponse, UpdateSettingsRequest, Error>
    ('settings/updateSettings', async(req, { rejectWithValue }) => {
      const [error, res] = await to(_updateSettings(req))

      if (error) {
        const { response } = error as AxiosError
        return rejectWithValue((response?.data) as errorT)
      }
  
      return res.data
    }
  )