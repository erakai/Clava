import { Typography } from '@mui/material'

export default function UrlNotFound() {
  return (
    <div className="p-4 items-center">
      <Typography variant="h2">404: Page Not Found! Sorry :(</Typography>
      <Typography variant="h5">Please check your url and internet connection.</Typography>
    </div>
  )
}
