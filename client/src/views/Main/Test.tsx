import { Button } from "@mui/material"
import useUser from "../../hooks/useUser"

export default function Test() {
  const { user, logout } = useUser()

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <Button onClick={logout} variant="contained">Logout</Button>
    </div>
  )
}