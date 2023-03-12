import { Autocomplete, Collapse, Grid, IconButton, Stack, TextField, Tooltip } from "@mui/material";
import { Dispatch, useState } from "react";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddIcon from '@mui/icons-material/Add';
import { addTagsToMember } from "../../../api/memberApi";
import to from "await-to-js";

type MemberToolbarExtensionProps = {
  selected: Member[]
  setSelected: Dispatch<React.SetStateAction<Member[]>>
  allTags: Tag[]
  members: Member[]
  setMembers: Dispatch<React.SetStateAction<Member[]>>
  forceUpdate: () => void
}

function MemberToolbarExtension({
  selected, setSelected, allTags, members, setMembers, forceUpdate
}: MemberToolbarExtensionProps) {
  const [adding, setAdding]  = useState(false)
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null)

  const addTags = async () => {
    if (!selectedTag) return

    let member_ids = selected.map(s => s._id)
    const [err] = await to(addTagsToMember({tag_id: selectedTag._id, member_ids}))
    if (err) {
      console.log(err)
      setAdding(false)
      return
    }

    let newMembers = members
    newMembers.forEach(m => {
      if (selected.indexOf(m) != -1) {
        if (m.tag_ids.indexOf(selectedTag._id) == -1) {
          m.tag_ids.push(selectedTag._id) 
        } 
      }
    })
    setMembers(newMembers)

    setSelected([])
    setAdding(false)
    forceUpdate()
  }

  return (
    <Grid container spacing={3} direction="row" alignItems={"right"} justifyContent={"right"}>
      <Grid item xs={8} md={8}>
        <Collapse in={adding} orientation="vertical" className='w-full'>
          <Stack direction="row">
            <Tooltip title="Add Tag">
              <IconButton onClick={() => {addTags()}}>
                <AddIcon/>
              </IconButton>
            </Tooltip>
            <Autocomplete disablePortal options={allTags} size="small" fullWidth autoSelect autoHighlight
              renderInput={(params) => <TextField {...params} label="Add Tag" />}
              getOptionLabel={(tag) => tag.name} onChange={(e, v) => setSelectedTag(v)}/>
         </Stack>
        </Collapse>
      </Grid>
      <Grid item xs={4} lg={2}>
        <Tooltip title="Add Tag">
          <IconButton onClick={() => setAdding(!adding)}>
            <LocalOfferIcon/>
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  )
}

export default MemberToolbarExtension