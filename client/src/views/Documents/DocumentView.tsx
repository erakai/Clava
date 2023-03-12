import {Box, Grid, Typography} from "@mui/material"
import { useEffect, useState } from "react"
import DocumentCard from "./DocumentCard"

export default function DocumentView() {
  return (
    <Box className="">
      <Box className="m-4 flex justify-center items-center">
        <Typography variant="h4">Documents</Typography>
      </Box>
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