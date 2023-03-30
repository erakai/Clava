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

export default function EventRow({
                                         rowSelected, onClick, row
                                       }: RowDisplayProps<Event>) {

  const [qrOpen, setQrOpen] = useState(false);
  const [qrValue, setQrValue] = useState("");

  return (
    <>
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
    </TableRow>
    </>
  )
}