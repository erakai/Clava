import { Dialog, DialogTitle, DialogContent, DialogActions, Stack, TextField, Button, Typography, Box, Divider, Container, IconButton } from "@mui/material"
import React, { Dispatch, useState, useEffect } from "react"
import DocumentRoleChip from "./DocumentRoleChip"
import AddIcon from '@mui/icons-material/Add';

import { getRoles } from '../../api/roleApi'
import to from "await-to-js"
import { addDocumentRole, deleteDocument, deleteDocumentRole, getDocumentRoles, getDocuments } from "../../api/documentApi";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '4px solid #ffb500',
  boxShadow: 24,
  p: 4,
  color: "primary"
}

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
  club_id : string
  clubRoles : Role[]
}

export default function EditDocumentModal({ documentId, open, setOpen, oldName, oldLink, setName, setLink, editDocument, isUniqueDocumentName, verifyUrl, club_id, clubRoles}: EditDocumentProps) {
  const [name, setNewName] = useState(oldName)
  const [nameError, setNewNameError] = useState("")
  const [link, setNewLink] = useState(oldLink)
  const [linkError, setNewLinkError] = useState("")
  const [docRoles, setDocRoles] = useState<Role[]>([])
  const [avaliableRoles, setAvaliableRoles] = useState<Role[]>([])

  useEffect(() => {
    const fetchRoles = async () => {
      const [errDocRoles, resDocRoles] = await to(getDocumentRoles(documentId))
      if (errDocRoles) {
        console.log(errDocRoles)
        return
      }
      const retrievedDocRoles = resDocRoles.data.roles
      if (retrievedDocRoles) {
        setDocRoles(retrievedDocRoles)
      }
      
      if (clubRoles && retrievedDocRoles) {
        const _aRoles : Role[] = clubRoles.filter((el) => {
          return retrievedDocRoles.every((f) => {
            return f._id !== el._id;
          });
        });
        setAvaliableRoles(_aRoles)
      }
      
    }

    fetchRoles()
  }, [clubRoles])

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

  const handleDelete = (role_id : string) => {
    const deleteRole = async () => {
      const _id = documentId
      const [errDeleteRole, resDeleteRole] = await to(deleteDocumentRole({_id, role_id}))
      if (errDeleteRole) {
        console.log(errDeleteRole)
        return
      }
    }
    deleteRole()
  }

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='sm'
      >
      <DialogTitle>
        Edit Document
      </DialogTitle>
      <DialogContent>
        <Container>
        <Stack
          spacing={2}
          mb={5}
        >
          <TextField label="Name" variant="standard" size="small" 
            defaultValue={name}
            error={nameError != ""} 
            helperText={nameError}
            onChange={(e: { target: { value: string } }) => {
            setNewName(e.target.value.trim())
            setNewNameError("")
          }}/>
          <TextField label="Link" variant="standard" size="small" 
            defaultValue={link}
            error={linkError != ""} 
            helperText={linkError}
            onChange={(e: { target: { value: string } }) => {
            setNewLink(e.target.value.trim())
            setNewLinkError("")
          }}/>
        </Stack>
        <Stack>
          <Stack direction="row">
            <Typography variant="h6">Permissions:</Typography>
            <AddRoleToDocumentModal document_id={documentId} club_id={club_id} avaliableRoles={avaliableRoles} />
          </Stack>
          <Stack flexWrap="wrap" direction="row">
            {docRoles.length > 0 ?
              <div>
              {docRoles.map(role=> (
                <DocumentRoleChip 
                  key={role._id+documentId+"perm"}
                  role={role}
                  deleteDocRole={handleDelete}
                />
              ))}
              </div>
              :
              <div>
                None
              </div>
            }
          </Stack>
      </Stack>
      </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleEdit} variant="contained">Done</Button>
      </DialogActions>
      </Dialog>
  )
}

type AddRoleToDocumentModalProps = {
  club_id : string
  document_id : string
  avaliableRoles : Role[]
}

function AddRoleToDocumentModal({club_id, document_id, avaliableRoles} : AddRoleToDocumentModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (role_id : string) => {
    const addRole = async () => {
      const _id = document_id
      const [errAddDocRole, addDocRole] = await to(addDocumentRole({_id, role_id}))
      if (errAddDocRole) {
        console.log(errAddDocRole)
        return
      }
    }
    addRole();
    handleClose();
  }

  return (
    <React.Fragment>
      <IconButton 
        color="primary" 
        onClick={handleOpen}
        sx={{backgroundColor: "primary"}}
      >
          <AddIcon/>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <DialogContent>
          <Typography variant="h5" mb={2}>Add Role:</Typography>
          <Stack flexWrap="wrap" direction="row">
            {avaliableRoles.length > 0 ?
              <div>
              {avaliableRoles.map(role=> (
                <DocumentRoleChip
                  key={role._id+document_id+"add"} 
                  role={role}
                  clickDocRole={handleAdd}
                />
              ))}
              </div>
              :
              <div>
                None
              </div>
            }
          </Stack>
        </DialogContent>
        <DialogActions>  
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
