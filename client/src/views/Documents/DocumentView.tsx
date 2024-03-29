import {Box, Grid, Button, Typography, Fab, TextField, Collapse} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import to from "await-to-js"
import { UserState } from '../../store/user/userSlice'
import React, { useEffect, useState } from "react"
import AddDocumentModal from "./AddDocumentModal"
import useForceUpdate from '../../hooks/useForceUpdate'
import DocumentCard from "./DocumentCard"
import { deleteDocument as _deleteDocument, createDocument as _createDocument, editDocument as _editDocument, getDocuments } from '../../api/documentApi'
import { getRoles } from "../../api/roleApi";
import { hasPermission } from "../ClubComposite";
import { createClavaAlert } from "../../components/Alert";

type DocumentViewProps = {
  club_id: string
  state: UserState
}

const loadingRole : Role = {_id: "LOADING", name:"", color:"", perms:[], club_id: ""}

export default function DocumentView({ club_id, state }: DocumentViewProps) {

  const [addDocOpen, setAddDocOpen] = useState(false)
  const [documents, setDocuments] = useState<ClubDocument[]>([])
  const [hasDocuments, setHasDocuments] = useState(documents.length != 0)
  const forceUpdate = useForceUpdate()
  // search stuff
  const [searchString, setSearchString] = useState('')
  // let searchStringM = ''
  const [filteredDocuments, setFilteredDocuments] = useState<ClubDocument[]>([])
  const [update, setUpdate] = useState(0)
  const [clubRoles, setClubRoles] = useState<Role[]>([loadingRole])

  const clearSearchField = () => {
    performSearch("")
  }

  const performSearch = (search: string, docs?: ClubDocument[]) => {
    // reset documents
    setSearchString(search)
    console.log("what we should search: ", search)
    
    let useDocs = documents
    if (docs) {
      useDocs = docs
    }
    //setSearchString(search)
    // console.log("search called on: " + search + "]")
    //setSearchString(search)
    //searchString = search
    if (search == '') {
      //console.log("empty search")
      setFilteredDocuments(useDocs)
      return
    }

    const filteredDocs = useDocs.filter((document) => document.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    // setSearchString(search)
    // console.log(filteredDocs)
    setFilteredDocuments(filteredDocs)
    setSearchString(search)
  }

  const verifyUrl = (url: string) => {
    const regex: RegExp = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/

    const verify = regex.exec(url)
    return (verify != null)
  }

  const addDocument = async (document: AddDocumentRequest) => {
    const [err, res] = await to(_createDocument(document))
    if (err) {
      createClavaAlert("warning", err.message)
      console.log(err)
    } else if (res) {
      setDocuments([...documents, res.data.document])
      setUpdate(update + 1)
      setHasDocuments(documents.length != 0)
    }
  }

  const editDocument = async (document: EditDocumentRequest) => {
    const [err, res] = await to(_editDocument(document))
    if (err) {
      createClavaAlert("warning", err.message)
      console.log(err)
    } else if (res) {
      let retrieved : ClubDocument = res.data.document
      console.log(retrieved)
      let idx = -1
      documents.forEach((document, index) => {
        if (document._id == retrieved._id) {
          idx = index
        }
      })
      if (idx != -1) {
        const newDocuments = documents
        newDocuments[idx] = {_id: retrieved._id, name: retrieved.name, link: retrieved.link, club_id: retrieved.club_id, role_ids: retrieved.role_ids}
        setDocuments(newDocuments)
      }
    }
  }

  const deleteDocument = async (_id: string) => {
    let deleteDocReq: DeleteDocumentRequest = {
      _id: _id
    }
    const [err, res] = await to(_deleteDocument(deleteDocReq))
    if (err) {
      createClavaAlert("warning", err.message)
      console.log(err)
    } else if (res) {
      let retrieved = res.data.document
      console.log(retrieved.name)
      const newDocs = documents.filter((document) => document.name !== retrieved.name)
      setDocuments(newDocs)
      setFilteredDocuments(newDocs)
      setHasDocuments(documents.length != 0)
      setUpdate(update + 1)
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
    return !documentNames.includes(name)
  }

  const REFRESH_RATE = 1000 * 5;

  useEffect(() => {
    const fetchAll = async () => {
      const [err, res] = await to(getDocuments(club_id))
      if (err) {
        console.log(err)
        createClavaAlert("warning", err.message)
        return
      }

      const retrieved = res.data.documents
      if (retrieved) {
        setDocuments(retrieved)
        console.log("search stringM: " + searchString + "\\")
        // if (searchString != '') {
          performSearch(searchString, retrieved)
        // } else {
        //   //setFilteredDocuments(retrieved)
        // }
      }

      const [errClubRoles, resClubRoles] = await to(getRoles(club_id))
      if (errClubRoles) {
        console.log(errClubRoles)
        createClavaAlert("warning", errClubRoles.message)
        return
      }

      if (resClubRoles) {
        setClubRoles(resClubRoles.data.roles)
      }
    }
    
    fetchAll()
    // performSearch('')

    const interval = setInterval(() => {
      fetchAll()
    }, REFRESH_RATE)
    return () => clearInterval(interval)
  }, [update, searchString])

  return (
    <Box className="flex" flexDirection="column">
      <AddDocumentModal
        club_id={club_id}
        open={addDocOpen}
        setOpen={setAddDocOpen}
        addDocument={addDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        verifyUrl={verifyUrl}
        />
      <Grid container spacing={2}>
        <Grid item xs={4}/>
        <Grid item xs={4}>
          <Box className="m-4 flex justify-center items-center" flexDirection="row">
            <Typography className="" variant="h4" position="relative">Documents</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box className="m-4 flex justify-end items-end" flexDirection="row">
            <TextField className="m-4" size="small" label="Search Documents" margin="none"
              // value={searchString} 
              onChange={(e: { target: { value: string; }; }) => performSearch(e.target.value)}
              />
            <Button onClick={clearSearchField}>Clear</Button>
          </Box>
        </Grid>
      </Grid>
      <Box className="m-4">
        <Grid container spacing={2}>
          {filteredDocuments.length > 0 && clubRoles[0]._id !== "LOADING" ? filteredDocuments.map(document => (
            <DocumentCard 
              docName={document.name} 
              docLink={document.link}
              _id={document._id}
              editDocument={editDocument}
              deleteDocument={deleteDocument}
              isUniqueDocumentName={isUniqueDocumentName}
              verifyUrl={verifyUrl}
              club_id={club_id}
              key={document._id}
              clubRoles={clubRoles}
            />
          )): 
          <Box margin={2}>
            <Typography variant="h6">There are no documents to be displayed.</Typography>
          </Box>}
        </Grid>
      </Box>
      {hasPermission("EDIT_DOCUMENTS") &&
      <Fab onClick={() => setAddDocOpen(true)} color="secondary" sx={{
        position: 'fixed',
        bottom: 64,
        right: 64,}}>
        <AddIcon/>
      </Fab>
      }
    </Box>
  )
}