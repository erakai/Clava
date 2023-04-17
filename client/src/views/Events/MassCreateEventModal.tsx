import { Box, Button, Grid, IconButton, Modal, TextField, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

type MassCreateEventProps = {
  massCreate: (massCreation: MassCreateEventRequest) => void
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
                                           massCreate, open, setOpen, errorMessage, setErrorMessage, club_id
                                         }: MassCreateEventProps) {
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [startDate, setStartDate] = useState<Moment | null>(null)
  const [endDate, setEndDate] = useState<Moment | null>(null)
  const [days, setDays] = useState(() => [""])

  const clearFields = () => {
    setName('')
    setStartDate(null)
    setEndDate(null)
    setDesc('')
    setDays([""])
  }

  const close = () => {
    clearFields()
    setErrorMessage('')
    setOpen(false)
  }

  const handleDays = (
    event: React.MouseEvent<HTMLElement>,
    newDays: string[],
  ) => {
    setDays(newDays);
  };
  const handleMassCreate = () => {
    if (!name) {
      setErrorMessage('Please enter a name for the meeting.')
      return
    }

    if (!startDate && !endDate) {
      setErrorMessage('Please enter both dates.')
      return
    }

    if (!startDate) {
      setErrorMessage('Please enter a start date.')
      return
    }

    if (!endDate) {
      setErrorMessage('Please enter an end date.')
      return
    }

    if (startDate.isBefore(moment())) {
      setErrorMessage('Invalid start date.')
      return
    }

    if (endDate.isBefore(moment())) {
      setErrorMessage('Invalid end date.')
      return
    }

    if (endDate.isBefore(startDate)) {
      setErrorMessage('End date comes before start date.')
      return
    }

    if (days.length == 1 && days[0] == "") {
      setErrorMessage("Please select at least one day.")
      return
    }

    let newMassCreation: MassCreateEventRequest = {
      name: name,
      description: description,
      start_date: startDate?.toDate(),
      end_date: endDate?.toDate(),
      days: days,
      club_id: club_id
    }

    massCreate(newMassCreation)
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
                  <Typography className='' variant="h6" fontWeight={"bold"}>Setup Meetings</Typography>
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
            <TextField className="w-[100%]" size="small" value={name}
                       label="Event Name" variant="outlined" type="text" required
                       onChange={(e) => { setName(e.target.value); setErrorMessage('')}}/>
          </Grid>
          <Grid item>
            <TextField className="w-[100%]" size="small" value={description}
                       label="Description (optional)" variant="outlined" type="text" id="description-text-field"
                       onChange={(e) => { setDesc(e.target.value); setErrorMessage('')}}
            />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <DatePicker label="Start Date" renderInput={(params) => <TextField size="small" {...params} />}
                            value={startDate} onChange={(newDate) => { setStartDate(newDate); setErrorMessage('') }}/>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(1, 'day')
                          setStartDate(newDate)
                          setErrorMessage('')
                        }}>tmr</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(7, 'day')
                          setStartDate(newDate)
                          setErrorMessage('')
                        }}>1WEEK</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <DatePicker label="End Date" renderInput={(params) => <TextField size="small" {...params} />}
                            value={endDate} onChange={(newDate) => { setEndDate(newDate); setErrorMessage('') }}/>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(1, 'day')
                          setEndDate(newDate)
                          setErrorMessage('')
                        }}>tmr</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'
                        onClick={() => {
                          let newDate = moment().add(7, 'day')
                          setEndDate(newDate)
                          setErrorMessage('')
                        }}>1WEEK</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item >
            <ToggleButtonGroup
              value={days}
              onChange={handleDays}>
              <ToggleButton value="Mon" > Mo </ToggleButton>
              <ToggleButton value="Tue" > Tu </ToggleButton>
              <ToggleButton value="Wed" > We </ToggleButton>
              <ToggleButton value="Thu" > Th </ToggleButton>
              <ToggleButton value="Fri" > Fr </ToggleButton>
              <ToggleButton value="Sat" > Sa </ToggleButton>
              <ToggleButton value="Sun" > Su </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" className="w-[100%]"
                    onClick={handleMassCreate}>Finish Setup</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}