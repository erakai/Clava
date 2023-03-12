import { Box, Grid, Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function DocumentCard() {
  return (
    <Grid item xs={6} sm={4} md={3} lg={3} xl={1}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Rules
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}