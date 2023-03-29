import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, Typography, Box } from "@mui/material"
import React, { Dispatch, useState } from "react"
import useUrlVerify from "../../hooks/useEmailVerify"


type AddDocumentProps = {
  // addMode: boolean // true if adding, false if editing
  // _id?: string // null if adding, should be an id if editing
  club_id: string
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  // setDocuments: React.Dispatch<React.SetStateAction<Document[]>>
  addDocument: (document: AddDocumentRequest) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
  verifyUrl: (url: string) => boolean
}

export default function AddDocumentModal({ club_id, open, setOpen, addDocument, isUniqueDocumentName, verifyUrl}: AddDocumentProps) {
  const [name, setName] = useState("")
  const [nameError, setNameError] = useState("")
  const [link, setLink] = useState("")
  const [linkError, setLinkError] = useState("")

  const handleAdd = () => {
    let badInput = false
    if (!name) {
      setNameError("Document name is required")
      badInput = true
    } else if (!isUniqueDocumentName(name)) {
      setNameError("Document name needs to be unique")
      badInput = true
    }

    if (!link) {
      setLinkError("Document link is required")
      badInput = true
    } else if (!verifyUrl(link)) {
      setLinkError("Invalid url")
      badInput = true
    }
    if (badInput) {
      return
    }
    // if here, input is valid, so proceed with add
    let addDocReq: AddDocumentRequest = {
      name, link, club_id
    }
    addDocument(addDocReq)
    handleClose()
  }

  const handleClose = () => {
    // clear all input fields
    setName("")
    setLink("")
    setNameError("")
    setLinkError("")
    setOpen(false)
  }

  return (
    <Dialog
        open={open}
        onClose={handleClose}>
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">Done</Button>
      </DialogActions>
      </Dialog>
  )
}