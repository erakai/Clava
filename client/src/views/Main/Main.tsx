import { Box, Button, Container, Grid, ImageList, ImageListItem, Paper, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import placeholder from '../../assets/alex.jpeg'

function Main() {
  return (
    <Stack sx={{ height: '100vh' }}  justifyContent="center" alignItems="center"
      style={{ background: 'linear-gradient(45deg, #ffb500 15%, #f5e65f 90%)' }}>
      {/* <ImageList variant="masonry" cols={6} gap={4}>
        {Array(10).fill(1).map((i) => (
          <ImageListItem key={i}>
            <img
              style={{ width: Math.floor(Math.random() * 200) + 100, 
                       height: Math.floor(Math.random() * 100) + 100}}
              src={placeholder}
              loading="lazy" />
          </ImageListItem>
        ))}
        </ImageList> */}
      <Paper elevation={8} sx={{ bgcolor: 'secondary.main', margin: 2, width: '40%' }}>
        <Stack margin={2}>
          <Typography variant="h1">Clava</Typography>
          <Typography variant="body1">Management made easy for college organizations!</Typography>
          <Link to="/login">
            <Button sx={{ marginTop: 2 }} color="primary" variant="contained">
              Login
            </Button>
          </Link>
        </Stack>
      </Paper>
      {/* <ImageList variant="masonry" cols={6} gap={4}>
        {Array(10).fill(1).map((i) => (
          <ImageListItem key={i}>
            <img
              style={{ width: Math.floor(Math.random() * 200) + 100, 
                       height: Math.floor(Math.random() * 100) + 100}}
              src={placeholder}
              loading="lazy" />
          </ImageListItem>
        ))}
        </ImageList> */}
    </Stack>
  )
}

export default Main
