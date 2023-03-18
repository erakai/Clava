import { Box, Menu, Grid, Button, Card, CardActions, CardContent, Typography, MenuItem, CardActionArea, IconButton, CardMedia } from "@mui/material"
import { useEffect, useState } from "react"
import { MoreVert as MoreVertIcon, Article as ArticleIcon } from '@mui/icons-material/';

type DocumentCardProps = {
  name: string
  link: string
}

const iconSize = {
  largeIcon: {
    width: 60,
    height: 60,
  }
}

export default function DocumentCard({name, link}: DocumentCardProps) {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={1}>
      <Card>
        <CardActionArea href={link} target="_blank">
          <CardContent>
            {/* <CardMedia className="items-center justify-center"
              sx={{ height: 140 }}
              image=""
              title="green iguana">
            </CardMedia> */}
            <Box className="flex items-center">
              <ArticleIcon className="mr-4" color="secondary" />
              <Typography className="grow" variant="h6" component="div">
                {name}
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography> */}
              <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                <MoreVertIcon fontSize="inherit"/>
              </IconButton>
            </Box>
            
          </CardContent>
    
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </CardActionArea>
        <Menu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                >
                <MenuItem>
                  Edit
                </MenuItem>
                <MenuItem>
                  Delete
                </MenuItem>
              </Menu>
      </Card>
    </Grid>
  )
}