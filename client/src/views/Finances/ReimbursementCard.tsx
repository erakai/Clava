import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type Props = {
    name : string,
    amount : number,
		creditor: string,
    link : string,
    paid: boolean,
}

export default function ReimbursementCard({name, amount, creditor, link, paid} : Props) {

	let status = "Pending"
	let oppStatus = "Completed"
	if(paid) {
		status = "Completed"
		oppStatus = "Pending"
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
        <Button size="small">Mark as {oppStatus}</Button>
				<Button size="small">Delete</Button>
				<Button size="small">View Receipt</Button>
        </CardActions>
      </Card>
    </Box>
  );
}