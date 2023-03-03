import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

import Login from '../Login'

function Main() {
  return (
    <Box
      color="primary"
      className="Main flex w-screen h-screen items-center justify-center text-center" 
      flexDirection="column" 
    >
      <Typography variant="h3">Clava</Typography>
      <Stack flexDirection="row">
        <Link to="/login">
          <Button color="secondary" variant="outlined">
            Login
          </Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Main
