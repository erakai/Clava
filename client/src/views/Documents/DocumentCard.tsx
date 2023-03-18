import { Box, Menu, Grid, Button, Card, CardActions, CardContent, Typography, MenuItem, CardActionArea, IconButton, CardMedia, Link } from "@mui/material"
import { useEffect, useState } from "react"
import { MoreVert as MoreVertIcon, Article as ArticleIcon } from '@mui/icons-material/';
import EditDocumentModal from "./EditDocumentModal";

type DocumentCardProps = {
  name: string
  link: string
  _id: string
  editDocument: (document: EditDocumentRequest) => void
  isUniqueDocumentName: (name: string, _id?: string) => boolean
}

const iconSize = {
  largeIcon: {
    width: 60,
    height: 60,
  }
}

export default function DocumentCard({ name, link, _id, editDocument, isUniqueDocumentName }: DocumentCardProps) {

  const [menuOpen, setMenuOpen] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(!menuOpen)
  };

  const [editOpen, setEditOpen] = useState(false)

  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={1}>
      <Card 
        sx={{
          ':hover': {
            boxShadow: 3,
          },
        }}>
        <Box className="flex items-center justify-center">
          <Link href={link} target="_blank" className="grow" underline="none">
            <Box className="m-4 flex items-center justify-center">
              <ArticleIcon className="mr-4" color="secondary" />
              <Typography className="grow" color="black" variant="h6" component="div">
                {name}
              </Typography>
            </Box>
          </Link>
          <Box className="m-2">
            <IconButton className="m-17" onClick={handleMenuClick}>
              <MoreVertIcon fontSize="inherit"/>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setMenuOpen(false)}
              >
              <MenuItem onClick={() => setEditOpen(true)}>
                Edit
              </MenuItem>
              <MenuItem>
                Delete
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Card>
      <EditDocumentModal 
        documentId={_id}
        open={editOpen}
        setOpen={setEditOpen}
        oldName={name}
        oldLink={link}
        editDocument={editDocument}
        isUniqueDocumentName={isUniqueDocumentName}
        />
    </Grid>
  )
}