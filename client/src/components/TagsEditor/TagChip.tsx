import { Chip } from "@mui/material/"
import React from "react"

function TagChip() {
  
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
      label="one tag"
      onClick={open}/>  
  )
}

export default TagChip