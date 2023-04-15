import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

type SendEventScheduleProps = {
  notify: (schedule: SendEventScheduleRequest) => void
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: Dispatch<React.SetStateAction<string>>
  club_id: string
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #ffb500',
  boxShadow: 24,
  p: 4,
  color: "primary"
}

export default function SendEventScheduleModal({
                                           notify, open, setOpen, errorMessage, setErrorMessage, club_id
                                         }: SendEventScheduleProps) {
  const [header, setHeader] = useState('')
  const [date, setDate] = useState<Moment | null>(null)

  const clearFields = () => {
    setHeader('')
    setDate(null)
  }

  const close = () => {
    clearFields()
    setErrorMessage('')
    setOpen(false)
  }

  const handleNotify = () => {
    if (!date) {
      setErrorMessage('Please enter a date.')
      return
    }

    if (date.isBefore(moment())) {
      setErrorMessage('Invalid date.')
      return
    }

    let newSchedule: SendEventScheduleRequest = {
      header: header,
      date: date?.toDate(),
      club_id: club_id
    }

    notify(newSchedule)
    close()
  }

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
        <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
          <Grid item>
            <Grid container direction="row">
              <Grid item xs={1}>
                <IconButton size="small" onClick={close}>
                  <CloseIcon color="action" />
                </IconButton>
              </Grid>
              <Grid item xs={10}>
                <Box textAlign="center" className='h-[100%] flex-col justify-content-center'>
                  <Typography className='' variant="h6" fontWeight={"bold"}>Send Schedule</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {(errorMessage != '') ?
            <Grid item>
              <Box textAlign="center">
                <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
              </Box>
            </Grid> : <></>}
          <Grid item>
            <TextField className="w-[100%]" size="small" value={header}
                       label="Email Header (optional)" variant="outlined" type="text"
                       onChange={(e) => { setHeader(e.target.value); setErrorMessage('')}}/>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <DatePicker label="Event Date" renderInput={(params) => <TextField size="small" {...params} />}
                            value={date} onChange={(newDate) => { setDate(newDate); setErrorMessage('') }}/>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(1, 'day')
                          setDate(newDate)
                          setErrorMessage('')
                        }}>tmr</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(7, 'day')
                          setDate(newDate)
                          setErrorMessage('')
                        }}>1WEEK</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" className="w-[100%]"
                    onClick={handleNotify}>Notify Members</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}