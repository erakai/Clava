import { Chip, Box, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material/"
import { editTag as _editTag } from "../../api/memberApi"
import React, { Dispatch, useEffect } from "react"
import to from "await-to-js"

type TagChipProps = {
  name: string
  color: string
  _id: string
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  deleteTag: (delTagReq: DeleteTagRequest) => void
  hasTagName: (name: string, _id: string) => boolean
}

function TagChip({ name, color, _id, deleteTag, hasTagName, tags, setTags }: TagChipProps) {
  const [currName, setCurrName] = React.useState(name)
  const [currColor, setCurrColor] = React.useState(color)
  const [isEditing, setEditing] = React.useState(false)
  const [newName, setNewName] = React.useState('')
  const [newColor, setNewColor] = React.useState('')
  const [nameError, setNameError] = React.useState('')
  const [colorError, setColorError] = React.useState('')

  const open = () => {
    setNameError("")
    setColorError("")
    setNewName(name)
    setNewColor(color)
    setEditing(true)
  }
  const close = () => {
    setNewName(name)
    setNewColor(color)
    setEditing(false)
  }

  const handleDelete = () => {
    let delTagReq: DeleteTagRequest = {
      _id
    }
    deleteTag(delTagReq)
  }

  const handleEdit = async () => {
    let badInput = false
    if (!newName) {
      setNameError("Tag name is required")
      badInput = true
    }
    if (!newColor) {
      setColorError("Tag color is required")
      badInput = true
    }
    if (!badInput && hasTagName(newName, _id)) {
      setNameError("Tag name needs to be unique")
      badInput = true
    }
    if (badInput) {
      return
    }
    let editTagReq: EditTagRequest = {
      newName, newColor, _id
    }
    const [err, res] = await to(_editTag(editTagReq))
    if (err) {
      console.log(err)
    } else if (res) {
      setCurrName(newName)
      setCurrColor(newColor)
      
      let idx = -1
      tags.forEach((tag, index) => {
        if (tag._id == _id) {
          idx = index
        }
      })

      if (idx != -1) {
        let newTags = tags
        newTags[idx] = {_id, name: newName, color: newColor}
        setTags(newTags)
      }
    }
    close()
  }
  
  return (
    <Box>
      <Chip 
        className=""
        label={currName}
        onDelete={handleDelete}
        onClick={open}/>
       <Dialog
        open={isEditing}
        onClose={close}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <Stack
            spacing={1}>
            <TextField label="Tag Name" variant="standard" size="small" defaultValue={currName}
              error={nameError != ""} 
              helperText={nameError}
              onChange={(e) => {
                setNewName(e.target.value.trim())
                setNameError("")
              }}/>
            <TextField label="Tag Color" variant="standard" size="small" defaultValue={currColor}
              error={colorError != ""} 
              helperText={colorError}
              onChange={(e) => {
                setNewColor(e.target.value.trim())
                setColorError("")
              }}/>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">Done</Button>
        </DialogActions>
      </Dialog> 
    </Box>
  )
}

export default TagChip