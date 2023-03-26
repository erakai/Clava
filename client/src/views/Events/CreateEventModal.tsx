import { Box, Button, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

type CreateEventProps = {
  createEvent: (event: CreateEventRequest) => void
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: Dispatch<React.SetStateAction<string>>
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

export default function CreateEventModal({
                                           createEvent, open, setOpen, errorMessage, setErrorMessage
                                         }: CreateEventProps) {
  const [name, setName] = useState('')
  const [date, setDate] = useState<Moment | null>(null)
  const [description, setDesc] = useState('')

  const clearFields = () => {
    setName('')
    setDesc('')
    setDate(null)
  }

  const close = () => {
    clearFields()
    setOpen(false)
  }

  const handleCreate = () => {
    if (!name || !description) {
      setErrorMessage('Please enter both name and description of the event.')
      return
    }

    if (date && date.isBefore(moment())) {
      setErrorMessage('Invalid date.')
      return
    }
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
                  <Typography className='' variant="h6" fontWeight={"bold"}>New Event</Typography>
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
                       label="Name" variant="outlined" type="text" required
                       onChange={(e) => { setName(e.target.value); setErrorMessage('')}}/>
          </Grid>
          <Grid item>
            <TextField className="w-[100%]" size="small" value={description} required
                       label="Description" variant="outlined" type="text" id="description-text-field"
                       onChange={(e) => { setDesc(e.target.value); setErrorMessage('')}}
                       error={description != ''}/>
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
                    onClick={handleCreate}>Create Event</Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}