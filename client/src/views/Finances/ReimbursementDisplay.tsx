import { useEffect, useState } from "react"
import { Box, Grid, Typography, Button, Dialog, DialogActions, DialogTitle, DialogContent, Stack, TextField } from '@mui/material'
import { getReimbursements, createReimbursement as _createReimbursement } from '../../api/reimbursementApi'
import to from 'await-to-js'
import useUser from '../../hooks/useUser'
import ReimbursementCard from "./ReimbursementCard"

type DisplayProps = {
  club_id: string
}

export default function ReimbursementDisplay({club_id} : DisplayProps) {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])
  const [open, setCreateReimbursementOpen] = useState(false);
  const [disableReimbursementCreation, setDisableReimbursementCreation] = useState(false)

  const [name, setName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [creditor, setCreditor] = useState<string>('')
  const [link, setLink] = useState<string>('')

  const { user, state, logout } = useUser()

  useEffect(() => {
    setDisableReimbursementCreation(name.length == 0 || amount == 0 || creditor.length == 0)
  }, [name, amount, creditor, link])

  const handleOpen = () => {
    setCreateReimbursementOpen(true)
    setName('')
    setAmount(0)
    setCreditor('')
    setLink('')
  }

  const handleClose = () => {
    setCreateReimbursementOpen(false)
  }

  const handleCreateAndClose = async () => {

    setCreateReimbursementOpen(false)

    setDisableReimbursementCreation(true)

    const createRequest : CreateReimbursementRequest = {
      name : name,
      amount : amount,
      creditor : creditor,
      link : link,
      paid : false,
      club_id : club_id
    }

    const [err, res] = await to(_createReimbursement(createRequest))
    if (err || !user) {
      console.log(err)
    } else if (res) {
      setReimbursements([...reimbursements, res.data.reimbursement])
    }

    setDisableReimbursementCreation(false)
  }

  const updateReimbursementDisplay = (request: number, _id : string) => {
    if(request == 0) {
      const updated = []
      for(let i=0; i<reimbursements.length; i++) {
        updated.push(reimbursements[i])
        if(reimbursements[i]._id === _id ) {
          updated[i].paid = !updated[i].paid
        }
      }
      setReimbursements(updated)
    }
    else if(request == 1) {
      const updated = []
      for(let i=0; i<reimbursements.length; i++) {
        if(reimbursements[i]._id !== _id ) {
          updated.push(reimbursements[i])
        }
      }
      setReimbursements(updated)
    }
    
  }

  const REFRESH_RATE = 1000 * 5;

  // Gets clubs and listens for new clubs added to the DB
  useEffect(() => {
    if (user) {
      const fetch = async () => {
        const [err, res] = await to(getReimbursements(club_id))
        if (err) {
          console.log(err)
          return
        }

        const retrieved = res.data.reimbursements
        if(retrieved) {
          const reimbursements = []
          for(let i=0; i<retrieved.length; i++) {
            reimbursements.push(retrieved[i])
            
          }
          setReimbursements(reimbursements)
        }
      }
      fetch()

      const interval = setInterval(() => {
        fetch()
      }, REFRESH_RATE)
      return () => clearInterval(interval)
    }
  }, [state, user])

  return (
    <Box>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Button onClick={handleOpen} variant="contained">
            Create Reimbursement
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h6">Pending Reimbursements</Typography>
        </Grid>
        {reimbursements.map((reimbursement) => (
          !reimbursement.paid &&
            <Grid key={reimbursement._id} item xs={12}>
              <ReimbursementCard _id={reimbursement._id} name={reimbursement.name} amount={reimbursement.amount} creditor={reimbursement.creditor} link={reimbursement.link} paid={reimbursement.paid} club_id={reimbursement.club_id} updateReimbursementDisplay={updateReimbursementDisplay}></ReimbursementCard>
            </Grid>
        ))}
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h6">Completed Reimbursements</Typography>
        </Grid>
        {reimbursements.map((reimbursement) => (
          reimbursement.paid &&
            <Grid key={reimbursement._id} item xs={12}>
              <ReimbursementCard _id={reimbursement._id} name={reimbursement.name} amount={reimbursement.amount} creditor={reimbursement.creditor} link={reimbursement.link} paid={reimbursement.paid} club_id={reimbursement.club_id} updateReimbursementDisplay={updateReimbursementDisplay}></ReimbursementCard>
            </Grid>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create Reimbursement"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              required
              id="name"
              label="What is it for?"
              variant="standard"
              onChange={(e) => { setName(e.target.value) }}
            />
            <TextField
              required
              id="amount"
              label="How much is owed?"
              type="number"
              variant="standard"
              onChange={(e) => { setAmount(+e.target.value) }}
            />
            <TextField
              required
              id="name"
              label="Who is it for?"
              variant="standard"
              onChange={(e) => { setCreditor(e.target.value) }}
            />
            <TextField
              id="name"
              label="Link to receipt?"
              variant="standard"
              onChange={(e) => { setLink(e.target.value) }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={disableReimbursementCreation} onClick={handleCreateAndClose} variant="contained" autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}