import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, TextField, Tooltip, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useElectionLogic from "./useElectionLogic";
import to from "await-to-js";
import { addElection as _addElection, updateElection as _updateElection } from "../../../api/electionApi";
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

type ElectionFormProps = {
  addElection: (e: Election) => void
  updateElection: (e: Election) => void
  checkElectionExists: (e: Election) => boolean
  club_id: string
  ele: ReturnType<typeof useElectionLogic>
}

export default function ElectionForm({addElection, club_id, 
  ele, updateElection, checkElectionExists}: ElectionFormProps) {

  const { name, setName,
          description, setDescription,
          start, setStart,
          end, setEnd,
          newQuestion, setNewQuestion,
          candidates, setCandidates,
          newCandName, setNewCandName,
          newCandDesc, setNewCandDesc,
          newCandAns, setNewCandAns,
          questions, setQuestions, selected,
          updating, selectAndClear } = ele
  const [open, setOpen] = useState(false)
  const [errMsg, setErrMsg] = useState("")

  const save = async () => {
    let ereq: Election = {
      name, description, questions, club_id, candidates
    }

    if (start) ereq.start = start.toDate()
    if (end) ereq.end = end.toDate()

    if (checkElectionExists(ereq)) {
      handleOpenDialog("An election with that name already exists. Please update the name.")
      return
    }

    if (updating) {
      let election_id = (selected as Election)._id as string

      const [err, e] = await to(_updateElection(election_id, ereq))
      if (err) {
        console.log(err)
        if ((err as any).response.data.error) {
          handleOpenDialog((err as any).response.data.error)
        }
        return
      }

      if (e.data.election) updateElection(e.data.election)
    } else {
      const [err, e] = await to(_addElection(ereq))
      if (err) {
        console.log(err)
        if ((err as any).response.data.error) {
          handleOpenDialog((err as any).response.data.error)
        }
        return
      }
      
      if (e.data.election) addElection(e.data.election)
    }

    setErrMsg("")
    selectAndClear(null)
  }

  const addQuestion = () => {
    let q = newQuestion
    if (q.trim().length > 0) {
      setQuestions([...questions, q])
      setNewQuestion("")
    }
    if (questions.length > newCandAns.length) {
      setNewCandAns([...newCandAns, ""])
    }
  }

  const removeQuestion = (q: string) => {
    setQuestions(questions.filter(f => f != q))
  }

  const addCandidate = () => {
    if (newCandName.trim().length > 0 &&
        newCandDesc.trim().length > 0) {

        let found = false
        candidates.forEach(c => {
          if (c.name.trim().toLowerCase() === newCandName.trim().toLowerCase()) {
            found = true
          }
        })
        if (found) {
          handleOpenDialog("A candidate with that name already exists.")
          return
        }

        let newc = {
          name: newCandName,
          description: newCandDesc,
          answers: newCandAns
        }
        setCandidates([...candidates, newc])
        setNewCandName("")
        setNewCandDesc("")
        setNewCandAns([])
    }
  }

  const removeCandidate = (c: Candidate) => {
    setCandidates(candidates.filter(f => f.name != c.name))
  }

  const updateAnswer = (i: number, s: string) => {
    let a = [...newCandAns]
    a[i] = s
    setNewCandAns(a)
  }

  const getAnswerVal = (i: number) => {
    while (i >= newCandAns.length) {
      newCandAns.push("")
    }
    return newCandAns[i]
  }

  const handleCloseDialog = () => {
    setErrMsg("")
    setOpen(false)
  }

  const handleOpenDialog = (err: string) => {
    setErrMsg(err)
    setOpen(true)
  }

  return <>
    <Dialog
        open={open}
        onClose={handleCloseDialog}
      >
        <DialogTitle>
          {"Error in Election"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {errMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
    </Dialog>

    <FormControl sx={{width: "90%", marginTop: 3, marginBottom: 3}}>
      <Grid container mx={2} rowSpacing={1}>
        <Grid item xs={12} mb={2} container justifyContent={"center"} alignItems={"center"}>
          <IconButton onClick={() => selectAndClear(null)}>
            <CloseIcon/> 
          </IconButton>
          <Typography mr={2} variant="h5">
            {updating ? "Updating Election:" : "Creating Election:"}
          </Typography>
          <TextField required sx={{width: "50%"}} value={name}
            onChange={(e) => setName(e.target.value)}
            size="small" variant="outlined" label="Name"/>
        </Grid>

        <Grid item xs={12}>
          <TextField required multiline rows={3} value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="outlined" fullWidth label="Description"/>
        </Grid>

        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} md={5}>
            <DatePicker label="Start Date" 
                renderInput={(params) => <TextField fullWidth size="small" {...params} />} 
                value={start} onChange={(newDate) => {setStart(newDate)}}/>
          </Grid>
          <Grid item xs={10} md={5}>
            <DatePicker label="End Date" 
                renderInput={(params) => <TextField fullWidth size="small" {...params} />} 
                value={end} onChange={(newDate) => {setEnd(newDate)}}/>
          </Grid>
          <Grid item xs={2} border={2} borderColor="#ffffff">
            <Box display="flex" justifyContent="start" 
              alignItems="center">
              <Tooltip title='Setting a start and end date is optional. If set, then
                              when the start date passes, the election will be higlighted
                              to indicate that a link should be generated immediately. When
                              the end date passes (at 12:00am the next day), the election will automatically close next time
                              an officer views the running elections.' placement="top">
                <IconButton size="small">
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          <Grid item xs={12} mt={2} mb={2}>
            <Typography variant="h6" component="div">
              Current Questions
            </Typography>

            <Box ml={2}>
              {questions.length == 0 ?
                <Typography variant="subtitle1">There are no questions.</Typography> 
                :
                <List dense={true}>
                  {questions.map(q =>
                    <ListItem key={q} secondaryAction={
                      <IconButton edge="end" onClick={() => {removeQuestion(q)}}>
                        <DeleteIcon/>
                      </IconButton>
                    }>
                      <ListItemAvatar>
                        <Avatar>
                          <QuestionAnswerIcon/>
                        </Avatar>
                      </ListItemAvatar>

                      <ListItemText primary={q} />
                    </ListItem>
                  )}
                </List>
              }
            </Box>
          </Grid>

          <Grid item container xs={12} spacing={1}>
            <Grid item xs={12} md={9}>
              <TextField size="small" fullWidth variant="outlined" 
                label="New Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)}/>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button variant="contained" onClick={addQuestion} sx={{height: '100%', width: '100%'}}>
                Add Question
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2} mb={2}>
          <Typography variant="h6" component="div">
            Current Candidates
          </Typography>

          <Box ml={2}>
            {candidates.length == 0 ?
              <Typography variant="subtitle1">There are no candidates.</Typography> 
              :
              <List dense={true}>
                {candidates.map(q =>
                  <ListItem key={q.name} secondaryAction={
                    <IconButton edge="end" onClick={() => {removeCandidate(q)}}>
                      <DeleteIcon/>
                    </IconButton>
                  }>
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon/>
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText primary={q.name} secondary={q.description}/>
                  </ListItem>
                )}
              </List>
            }
          </Box>
        </Grid>

        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} md={4}>
            <TextField size="small" fullWidth required variant="outlined" 
              label="New Candidate Name" value={newCandName} onChange={(e) => setNewCandName(e.target.value)}/>
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField size="small" fullWidth required variant="outlined" 
              label="New Candidate Description" value={newCandDesc} onChange={(e) => setNewCandDesc(e.target.value)}/>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button variant="contained" onClick={addCandidate} sx={{height: '100%', width: '100%'}}>
              Add Candidate
            </Button>
          </Grid>
          {[...Array(questions.length).keys()].map(i => (
            <Grid item container xs={12} ml={2} key={i}>
              <Grid item container xs={1} 
                justifyContent="end" alignItems="center" display="flex" mr={1}>
                <Typography variant="subtitle1">{"Q" + (i+1) + ":"}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField size="small" fullWidth variant="outlined"
                  label="Answer" value={getAnswerVal(i)} onChange={
                    (e) => updateAnswer(i, e.target.value)
                  }/>
              </Grid>
            </Grid>
          ))}
        </Grid>


        <Grid item container xs={12} mt={4} display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={save}>
            Save Election
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  </> 
}