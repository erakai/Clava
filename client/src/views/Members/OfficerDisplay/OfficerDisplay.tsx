import { ClavaTable, HeaderCell, RowDisplayProps } from "../../../components/ClavaTable"
import { useState } from "react"
import { Box } from "@mui/material"

import EditMemberModal from "../MemberDisplay/EditMemberModal"
import { UserState } from "../../../store/user/userSlice"

import { AlternateSelectedToolbarProps } from "../../../components/ClavaTable/TableToolbar"
import OfficerRow from "./OfficerRow"
import OfficerToolbarExtension from "./OfficerToolbarExtension"
import to from "await-to-js";
import {_deleteEvents} from "../../../api/eventApi";
import {_deleteOfficers} from "../../../api/officerApi";
import { hasPermission } from "../../ClubComposite"

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
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email'
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
  dense: boolean
}

export default function OfficerDisplay({ officers, setOfficers, title, club_id, state, roles, forceUpdate, dense }: DisplayProps) {
  const [searchString, setSearchString] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editing, setEditing] = useState<Officer>(officers[0])

  const onDelete = async (deleted: Officer[]) => {
    const officer_ids: string[] =  deleted.map(e => e._id)
    const [err, res]= await to(_deleteOfficers(officer_ids))
    if (err) {
      console.log(err)
      return
    }

    let newOfficers = officers.filter(e => {
      return deleted.indexOf(e) == -1
    })
    setOfficers(newOfficers)
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
              allRoles={roles} officers={officers} setOfficers={setOfficers} forceUpdate={forceUpdate}
            />
          }
          disableDelete={!hasPermission("OWNER")} disableEdit={!hasPermission("OWNER")}
        />
        {editModalOpen && 
          <div></div>
        }
    </Box>
  )
}