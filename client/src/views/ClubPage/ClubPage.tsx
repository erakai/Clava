import { getUsers } from "api/user"
import { Box, Stack, Paper, Card, CardContent, CardMedia, CardActionArea, CardActions, Typography, Button } from '@mui/material'

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

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src="placeholder.png"
            alt="image failed load"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Book Club
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description for Book Club
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src="placeholder.png"
            alt="image failed load"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Book Club
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description for Book Club
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            src="placeholder.png"
            alt="image failed load"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Book Club
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Description for Book Club
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Edit
          </Button>
        </CardActions>
      </Card>

      

      </Stack>
    </Box>
  )
}
  
export default ClubPage
  