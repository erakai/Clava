import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getElectionById } from "../../../api/electionApi"
import to from "await-to-js"
import CandidateCard from "./CandidateCard"

export default function VotingFormView() {
  const navigate = useNavigate()
  const { election_id } = useParams()
  const [election, setElection] = useState<Election | null>()

  useEffect(() => {
    const fetch = async () => {
      if (!election_id) navToError()
      const [err, res] = await to(getElectionById(election_id as string))
      if (err || !res.data.election) navToError()

      setElection(res?.data.election)
    }

    fetch()
  }, [])

  const navToError = () => {
    navigate('/error')
  }

  const voteFor = (name: string) => {
    console.log('Voted for', name)
  }

  return <>
    {(election) ?
      <>
        <Box marginX={2}>
          <Box minHeight="10px"/>
          <Grid container >

            {/* Header with Title */}
            <Grid item xs={12}>
              <Paper sx={{ textAlign: "center", minHeight: "70px",
                justifyContent: "center", display: "flex", alignItems: "center",
                backgroundColor: "primary.main" }}
                  elevation={8}>
                <Typography variant="h5">{election.name}</Typography>
              </Paper>
            </Grid>

            {/* Candidate Cards */}
            <Grid item xs={12} container spacing={2}>
                {(election.candidates && election.candidates.length > 0) ?
                  election.candidates.map(c => 
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                      <CandidateCard candidate={c} questions={election.questions || []} voteFor={voteFor}/>
                    </Grid>
                  )
                :
                  <Box justifyContent="center" alignItems="center" textAlign="center" marginY={2}>
                    <Typography variant="h6">There are no candidates. Ask an officer for help.</Typography>
                  </Box>
                }
            </Grid>

          </Grid>
          

        </Box>

        {/* Footer with Description + End Date */}
        <Box position="fixed" top="auto" bottom={0}
          marginBottom={2} sx={{ left: 20, right: 20 }}>
          <Paper elevation={8} sx={{ minHeight: "70px", 
            padding: 2, backgroundColor: "primary.main" }}>
            <Grid container>
              <Grid item xs={7} height="100%" textAlign="left">
                <Typography variant="h6">Description</Typography>
                <Typography variant="body1">{election.description}</Typography>
              </Grid>
              <Grid item xs={2} height="auto" textAlign="right" container 
                justifyContent="end" display="flex" alignItems="center">
                <Stack paddingRight={2}>
                  <Typography variant="h6">End Date</Typography>
                  <Typography variant="body1">{(election.end ? 
                    new Date(election.end).toLocaleDateString() : "N/A")}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={3} height="auto" textAlign="center" 
                border={4}
                sx={{ backgroundColor: "secondary.main", paddingY: 2 }}>
                <Typography variant="h5">Current Vote</Typography>
                <Typography variant="body1">Local Storage!</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </>
    :
      <Box display="flex" justifyContent="center" alignItems="center" 
        textAlign="center" height="100vh">
        <CircularProgress color="primary" size="80px" />
      </Box>
    }
  </> 
}