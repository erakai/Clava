import TagsEditorPopup from "../../components/TagsEditor"
import { ClavaTable, HeaderCell, RowDisplayProps } from "../../components/ClavaTable"
import { useState } from "react"
import { Checkbox, TableCell, TableRow } from "@mui/material"

import to from 'await-to-js'
import { deleteMembers } from '../../api/memberApi'

const headerCells: HeaderCell<Member>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Member Name'
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'  
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
          <TableCell align="left">{row.email}</TableCell>
          <TableCell align="right">
            {(row.expiration) ? 
              ((Date.parse(row.expiration as unknown as string).valueOf() != 0) ? 
              new Date(row.expiration).toLocaleDateString() : 'N/A')
            : "N/A"}
          </TableCell>
      </TableRow>
    )
}

type DisplayProps = {
  members: Member[]
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
  title: string
}

export default function MemberDisplay({ members, setMembers, title }: DisplayProps) {
  const [searchString, setSearchString] = useState('')
  const [dense, setDense] = useState(false)

  const onDelete = async (deleted: Member[]) => { 
    const member_ids : string[] = deleted.map((member : Member) => member._id)
    const [err, res] = await to(deleteMembers(member_ids))
    if (err) {
      console.log(err)
    } else if (res) {
      // removal on table
      let newMembers = members.filter(m => {
      return deleted.indexOf(m) == -1
      })
      setMembers(newMembers)
    }
  }

  const onEdit = (mem: Member) => {
    console.log('Implement editing.') 
  }

  const filteredMembers = members.filter(member => {
    if (member.expiration) {
      if (new Date(member.expiration).toLocaleDateString().toLowerCase().includes(searchString)) {
        return true
      }
    }

    return (member.name.toLowerCase().includes(searchString) ||
            member.email.toLowerCase().includes(searchString))
  })

  return (
    <ClavaTable<Member> defaultOrder="name" tableName={title}
      data={filteredMembers} headerCells={headerCells} onDelete={onDelete}
      RowDisplay={MemberRow} dense={dense} searchString={searchString} setSearchString={setSearchString}
      rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10} onEdit={onEdit}/>
  )
}