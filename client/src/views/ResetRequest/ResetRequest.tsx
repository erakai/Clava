import { Box, TextField, Stack, Typography, Button, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import {ArrowBack} from "@mui/icons-material"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function ResetRequest() {
  return (
      <Box className="flex w-screen h-screen items-center justify-center" sx={{bgcolor: "secondary.main"}}
      >
        <Stack
            spacing={7} bgcolor="white" color="secondary"
            className="items-center m-8 p-8 pb-20 max-w-[30%]"
            sx={{ borderRadius: '2%', borderColor: 'grey.500', bgcolor: 'white' }}
        >
          <Stack spacing={1} className="flex w-full items-center">
            <Stack className="flex-row w-full items-center" direction="row">
              <IconButton component={Link} to="/">
                <ArrowBack color="action"></ArrowBack>
              </IconButton>
              <Typography variant="h5" component="h1">Password Reset</Typography>
            </Stack>
            <Typography className="px-8" variant="subtitle2" component="h1">Enter the email address associated with your account and we'll send you a link to reset your password.</Typography>
          </Stack>
          <Stack spacing={4} className="flex w-full items-center">
            <TextField
                className="w-80"
                id="email-text-field"
                label="Email"
                variant="outlined"
                type="email"/>
            <Popup trigger={<Button className="w-80" variant="contained" color="secondary">Request Reset</Button>} modal>
              <div className="modal">
                If an account associated with the provided email exists, you will receive a password reset link in your inbox.
              </div>
            </Popup>
          </Stack>
        </Stack>
      </Box>
  )
}

export default ResetRequest