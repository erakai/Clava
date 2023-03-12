import { Box, Chip } from "@mui/material"

type RoleRowProps = {
  roles: Role[]
  allRoles: Role[]
  onDelete: (role: Role) => void
  onAdd: (role: Role) => void
  dense: boolean
}

function RoleRowDisplay({roles, onDelete, onAdd, dense, allRoles}: RoleRowProps) {
  return (
    <Box>
      {roles.map(role => 
        (!dense ?
        <Chip label={role.name} onDelete={() => onDelete(role)} key={role._id} size={"small"}
          style={ (role.color) ? { backgroundColor: role.color } : {}}/> : (role.name + ', ')))}
    </Box>
  )
}

export default RoleRowDisplay