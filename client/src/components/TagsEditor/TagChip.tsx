import { Chip } from "@mui/material/"
import React from "react"

type TagChipProps = {
  name: string
  color: string
}

function TagChip({ name, color }: TagChipProps) {
  
  const [isEditing, setEditing] = React.useState(false)
  const open = () => {
    setEditing(true)
  }
  const close = () => {
    setEditing(false)
  }
  
  return (
    <Chip 
      className="w-min"
      label={name}
      onClick={open}/>  
  )
}

export default TagChip