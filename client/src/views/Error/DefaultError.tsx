import { Typography } from '@mui/material'

export default function DefaultError() {
  return (
    <div className="p-4 items-center">
      <Typography variant="h2">Undefined Error!</Typography>
      <Typography variant="h5">I honestly don't know how we got here!</Typography>
    </div>
  )
}