import { useEffect, useState } from "react"
import { Box, Grid, Typography } from '@mui/material'
import { getReimbursements, createReimbursement as _createReimbursement } from '../../api/reimbursementApi'
import to from 'await-to-js'
import useUser from '../../hooks/useUser'

type DisplayProps = {
  club_id: string
}

export default function ReimbursementDisplay({club_id} : DisplayProps) {
  const [completedReimbursements, setCompletedReimbursements] = useState<Reimbursement[]>([])
  const [pendingReimbursements, setPendingReimbursements] = useState<Reimbursement[]>([])
  const { user, state, logout } = useUser()

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
          const completed = []
          const pending = []
          for(let i=0; i<retrieved.length; i++) {
            if(retrieved[i].paid) completed.push(retrieved[i])
            else pending.push(retrieved[i])
          }
          setCompletedReimbursements(completed)
          setPendingReimbursements(pending)
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
          {completedReimbursements.map((reimbursement) => (
            <Typography textAlign="center" variant="h5">{reimbursement.name}</Typography>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}