import { ClavaTable, HeaderCell } from "../../components/ClavaTable"
import { Box } from '@mui/material'
import { useState } from "react"
import MemberRow from "./MemberRow"
import TagsEditorPopup from "../../components/TagsEditorDialog"

const headerCells: HeaderCell<Member>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Member Name'
  },
  {
    id: 'expiration',
    numeric: true,
    disablePadding: false,
    label: 'Paid Until'  
  }
]

type DisplayProps = {
  members: Member[]
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
}

export default function MemberDisplay({ members, setMembers }: DisplayProps) {
  const [dense, setDense] = useState(false)

  const onDelete = (deleted: Member[]) => {
    let newMembers = members.filter(m => {
      return deleted.indexOf(m) == -1
    })
    setMembers(newMembers)
  }

  return (
    <Box className="flex-col">
      <TagsEditorPopup/>
      <ClavaTable<Member> defaultOrder="name" tableName="All Members"
        data={members} headerCells={headerCells} onDelete={onDelete}
        RowDisplay={MemberRow} dense={dense} 
        rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}/>
    </Box>
  )
}