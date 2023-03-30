import { useEffect, useState } from "react"
import { Box, Grid, Typography } from '@mui/material'
import { getReimbursements, createReimbursement as _createReimbursement } from '../../api/reimbursementApi'
import to from 'await-to-js'
import useUser from '../../hooks/useUser'
import ReimbursementCard from "./ReimbursementCard"

type DisplayProps = {
  club_id: string
}

export default function ReimbursementDisplay({club_id} : DisplayProps) {
  const [reimbursements, setReimbursements] = useState<Reimbursement[]>([])
  const { user, state, logout } = useUser()

  const updateReimbursementDisplay = (_id : string) => {
    const updated = []
    for(let i=0; i<reimbursements.length; i++) {
      updated.push(reimbursements[i])
      if(reimbursements[i]._id === _id ) {
        updated[i].paid = !updated[i].paid
      }
    }
    setReimbursements(updated)
  }

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
    }
  }, [state, user])

  return (
    <Box mt={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h6">Completed Reimbursements</Typography>
        </Grid>
        {reimbursements.map((reimbursement) => (
          reimbursement.paid &&
            <Grid key={reimbursement._id} item xs={12}>
              <ReimbursementCard _id={reimbursement._id} name={reimbursement.name} amount={reimbursement.amount} creditor={reimbursement.creditor} link={reimbursement.link} paid={reimbursement.paid} club_id={reimbursement.club_id} updateReimbursementDisplay={updateReimbursementDisplay}></ReimbursementCard>
            </Grid>
          
        ))}
        <Grid item xs={12}>
          <Typography textAlign="center" variant="h6">Pending Reimbursements</Typography>
        </Grid>
        {reimbursements.map((reimbursement) => (
          !reimbursement.paid &&
            <Grid key={reimbursement._id} item xs={12}>
              <ReimbursementCard _id={reimbursement._id} name={reimbursement.name} amount={reimbursement.amount} creditor={reimbursement.creditor} link={reimbursement.link} paid={reimbursement.paid} club_id={reimbursement.club_id} updateReimbursementDisplay={updateReimbursementDisplay}></ReimbursementCard>
            </Grid>
          
        ))}
      </Grid>
    </Box>
  )
}