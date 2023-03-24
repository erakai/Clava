import { createSlice } from "@reduxjs/toolkit"
import { errorT, StoreState } from ".."
import { getSettings, updateSettings } from "./settingsThunk"

export enum SettingsState {
  NONE,
  UPDATING,
}

export interface ISettingsState {
  settings: Settings | null
  state: SettingsState
  loading: boolean,
  error: errorT | null
}

const initialState: ISettingsState = {
  settings: null,
  state: SettingsState.NONE,
  loading: false,
  error: null
}

export const settingsStateSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder)  => {
     builder.addCase(getSettings.pending, (state) => {
      state.loading = true
      state.error = null
     }) 
     builder.addCase(getSettings.fulfilled, (state, action) => {
      state.loading = false
      state.settings = action.payload.settings
      state.state = SettingsState.NONE
      state.error = null
     })
     builder.addCase(getSettings.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.state = SettingsState.NONE
     })
     builder.addCase(updateSettings.pending, (state) => {
      state.loading = true
      state.state = SettingsState.UPDATING
      state.error = null
     })
     builder.addCase(updateSettings.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.state = SettingsState.NONE
      state.settings = action.payload.settings
     })
     builder.addCase(updateSettings.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload!
      state.state = SettingsState.NONE
     })
  },
})

export const settingsStateSelector = (state: StoreState) => state.settingsState
export default settingsStateSlice.reducer