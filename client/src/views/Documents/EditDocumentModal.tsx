import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, Typography, Box } from "@mui/material"
import React, { Dispatch, useState } from "react"


type EditDocumentProps = {
  documentId: string // null if adding, should be an id if editing
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  oldName: string
  oldLink: string
  setName: Dispatch<React.SetStateAction<string>>
  setLink: Dispatch<React.SetStateAction<string>>
  editDocument: (document: EditDocumentRequest) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
  verifyUrl: (url: string) => boolean
}

export default function EditDocumentModal({ documentId, open, setOpen, oldName, oldLink, setName, setLink, editDocument, isUniqueDocumentName, verifyUrl}: EditDocumentProps) {
  const [name, setNewName] = useState(oldName)
  const [nameError, setNewNameError] = useState("")
  const [link, setNewLink] = useState(oldLink)
  const [linkError, setNewLinkError] = useState("")

  const handleEdit = () => {
    let badInput = false
    if (!name) {
      setNewNameError("Document name is required")
      badInput = true
    } else if (!isUniqueDocumentName(name, documentId)) {
      setNewNameError("Document name needs to be unique")
      badInput = true
    }
    if (!link) {
      setNewLinkError("Document link is required")
      badInput = true
    } else if (!verifyUrl(link)) {
      setNewLinkError("Invalid url")
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
    setName(name)
    setLink(link)
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
            setNewName(e.target.value.trim())
            setNewNameError("")
          }}/>
          <TextField label="Link" variant="standard" size="small" 
            defaultValue={link}
            error={linkError != ""} 
            helperText={linkError}
            onChange={(e) => {
            setNewLink(e.target.value.trim())
            setNewLinkError("")
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