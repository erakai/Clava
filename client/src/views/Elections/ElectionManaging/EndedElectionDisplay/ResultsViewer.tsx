import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Stack, Typography } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData} from "chart.js"
import { useEffect, useState } from "react"
import { Pie } from "react-chartjs-2"
import CloseIcon from '@mui/icons-material/Close';

ChartJS.register(ArcElement, Tooltip, Legend)

type ResultsViewerProps = {
  res: EleRes
  winner: string
  colors: string[]
  selectResults: (e: Election | null) => Promise<void>
}

export default function ResultsViewer({
  res, winner, colors, selectResults
}: ResultsViewerProps) {
  const [data, setData] = useState<ChartData<"pie", number[], string> | null>(null)
  const [message, setMessage] = useState<string[]>([])
  const [shareOpen, setShareOpen] = useState(false)

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