import { Box, Button, CircularProgress, Grid, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import moment, { Moment } from "moment"
import { Dispatch, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';
import useEmailVerify from "../../../hooks/useEmailVerify"
import { dateOperation } from "../../../hooks/useSettings";

type EditMemberProps = {
  onEdit: (member: Member) => void
  open: boolean,
  setOpen: Dispatch<React.SetStateAction<boolean>>
  memberSelected: Member
  settings: Settings | null
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

export default function EditMemberModal({
  onEdit, open, setOpen, memberSelected, settings
}: EditMemberProps) {
  const emailVerify = useEmailVerify()
  const [name, setName] = useState(memberSelected.name)
  const [email, setEmail] = useState(memberSelected.email)
  const [date, setDate] = useState<Moment | null>(() => {
    if (memberSelected.expiration && Date.parse(memberSelected.expiration as unknown as string).valueOf() != 0) {
      return moment(memberSelected.expiration) 
    }
    return null
    }
  )

  const [errorMessage, setErrorMessage] = useState('')

  const clearFields = () => {
    setName('')
    setEmail('')
    setDate(null)
  }

  const close = () => {
    setErrorMessage('')
    clearFields()
    setOpen(false)
  }

  const handleEdit = () => {
    if (!name && !email) {
      setErrorMessage('Please enter both name and email.')
      return
    }

    if (!emailVerify(email)) {
      setErrorMessage('Invalid email.')
      return
    }

    if (date && date.isBefore(moment())) {
      setErrorMessage('Invalid date.')
      return
    }

    let updatedMember: Member = memberSelected
    updatedMember.name = name
    updatedMember.email = email
    if (date) updatedMember.expiration = date?.toDate().valueOf()

    onEdit(updatedMember)
    close()
  }

  return (
    <Modal open={open} onClose={close}>
      <Box sx={style}>
         { settings ? <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
            <Grid item>
              <Grid container direction="row">
                <Grid item xs={1}>
                  <IconButton size="small" onClick={close}>
                    <CloseIcon color="action" />
                  </IconButton>
                </Grid>
                <Grid item xs={10}>
                  <Box textAlign="center" className='h-[100%] flex-col justify-content-center'>
                      <Typography className='' variant="h6" fontWeight={"bold"}>Edit Member</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            {(errorMessage != '') ?
              <Grid item>
                <Box textAlign="center">
                  <Typography color="error" variant="subtitle1">{errorMessage}</Typography>
                </Box>
              </Grid> : <></>}
            <Grid item>
              <TextField className="w-[100%]" size="small" value={name}
                label="Name" variant="outlined" type="text" required
                onChange={(e) => { setName(e.target.value); setErrorMessage('')}}/>
            </Grid>
            <Grid item>
              <TextField className="w-[100%]" size="small" value={email} required
                label="Email" variant="outlined" type="email" id="email-text-field"
                onChange={(e) => { setEmail(e.target.value); setErrorMessage('')}}
                error={email != '' && !emailVerify(email)}/>
            </Grid>
            <Grid item>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <DatePicker label="Member Until" renderInput={(params) => <TextField size="small" {...params} />} 
                    value={date} onChange={(newDate) => { setDate(newDate); setErrorMessage('') }}/>
                </Grid>
                <Grid item xs={3}>
                  <Button color="secondary" variant="contained" className='w-[100%]'
                    onClick={() => {
                      let newDate = dateOperation(settings.memberButtonPresetOne)
                      if (typeof(newDate) == "string") {
                        setErrorMessage(newDate) 
                      } else {
                        setDate(newDate)
                        setErrorMessage('')
                      }
                    }}>{settings.memberButtonLabelOne}</Button>
                </Grid>
                <Grid item xs={3}>
                  <Button color="secondary" variant="contained" className='w-[100%]'
                    onClick={() => {
                      let newDate = dateOperation(settings.memberButtonPresetTwo)
                      if (typeof(newDate) == "string") {
                        setErrorMessage(newDate) 
                      } else {
                        setDate(newDate)
                        setErrorMessage('')
                      }
                    }}>{settings.memberButtonLabelTwo}</Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button color="secondary" variant="contained" className="w-[100%]" 
                onClick={handleEdit}>Update Member</Button>
            </Grid>
          </Grid> 
        : <CircularProgress /> }
      </Box>
    </Modal>
  )
}