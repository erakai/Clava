import React, { useEffect, useState } from "react"
import {Box, Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid} from "@mui/material";
import CreateEventModal from "./CreateEventModal";
import {_createEvent} from "../../api/eventApi";
import to from 'await-to-js'

type EventViewProps = {
  club_id: string
}

export default function EventView({ club_id }: EventViewProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const createEvent = async (event: CreateEventRequest) => {
    const [err, res] = await to(_createEvent(event));
    if (err) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    } else if (res) {
      setConfirmationOpen(true)
      console.log("success!")
    }
  }

  return (
    <Box className="min-w-full flex-auto">
      <Dialog
        open={confirmationOpen}
        onClose={e => {setConfirmationOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Event Creation Success"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The event was created successfully.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <CreateEventModal
        createEvent={createEvent}
        open={createEventOpen}
        setOpen={setCreateEventOpen}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
      />

      <Box className="m-4 mb-16">
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} lg={3}>
            <Box className="min-w-full flex-auto">
              <Button className='h-full' variant="contained" color="secondary" onClick={() => setCreateEventOpen(true)}>
                Create Event
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}