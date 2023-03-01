import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import { Container } from '@mui/system';
import * as React from 'react';
import CreateTagDialog from './CreateTagDialog';
import TagChip from './TagChip';

const pages = ['Members', 'Events', 'Documents', 'Finances'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type TagsEditorProps = {
  createTag: (tag: CreateTagRequest) => void
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  club_id: string
}

function TagsEditorDialog({createTag, club_id, tags}: TagsEditorProps) {
  const [isOpen, setOpen] = React.useState(false)
  const open = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Button variant="contained" color="secondary" onClick={open}>
        Edit Tags
      </Button>
      <Dialog 
        open={isOpen}
        onClose={close}>
        <DialogTitle>Tags</DialogTitle>
        <DialogContent>
          <Box
            className="w-96 space-y-2 space-x-1">
            {tags.map(tag => (
              <TagChip name={tag.name} color={tag.color} club_id={club_id} key={tag.name}/>
            ))}
            <CreateTagDialog createTag={createTag} club_id={club_id} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TagsEditorDialog