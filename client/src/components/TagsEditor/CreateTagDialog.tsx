import React from "react";
import { Box, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"

function CreateTagDialog() {

  const [isOpenNewTag, setOpenNewTag] = React.useState(false)
  const [tagName, setTagName] = React.useState('')
  const handleNewTagOpen = () => {
    setOpenNewTag(true)
  }

  const handleNewTagClose = () => {
    setOpenNewTag(false)
  }

  //const dispatch = useDispatch<typeof store.dispatch>()
  // const onCreateNewTag = async (req: UserRequest) => {
  //   // create new tag 
  //   // const [err] = await to(dispatch())
  //   setOpenNewTag(false)
  // }

  // const onCreateNewTag = async (req: UserRequest ) => {
  //   const [err] = await to(dispatch(login(req)).unwrap())
  
  //   if (err) {
  //     setErrorMessage('Invalid login.')
  //     return
  //   }
  // }

  return (
    <Box>
      <Chip className="w-min" label="Add new" variant="outlined" icon={ <AddIcon /> } onClick={handleNewTagOpen}/>
      <Dialog
        open={isOpenNewTag}
        onClose={handleNewTagClose}>
      <DialogTitle>
        Create New Tag
      </DialogTitle>
      <DialogContent>
        <TextField label="Tag Name" variant="standard" size="small" 
        onChange={(e) => {
          setTagName(e.target.value.trim())
        }}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleNewTagClose}>Cancel</Button>
        {/* <Button onClick={}>Create</Button> */}
      </DialogActions>
      </Dialog>
    </Box>
  )
}

export default CreateTagDialog