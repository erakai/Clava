import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Login() {
  return (
    <Box className="Login flex w-screen h-screen items-center justify-center">
      <Stack 
        spacing={2} 
        className="bg-emerald-300 items-center m-8 p-8"
        sx={{ borderRadius: '2%', borderColor: 'grey.500' }}>
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
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email"/>
        <TextField
          id="password-text-field"
          label="Password"
          variant="outlined"
          type="password"/>
        <Button variant="contained">Login</Button>
      </Stack>
    </Box>
  )
}
  
export default Login
  