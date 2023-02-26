import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import { Moment } from "moment"
import { Dispatch, useState } from "react"

type AddMemberProps = {
  createMember: (member: Member) => void
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #ffb500',
  boxShadow: 24,
  p: 4,
  color: "primary"
}

export default function AddMemberModal({
  createMember, open, setOpen
}: AddMemberProps) {
  const [date, setDate] = useState<Moment | null>(null)

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
          <Grid item>
            <Box textAlign={"center"}>
              <Typography className='' variant="h6" fontWeight={"bold"}>New Member</Typography>
            </Box>
          </Grid>   
          <Grid item>
            <TextField className="w-[100%]" size="small" id="email-text-field" 
              label="Name" variant="outlined" type="text" />
          </Grid>
          <Grid item>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <DatePicker label="Member Until" renderInput={(params) => <TextField size="small" {...params} />} 
                  value={date} onChange={(newDate) => { setDate(newDate) }}/>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'>6m</Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="secondary" variant="contained" className='w-[100%]'>12m</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button color="secondary" variant="contained" className="w-[100%]">Add</Button>
          </Grid>
        </Grid> 
      </Box>
    </Modal>
  )
}