import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import useEmailVerify from "../../hooks/useEmailVerify"

type AddRoleProps = {
  createRole: (role: RoleRequest) => void
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
  errorMessage: string
  setErrorMessage: Dispatch<React.SetStateAction<string>>
  club_id: string
  disableAddingRole: boolean
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

export default function AddRoleModal({
  createRole, open, setOpen, errorMessage, setErrorMessage, club_id, disableAddingRole
}: AddRoleProps) {
  const emailVerify = useEmailVerify()
  const [name, setName] = useState('')
  const [color, setColor] = useState('')

  const handleClose = () => {
    setOpen(false)
  };


  return (
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Role"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              required
              id="role-name"
              label="Role Name"
              variant="standard"
              onChange={(e) => { setName(e.target.value); setErrorMessage('')}}
            />
            <TextField
              required
              id="role-color"
              label="Role Color"
              variant="standard"
              onChange={(e) => { setColor(e.target.value); setErrorMessage('')}}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disableAddingRole} onClick={handleClose} variant="contained" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}