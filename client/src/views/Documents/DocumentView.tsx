import {Box, Grid, Button, Typography, Fab} from "@mui/material"
import React from "react"
import { useEffect, useState } from "react"
import AddEditDocumentModal from "./AddEditDocumentModal"
import DocumentCard from "./DocumentCard"
import AddIcon from '@mui/icons-material/Add';

export default function DocumentView() {

  const [createDocOpen, setCreateDocOpen] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])

  const [editDocOpen, setEditDocOpen] = useState(false)

  const createDocument = async (document: CreateDocumentRequest) => {
    // setDisableAddingMember(true)

    // const [err, res] = await to(_createMember(member))
    // if (err) {
    //   console.log(err)
    //   setErrorMessage('Something went wrong.')
    // } else if (res) {
    //   setMembers([...members, res.data.member])
    // }

    // setDisableAddingMember(false)
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

  return (
    <Box className="">
      
      <AddEditDocumentModal
        addMode={true}
        open={createDocOpen}
        setOpen={setCreateDocOpen}
        setDocuments={setDocuments}
        createDocument={createDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        />

      <AddEditDocumentModal
        addMode={false}
        open={editDocOpen}
        setOpen={setEditDocOpen}
        setDocuments={setDocuments}
        createDocument={createDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        /> 

      <Box className="m-4 flex justify-center items-center">
        <Typography className="grow text-center" variant="h4">Documents</Typography>
      </Box>
      <Fab onClick={() => setCreateDocOpen(true)} color="secondary" sx={{
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