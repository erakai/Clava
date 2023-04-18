import {
  Checkbox,
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box, Typography
} from "@mui/material";
import { RowDisplayProps } from "../../../components/ClavaTable";
import React, {useState} from "react";
import QRCode from "react-qr-code"
import to from "await-to-js";
import {getMembers} from "../../../api/memberApi";
import {_getEvent, _getEvents} from "../../../api/eventApi";
import EventPieChart from "../Graphics/EventPieChart";
import EventBarChart from "../Graphics/EventBarChart";

export default function EventRow({
                                         rowSelected, onClick, row
                                       }: RowDisplayProps<Event>) {

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [statsOpen, setStatsOpen] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(row.attendance);
  const [attendanceDiff, setAttendanceDiff] = useState(0);
  const [attendanceDiffColor, setAttendanceDiffColor] = useState("grey")
  const [diffPrefix, setDiffPrefix] = useState("")
  const [attendanceArr, setAttendanceArr] = useState([0])
  const [eventNameArr, setEventNameArr] = useState([""])

  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const getTotalMembers = async() => {
    const [errMem, resMem] = await to(getMembers(row.club_id))
    if (errMem) {
      console.log(errMem)
      return
    }

    const totalNumMembers = resMem.data.members.length
    setTotalMembers(totalNumMembers)
  }

  const getAttendanceCount = async() => {
    const [errEvent, resEvent] = await to(_getEvent(row._id))
    if (errEvent) {
      console.log(errEvent)
      return
    }

    if (!resEvent) {
      console.log("can't find event")
      return
    }

    const currAttendanceCount = resEvent.data.event.attendance
    setAttendanceCount(currAttendanceCount)

    const [err, res] = await to(_getEvents(row.club_id))

    if (err) {
      console.log(err)
      return
    }

    let totalAttendance = 0
    let totalEvents = 0

    let eventNames = [row.name]
    let eventAttendances = [currAttendanceCount]

    res.data.events.forEach((e: Event) => {
      if (e.date < row.date) {
        eventNames.push(e.name)
        eventAttendances.push(e.attendance)
        totalAttendance += e.attendance
        totalEvents += 1
      }
    }, [])

    if (eventNames.length > 5) {
      eventNames = eventNames.slice(0,5)
      eventAttendances = eventAttendances.slice(0,5)
    }

    setEventNameArr(eventNames)
    setAttendanceArr(eventAttendances)

    let diff = currAttendanceCount - totalAttendance/totalEvents
    let color = ""

    if (totalEvents == 0 || diff == 0) {
      color = "grey"
      setDiffPrefix(" ")
    } else if (diff > 0) {
      color = "green"
      setDiffPrefix(" +")
    } else {
      color = "red"
      setDiffPrefix(" ")
    }

    setAttendanceDiffColor(color)
    setAttendanceDiff(diff)
  }

  return (
    <>
      <Dialog
        open={statsOpen}
        onClose={e => {setStatsOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attendance Statistics"}
        </DialogTitle>
        <DialogContent>
          <Box flexDirection="column" className="flex justify-center">
            <DialogContentText id="alert-dialog-description">
              Event: {row.name}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Attendance Count: {attendanceCount}
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Attendance Differential:
              <Typography variant="button" sx={{ 'color': attendanceDiffColor }}>
                {diffPrefix}{(Math.round(attendanceDiff * 100) / 100).toFixed(2)}
              </Typography>
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              Yield: {attendanceCount / totalMembers * 100}%
            </DialogContentText>
            <EventPieChart attendance={attendanceCount} totalMembers={totalMembers} />
            <EventBarChart attendanceArr={attendanceArr} eventNameArr={eventNameArr} />

          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={qrOpen}
        onClose={e => {setQrOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Attendance QR Code"}
        </DialogTitle>
        <DialogContent>
          <Box flexDirection="column" className="flex justify-center items-center">
            <QRCode size={230} className="mb-5" value={qrValue}/>
            <DialogContentText id="alert-dialog-description">
              Please scan this QR code to record your attendance at this event.
            </DialogContentText>
          </Box>
        </DialogContent>
      </Dialog>

    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
      <TableCell component="th" scope="row" padding="none">{row.description}</TableCell>
      <TableCell align="right">
        {new Date(row.date).toLocaleDateString()}
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={() => {
          setQrValue("http://localhost:5173/IncrementAttendance/" + row._id)
          setQrOpen(true)
        }}>Generate</Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={() => {
          getAttendanceCount()
          getTotalMembers()
          setTimeout(() => {
            setStatsOpen(true)
          }, 100)
        }}>View Stats</Button>
      </TableCell>
    </TableRow>
    </>
  )
}