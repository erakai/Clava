import { Box, Stack, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button } from '@mui/material'
import ClubCard from './ClubCard'

function ClubPage() {
  return (
    <Box className="ClubPage" sx={{
      width: "100vw",
      height: "100vh",
      backgroundColor: 'primary.light',
    }}>
      <Stack spacing={2}>

      <Typography variant="h1">Clubs</Typography>
      <p>These are the clubs you are in</p>

      <ClubCard name="Book Club" description="Hello"></ClubCard>

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  