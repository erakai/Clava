import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { deleteTag as _deleteTag } from '../../../api/memberApi';
import * as React from 'react';
import CreateTagDialog from './CreateTagDialog';
import TagChip from './TagChip';
import to from 'await-to-js';
import { hasPermission } from '../../ClubComposite';

const pages = ['Members', 'Events', 'Documents', 'Finances'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

type TagsEditorProps = {
  createTag: (tag: CreateTagRequest) => void
  tags: Tag[]
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
  club_id: string
  forceUpdate: () => void
}


function TagsEditorDialog({createTag, club_id, tags, setTags, forceUpdate}: TagsEditorProps) {
  const [isOpen, setOpen] = React.useState(false)
  const open = () => {
    setOpen(true)
  }
  const close = () => {
    setOpen(false)
    forceUpdate()
  }

  const hasTagName = (name: string, _id?: string): boolean => {
    // make sure that the tag we are possibly editing is not included in check
    let tagsFil = tags;
    if (_id) {
      tagsFil = tags.filter(tag => tag._id != _id)
    }
    let tagNames = tagsFil.map(tag => tag.name);
    return tagNames.includes(name)
  }

  const deleteTag = async (delTagReq: DeleteTagRequest) => {
    const [err, res] = await to(_deleteTag(delTagReq))
    if (err) {
      console.log(err)
    } else if (res) {
      let retrieved = res.data.tag
      setTags((remTags) =>
      remTags.filter((tag) => tag.name !== retrieved.name))
    }
  }

  return (
    <Box height="100%">
      <Button className='h-full' variant="contained" color="secondary" onClick={open} disabled={!hasPermission("EDIT_MEMBERS")}>
        Edit Tags
      </Button>
      <Dialog 
        open={isOpen}
        onClose={close}>
        <DialogTitle>Tags</DialogTitle>
        <DialogContent>
          <Box
            className="flex flex-wrap space-x-1 space-y-2 w-96">
            <Box/>
            {tags.map(tag => (
              <TagChip 
                tags={tags}
                setTags={setTags}
                name={tag.name} 
                color={tag.color} 
                _id={tag._id} 
                deleteTag={deleteTag}
                hasTagName={hasTagName}
                key={tag._id}/>
            ))}
            <CreateTagDialog club_id={club_id} createTag={createTag} hasTagName={hasTagName}/>
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