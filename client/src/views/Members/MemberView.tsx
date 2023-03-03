import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Button, Fab, Grid, Typography } from '@mui/material'
import to from 'await-to-js'
import { useEffect, useState } from 'react'

import AddMemberModal from './AddMemberModal'
import AddRoleModal from './AddRoleModal'
import RoleModal from './RoleModal'
import MemberDisplay from './MemberDisplay'
import { createMember as _createMember, getMembers } from '../../api/memberApi'
import { createTag as _createTag, getTags } from '../../api/memberApi'
import { createRole as _createRole, getRoles } from '../../api/roleApi'
import { ClavaNavbar, ScrollTop } from '../../components/Navigation'
import useUser from '../../hooks/useUser'
import { TagsEditorDialog } from '../../components/TagsEditor'
import { UserState } from '../../store/user/userSlice'
import useForceUpdate from '../../hooks/useForceUpdate'
import OfficerDisplay from './OfficerDisplay'
import { getOfficers } from '../../api/officerApi'

type MemberViewProps = {
  club_id: string
  state: UserState
  user_id: string
  owner_id: string
}

export default function MemberView({ club_id, state, user_id, owner_id }: MemberViewProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [officers, setOfficers] = useState<Officer[]>([])
  const [memberOpen, setMemberOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [roleViewOpen, setRoleViewOpen] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [officerOpen, setOfficerOpen] = useState(false)
  const [disableAddingMember, setDisableAddingMember] = useState(false)
  const [disableAddingRole, setDisableAddingRole] = useState(false)

  const ownerVisibility = user_id != owner_id
  console.log(user_id, owner_id)
  console.log(ownerVisibility)
  const forceUpdate = useForceUpdate()

  const createMember = async (member: MemberRequest) => {
    setDisableAddingMember(true)

    const [err, res] = await to(_createMember(member))
    if (err) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    } else if (res) {
      setMembers([...members, res.data.member])
    }

    setDisableAddingMember(false)
  }
  const createRole = async (role: RoleRequest) => {
    setDisableAddingRole(true)  
    const [err, res] = await to(_createRole(role))
    if (err) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    } else if (res) {
      setRoles([...roles, res.data.role])
    }

    setDisableAddingRole(false)
  }

  const createTag = async (tag: CreateTagRequest) => {
    const [err, res] = await to(_createTag(tag))
    if (err) {
      console.log(err)
    } else if (res) {
      setTags([...tags, res.data.tag])
    }
  }

  const createOfficer = (member: Member) => {
    console.log('Created officer (THIS IS PLACEHOLDER')
  }

  useEffect(() => {
    const fetchMembers = async () => {
      const [err, res] = await to(getMembers(club_id))
      if (err) {
        console.log(err)
        return
      }

      const retrieved = res.data.members
      if (retrieved) {
        setMembers(retrieved)
      }
    }

    const fetchTags = async () => {
      const [err, res] = await to(getTags(club_id))
      if (err) {
        console.log(err)
        return
      }

      const retrieved = res.data.tags
      if (retrieved) {
        setTags(retrieved)
      }
    }

    const fetchRoles = async () => {
      const [err, res] = await to(getRoles(club_id))
      if (err) {
        console.log(err)
        return
      }
      const retrieved = res.data.roles
      if (retrieved) {
        setRoles(retrieved)
      }
    }

    const fetchOfficers = async () => {
      const [err, res] = await to(getOfficers(club_id))
      if (err) {
        console.log(err)
        return
      }
      const retrieved = res.data.officers
      console.log(res.data)
      if (retrieved) {
        setOfficers(retrieved)
      }
    }

    fetchMembers()
    fetchTags()
    fetchRoles()
    fetchOfficers()
  }, [state])

  return (
    <Box className="min-w-full flex-auto">
      <AddMemberModal
        open={memberOpen}
        setOpen={setMemberOpen}
        createMember={createMember}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
        disableAddingMember={disableAddingMember}
      />
      <AddRoleModal
        open={roleOpen}
        setOpen={setRoleOpen}
        createRole={createRole}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
        disableAddingRole={disableAddingRole}/>

      <RoleModal
        open={roleViewOpen}
        setOpen={setRoleViewOpen}
        setRoleOpen={setRoleOpen}
        setRoles={setRoles}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
        roles={roles}/>
      <Box className="m-4 mb-16">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box display="flex" height="100%">
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={3}>
                  <Button className='h-full' variant="contained" color="secondary" onClick={() => setMemberOpen(true)}>
                    Add Member
                  </Button>
                </Grid> 
                <Grid item xs={12} md={6} lg={4}>
                  <TagsEditorDialog createTag={createTag} club_id={club_id} tags={tags} setTags={setTags} forceUpdate={forceUpdate}/>
                </Grid> 
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%">
              <Typography variant="h4">Member Database</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" height="100%" >
              <Grid container spacing={1} justifyContent="flex-end">
                <Grid item xs={12} md={6} lg={3}>
                  <Grid container justifyContent="flex-end" className='h-full'>
                    <Button className='h-full' disabled={ownerVisibility} variant="contained" color="secondary" onClick={() => setRoleViewOpen(true)}>
                    Add Role
                    </Button>
                  </Grid>
                </Grid> 
                <Grid item xs={12} md={6} lg={3}>
                  <Grid container justifyContent="flex-end" className='h-full'>
                    <Button className='h-full' disabled={ownerVisibility} variant="contained" color="secondary">
                      Add Officer
                    </Button>
                  </Grid>
                </Grid> 
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} lg={6}>
            <MemberDisplay
              title="All Members"
              members={members}
              setMembers={setMembers}
              club_id={club_id}
              state={state}
              tags={tags}
              forceUpdate={forceUpdate}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <OfficerDisplay
              title="All Officers"
              officers={officers}
              setOfficers={setOfficers}
              club_id={club_id}
              state={state}
              roles={roles}
              forceUpdate={forceUpdate}
            />
          </Grid>
        </Grid>
      </Box>
      <ScrollTop>
        <Fab size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  )
}
