import { Box, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { deleteElections as _deleteElections, endElection as _endElection } from "../../../api/electionApi"
import to from "await-to-js"
import { ManageElectionDisplay } from "./ManageElectionDisplay"
import { EndedElectionDisplay, ResultsViewer } from "./EndedElectionDisplay"
import ElectionQR from "./ElectionQR"
import { getResults } from "../../../api/electionApi"
import randomColor from 'randomcolor'

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

  const [selectRes, setSelectRes] = useState<EleRes | null>(null)
  const [winner, setWinner] = useState("")
  const [colors, setColors] = useState<string[]>([])

  useEffect(() => {
    let e: Election[] = []
    let e2: Election[] = []
    elections.forEach(m => {
      if (m.running && !m.ended) {
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

  const endElection = async (e: Election) => {
    const [err] = await to(_endElection(e._id as string))
    if (err) {
      console.log(err)
      return
    }

    let newdis = [...displayed]
    let newend = [...ended]
    if (newdis.indexOf(e) > -1) {
      newdis.splice(newdis.indexOf(e), 1)
      newend.push(e)
    }
    setDisplayed(newdis)
    setEnded(newend)
  }

  const closeDialog = () => {
    setQrOpen(false)
    setQrSelect(null)
  }

  const selectResults = async (e: Election | null) => {
    if (e == null) {
      setSelectRes(null)
      return
    }

    const [err, res] = await to(getResults(e._id as string))
    if (err) {
      console.log(err)
      return
    }

    if (res) {
      let results = res.data.results

      let max = -1
      let winner = ""
      results.candidates.forEach(c => {
        if (c.votes == max) {
          winner = "It's a tie!"
        }
        if (c.votes > max) {
          max = c.votes
          winner = c.name
        }
      })
      const colors = results.candidates.map(c => randomColor())
      setColors(colors)
      setWinner(winner)
      setSelectRes(results)
    }
  }

  return <>
    {qrSelect && <ElectionQR select={qrSelect} open={qrOpen} handleClose={closeDialog} /> }

    <Grid container item xs={12} mx={2} mt={4} mb={4}>

      {/* Manage / Ended Event Display */}
      <Grid item container xs={12} md={6} paddingRight={1}>
        <Grid item xs={12}>
          <ManageElectionDisplay settings={settings} elections={displayed} 
          onDelete={deleteElections} generate={generate} endElection={endElection}/>
        </Grid>
        <Grid item xs={12}>
          <EndedElectionDisplay settings={settings} elections={ended} 
            onDelete={deleteElections} selectRes={selectResults}/>
        </Grid>
      </Grid>

      {/* Election Results */}
      <Grid item xs={12} md={6} container justifyContent="center" 
        display="flex" alignItems="center">
        {selectRes ? 
          <ResultsViewer res={selectRes} winner={winner} colors={colors}
            selectResults={selectResults}/>
        :
          <Box display="flex" justifyContent="center" alignItems="center" textAlign="center" height="100%">
            <Typography variant="h4">No results selected.</Typography> 
          </Box>
        }
      </Grid>
    </Grid>
  </>
}