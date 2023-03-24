import { Typography } from '@mui/material'

export default function RestrictedAccess() {
  return (
    <div className="p-4 items-center">
      <Typography variant="h2">403: Restricted Access!</Typography>
      <Typography variant="h5">Buddy! What do you think you're doing?</Typography>
    </div>
  )
}