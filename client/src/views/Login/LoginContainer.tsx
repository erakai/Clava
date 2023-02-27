import { Divider, Box, TextField, Stack, Typography, Button, IconButton} from "@mui/material"
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
        className="items-center m-8 p-8 max-w-md px-10"
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
        <Box
            className="flex w-[95%] items-center justify-center">
          <Button color="secondary" variant="contained" className="mx-4 w-[100%]"
            onClick={(e) => {onLogin({email, password})}}>Login</Button>
        </Box>
        <Stack className="w-[100%] content-center pl-1">
          <Button component={Link} to="/resetrequest" variant="text">Forgot password?</Button>
          <Divider className="pb-5 pt-3">OR</Divider>
          <Box
              className="flex w-[95%] items-center justify-center">
            <Button color="secondary" onClick={switchToRegister} variant="contained" className="mx-4 w-[100%]">Sign Up</Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoginContainer
  