import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import { getUsers } from "api/user"

function Login() {
  return (
    <Box className="Register flex w-screen h-screen items-center justify-center">
      <Stack 
        spacing={2} 
        className="bg-emerald-300 items-center m-8 p-8 max-w-md"
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
        <TextField
          className="w-[85%]"
          id="first-name-text-field"
          label="First Name"
          variant="outlined"
          type="text"/>
        <TextField
          className="w-[85%]"
          id="last-name-text-field"
          label="Last Name"
          variant="outlined"
          type="text"/>
        <TextField
          className="w-[85%]"
          id="email-text-field"
          label="Email"
          variant="outlined"
          type="email"/>
        <TextField
          className="w-[85%]"
          id="password-text-field"
          label="Password"
          variant="outlined"
          type="password"/>
        <TextField
          className="w-[85%]"
          id="confirm-password-text-field"
          label="Confirm Password"
          variant="outlined"
          type="password"/>
        <Box
          className="flex w-[85%]">
          <Link to="/Login">
            <Button variant="text">I have a Clava account</Button>
          </Link>
          <Button variant="contained" className="items-end">Register</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Login
  