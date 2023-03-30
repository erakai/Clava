import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Button, Fab, Grid, Typography } from '@mui/material'
import to from 'await-to-js'
import { useEffect, useState } from 'react'

import AddMemberModal from './MemberDisplay/AddMemberModal'
import AddRoleModal from './RolesEditor/AddRoleModal'
import RoleModal from './RolesEditor/RoleModal'
import MemberDisplay from './MemberDisplay/MemberDisplay'
import AddOfficerModal from './OfficerDisplay/AddOfficerModal'
import { createMember as _createMember, getMembers } from '../../api/memberApi'
import { _sendOfficerInvite } from "../../api/officerApi";
import { createTag as _createTag, getTags } from '../../api/memberApi'
import { createRole as _createRole, getRoles } from '../../api/roleApi'
import { ScrollTop } from '../../components/Navigation'
import { TagsEditorDialog } from './TagsEditor'
import { UserState } from '../../store/user/userSlice'
import useForceUpdate from '../../hooks/useForceUpdate'
import OfficerDisplay from './OfficerDisplay/OfficerDisplay'
import { getOfficers } from '../../api/officerApi'
import useSettings from '../../hooks/useSettings'

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
  const { settings, refreshSettings } = useSettings()

  const ownerVisibility = user_id != owner_id
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
      const newTags = [...tags, res.data.tag]
      setTags(newTags)
      // console.log("newtags", newTags)
      // console.log("tags", tags)
    }
  }

  const createOfficer = async (officer: AddOfficerRequest) => {
    const [err, res] = await to(_sendOfficerInvite(officer))
    if (err) {
      console.log(err)
      setErrorMessage('Something went wrong.')
    } else if (res) {
      setMembers([...members, res.data.member])
    }
  }

  useEffect(() => {
    const fetchAll = async () => {
      const [errMem, resMem] = await to(getMembers(club_id))
      if (errMem) {
        console.log(errMem)
        return
      }

      const retrievedMem = resMem.data.members
      if (retrievedMem) {
        setMembers(retrievedMem)
      }

      const [errTags, resTags] = await to(getTags(club_id))
      if (errTags) {
        console.log(errTags)
        return
      }

      const retrievedTags = resTags.data.tags
      if (retrievedTags) {
        setTags(retrievedTags)
      } 

      const [errRoles, resRoles] = await to(getRoles(club_id))
      if (errRoles) {
        console.log(errRoles)
        return
      }
      const retrievedRoles = resRoles.data.roles
      if (retrievedRoles) {
        setRoles(retrievedRoles)
      }

      const [errOff, resOff] = await to(getOfficers(club_id))
      if (errOff) {
        console.log(errOff)
        return
      }
      const retrievedOff = resOff.data.officers
      if (retrievedOff) {
        setOfficers(retrievedOff)
      }
    }

    refreshSettings(club_id)
    fetchAll()
  }, [state])

  return (
    <Box>
      <AddOfficerModal
          createOfficer={createOfficer}
          open={officerOpen}
          setOpen={setOfficerOpen}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          club_id={club_id}
      />
      <AddMemberModal
        open={memberOpen}
        setOpen={setMemberOpen}
        createMember={createMember}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        club_id={club_id}
        disableAddingMember={disableAddingMember}
        settings={settings}
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
      <Box className="mx-4 mt-4">
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
                  <Button className='h-full' disabled={ownerVisibility} variant="contained" color="secondary" onClick={() => setOfficerOpen(true)}>
                    Add Officer
                  </Button>
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
              dense={(settings) ? settings.dense : false}
              settings={settings}
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
              dense={(settings) ? settings.dense : false}
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
