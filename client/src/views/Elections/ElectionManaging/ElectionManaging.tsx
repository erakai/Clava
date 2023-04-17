import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteElections as _deleteElections } from "../../../api/electionApi"
import to from "await-to-js"
import { ManageElectionDisplay } from "./ManageElectionDisplay"
import { EndedElectionDisplay } from "./EndedElectionDisplay"
import ElectionQR from "./ElectionQR"

type ElectionManagingProps = {
  club_id: string
  settings: Settings | null
  elections: Election[]
  setElections: React.Dispatch<React.SetStateAction<Election[]>>
}

export default function ElectionManaging({ club_id, settings, elections, setElections } : ElectionManagingProps) {
  const [displayed, setDisplayed] = useState<Election[]>([])
  const [ended, setEnded] = useState<Election[]>([])
  const [qrOpen, setQrOpen] = useState(false)
  const [qrSelect, setQrSelect] = useState<Election | null>(null)

  useEffect(() => {
    let e: Election[] = []
    let e2: Election[] = []
    elections.forEach(m => {
      if (m.running) {
        e.push(m)
      }
      if (m.ended) {
        e2.push(m)
      }
    })

    setDisplayed(e)
    setEnded(e2)
  }, [elections])

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

  const generate = (e: Election) => {
    setQrOpen(true)  
    setQrSelect(e)
  }

  const closeDialog = () => {
    setQrOpen(false)
    setQrSelect(null)
  }

  return <>
    {qrSelect && <ElectionQR select={qrSelect} open={qrOpen} handleClose={closeDialog} /> }

    <Grid container item xs={12} mx={2} mt={4} mb={4}>

      {/* Manage / Ended Event Display */}
      <Grid item container xs={12} md={6} paddingRight={1}>
        <Grid item xs={12}>
          <ManageElectionDisplay settings={settings} elections={displayed} 
          onDelete={deleteElections} generate={generate}/>
        </Grid>
        <Grid item xs={12}>
          <EndedElectionDisplay settings={settings} elections={ended} 
            onDelete={deleteElections}/>
        </Grid>
      </Grid>

      {/* Election Results */}
      <Grid item xs={12} md={6} border={1}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h4">Election Result Display</Typography> 
        </Box>
      </Grid>
    </Grid>
  </>
}