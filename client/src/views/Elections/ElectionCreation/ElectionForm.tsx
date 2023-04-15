import { Avatar, Box, Button, Divider, FormControl, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, TextField, Tooltip, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { ElectionSelect } from "./useElectionLogic";

type ElectionFormProps = {
  /*
    New represents a new election being created, but if one is passed in
    then the form acts as a way to update it.
  */
  election: ElectionSelect
}

export default function ElectionForm({ election }: ElectionFormProps) {
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<string[]>([])

  const updating = election != "new"

  const addQuestion = () => {
    let q = newQuestion
    if (q.trim().length > 0) {
      setQuestions([...questions, q])
      setNewQuestion("")
    }
  }

  const removeQuestion = (q: string) => {
    setQuestions(questions.filter(f => f != q))
  }

  return (
    <FormControl sx={{width: "90%", marginTop: 3, marginBottom: 3}}>
      <Grid container mx={2} rowSpacing={1}>
        <Grid item xs={12} mb={2} container justifyContent={"center"} alignItems={"center"}>
          <Typography mr={2} variant="h5">
            {updating ? "Updating Election:" : "Creating Election:"}
          </Typography>
          <TextField required sx={{width: "50%"}} 
            size="small" variant="outlined" label="Name"/>
        </Grid>

        <Grid item xs={12}>
          <TextField required multiline rows={3} maxRows={8} 
            variant="outlined" fullWidth label="Description"/>
        </Grid>

        <Grid item container xs={12} spacing={1}>
          <Grid item xs={12} md={5}>
            <DatePicker label="Start Date" 
                renderInput={(params) => <TextField fullWidth size="small" {...params} />} 
                value={null} onChange={() => {}}/>
          </Grid>
          <Grid item xs={10} md={5}>
            <DatePicker label="End Date" 
                renderInput={(params) => <TextField fullWidth size="small" {...params} />} 
                value={null} onChange={() => {}}/>
          </Grid>
          <Grid item xs={2} border={2} borderColor="#ffffff">
            <Box display="flex" justifyContent="start" 
              alignItems="center">
              <Tooltip title='Setting a start and end date is optional. If set, then
                              when the start date passes, the election will be higlighted
                              to indicate that a link should be generated immediately. When
                              the end date passes, the election will automatically close next time
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

        <Grid item container xs={12} mt={4} display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained">
            Save Election
          </Button>
        </Grid>
      </Grid>
    </FormControl>
  )
}