import { getUsers } from "api/user"
import { Box, Stack, Paper } from '@mui/material'

function ClubPage() {
  return (
    <Box className="ClubPage" sx={{
      width: "100vw",
      height: "100vh",
      backgroundColor: 'primary.light',
    }}>
      <Stack spacing={2}>

      <h1>Clubs</h1>
      <p>These are the clubs you are in</p>

      <Paper>Club 1</Paper>
      <Paper>Club 2</Paper>
      <Paper>Club 3</Paper>

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  