import { Grid, Typography } from "@mui/material"

type ElectionManagingProps = {
  club_id: string
}

export default function ElectionManaging({ club_id } : ElectionManagingProps) {
  return (
    <Grid item xs={12} className="text-center">
      <Typography variant="h3">Manage ur elections</Typography>
    </Grid>
  )
}