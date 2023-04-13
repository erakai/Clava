import { Chip, Box } from "@mui/material/"


type RoleChipProps = {
  name: string
  _id: string
  deleteDocRole: (_id: string) => void
}

function DocumentRoleChip({ name, _id, deleteDocRole }: RoleChipProps) {
  // const [currName, setCurrName] = React.useState(name)
  
  return (
    <Box>
      <Chip 
        className=""
        label={name}
        onDelete={() => {deleteDocRole(_id)}}/>
    </Box>
  )
}

export default DocumentRoleChip