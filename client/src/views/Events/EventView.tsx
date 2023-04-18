import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
  Stack
} from "@mui/material";
import CreateEventModal from "./CreateEventModal";
import SendEventScheduleModal from "./SendEventScheduleModal";
import moment, { Moment } from "moment"
import {_getEvents, _createEvent, _deleteEvents, _sendEventSchedule} from "../../api/eventApi";
import to from 'await-to-js'
import EventDisplay from "./EventTable/EventDisplay"
import useSettings from "../../hooks/useSettings";
import { AxiosError } from "axios";


type EventViewProps = {
  club_id: string
}
export default function EventView({ club_id }: EventViewProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [createEventOpen, setCreateEventOpen] = useState(false);
  const [createConfirmationOpen, setCreateConfirmationOpen] = useState(false);

  const [sendEventScheduleOpen, setSendEventScheduleOpen] = useState(false);
  const [scheduleErrorMessage, setScheduleErrorMessage] = useState('');
  const [sendScheduleConfirmationOpen, setSendScheduleConfirmationOpen] = useState(false)

  const [events, setEvents] = useState<Event[]>([])
  const { settings, refreshSettings } = useSettings()

  // Loading data on render

  const REFRESH_RATE = 1000 * 5;

  useEffect(() => {
    const fetchData = async () => {
      const [errT, eventList] = await to(_getEvents(club_id))
      if (errT) {
        console.log(errT)
        return
      }

      let eventsTemp: Event[] = []
      eventList.data.events.forEach((e: Event) => {
        if (moment().isBefore(e.date)) {
          eventsTemp.push(e);
        }
      })
      setEvents(eventsTemp);
    }
    
    fetchData()
    refreshSettings(club_id)

    const interval = setInterval(() => {
      fetchData()
    }, REFRESH_RATE)
    return () => clearInterval(interval)
  }, [])

  const createEvent = async (req: CreateEventRequest) => {
    const [err, e] = await to(_createEvent(req));
    if (err) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    }
    else {
      let event = e.data.event;
      if (moment().isBefore(event.date)) {
        let newEvents = events;
        newEvents.push(event);
        setEvents(newEvents);
      }
      setCreateConfirmationOpen(true)
      console.log("success!")
    }
  }

  const notify = async (req: SendEventScheduleRequest) => {
    const [err, res] = await to(_sendEventSchedule(req));

    if (err && err instanceof AxiosError) {
      setSendEventScheduleOpen(true)
      setScheduleErrorMessage(err.response?.data)
    } else {
      setSendScheduleConfirmationOpen(true)
      console.log("succcess!")
    }
  }

  const onEventDelete = async (deleted: Event[]) => {
    const event_ids: string[] =  deleted.map(e => e._id)
    const [err, res]= await to(_deleteEvents(event_ids))
    if (err) {
      console.log(err)
      return
    }

    let newEvents = events.filter(e => {
      return deleted.indexOf(e) == -1
    })
    setEvents(newEvents)
  }

  return (
    <>
      <Dialog
        open={createConfirmationOpen}
        onClose={e => {setCreateConfirmationOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Event Creation Success"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The event was created successfully.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        open={sendScheduleConfirmationOpen}
        onClose={e => {setSendScheduleConfirmationOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Event Schedule Notifcation Success"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All club members have been successfully notified.
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <CreateEventModal
        createEvent={createEvent}
        open={createEventOpen}
        setOpen={setCreateEventOpen}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
      />

      <SendEventScheduleModal
        notify={notify}
        open={sendEventScheduleOpen}
        setOpen={setSendEventScheduleOpen}
        errorMessage={scheduleErrorMessage}
        setErrorMessage={setScheduleErrorMessage}
        club_id={club_id}
      />

      <Grid container marginY={0} rowSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%">
            <Typography variant="h4">Event Dashboard</Typography>
          </Box>
        </Grid>


        <Grid container marginX={2} xs={12} md={100} rowSpacing={2}>
          <Grid item xs={12} md={6} lg={2}>
            <Stack direction="row" spacing={3}>
              <Button sx={{ whiteSpace: 'nowrap', minWidth: '140px' }} className='h-full' variant="contained" color="secondary" onClick={() => setCreateEventOpen(true)}>
                Create Event
              </Button>
              <Button sx={{ whiteSpace: 'nowrap', minWidth: '200px'}} className='h-full' variant="contained" color="secondary" onClick={() => setSendEventScheduleOpen(true)}>
                Send Event Schedule
              </Button>
            </Stack>
          </Grid>
          <Grid item container xs={12} spacing={1} justifyContent="center">
            <Grid item xs={12} lg={12}>
              <EventDisplay title="Event Masterlist" events={events} settings={settings} onDelete={onEventDelete}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}