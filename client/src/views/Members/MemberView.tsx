import { useEffect, useState } from "react"
import MemberDisplay from "./MemberDisplay"
import { ClavaNavbar, ScrollTop } from "../../components/Navigation"
import { Box, Button, Fab, Grid, Typography } from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AddMemberModal from "./AddMemberModal"


const tempMembers: Member[] = [
  {
    member_id: "63f553996a2ef9da8a85e69c",
    name: "Kai Tinkess",
    expiration: Date.parse("1995-12-17T08:24:00.000Z"),
    club_id: "5e1a0651741b255ddda996c4",
    tag_ids: [],
  },
]

for (let i = 0; i < 100; i++) {
  tempMembers.push({
    member_id: "63f553cb1484c7c696f5e35e",
    name: "Alex Hunton",
    expiration: Date.parse("1997-12-17T08:24:00.000Z"),
    club_id: "5e1a0651741b255ddda996c4",
    tag_ids: [],
  })
}

export default function MemberView() {
  const [members, setMembers] = useState<Member[]>([])
  const [memberOpen, setMemberOpen] = useState<boolean>(false)
  const [officerOpen, setOfficerOpen] = useState<boolean>(false)

  const createMember = (member: Member) => {
    members.push(member)
  }

  const createOfficer = (member: Member) => {
    console.log('Created officer (THIS IS PLACEHOLDER')
  }

  useEffect(() => {
    setMembers(tempMembers)

    return () => {
      setMembers([])
    }
  }, [])

  return (
    <Box className='min-w-full flex-auto'>
      <AddMemberModal open={memberOpen} setOpen={setMemberOpen} createMember={createMember}/>
      <ClavaNavbar currentRoute="Members"/>
      <Box className='m-4 mb-16'>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="left" alignItems="left" height={"100%"}
              onClick={() => setMemberOpen(true)}>
              <Button variant="contained" color="secondary">Add Member</Button>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="center" alignItems="center" height={"100%"}>
              <Typography variant="h4">Member Database</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" justifyContent="right" alignItems="right" height={"100%"}>
              <Button variant="contained" color="secondary">Add Officer</Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <MemberDisplay title={"All Members"} members={members} setMembers={setMembers}/>
          </Grid>
          <Grid item xs={6}>
            <MemberDisplay title={"All Officers"} members={members} setMembers={setMembers}/>
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