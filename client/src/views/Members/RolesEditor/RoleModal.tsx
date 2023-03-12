import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Chip } from "@mui/material"
import RoleChip from "./RoleChip"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"
import { deleteRole as _deleteRole } from '../../../api/roleApi';
import { Dispatch, useState } from "react"

type RoleProps = {
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  setRoleOpen: Dispatch<React.SetStateAction<boolean>>
  setRoles: React.Dispatch<React.SetStateAction<Role[]>>
  errorMessage: string
  setErrorMessage: Dispatch<React.SetStateAction<string>>
  club_id: string
  roles: Role[]
}


export default function RoleModal({
  open, setOpen, setRoleOpen, setRoles, errorMessage, setErrorMessage, club_id, roles
}: RoleProps) {

  const close = () => {
    setOpen(false)
  }

  const deleteRole = async (delRoleReq: RoleDeleteRequest) => {
    
    const [err, res] = await to(_deleteRole(delRoleReq))
    if (err) {
      console.log(err)
    } else if (res) {
      let retrieved = res.data.role
      setRoles((remRoles) =>
      remRoles.filter((tag) => tag.name !== retrieved.name))
    }
  }

  const hasRoleName = (name: string, _id?: string): boolean => {
    // make sure that the role we are possibly editing is not included in check
    let rolesFil = roles;
    if (_id) {
      rolesFil = roles.filter(role => role._id != _id)
    }
    let roleNames = rolesFil.map(role => role.name);
    return roleNames.includes(name)
  }

  const openAddRoleModal = () => {
    setRoleOpen(true);
  }

  return (
    <Dialog 
      open={open}
      onClose={close}>
      <DialogTitle>Roles</DialogTitle>
      <DialogContent>
        <Box className="flex flex-wrap space-x-1 space-y-2 w-96">
          <Box/>
          {roles.map(role => (
            <RoleChip 
              name={role.name} 
              color={role.color} 
              _id={role._id} 
              deleteRole={deleteRole}
              hasRoleName={hasRoleName}
              key={role._id}/>
          ))}
          <Chip className="w-min" 
          label="Add new" 
          variant="outlined" 
          icon={ <AddIcon /> }
          onClick={openAddRoleModal}/>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Done</Button>
      </DialogActions>
    </Dialog>
  )
}