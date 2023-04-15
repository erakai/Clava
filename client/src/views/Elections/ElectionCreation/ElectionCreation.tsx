import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ElectionForm from "./ElectionForm"
import to from "await-to-js"
import { getElections } from "../../../api/electionApi"
import { ElectionDisplay } from "./ElectionDisplay"

type ElectionCreationProps = {
  club_id: string
  settings: Settings | null
}

export default function ElectionCreation({ club_id, settings } : ElectionCreationProps) {
  const [elections, setElections] = useState<Election[]>([])
  const [selected, setSelected] = useState<Election | "new" | null>(null)

  useEffect(() => {
    const fetchElections = async () => {
      const [err, fetched] = await to(getElections(club_id))
      if (err) {
        console.log(err)
        return
      }

      if (fetched.data.elections) {
        let newElections = fetched.data.elections
        setElections(newElections)
      }
    }

    fetchElections()
  }, [])

  const onDelete = (e: Election[]) => {

  }

  return (
    <Grid container item xs={12} mx={2} mt={4}>

      {/* Created Event Display */}
      <Grid item xs={12} md={6} paddingRight={1}>
        <ElectionDisplay settings={settings} elections={elections} onDelete={onDelete} />
      </Grid>

      {/* Event Creation / Editing Form*/}
      <Grid item xs={12} md={6}>
        {(selected) ? 
          <Paper elevation={4}>
            <ElectionForm election={selected}/>
          </Paper>
        :
          <Box display="flex" justifyContent="center" 
            alignItems="center" sx={{ minHeight: "175px" }}>
            <Stack>
              <Typography variant="h6">No election selected.</Typography>
              <Button variant="contained" onClick={() => {
                setSelected('new')
              }}>
                New Election
              </Button>
            </Stack>
          </Box>}
      </Grid>
    </Grid>
  )
}