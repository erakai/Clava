import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, Typography, Box } from "@mui/material"
import React, { Dispatch, useState } from "react"


type EditDocumentProps = {
  documentId: string // null if adding, should be an id if editing
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  oldName: string
  oldLink: string
  editDocument: (document: EditDocumentRequest) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
}

export default function EditDocumentModal({ documentId, open, setOpen, oldName, oldLink, editDocument, isUniqueDocumentName}: EditDocumentProps) {
  const [name, setName] = useState(oldName)
  const [nameError, setNameError] = useState("")
  const [link, setLink] = useState(oldLink)
  const [linkError, setLinkError] = useState("")

  const handleEdit = () => {
    let badInput = false
    if (!name) {
      setNameError("Document name is required")
      badInput = true
    }
    if (!link) {
      setLinkError("Document link is required")
      badInput = true
    }
    if (!badInput && isUniqueDocumentName(name, documentId)) {
      setNameError("Document name needs to be unique")
      badInput = true
    }
    if (badInput) {
      return
    }
    // if here, input is valid, so proceed with edit
    let editDocReq: EditDocumentRequest = {
      newName: name, 
      newLink: link, 
      _id: documentId
    }
    editDocument(editDocReq)
    setOpen(false)
  }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}>
      <DialogTitle>
        Add Document
      </DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}>
          <TextField label="Name" variant="standard" size="small" 
            defaultValue={name}
            error={nameError != ""} 
            helperText={nameError}
            onChange={(e) => {
            setName(e.target.value.trim())
            setNameError("")
          }}/>
          <TextField label="Link" variant="standard" size="small" 
            defaultValue={link}
            error={linkError != ""} 
            helperText={linkError}
            onChange={(e) => {
            setLink(e.target.value.trim())
            setLinkError("")
          }}/>
        </Stack>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleEdit} variant="contained">Done</Button>
      </DialogActions>
      </Dialog>
  )
}