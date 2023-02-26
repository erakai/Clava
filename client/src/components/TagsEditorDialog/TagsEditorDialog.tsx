import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import TagChip from './TagChip';

const pages = ['Members', 'Events', 'Documents', 'Finances'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type TagsEditorPopup = {
  tag: string
}

function TagsEditorPopup() {
  const [isOpen, setOpen] = React.useState(false)
  const open = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
  }

  const handleNewTagClick = () => {
    // open dialog to create a new tag
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
            direction="row" spacing={1}
            className="w-96">
            <TagChip />
            <TagChip />
            <Chip label="Add new" variant="outlined" icon={ <AddIcon /> } onClick={handleNewTagClick}/>
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