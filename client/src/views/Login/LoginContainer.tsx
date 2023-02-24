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
        className="items-center m-8 p-8 w-96 max-w-md px-10"
        sx={{ borderRadius: '2%' }}>
        <Stack 
          spacing={1}
          className="flex-row w-full items-center" 
          direction="row">
          <IconButton component={Link} to="/">
            <ArrowBack color="action" />
          </IconButton>
          <Typography variant="h5" component="h1">Login</Typography>
        </Stack>
        <TextField
          className="w-[100%]"
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email" value={email} error={Boolean(errorMessage)} helperText={errorMessage}
          onChange={(e) => {
            setEmail(e.target.value.trim()) 
            setErrorMessage('')
          }}/>
        <TextField
          className="w-[100%]"
          id="password-text-field"
          label="Password"
          variant="outlined" error={Boolean(errorMessage)} helperText={errorMessage}
          type="password" value={password} onChange={(e) => {
            setPassword(e.target.value.trim())
            setErrorMessage('')
          }}/>
        <Stack className="w-full items-center" spacing={1}>
          <Button className="w-[95%]" color="secondary" variant="contained"
          onClick={(e) => {onLogin({email, password})}}>Login</Button>
          <Button onClick={switchToReset} variant="text">Forgot password?</Button>
          <Divider className="py-3 w-[95%]">OR</Divider>
          <Button className="w-[95%]"color="secondary" onClick={switchToRegister} variant="contained">Sign Up</Button>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoginContainer
  