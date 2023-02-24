import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useMatch, useNavigate } from "react-router-dom"
import { UserState, userStateSelector } from "../store/user/userSlice"
import { getUser, logout as _logout } from '../store/user/userThunk'
import store from "../store"
import to from "await-to-js"

const useUser = () => {
  const navigate = useNavigate()
  const isLogin = useMatch('/login')
  const isRegister = useMatch('/register')
  const isHome = useMatch('/')
  const dispatch = useDispatch<typeof store.dispatch> ()

  const { user, loading, state } = useSelector(userStateSelector)

  const checkStatus = useCallback(async () => {
    const [err, res] = await to(dispatch(getUser()).unwrap())
    if (err) throw new Error(err.message)

    return res
  }, [dispatch])

  useEffect(() => {
    if (state == UserState.NONE) {
      checkStatus().catch(() => {
        if (!isLogin || !isRegister || !isHome) {
          navigate('/login')
        }
      })
    }
  }, [checkStatus, state, isLogin, isRegister, navigate, isHome])

  const logout = useCallback(async () => {
    const [err, res] = await to(dispatch(_logout()).unwrap())
    if (err) throw new Error(err.message)

    return res
  }, [dispatch])

  return { user, logout, loading, checkStatus}
}

export default useUser