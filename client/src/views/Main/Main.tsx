import { Box, Button, Stack } from "@mui/material"
import { Link } from "react-router-dom"

function Main() {
  return (
    <Box color="primary" className="Main flex w-screen h-screen items-center justify-center" flexDirection="column">
      <h1>Clava</h1>
      <Stack
        className="flex-row" flexDirection="row">
        <Link to="/login">
          <Button color="secondary" variant="contained">Login</Button>
        </Link>
        <Box className="flex-1 w-5" />
      </Stack>
      <p>This will be the main homepage of the site</p>
    </Box>
  )
}
  
export default Main
  