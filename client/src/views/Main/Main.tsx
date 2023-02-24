import { Box, Button, Stack, Typography } from "@mui/material"
import { Link } from "react-router-dom"

function Main() {
  return (
    <Box color="primary" className="Main flex w-screen h-screen items-center justify-center text-center" flexDirection="column">
      <Typography variant="h3">Clava</Typography>
      <Stack
        className="flex-row" flexDirection="row">
        <Link to="/login">
          <Button color="secondary" variant="contained">Login</Button>
        </Link>
        <Box className="flex-1 w-5" />
      </Stack>
    </Box>
  )
}
  
export default Main
  