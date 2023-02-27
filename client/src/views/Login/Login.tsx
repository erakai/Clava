import to from "await-to-js"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import store from "store"
import { getUser, login, register } from "../../store/user/userThunk"
import { UserState, userStateSelector } from "../../store/user/userSlice"
import LoginContainer from "./LoginContainer"
import RegisterContainer from "./RegisterContainer"
import { Container } from "@mui/material"

function Login() {
  const [page, setPage] = useState<string>('login')
  const [errorMessage, setErrorMessage] = useState('')
  const { state } = useSelector(userStateSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch<typeof store.dispatch>()

  useEffect(() => {
    if (state !== UserState.NONE) return

    ;(async () => {
      const [_, res] = await to(dispatch(getUser()).unwrap())

      if (res) {
        navigate('/test')
      }
    })()
  }, [dispatch, navigate, state])

  const onLogin = async (req: UserRequest ) => {
    const [err] = await to(dispatch(login(req)).unwrap())

    if (err) {
      setErrorMessage('Invalid login.')
      return
    }
  }

  const onRegister = async (req: UserRequest) => {
    const [err] = await to(dispatch(register(req)).unwrap())

    if (err && err.name == 'UserExistsError') {
      setErrorMessage('A user with that email already exists.')
    } else if (err) {
      setErrorMessage('Invalid register.')
    } else {
      navigate('/test')
    }
  }

  const switchToLogin = () => { setPage('login'); setErrorMessage('') }
  const switchToRegister = () => { setPage('register'); setErrorMessage('') }
  const switchToReset = () => { setPage('reset') }

  const renderSwitch = (st: string) => {
    switch(st) {
      case 'register':
        return <RegisterContainer onRegister={onRegister} 
          switchToLogin={switchToLogin} errorMessage={errorMessage} 
          setErrorMessage={setErrorMessage}/>
      default:
        return <LoginContainer onLogin={onLogin} switchToReset={switchToReset}
          switchToRegister={switchToRegister} errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}/>
    }
  }

  return (
    <Container maxWidth={false} sx={{ bgcolor: 'secondary.main'}} >
      {renderSwitch(page)}
    </Container>
  )
}

export default Login
  