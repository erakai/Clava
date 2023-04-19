import { Chip, Box } from "@mui/material/"


type RoleChipProps = {
  role : Role
  deleteDocRole?: (_id: string) => void
  clickDocRole?: (_id: string) => void
}

function DocumentRoleChip({ role, deleteDocRole, clickDocRole }: RoleChipProps) {  
  return (
    <Chip 
      className=""
      label={role.name}
      key={role._id}
      onDelete={deleteDocRole ? () => {deleteDocRole(role._id)} : undefined}
      onClick={clickDocRole ? () => {clickDocRole(role._id)} : undefined}
      style={ (role.color) ? { backgroundColor: role.color } : {}}
    />
  )
}

export default DocumentRoleChip