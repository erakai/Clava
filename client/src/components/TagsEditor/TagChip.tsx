import { Chip, Box, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material/"
import { editTag as _editTag } from "../../api/memberApi"
import React from "react"
import to from "await-to-js"

type TagChipProps = {
  name: string
  color: string
  _id: string
  deleteTag: (delTagReq: DeleteTagRequest) => void
  hasTagName: (name: string, _id: string) => boolean
}

function TagChip({ name, color, _id, deleteTag, hasTagName }: TagChipProps) {
  
  const [currName, setCurrName] = React.useState(name)
  const [currColor, setCurrColor] = React.useState(color)
  const [isEditing, setEditing] = React.useState(false)
  const [newName, setNewName] = React.useState('')
  const [newColor, setNewColor] = React.useState('')
  const open = () => {
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
    if (!newName || !newColor) {
      // set error msg
      console.log("you need a name and color")
      return
    }
    if (hasTagName(newName, _id)) {
      // set error msg
      console.log("need unique name")
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
              onChange={(e) => {
                setNewName(e.target.value.trim())
              }}/>
            <TextField label="Tag Color" variant="standard" size="small" defaultValue={currColor}
              onChange={(e) => {
                setNewColor(e.target.value.trim())
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