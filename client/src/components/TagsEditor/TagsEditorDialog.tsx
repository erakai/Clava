import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material'
import * as React from 'react';
import CreateTagDialog from './CreateTagDialog';
import TagChip from './TagChip';

const pages = ['Members', 'Events', 'Documents', 'Finances'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type TagsEditorProps = {
  createTag: (tag: TagRequest) => void
  club_id: string
}

function TagsEditorPopup({createTag, club_id}: TagsEditorProps) {
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
        <DialogTitle>
          Edit Tags
        </DialogTitle>
        <DialogContent>
          <Stack
            className="flex w-96"
            spacing={1}>
            <TagChip />
            <TagChip />
            <CreateTagDialog createTag={createTag} club_id={club_id} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={close}>Done</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default TagsEditorPopup