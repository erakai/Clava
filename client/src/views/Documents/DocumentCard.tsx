import { Box, Menu, Grid, Button, Card, CardActions, CardContent, Typography, MenuItem, CardActionArea } from "@mui/material"
import { useEffect, useState } from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';

type DocumentCardProps = {
  name: string
  link: string
}

export default function DocumentCard({name, link}: DocumentCardProps) {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={1}>
      <Card>
        <CardActionArea href={link} target="_blank">
          <CardContent>
            <Box className="flex items-center">
              <Typography className="grow" variant="h6" component="div">
                Document
              </Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography> */}
              <Button onClick={() => setMenuOpen(!menuOpen)}>
                <MoreVertIcon/>
              </Button>
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
              
            </Box>
            
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </CardActionArea>
      </Card>
    </Grid>
  )
}