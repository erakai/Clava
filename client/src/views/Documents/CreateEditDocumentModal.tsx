import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, Typography, Box } from "@mui/material"
import React, { Dispatch } from "react"
import { useEffect, useState } from "react"

type CreateDocumentProps = {
  createMode: boolean // true if creating, false if editing
  _id?: string // null if creating, should be an id if editing
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
  createDocument: (document: CreateDocumentRequest) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
}

export default function CreateEditDocumentModal({createMode, _id, open, setOpen, setDocuments, createDocument, isUniqueDocumentName}: CreateDocumentProps) {

  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [link, setLink] = useState("")
  const [linkError, setLinkError] = useState("")

  const handleAdd = () => {
    let badInput = false
    if (!name) {
      setNameError("Document name is required")
      badInput = true
    }
    if (!link) {
      setLinkError("Document link is required")
      badInput = true
    }
    if (!badInput && isUniqueDocumentName(name, _id)) {
      setNameError("Document name needs to be unique")
      badInput = true
    }
    if (badInput) {
      return
    }
    // if here, input is valid, so proceed with add
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
            error={nameError != ""} 
            helperText={nameError}
            onChange={(e) => {
            setName(e.target.value.trim())
            setNameError("")
          }}/>
          <TextField label="Link" variant="standard" size="small" 
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
        <Button onClick={handleAdd} variant="contained">Create</Button>
      </DialogActions>
      </Dialog>
  )
}