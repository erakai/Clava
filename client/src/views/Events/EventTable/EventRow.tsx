import {
  Checkbox,
  TableCell,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box
} from "@mui/material";
import { RowDisplayProps } from "../../../components/ClavaTable";
import React, {useState} from "react";
import QRCode from "react-qr-code"
import to from "await-to-js";
import {getMembers} from "../../../api/memberApi";
import {_getEvent, _getEvents} from "../../../api/eventApi";
import EventPieChart from "../Graphics/EventPieChart";

export default function EventRow({
                                         rowSelected, onClick, row
                                       }: RowDisplayProps<Event>) {

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");
  const [statsOpen, setStatsOpen] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(row.attendance);

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
    setTotalMembers(totalNumMembers);
    console.log("total members= " + totalNumMembers)
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

    setAttendanceCount(resEvent.data.event.attendance)
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
              Yield: {attendanceCount / totalMembers * 100}%
            </DialogContentText>
            <EventPieChart attendance={attendanceCount} totalMembers={totalMembers} />
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