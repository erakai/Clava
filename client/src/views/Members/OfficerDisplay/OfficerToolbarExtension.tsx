import { Autocomplete, Collapse, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { Dispatch, useState } from "react";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import { addRolesToOfficer } from "../../../api/roleApi";
import to from "await-to-js";

type OfficerToolbarExtensionProps = {
  selected: Officer[]
  setSelected: Dispatch<React.SetStateAction<Officer[]>>
  allRoles: Role[]
  officers: Officer[]
  setOfficers: Dispatch<React.SetStateAction<Officer[]>>
  forceUpdate: () => void
}

function OfficerToolbarExtension({
  selected, setSelected, allRoles, officers, setOfficers, forceUpdate
}: OfficerToolbarExtensionProps) {
  const [adding, setAdding]  = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const addRoles = async () => {
    if (!selectedRole) return

    let officer_ids = selected.map(s => s._id)

    const [err] = await to(addRolesToOfficer({role_id: selectedRole._id, officer_ids}))
    if (err) {
      console.log(err)
      setAdding(false)
      return
    }

    
    let newOfficers = officers
    newOfficers.forEach(o => {
      if (selected.indexOf(o) != -1) {
        if (o.role_ids.indexOf(selectedRole._id) == -1) {
          o.role_ids.push(selectedRole._id) 
        } 
      }
    })
    setOfficers(newOfficers)

    setSelected([])
    setAdding(false)
    forceUpdate()
  }

  return (
    <Grid container spacing={3} direction="row" alignItems={"right"} justifyContent={"right"}>
      <Grid item xs={8} md={8}>
        <Collapse in={adding} orientation="vertical" className='w-full'>
          <Stack direction="row">
            <Tooltip title="Add Role">
              <IconButton onClick={() => {addRoles()}}>
                <AddIcon/>
              </IconButton>
            </Tooltip>
            <Autocomplete disablePortal options={allRoles} size="small" fullWidth autoSelect autoHighlight
              renderInput={(params) => <TextField {...params} label="Add Role" />}
              getOptionLabel={(role) => role.name} onChange={(e, v) => setSelectedRole(v)}/>
         </Stack>
        </Collapse>
      </Grid>
      <Grid item xs={4} lg={2}>
        <Tooltip title="Add Role">
          <IconButton onClick={() => setAdding(!adding)}>
            <LocalOfferIcon/>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default OfficerToolbarExtension