import { Chip, Box, Container, Stack, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material/"
import React from "react"

type TagChipProps = {
  name: string
  color: string
  _id: string
  deleteTag: (delTagReq : DeleteTagRequest) => void
}

function TagChip({ name, color, _id, deleteTag }: TagChipProps) {
  
  const [isEditing, setEditing] = React.useState(false)
  const [newName, setName] = React.useState('')
  const [newColor, setColor] = React.useState('')
  const open = () => {
    setEditing(true)
  }
  const close = () => {
    setEditing(false)
  }

  const handleDelete = () => {
    // let delTagReq: DeleteTagRequest = {
    //   name, club_id
    // }
    // let delTag: Tag = {
    //  name, color, club_id
    // }

    let delTagReq: DeleteTagRequest = {
      _id
    }
    deleteTag(delTagReq)
  }

  const handleEdit = () => {
    let editedTag: EditTagRequest = {
      newName, newColor, _id
    }
    //editTag(editedTag)
    close()
  }
  
  return (
    <Box>
      <Chip 
        className=""
        label={name}
        onDelete={handleDelete}
        onClick={open}/>
       <Dialog
        open={isEditing}
        onClose={close}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <Stack
            spacing={1}>
            <TextField label="Tag Name" variant="standard" size="small" defaultValue={name}
              onChange={(e) => {
                setName(e.target.value.trim())
              }}/>
            <TextField label="Tag Color" variant="standard" size="small" defaultValue={color}
              onChange={(e) => {
                setColor(e.target.value.trim())
              }}/>
          </Stack>
        </DialogContent>
      </Dialog> 
    </Box>
  )
}

export default TagChip