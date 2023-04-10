import { Button, FormControl, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"

type ElectionFormProps = {
  election: Election
}

export default function ElectionForm({ election }: ElectionFormProps) {
  return (
    <FormControl>
      <TextField variant="outlined" label="Name"/>
      <TextField variant="outlined" label="Description"/>
      <TextField variant="outlined" label="Start Date"/>
      <TextField variant="outlined" label="End Date"/>
      <List dense={true}>
        <ListItem>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText
            primary="Question"
          />
        </ListItem>
      </List>
      <TextField variant="outlined" label="Question"/>
      <Button>Add Question</Button>
      <Button>Save</Button>
    </FormControl>
  )
}