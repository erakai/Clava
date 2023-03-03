import { Box, Chip } from "@mui/material"

type TagRowProps = {
  tags: Tag[]
  allTags: Tag[]
  onDelete: (tag: Tag) => void
  onAdd: (tag: Tag) => void
  dense: boolean
}

function TagRowDisplay({tags, onDelete, onAdd, dense, allTags}: TagRowProps) {
  return (
    <Box>
      {tags.map(tag => 
        (!dense ?
        <Chip label={tag.name} onDelete={() => onDelete(tag)} key={tag._id} size={"small"}
          style={ (tag.color) ? { backgroundColor: tag.color } : {}}/> : (tag.name + ', ')))}
    </Box>
  )
}

export default TagRowDisplay