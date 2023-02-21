import { getUsers } from "api/user"
import { Box, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"

function Main() {
  return (
    <Box className="Main bg-emerald-300 flex w-screen h-screen items-center justify-center" flexDirection="column">
      <h1>Clava</h1>
      <Stack
        className="flex-row" flexDirection="row">
        <Link to="/login">
          <Button variant="outlined">Login</Button>
        </Link>
        <Box className="flex-1 w-5" />
        <Link to="/register">
          <Button variant="contained">Register</Button>
        </Link>
      </Stack>
      <p>This will be the main homepage of the site</p>
    </Box>
  )
}
  
export default Main
  