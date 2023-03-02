import React from "react";
import { Box, Stack, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"
import { setEngine } from "crypto";

type CreateTagProps = {
  club_id: string
  createTag: (tag: CreateTagRequest) => void
  hasTagName: (name: string) => boolean
}

function CreateTagDialog({club_id, createTag, hasTagName}: CreateTagProps) {

  const [isOpenNewTag, setOpenNewTag] = React.useState(false)
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState('')

  const [nameError, setNameError] = React.useState('')
  const [colorError, setColorError] = React.useState('')
  const handleOpen = () => {
    setOpenNewTag(true)
  }

  const handleCancel = () => {
    setOpenNewTag(false)
  }

  const handleCreate = () => {
    let badInput = false
    if (!name) {
      setNameError("Tag name is required")
      badInput = true
    }
    if (!color) {
      setColorError("Tag color is required")
      badInput = true
    }
    if (!badInput && hasTagName(name)) {
      setNameError("Tag name needs to be unique")
      badInput = true
    }
    if (badInput) {
      return
    }
    
    let newTag: CreateTagRequest = {
      name, color, club_id
    }
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
            error={nameError != ""} 
            helperText={nameError}
            onChange={(e) => {
            setName(e.target.value.trim())
            setNameError("")
          }}/>
          <TextField label="Tag Color" variant="standard" size="small" 
            error={colorError != ""} 
            helperText={colorError}
            onChange={(e) => {
            setColor(e.target.value.trim())
            setColorError("")
          }}/>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">Create</Button>
      </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CreateTagDialog