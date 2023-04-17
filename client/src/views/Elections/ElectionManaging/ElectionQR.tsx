import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"

type ElectionQRProps = {
  select: Election
  open: boolean
  handleClose: () => void
}

export default function ElectionQR({ select, open, handleClose } : ElectionQRProps) {
  const [link, setLink] = useState("")

  useEffect(() => {
    // I LOVE HARDCODING LINKS!!!!!
    let l = "http://localhost:5173/vote/"
    l += select._id
    setLink(l)
  }, [select])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle className="text-center">
        {"Election Voting Form"}
      </DialogTitle>
      <DialogContent>
        <Box flexDirection="column" className="flex justify-center items-center">
          <DialogContentText>
            {link}
          </DialogContentText>
          <QRCode size={230} className="mt-5 mb-3" value={link}/>
        </Box>
      </DialogContent>
    </Dialog>
  )
}