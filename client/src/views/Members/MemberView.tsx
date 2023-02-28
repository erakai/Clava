import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { Box, Button, Fab, Grid, Typography } from '@mui/material'
import to from 'await-to-js'
import { useEffect, useState } from 'react'

import AddMemberModal from './AddMemberModal'
import MemberDisplay from './MemberDisplay'
import { createMember as _createMember, getMembers } from '../../api/memberApi'
import { ClavaNavbar, ScrollTop } from '../../components/Navigation'
import useUser from '../../hooks/useUser'
import TagsEditor from '../../components/TagsEditor'

type MemberViewProps = {
  club_id: string
}

export default function MemberView({ club_id }: MemberViewProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const [members, setMembers] = useState<Member[]>([])
  const [memberOpen, setMemberOpen] = useState(false)
  const [officerOpen, setOfficerOpen] = useState(false)
  const [disableAddingMember, setDisableAddingMember] = useState(false)
  const { state } = useUser()

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

  const createOfficer = (member: Member) => {
    console.log('Created officer (THIS IS PLACEHOLDER')
  }

  useEffect(() => {
    const fetch = async () => {
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

    fetch()
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
      <Box className="m-4 mb-16">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="left"
              alignItems="left"
              height="100%">
              <Button variant="contained" color="secondary" onClick={() => setMemberOpen(true)}>
                Add Member
              </Button>
              <TagsEditor/>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h4">Member Database</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              display="flex"
              justifyContent="right"
              alignItems="right"
              height="100%"
            >
              <Button variant="contained" color="secondary">
                Add Officer
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <MemberDisplay
              title="All Members"
              members={members}
              setMembers={setMembers}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <MemberDisplay
              title="All Officers"
              members={[]}
              setMembers={setMembers}
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
