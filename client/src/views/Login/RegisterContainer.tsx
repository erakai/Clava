import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { Dispatch, useState } from "react"
import useEmailVerify from "../../hooks/useEmailVerify"

type LoginProps = {
  onRegister: (req: UserRequest) => void,
  switchToLogin: () => void,
  setErrorMessage: Dispatch<React.SetStateAction<string>>,
  errorMessage: string
}

function RegisterContainer({ onRegister, switchToLogin, 
  setErrorMessage, errorMessage}: LoginProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passConfirm, setPassConfirm] = useState('')
  const emailVerify = useEmailVerify()

  const registerWrapper = () => {
    if (password !== passConfirm) {
      setErrorMessage('Passwords must be equal!')
      return
    }

    onRegister({name, email, password})
  }

  return (
    <Box className="Register flex w-screen h-screen items-center justify-center">
      <Stack 
        spacing={2} bgcolor="white" color="secondary"
        className="items-center m-8 p-8 max-w-md"
        sx={{ borderRadius: '2%' }}>
        <Stack 
          spacing={1}
          className="flex-row w-full items-center" 
          direction="row">
          <IconButton onClick={switchToLogin}>
            <ArrowBack color="action" />
          </IconButton>
          <Typography variant="h5" component="h1">Register</Typography>
        </Stack>
        <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
        <TextField
          className="w-[85%]"
          id="name-text-field"
          label="Name"
          variant="outlined"
          type="text" value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrorMessage('')
          }}/>
        <TextField
          className="w-[85%]"
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email" value={email} error={email != '' && !emailVerify(email)}
          onChange={(e) => {
            setEmail(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <TextField
          className="w-[85%]"
          id="password-text-field"
          label="Password"
          variant="outlined"
          type="password" value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <TextField
          className="w-[85%]"
          id="confirm-password-text-field"
          label="Confirm Password"
          variant="outlined"
          type="password" value={passConfirm}
          onChange={(e) => {
            setPassConfirm(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <Box className="flex w-[85%]">
          <Button color="secondary" onClick={switchToLogin} variant="text">I have a Clava account</Button>
          <Button color="secondary" onClick={registerWrapper} variant="contained" className="items-end">Register</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default RegisterContainer
  