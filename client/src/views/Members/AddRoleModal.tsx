import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, FormControlLabel, FormGroup, Checkbox } from "@mui/material"
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

const options = ['View Finances', 'Edit Finances', 'View Members', 'Edit Members']
const permString = ['VIEW_FINANCES', 'EDIT_FINANCES', 'VIEW_MEMBERS', 'EDIT_MEMBERS']

export default function AddRoleModal({
  createRole, open, setOpen, errorMessage, setErrorMessage, club_id, disableAddingRole
}: AddRoleProps) {
  const emailVerify = useEmailVerify()
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [checkedState, setCheckedState] = useState(
    new Array(options.length).fill(false)
  );

  const handleOnChange = (index : number) => {
    const updatedCheckedState = [...checkedState]
    updatedCheckedState[index] = !updatedCheckedState[index]
    setCheckedState(updatedCheckedState);
  }

  const handleClose = () => {
    setOpen(false)
  };

  const handleClubCreation = () => {
    const perms = []
    for(let i=0; i<checkedState.length; i++) {
      if(checkedState[i]) perms.push(permString[i])
    }
    
    let roleRequest : RoleRequest = {
      name, color, perms, club_id
    }
    createRole(roleRequest)
    handleClose();
  }


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
            <FormGroup>
              {options.map((option, index) => (
                  <FormControlLabel control={<Checkbox checked={checkedState[index]} onChange={() => handleOnChange(index)}/>} label={option}/>
              ))}
            </FormGroup>

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disableAddingRole} onClick={handleClubCreation} variant="contained" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}