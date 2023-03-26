import { useEffect, useState } from "react"
import {Box, Button, Grid} from "@mui/material";
import CreateEventModal from "./CreateEventModal";

const createEvent = async (event: CreateEventRequest) => {
  //TODO
}
export default function EventView() {
  const [errorMessage, setErrorMessage] = useState('')
  const [createEventOpen, setCreateEventOpen] = useState(false);

  return (
    <Box className="min-w-full flex-auto">
      <CreateEventModal
        createEvent={createEvent}
        open={createEventOpen}
        setOpen={setCreateEventOpen}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
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