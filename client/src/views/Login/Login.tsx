import { Divider, Box, TextField, Stack, Typography, Button, IconButton} from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Login() {
  return (
    <Box className="Login flex w-screen h-screen items-center justify-center">
      <Stack 
        spacing={2} 
        className="bg-emerald-300 items-center m-8 p-8 max-w-md px-10"
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
          type="email"/>
        <TextField
          className="w-[100%]"
          id="password-text-field"
          label="Password"
          variant="outlined"
          type="password"/>
        <Box
          className="flex w-[95%] items-center justify-center">
          <Button variant="contained" className="mx-4 w-[100%]">Login</Button>
        </Box>
        <div>
          <Link to="/Reset" className="mx-4">
            <Button variant="text">Forgot password?</Button>
          </Link>
          <Divider className="pb-5 pt-3">OR</Divider>
          <Box
              className="flex w-[95%] items-center justify-center">
            <Button component={Link} to="/Register" variant="contained" className="mx-4 w-[100%]">Sign Up</Button>
          </Box>
        </div>
      </Stack>
    </Box>
  )
}

export default Login
  