import React from "react";
import { Box, Stack, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"

type CreateTagProps = {
  createTag: (tag: TagRequest) => void
  club_id: string
}

function CreateTagDialog({createTag, club_id}: CreateTagProps) {

  const [isOpenNewTag, setOpenNewTag] = React.useState(false)
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState('')
  const handleOpen = () => {
    setOpenNewTag(true)
  }

  const handleCancel = () => {
    setOpenNewTag(false)
  }

  const handleCreate = () => {
    let newTag: TagRequest = {
      name, color, club_id
    }
    createTag(newTag)
  }

  return (
    <Box>
      <Chip 
        className="w-min" 
        label="Add new" 
        variant="outlined" 
        icon={ <AddIcon /> } 
        onClick={handleOpen}/>
      <Dialog
        open={isOpenNewTag}
        onClose={handleCancel}>
      <DialogTitle>
        Create New Tag
      </DialogTitle>
      <DialogContent>
        <Stack>
          <TextField label="Tag Name" variant="standard" size="small" 
          onChange={(e) => {
            setName(e.target.value.trim())
          }}/>
          <TextField label="Tag Color" variant="standard" size="small" 
          onChange={(e) => {
            setColor(e.target.value.trim())
          }}/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CreateTagDialog