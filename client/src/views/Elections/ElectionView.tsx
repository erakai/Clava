import { Box, Button, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ElectionCreation from "./ElectionCreation/ElectionCreation";
import ElectionManaging from "./ElectionManaging/ElectionManaging";
import useSettings from "../../hooks/useSettings";
import { getElections } from "../../api/electionApi";
import to from "await-to-js";
import { hasPermission } from "../ClubComposite";
import { useNavigate } from 'react-router-dom'

type ElectionViewProps = {
  club_id: string
}

/*
The election hub is split into two parts:
  - Creating, editing, and deleting elections that are NOT running (ElectionCreation.tsx)
  - Running, managing, and viewing elections that ARE running or have ended (ElectionManaging.tsx)
*/

export default function ElectionView({ club_id }: ElectionViewProps) {
  const [elections, setElections] = useState<Election[]>([])
  const [mode, setMode] = useState<'Creation' | 'Management'>('Creation')
  const { settings, refreshSettings } = useSettings()

  const isCreation = mode == 'Creation'
  const changeMode = () => {
    if (mode == 'Creation') setMode('Management')
    if (mode == 'Management') setMode('Creation')
  }

  let navigate = useNavigate();
  useEffect(() => {
    if (!hasPermission("OWNER")) {
      const path = `/${club_id}/documents`
      refreshSettings(club_id)
      navigate(path);
    }

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
    refreshSettings(club_id)
  }, [])

  return (
  <>
    <Grid container marginY={0} rowSpacing={2}>

      {/*Title*/}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%">
          <Typography variant="h4">Election {mode}</Typography>
        </Box>
      </Grid>

      {/* Mode Change */}
      <Grid item container xs={12} justifyContent='center'>
        <Button variant="contained" endIcon={isCreation ? 
          <ArrowCircleRightIcon/> : <ArrowCircleLeftIcon/>
        } onClick={changeMode}>
          Election {isCreation ? 'Management' : 'Creation'}
        </Button>
      </Grid>

      {/*Mode Display*/}
      {
      isCreation ?
        <ElectionCreation club_id={club_id} settings={settings}
          elections={elections} setElections={setElections}/> 
        : 
        <ElectionManaging club_id={club_id} settings={settings}
          elections={elections} setElections={setElections}/>
      }

    </Grid>
  </>
  )
}