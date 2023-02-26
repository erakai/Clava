import { ClavaTable, HeaderCell, RowDisplayProps } from "../../components/ClavaTable"
import { useState } from "react"
import { Checkbox, TableCell, TableRow } from "@mui/material"

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

function MemberRow(
  { rowSelected, onClick, row, key}: RowDisplayProps<Member>) {
    return (
      <TableRow key={key} hover onClick={onClick} selected={rowSelected}
        tabIndex={-1}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" checked={rowSelected}/>
          </TableCell>
          <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
          <TableCell align="right">{new Date(row.expiration).toLocaleDateString()}</TableCell>
      </TableRow>
    )
}

type DisplayProps = {
  members: Member[]
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
  title: string
}

export default function MemberDisplay({ members, setMembers, title }: DisplayProps) {
  const [dense, setDense] = useState(false)

  const onDelete = (deleted: Member[]) => {
    let newMembers = members.filter(m => {
      return deleted.indexOf(m) == -1
    })
    setMembers(newMembers)
  }

  return (
    <ClavaTable<Member> defaultOrder="name" tableName={title}
      data={members} headerCells={headerCells} onDelete={onDelete}
      RowDisplay={MemberRow} dense={dense} 
      rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}/>
  )
}