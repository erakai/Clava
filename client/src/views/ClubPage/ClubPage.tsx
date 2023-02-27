import { Box, Stack, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button } from '@mui/material'
import ClubCard from './ClubCard'

const clubs : Club[] = [
  {
    club_id: 12345,
    name: "Book Club",
    description: "I love books",
    tag_ids: [],
    role_ids: [],
    tran_ids: [],
    reim_ids: [],
    member_ids: [],
    officer_ids: [],
    event_ids: []
  },

  {
    club_id: 12346,
    name: "Coding Club",
    description: "I love React",
    tag_ids: [],
    role_ids: [],
    tran_ids: [],
    reim_ids: [],
    member_ids: [],
    officer_ids: [],
    event_ids: []
  },

  {
    club_id: 12346,
    name: "Coding Club",
    description: "I love React",
    tag_ids: [],
    role_ids: [],
    tran_ids: [],
    reim_ids: [],
    member_ids: [],
    officer_ids: [],
    event_ids: []
  },
  {
    club_id: 12346,
    name: "Coding Club",
    description: "I love React",
    tag_ids: [],
    role_ids: [],
    tran_ids: [],
    reim_ids: [],
    member_ids: [],
    officer_ids: [],
    event_ids: []
  },
  {
    club_id: 12346,
    name: "Coding Club",
    description: "I love React",
    tag_ids: [],
    role_ids: [],
    tran_ids: [],
    reim_ids: [],
    member_ids: [],
    officer_ids: [],
    event_ids: []
  },
]

const listClubs = clubs.map((club) =>
  <ClubCard name={club.name} description={club.description}></ClubCard>
)

function ClubPage() {
  return (
    <Box className="ClubPage w-screen">
      <Stack className="justify-center" spacing={2}>

        <Typography variant="h1">Clubs</Typography>
        <p>These are the clubs you are in</p>

        <Box className="ClubDisplayArea flex flex-wrap">
            {listClubs}
        </Box>

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  