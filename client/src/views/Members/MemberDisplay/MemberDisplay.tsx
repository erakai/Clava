import { ClavaTable, HeaderCell, RowDisplayProps } from "../../../components/ClavaTable"
import { useState } from "react"
import { Box } from "@mui/material"

import to from 'await-to-js'
import { deleteMembers, updateMember } from '../../../api/memberApi'
import EditMemberModal from "./EditMemberModal"
import { UserState } from "../../../store/user/userSlice"
import MemberRow from "./MemberRow"
import MemberToolbarExtension from "./MemberToolbarExtension"
import { AlternateSelectedToolbarProps } from "../../../components/ClavaTable/TableToolbar"
import { hasPermission } from "../../ClubComposite"

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
    label: 'Email',
  },
  {
    id: 'tag_ids',
    numeric: false,
    disablePadding: false,
    label: 'Tags'  
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
  title: string
  club_id: string
  state: UserState,
  tags: Tag[]
  forceUpdate: () => void
  dense: boolean
  settings: Settings | null
}

export default function MemberDisplay({ members, setMembers, title, club_id, state, tags, forceUpdate, dense, settings }: DisplayProps) {
  const [searchString, setSearchString] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member>(members[0])

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

  const onEdit = async (edited: Member) => {
    const memberRequest : MemberUpdateRequest = {
      'name' : edited.name,
      'email' : edited.email,
      'member_id' : edited._id
    }
    const [err, res] = await to(updateMember(memberRequest))
    if (err) {
      console.log(err)
    } else if (res) {
      const i = members.indexOf(edited)
      members[i] = edited
      setMembers(members)
    }
  }

  const onEditClicked = (edited: Member) => {
    setEditing(edited)
    setEditModalOpen(true)
  }

  const filteredMembers = members.filter(member => {
    if (member.expiration) {
      if (new Date(member.expiration).toLocaleDateString().toLowerCase().includes(searchString)) {
        return true
      }
    }

    if (member.tag_ids.length > 0) {
      let found = false
      tags.forEach(t => {
        if (member.tag_ids.includes(t._id) && t.name.toLowerCase().includes(searchString)) {
          found = true
        }
      })
      if (found) return found
    }

    return (member.name.toLowerCase().includes(searchString) ||
            member.email.toLowerCase().includes(searchString))
  })

  return (
    <Box>
        <ClavaTable<Member> defaultOrder="name" tableName={title}
          data={filteredMembers} headerCells={headerCells} onDelete={onDelete}
          RowDisplay={({rowSelected, onClick, row}) => 
          <MemberRow rowSelected={rowSelected} onClick={onClick} row={row} allTags={tags} dense={dense}/>}          dense={dense} searchString={searchString} setSearchString={setSearchString}
          rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}
          onEdit={onEditClicked} AlternateSelectedToolbar={
            ({selected, setSelected}: AlternateSelectedToolbarProps<Member>) =>
            <MemberToolbarExtension selected={selected} setSelected={setSelected} 
              allTags={tags} members={members} setMembers={setMembers} forceUpdate={forceUpdate}/>
          }
          disableDelete={!hasPermission("EDIT_MEMBERS")} disableEdit={!hasPermission("EDIT_MEMBERS")}
        />
        {editModalOpen && 
          <EditMemberModal 
            onEdit={onEdit}
            open={editModalOpen}
            setOpen={setEditModalOpen}
            memberSelected={editing}
            settings={settings}
          />
        }
    </Box>
  )
}