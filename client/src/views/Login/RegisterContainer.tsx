import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { Dispatch, useState } from "react"

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
        className="items-center m-8 p-8 w-96"
        sx={{ borderRadius: '2%' }}>
        <Stack 
          spacing={1}
          className="flex-row w-full items-center" 
          direction="row">
          <IconButton component={Link} to="/">
            <ArrowBack color="action" />
          </IconButton>
          <Typography variant="h5" component="h1">Register</Typography>
        </Stack>
        <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
        <TextField
          className="w-full"
          id="name-text-field"
          label="Name"
          variant="outlined"
          type="text" value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrorMessage('')
          }}/>
        <TextField
          className="w-full"
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email" value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <TextField
          className="w-full"
          id="password-text-field"
          label="Password"
          variant="outlined"
          type="password" value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <TextField
          className="w-full"
          id="confirm-password-text-field"
          label="Confirm Password"
          variant="outlined"
          type="password" value={passConfirm}
          onChange={(e) => {
            setPassConfirm(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <Box className="flex w-full" >
          <Button color="secondary" onClick={switchToLogin} variant="text">I have a Clava account</Button>
          <Button color="secondary" onClick={registerWrapper} variant="contained" className="items-end">Register</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default RegisterContainer
  