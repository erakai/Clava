import to from "await-to-js"
import moment from "moment"
import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import store from "../store"
import { settingsStateSelector } from "../store/settings/settingsSlice"
import { getSettings, updateSettings as _updateSettings } from "../store/settings/settingsThunk"

const useSettings = () => {
  const dispatch = useDispatch<typeof store.dispatch> ()
  const { settings, loading, state } = useSelector(settingsStateSelector)

  const refreshSettings = useCallback(async (club_id: string) => {
    const [err, res] = await to(dispatch(getSettings({club_id})).unwrap())
    if (err) throw new Error(err.message)

    return res
  }, [dispatch])

  const updateSettings = useCallback(async (req: UpdateSettingsRequest) => {
    const [err, res] = await to(dispatch(_updateSettings(req)).unwrap())
    if (err) throw new Error(err.message)

    return res
  }, [dispatch])

  return { settings, refreshSettings, updateSettings, loading, state }
}

export default useSettings

// Takes in memberButtonPresetOne/Two and returns the correct Moment date object
export const dateOperation = (input: string) => {
  if (input.startsWith('+')) {
    let tokens = input.match(/[a-zA-Z]+|[0-9]+/g)
    if (tokens == null) return 'Invalid amount.'

    let amount = parseInt(tokens[0])
    switch(tokens[1].toLowerCase()) {
      case "w":
        return moment().add(amount, 'week')
      case "y":
        return moment().add(amount, 'year')
      case "d":
        return moment().add(amount, 'day')
      case "m":
        return moment().add(amount, 'month')
      default:
        return 'Invalid amount.'
    }
  } else {
    return moment(parseInt(input))
  }
}