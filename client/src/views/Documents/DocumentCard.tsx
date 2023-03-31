import { Box, Menu, Grid, Button, Card, CardActions, CardContent, Typography, MenuItem, CardActionArea, IconButton, CardMedia, Link, Dialog, DialogContent, DialogContentText, DialogActions, Divider } from "@mui/material"
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import { useEffect, useState } from "react"
import { MoreVert as MoreVertIcon, Article as ArticleIcon } from '@mui/icons-material/';
import EditDocumentModal from "./EditDocumentModal";
import SmartDisplay from "@mui/icons-material/SmartDisplay";

type DocumentCardProps = {
  docName: string
  docLink: string
  _id: string
  editDocument: (document: EditDocumentRequest) => void
  deleteDocument: (_id: string) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
  verifyUrl: (url: string) => boolean
}

const iconSize = {
  largeIcon: {
    width: 60,
    height: 60,
  }
}

export default function DocumentCard({ docName, docLink, _id, editDocument, deleteDocument, isUniqueDocumentName, verifyUrl }: DocumentCardProps) {

  const [name, setName] = useState(docName)
  const [link, setLink] = useState(docLink)

  const [menuOpen, setMenuOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(!menuOpen)
  };

  const [editOpen, setEditOpen] = useState(false)
  const handleMenuEditOptionClick = () => {
    setEditOpen(true)
    setMenuOpen(false)
  }

  const [deleteOpen, setDeleteOpen] = useState(false)
  const handleMenuDeleteOptionClick = () => {
    setDeleteOpen(true)
    setMenuOpen(false)
  }

  const handleDeleteDocumentConfirm = () => {
    deleteDocument(_id)
    setDeleteOpen(false)
  }


  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={3}>
      <Card 
        sx={{
          ':hover': {
            boxShadow: 3,
          },
        }}>
        {/* <Box className="flex shrink items-center"> */}
        <Link href={link} target="_blank" className="grow" underline="none">
          <Box className="m-4 flex items-center justify-start">
            {!link.includes("youtube") && 
              <ArticleIcon className="mr-4" color="secondary" />
            }
            {link.includes("youtube") &&
              <SmartDisplay className="mr-4" color="secondary" />
            }
            <Typography className="shrink" noWrap color="black" variant="h6" component="div">
              {name}
            </Typography>
          </Box>
        </Link>
        {/* </Box> */}
        <Divider className="mx-2"></Divider>
        <Box className="flex mx-2 my-1">
          <Box className="grow"></Box>
          <Button onClick={handleMenuEditOptionClick}>Edit</Button>
          <Button className="justify-end" onClick={handleMenuDeleteOptionClick}>Delete</Button>
            {/* <IconButton className="m-17" onClick={handleMenuClick}>
              <MoreVertIcon fontSize="inherit"/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              >
              <MenuItem onClick={handleMenuEditOptionClick}>
                Edit
              </MenuItem>
              <MenuItem onClick={handleMenuDeleteOptionClick}>
                Delete
              </MenuItem>
      </Menu>*/}
            <Dialog
              open={deleteOpen}
              onClose={() => setDeleteOpen(false)}>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this document?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
                <Button onClick={handleDeleteDocumentConfirm}>Delete</Button>
              </DialogActions>
            </Dialog>
          </Box>
      </Card>
      
      <EditDocumentModal 
        documentId={_id}
        open={editOpen}
        setOpen={setEditOpen}
        oldName={name}
        oldLink={link}
        setName={setName}
        setLink={setLink}
        editDocument={editDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        verifyUrl={verifyUrl}
        />
    </Grid>
  )
}