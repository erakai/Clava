import { Box, CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getElectionById, vote } from "../../../api/electionApi"
import to from "await-to-js"
import CandidateCard from "./CandidateCard"

export default function VotingFormView() {
  const navigate = useNavigate()
  const { election_id } = useParams()
  const [election, setElection] = useState<Election | null>()
  const [currVote, setCurrVote] = useState("None")

  useEffect(() => {
    if (!election_id) navToError()

    const fetch = async () => {
      if (!election_id) navToError()
      const [err, res] = await to(getElectionById(election_id as string))
      if (err || !res.data.election) navToError()

      let ele: Election = res?.data.election as Election
      setElection(ele)

      let vote = localStorage.getItem('vote')
      let exists = false
      if (ele.candidates && vote) {
        ele.candidates.forEach(c => {
          if (c.name == vote) exists = true
        })
      }
      if (!exists && vote) {
        localStorage.removeItem('vote')
      } else if (exists) {
        setCurrVote(vote as string)
      }
    }


    fetch()
  }, [])

  const navToError = () => {
    navigate('/error')
  }

  const voteFor = async (name: string) => {
    // remove prev vote
    let prev = currVote
    if (prev != "None") {
      const [err] = await to(vote(election_id as string, prev, -1))
      if (err) console.log(err)
    }

    // update new vote
    localStorage.setItem('vote', name)
    setCurrVote(name)
    const [err2] = await to(vote(election_id as string, name, 1))
    if (err2) console.log(err2)
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
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={c._id}>
                      <CandidateCard candidate={c} questions={election.questions || []} 
                        voteFor={voteFor} currentVote={currVote == c.name}/>
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
                <Typography variant="body1">{currVote}</Typography>
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