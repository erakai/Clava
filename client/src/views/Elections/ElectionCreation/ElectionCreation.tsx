import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ElectionForm from "./ElectionForm"
import to from "await-to-js"
import { getElections, deleteElections as _deleteElections } from "../../../api/electionApi"
import { ElectionDisplay } from "./ElectionDisplay"
import useElectionLogic from "./useElectionLogic"

type ElectionCreationProps = {
  club_id: string
  settings: Settings | null
}

export default function ElectionCreation({ club_id, settings } : ElectionCreationProps) {
  const [elections, setElections] = useState<Election[]>([])
  const ele = useElectionLogic()

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

  const deleteElections = async (e: Election[]) => {
    let election_ids: string[] = []
    e.forEach(c => {
      if (c._id) election_ids.push(c._id)
    })

    const [err] = await to(_deleteElections(election_ids))
    if (err) {
      console.log(err)
      return
    }

    setElections(elections.filter(f => e.indexOf(f) == -1))
  }

  // bad practice but the actual api call is done in ElectionForm
  const addElection = (e: Election) => {
    setElections([...elections, e])
  }

  // bad practice but the actual api call is done in ElectionForm
  const updateElection = (e: Election) => {
    let eles = [...elections]
    for (let i = 0; i < eles.length; i++) {
      if (eles[i]._id == e._id) {
        eles[i] = e;
        break
      }
    }
  }

  return (
    <Grid container item xs={12} mx={2} mt={4}>

      {/* Created Event Display */}
      <Grid item xs={12} md={6} paddingRight={1}>
        <ElectionDisplay settings={settings} elections={elections} 
          onDelete={deleteElections} selectAndClear={ele.selectAndClear}/>
      </Grid>

      {/* Event Creation / Editing Form*/}
      <Grid item xs={12} md={6}>
        {(ele.selected) ? 
          <Paper elevation={4}>
            <ElectionForm addElection={addElection} club_id={club_id} ele={ele}
              updateElection={updateElection}/>
          </Paper>
        :
          <Box display="flex" justifyContent="center" 
            alignItems="center" sx={{ minHeight: "175px" }}>
            <Stack>
              <Typography variant="h6">No election selected.</Typography>
              <Button variant="contained" onClick={() => {
                ele.selectAndClear('new')
              }}>
                New Election
              </Button>
            </Stack>
          </Box>}
      </Grid>
    </Grid>
  )
}