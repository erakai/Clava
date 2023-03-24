import { useEffect, useState } from "react"
import { Box } from '@mui/material'
import ReimbursementDisplay from "./ReimbursementDisplay"

type FinanceProps = {
  club_id : string
}

export default function FinanceView({club_id} : FinanceProps) {
  return (
    <Box className="w-screen">
      <ReimbursementDisplay club_id={club_id}></ReimbursementDisplay>
    </Box>
  )
}