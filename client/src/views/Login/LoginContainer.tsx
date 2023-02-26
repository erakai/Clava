import { Divider, Box, TextField, Stack, Typography, Button, IconButton, Container} from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { Dispatch, useState } from "react"

type LoginProps = {
  onLogin: (req: UserRequest) => void,
  switchToRegister: () => void,
  switchToReset: () => void,
  setErrorMessage: Dispatch<React.SetStateAction<string>>,
  errorMessage: string
}

function LoginContainer({ onLogin, switchToRegister, switchToReset, 
  errorMessage, setErrorMessage }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Box className="Login flex w-screen h-screen items-center justify-center">
      <Stack 
        spacing={2} bgcolor="white" color="secondary"
        className="items-center m-8 p-8 w-96 max-w-md rounded-lg">
        <Box 
          className="flex w-full items-center">
          <IconButton component={Link} to="/">
            <ArrowBack color="action" />
          </IconButton>
          <Typography variant="h5" component="h1">Login</Typography>
        </Box>
        <TextField
          className="w-full"
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email" value={email} error={Boolean(errorMessage)} helperText={errorMessage}
          onChange={(e) => {
            setEmail(e.target.value.trim()) 
            setErrorMessage('')
          }}/>
        <TextField
          className="w-full"
          id="password-text-field"
          label="Password"
          variant="outlined" error={Boolean(errorMessage)} helperText={errorMessage}
          type="password" value={password} onChange={(e) => {
            setPassword(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <Button className="w-full" color="secondary" variant="contained"
          onClick={(e) => {onLogin({email, password})}}>Login</Button>
        <Button className="w-full" onClick={switchToReset} variant="text">Forgot password?</Button>
        <Divider className="pb-4 w-full">OR</Divider>
        <Button className="w-full"color="secondary" onClick={switchToRegister} variant="contained">Sign Up</Button>
      </Stack>
    </Box>
  )
}

export default LoginContainer
  