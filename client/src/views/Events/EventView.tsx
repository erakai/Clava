import { useEffect, useState } from "react"
import {Box, Button, Grid} from "@mui/material";

export default function EventView() {
  const [createEventOpen, setCreateEventOpen] = useState(false);

  return (
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
  )
}