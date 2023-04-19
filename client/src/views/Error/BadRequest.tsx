import { Typography } from '@mui/material'

export default function BadRequest() {
  return (
    <div className="p-4 items-center">
      <Typography variant="h2">400: Bad Request!</Typography>
      <Typography variant="h5">Please check your internet connection and reload the page.</Typography>
    </div>
  )
}