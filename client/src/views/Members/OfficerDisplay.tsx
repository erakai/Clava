import { ClavaTable, HeaderCell, RowDisplayProps } from "../../components/ClavaTable"
import { useState } from "react"
import { Box } from "@mui/material"

import EditMemberModal from "./EditMemberModal"
import { UserState } from "../../store/user/userSlice"

import { AlternateSelectedToolbarProps } from "../../components/ClavaTable/TableToolbar"
import OfficerRow from "./OfficerRow"
import OfficerToolbarExtension from "./OfficerToolbarExtension"

const headerCells: HeaderCell<Officer>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Officer Name'
  },
  {
    id: 'role_ids',
    numeric: false,
    disablePadding: false,
    label: 'Roles'  
  },
  {
    id: 'expiration',
    numeric: true,
    disablePadding: false,
    label: 'Expiration'  
  }
]

type DisplayProps = {
  officers: Officer[]
  setOfficers: React.Dispatch<React.SetStateAction<Officer[]>>
  title: string
  club_id: string
  state: UserState,
  roles: Role[]
  forceUpdate: () => void
}

export default function OfficerDisplay({ officers, setOfficers, title, club_id, state, roles, forceUpdate }: DisplayProps) {
  const [searchString, setSearchString] = useState('')
  const [dense, setDense] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editing, setEditing] = useState<Officer>(officers[0])

  const onDelete = async (deleted: Officer[]) => { 
    console.log("Do Delete")
  }

  const onEdit = async (edited: Officer) => {
    console.log("Do Edit")
  }

  const onEditClicked = (edited: Officer) => {
    setEditing(edited)
    setEditModalOpen(true)
  }

  const filteredOfficers = officers.filter(officer => {
    if (officer.expiration) {
      if (new Date(officer.expiration).toLocaleDateString().toLowerCase().includes(searchString)) {
        return true
      }
    }

    return (officer.name.toLowerCase().includes(searchString))
  })

  return (
    <Box>
        <ClavaTable<Officer> defaultOrder="name" tableName={title}
          data={filteredOfficers} headerCells={headerCells} onDelete={onDelete}
          RowDisplay={({rowSelected, onClick, row}) => 
            <OfficerRow rowSelected={rowSelected} onClick={onClick} row={row} allRoles={roles} dense={dense}/>}
          dense={dense} searchString={searchString} setSearchString={setSearchString}
          rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}
          onEdit={onEditClicked} AlternateSelectedToolbar={
            ({selected, setSelected}: AlternateSelectedToolbarProps<Officer>) =>
            <OfficerToolbarExtension selected={selected} setSelected={setSelected} 
              allRoles={roles} officers={officers} setOfficers={setOfficers} forceUpdate={forceUpdate}/>
          }
        />
        {editModalOpen && 
          <div></div>
        }
    </Box>
  )
}