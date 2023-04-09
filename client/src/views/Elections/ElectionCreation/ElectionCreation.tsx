import { Grid, Typography } from "@mui/material"

type ElectionCreationProps = {
  club_id: string
}

export default function ElectionCreation({ club_id } : ElectionCreationProps) {
  return (
    <Grid item xs={12}>
      <Typography>Creation</Typography>
    </Grid>
  )
}