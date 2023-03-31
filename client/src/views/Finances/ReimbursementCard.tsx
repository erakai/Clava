import * as React from 'react';
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import to from 'await-to-js'
import { editReimbursement, deleteReimbursement } from '../../api/reimbursementApi'

type Props = {
  _id : string,
  name : string,
  amount : number,
  creditor: string,
  link : string,
  paid: boolean,
  club_id: string,
  updateReimbursementDisplay : (request : number, _id : string) => void
}

export default function ReimbursementCard({_id, name, amount, creditor, link, paid, club_id, updateReimbursementDisplay} : Props) {

  const [status, setStatus] = useState<boolean>(paid)
  
  const statusUpdate = async () => {
    let updateRequest : EditReimbursementRequest = {
      _id, name, amount, creditor, link, paid: !status, club_id
    }
    const [err, res] = await to(editReimbursement(updateRequest))
    if (err) {
      console.log(err)
    } else if (res) {
      updateReimbursementDisplay(0, _id)
      setStatus(!status)
    }
  }

  const handleDelete = async () => {
    const [err, res] = await to(deleteReimbursement(_id))
    if (err) {
      console.log(err)
    } else if (res) {
      updateReimbursementDisplay(1, _id)
    }
  }


  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {status} Reimbursement
        </Typography>
        <Typography variant="h5" component="div">
            {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            owed to: {creditor}
        </Typography>
        <Typography variant="body2">
            Amount owed: {amount}
        </Typography>
        </CardContent>
        <CardActions>
        <Button size="small" onClick={statusUpdate}>Mark as {status? "Pending" : "Completed"}</Button>
				<Button size="small" onClick={handleDelete}>Delete</Button>
				<Button size="small">View Receipt</Button>
        </CardActions>
      </Card>
    </Box>
  );
}