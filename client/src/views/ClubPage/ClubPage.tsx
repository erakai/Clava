import { Box, Stack, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button } from '@mui/material'
import ClubCard from './ClubCard'
import axios from 'axios'
import to from 'await-to-js'
import { getClubs, createClub } from '../../api/clubApi'
import { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser'

type ClubPageProps = {
  user_id: string,
}

function ClubPage({user_id} : ClubPageProps) {

  console.log('he')

  const [clubs, setClubs] = useState<Club[]>([])
  const { state } = useUser()

  useEffect(() => {

  const fetch = async () => {
    const [err, res] = await to(getClubs(user_id))
    if (err) {
      console.log(err)
      return
    }

    const retrieved = res.data.clubs
    if (retrieved) {
      setClubs(retrieved)
    }
  }

  fetch()

  }, [state])

  return (
    <Box className="ClubPage w-screen">
      <Stack className="justify-center" spacing={2}>

        <Typography variant="h1">Clubs</Typography>
        <p>These are the clubs you are in</p>

        <Box className="ClubDisplayArea flex flex-wrap">
            {clubs.map((club) => <ClubCard name={club.name} description={club.description}></ClubCard>)}
        </Box>

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  