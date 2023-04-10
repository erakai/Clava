import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ElectionForm from "./ElectionForm"

type ElectionCreationProps = {
  club_id: string
}

export default function ElectionCreation({ club_id } : ElectionCreationProps) {
  const [elections, setElections] = useState<Election[]>([])
  const [selected, setSelected] = useState<Election| null>(null)

  useEffect(() => {
    const fetchElections = async () => {

    }

    fetchElections()
  }, [])

  return (
    <Grid container item xs={12} spacing={1} mx={2} mt={4}>

      {/* Created Event Display */}
      <Grid item xs={12} md={6} className="text-center">
        <Typography variant="h5">Clava Table for Elections</Typography>
      </Grid>

      {/* Event Creation / Editing Form*/}
      <Grid item xs={12} md={6} border={2} borderColor="primary.main">
        {(selected) ? 
          <ElectionForm election={selected}/>
        :
          <Box className="text-center" sx={{ minHeight: "300px" }}>
            <Typography variant="h6">No election selected.</Typography>
          </Box>}
      </Grid>
    </Grid>
  )
}