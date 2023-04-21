import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, FormControlLabel, FormGroup, Checkbox, Accordion, Typography, AccordionSummary, AccordionDetails } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import useEmailVerify from "../../../hooks/useEmailVerify"
import { CirclePicker } from "@hello-pangea/color-picker";
import { hasPermission } from "../../ClubComposite";
import { permission, permissions } from "../../../util/permissions";

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

const defaultCheckState = new Map<string, boolean[]>
Object.entries(permissions).forEach(
  ([hub, options]) => {
    defaultCheckState.set(hub, new Array(options.length).fill(false))
  }
);

export default function AddRoleModal({
  createRole, open, setOpen, errorMessage, setErrorMessage, club_id, disableAddingRole
}: AddRoleProps) {
  const emailVerify = useEmailVerify()
  const [name, setName] = useState('')
  const [color, setColor] = useState('#ffc107')
  const [checkedState, setCheckedState] = useState(defaultCheckState);

  const handleOnChange = (hub : string, index : number) => {
    const updatedCheckedStateArray = [...checkedState.get(hub) as boolean[]]
    updatedCheckedStateArray[index] = !updatedCheckedStateArray[index]
    const updatedCheckedState = new Map(checkedState)
    updatedCheckedState.set(hub, updatedCheckedStateArray)
    setCheckedState(updatedCheckedState);
  }

  const handleClose = () => {
    setOpen(false)
  };

  const handleRoleCreation = () => {
    const perms : string[] = []
    Object.entries(permissions).forEach(([hub, options]) => {
      for (var i = 0; i < (checkedState.get(hub) as boolean[]).length; i++) {
        if ((checkedState.get(hub) as boolean[])[i]) {
          perms.push(permissions[hub][i].id)
        }
      }
    })

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
            <CirclePicker defaultColor={color} onChange={(e) => { setColor(e.hex)}}/>
            <Typography variant="h6">Permissions</Typography>
            {Object.entries(permissions).map( ([hub, perm]) =>(
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{hub}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormGroup>
                    {perm.map((option, index) => (
                      <FormControlLabel control={<Checkbox checked={(checkedState.get(hub) as boolean[])[index]} onChange={() => handleOnChange(hub, index)}/>} label={option.name} key={option.name+index}/>
                    ))}
                  </FormGroup>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disableAddingRole} onClick={handleRoleCreation} variant="contained" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
  )
}