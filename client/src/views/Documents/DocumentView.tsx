import {Box, Grid, Button, Typography, Fab} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"
import { UserState } from '../../store/user/userSlice'
import React, { useEffect, useState } from "react"
import AddDocumentModal from "./AddDocumentModal"
import DocumentCard from "./DocumentCard"
import { createDocument as _createDocument, editDocument as _editDocument, getDocuments } from '../../api/documentApi'
import useForceUpdate from "../../hooks/useForceUpdate";

type DocumentViewProps = {
  club_id: string
  state: UserState
}

export default function DocumentView({ club_id, state }: DocumentViewProps) {

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
    }
  }

  const editDocument = async (document: EditDocumentRequest) => {
    const [err, res] = await to(_editDocument(document))
    if (err) {
      console.log(err)
    } else if (res) {
      // let editDoc = res.data.document
      // let idx = -1
      // documents.forEach((document, index) => {
      //   if (document._id == editDoc._id) {
      //     idx = index
      //   }
      // })

      // if (idx != -1) {
      //   let newDocuments : Document[] = documents
      //   newDocuments[idx] = {_id: editDoc._id, name: editDoc.name, link: editDoc.link}
      //   setDocuments(newDocuments)
      // }
    }
    close()
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
 
    fetchDocuments()
  }, [state])

  return (
    <Box className="">
      
      <AddDocumentModal
        club_id={club_id}
        open={addDocOpen}
        setOpen={setAddDocOpen}
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
          {documents.map(document => (
            <DocumentCard 
              name={document.name} 
              link={document.link}
              _id={document._id}
              editDocument={editDocument}
              isUniqueDocumentName={isUniqueDocumentName}/>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}