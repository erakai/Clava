import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";

type CandidateCardProps = {
  candidate: Candidate,
  questions: string[]
  voteFor: (n: string) => void
  currentVote: boolean
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CandidateCard({
  candidate, questions, voteFor, currentVote
}: CandidateCardProps) {
  const [expanded, setExpanded] = useState(false)

  const expandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ maxWidth: 345, marginTop: 2, flex: "auto",
      border: (currentVote ? 3 : 0), borderColor: "green"}}>
      <CardHeader avatar={
        <Avatar>
          <PersonIcon/>
        </Avatar>  
      } title={candidate.name}/>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {candidate.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="text" onClick={() => voteFor(candidate.name)} >Vote</Button>
        <ExpandMore expand={expanded} onClick={expandClick}>
          <ExpandMoreIcon/>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} unmountOnExit>
        <CardContent>
          {questions.map((q, i) => 
            <Box key={q}>
              <Typography variant="h6">q</Typography>
              <Typography variant="body1">{candidate.answers[i]}</Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}