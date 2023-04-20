import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from "chart.js"
import React, { useEffect, useState } from "react"
import to from 'await-to-js'
import { Pie } from "react-chartjs-2"
import CloseIcon from '@mui/icons-material/Close';
import { AxiosError } from "axios";
import {_notifyMembers} from "../../../../api/electionApi";

ChartJS.register(ArcElement, Tooltip, Legend)

type ResultsViewerProps = {
  res: EleRes
  winner: string
  colors: string[]
  selectResults: (e: Election | null) => Promise<void>
  club_id: string
}

export default function ResultsViewer({
  res, winner, colors, selectResults, club_id
}: ResultsViewerProps) {
  const [data, setData] = useState<ChartData<"pie", number[], string> | null>(null)
  const [message, setMessage] = useState<string[]>([])
  const [shareOpen, setShareOpen] = useState(false)
  const [notifyMembersConfirmationOpen, setNotifyMembersConfirmationOpen] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [confirmationHeader, setConfirmationHeader] = useState("")

  useEffect(() => {
    const newdata = {
      labels: res.candidates.map(c => c.name),
      options: {
        responsive: false,
      },
      datasets: [
        {
          label: '#',
          data: res.candidates.map(c => c.votes),
          backgroundColor: colors,
          borderColors: colors,
          borderWidth: 2,
        }
      ],
    }

    setData(newdata)
  }, [res])

  const notifyMembers = async (req: NotifyMembersElectionRequest) => {
    const [err, res] = await to(_notifyMembers(req))

    if (err && err instanceof AxiosError) {
      console.log(err)
      setConfirmationHeader("Something Went Wrong")
      setConfirmationMessage(err.response?.data)
      setNotifyMembersConfirmationOpen(true)
      return
    }

    setConfirmationHeader("Notification Successful")
    setConfirmationMessage("All members have been successfully notifed.")
    setNotifyMembersConfirmationOpen(true)
  }

  const createMessage = () => {
    let string: string[] = ["The results of the the " + res.name + " election are as follows:"]
    string.push("")
    string.push("")

    res.candidates.forEach(c => {
      string.push(c.name + ": " + c.votes + " votes")
    })
    
    string.push("")
    if (winner == "It's a tie!") {
      string.push(winner)
    } else {
      string.push("The winner is " + winner +"! Congratulations!")
    }

    return string
  }

  const handleOpen = () => {
    setMessage(createMessage())
    setShareOpen(true)
  }

  const handleClose = () => {
    setShareOpen(false)
    setMessage([])
  }

  return <>
    <Dialog
      open={notifyMembersConfirmationOpen}
      onClose={e => {setNotifyMembersConfirmationOpen(false)}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {confirmationHeader}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmationMessage}
        </DialogContentText>
      </DialogContent>
    </Dialog>

    <Dialog
    open={shareOpen}
    onClose={handleClose}
    >
      <DialogTitle>
        {"Results"}
      </DialogTitle>
      <DialogContent>
        {message.map(m => (
          (m.trim().length > 0 ?
          <DialogContentText>
            {m}
          </DialogContentText> :
          <Box margin={2} />)
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>

    <Paper elevation={4} sx={{ width: "100%", display: "flex",
      justifyContent: "center", alignItems: "center", padding: 2,
      }}>
      <Stack textAlign="center">
        <Box>
          <IconButton onClick={() => selectResults(null)} sx={{ width: 'min-content' }}>
            <CloseIcon/> 
          </IconButton>
          <Typography marginTop={2} variant="h4">{res.name}</Typography>
          <Typography variant="h6">{"Winner: " + winner}</Typography>
          <Button variant="contained" sx={{ marginTop: 6, width: 'min-content' }}
            onClick={handleOpen} >Share</Button>
          <Button variant="contained" sx={{ marginTop: 6, marginLeft: 3, width: 'max-content' }}
            onClick={() => {
              const messageArr = createMessage()
              const message = messageArr[0] + "\n\n" + messageArr[3] + "\n\n" + messageArr[5]
              let newNotification: NotifyMembersElectionRequest = {
                message: message,
                club_id: club_id
              }
              notifyMembers(newNotification)
            }} >Notify Members</Button>
        </Box>
      </Stack>
      {data && 
        <Box marginLeft={4}>
          <Pie data={data}/>
        </Box>
      }
    </Paper>
  </> 
}