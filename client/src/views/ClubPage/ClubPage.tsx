import { getUsers } from "api/user"
import { Box, Stack, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button } from '@mui/material'
import ClubCard from '../../components/ClubCard'

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

      <ClubCard name="Book Club" description="Hello"></ClubCard>

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  