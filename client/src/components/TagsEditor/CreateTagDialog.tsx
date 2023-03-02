import React from "react";
import { Box, Stack, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"

type CreateTagProps = {
  club_id: string
  createTag: (tag: CreateTagRequest) => void
  hasTagName: (name: string) => boolean
}

function CreateTagDialog({club_id, createTag, hasTagName}: CreateTagProps) {

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
    if (!name) {
      // set error msg
      console.log("you need a fucking name")
      return
    }
    if (hasTagName(name)) {
      // set error msg
      console.log("tags need unique name")
      return
    }
    console.log("name: " + name)
    let newTag: CreateTagRequest = {
      name, color, club_id
    }
    console.log(newTag.name)
    createTag(newTag)
    setName("")
    setColor("")
    setOpenNewTag(false)
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
        <Stack
          spacing={1}>
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