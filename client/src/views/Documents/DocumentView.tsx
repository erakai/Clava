import {Box, Grid, Button, Typography, Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"
import { UserState } from '../../store/user/userSlice'
import React, { useEffect, useState } from "react"
import AddEditDocumentModal from "./AddEditDocumentModal"
import DocumentCard from "./DocumentCard"
import { createDocument as _createDocument, getDocuments } from '../../api/documentApi'

type DocumentViewProps = {
  club_id: string
  state: UserState
  user_id: string
}

export default function DocumentView({ club_id, state, user_id }: DocumentViewProps) {

  const [addDocOpen, setAddDocOpen] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])

  const [editDocOpen, setEditDocOpen] = useState(false)

  const addDocument = async (document: AddDocumentRequest) => {

    const [err, res] = await to(_createDocument(document))
    if (err) {
      console.log(err)
      //setErrorMessage('Something went wrong.')
    } else if (res) {
      setDocuments([...documents, res.data.document])
      console.log("shouldve added doc")
    }
  }

  // createMode == true, checks all docs
  // createMode == false (AKA editing), checks all docs execpt for the one that is being edited
  const isUniqueDocumentName = (name: string, _id?: string) : boolean => {
    let documentsFil = documents;
    if (_id) {
      // omit document with _id from search
      documentsFil = documents.filter(document => document._id != _id)
    }
    let documentNames = documentsFil.map(document => document.name);
    return documentNames.includes(name)
  }

  useEffect(() => {
    const fetchDocuments = async () => {
      const [err, res] = await to(getDocuments(club_id))
      if (err) {
        console.log(err)
        return
      }

      const retrieved = res.data.documents
      if (retrieved) {
        setDocuments(retrieved)
      }
    }

  }, [state])

  return (
    <Box className="">
      
      <AddEditDocumentModal
        addMode={true}
        club_id={club_id}
        open={addDocOpen}
        setOpen={setAddDocOpen}
        setDocuments={setDocuments}
        addDocument={addDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        />

      <AddEditDocumentModal
        addMode={false}
        club_id={club_id}
        open={editDocOpen}
        setOpen={setEditDocOpen}
        setDocuments={setDocuments}
        addDocument={addDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        /> 

      <Box className="m-4 flex justify-center items-center">
        <Typography className="grow text-center" variant="h4">Documents</Typography>
      </Box>
      <Fab onClick={() => setAddDocOpen(true)} color="secondary" sx={{
        position: 'fixed',
        bottom: 64,
        right: 64,}}>
        <AddIcon/>
      </Fab>
      <Box className="m-4">
        <Grid container spacing={2}>
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          
        </Grid>
      </Box>
    </Box>
  )
}