import {
  Box,
  TextField,
  Stack,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from "@mui/material"
import { Link } from "react-router-dom"
import { ArrowBack } from "@mui/icons-material"
import { _resetRequest } from '../../api/userApi'
import 'reactjs-popup/dist/index.css';
import to from 'await-to-js'
import React from "react";
import useEmailVerify from '../../hooks/useEmailVerify'
function ResetRequest() {
  const [email, setEmail] = React.useState('')

  const emailVerify = useEmailVerify()
  const sendResetRequest = async (req: UserResetRequest) => {
    try {
      await to(_resetRequest(req))
    } catch (err) {
      console.log(err)
      }
    }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Box className="flex w-screen h-screen items-center justify-center" sx={{bgcolor: "secondary.main"}}
      >
        <Stack
            spacing={7} bgcolor="white" color="secondary"
            className="items-center m-8 p-8 pb-20 max-w-md"
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
                type="email"
                value={email}
                error={email != '' && !emailVerify(email)}
                onChange={(e) => {
                  setEmail(e.target.value.trim())
                }}
            />
            <Button className="w-80" variant="contained" color="secondary"
              onClick={(e) => {
                if (emailVerify(email)) {
                  handleClickOpen()
                  _resetRequest({email}).then(r => {console.log("ERROR")})}
                }
              }
            >Request Reset</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Reset Request Success"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  If an account tied to the entered email address exists, an email containing instructions on how to reset your password will be sent to your inbox.
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </Stack>
        </Stack>
      </Box>
  )
}

export default ResetRequest