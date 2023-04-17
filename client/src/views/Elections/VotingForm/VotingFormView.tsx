import { Box } from "@mui/material"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getResults } from "../../../api/electionApi"
import to from "await-to-js"

export default function VotingFormView() {
  const navigate = useNavigate()
  const { election_id } = useParams()

  const navToError = () => {
    navigate('/error')
  }

  useEffect(() => {
    const fetch = async () => {
      if (!election_id) navToError()
      const [err, results] = await to(getResults(election_id as string))
      if (err) navToError()
    }

    fetch()
  }, [])

  return (
    <Box>
      {election_id}
    </Box>
  )
}