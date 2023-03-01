import { Chip, Box, Container, Stack, TextField, Dialog, DialogTitle, DialogContent } from "@mui/material/"
import { deleteTag } from "../../api/memberApi"
import React from "react"

type TagChipProps = {
  name: string
  color: string
  club_id: string
}

function TagChip({ name, color, club_id }: TagChipProps) {
  
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
    console.log("name: " + name, "club_id: " + club_id)
    let delTag: DeleteTagRequest = {
      name, club_id
    }
    deleteTag(delTag)
  }

  const handleEdit = () => {
    let editedTag: EditTagRequest = {
      newName, newColor, club_id
    }
    //editTag(editedTag)
    close()
  }
  
  return (
    <Box
      className="flex w-auto flex-wrap">
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