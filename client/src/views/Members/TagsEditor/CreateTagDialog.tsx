import React from "react";
import { Box, Stack, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Modal, Popover } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { CirclePicker } from "@hello-pangea/color-picker";


type CreateTagProps = {
  club_id: string
  createTag: (tag: CreateTagRequest) => void
  hasTagName: (name: string, _id?: string) => boolean
}

function CreateTagDialog({club_id, createTag, hasTagName}: CreateTagProps) {

  const [isOpenNewTag, setOpenNewTag] = React.useState(false)
  const [isChoosingColor, setIsChoosingColor] = React.useState(false)
  const [name, setName] = React.useState('')
  const [color, setColor] = React.useState('#ffc107')

  const [nameError, setNameError] = React.useState('')
  const [colorError, setColorError] = React.useState('')

  const handleColorOpen = () => {
    setIsChoosingColor(true)
  }

  const handleColorClose = () => {
    setIsChoosingColor(true)
  }

  const handleOpen = () => {
    setNameError("")
    setColorError("")
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
          spacing={2}>
          <TextField label="Tag Name" variant="standard" size="small" 
            error={nameError != ""} 
            helperText={nameError}
            onChange={(e) => {
            setName(e.target.value.trim())
            setNameError("")
          }}/>
          <CirclePicker defaultColor={color} onChange={(e) => {setColor(e.hex)}} />
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