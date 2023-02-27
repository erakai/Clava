import { alpha } from '@mui/material/styles'
import { Delete, FilterList } from '@mui/icons-material'
import { Box, Collapse, Grid, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { Dispatch, useState } from 'react'

type ToolbarProps = {
  tableName: string,
  numSelected: number,
  searchString: string,
  setSearchString: Dispatch<React.SetStateAction<string>>
  onDelete: () => void
}

export default function TableToolbar ({
  tableName, numSelected, searchString, setSearchString, onDelete}: ToolbarProps)
{
  const [filtering, setFiltering] = useState(false)

  return (
    <Toolbar sx={{
        pl: { sm: 2},
        pr: { sx: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => 
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        })
    }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit"
          variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} 
          variant="h5" component="div">
          {tableName}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Grid container spacing={2} direction="row" alignItems={"right"} justifyContent={"right"}>
          <Grid item xs={10}>
            <Collapse in={filtering} orientation="vertical" className='w-full'>
                <TextField size="small" label="Search" fullWidth
                  value={searchString} onChange={(e) => setSearchString(e.target.value)}></TextField>
            </Collapse> 
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Filter">
              <IconButton onClick={() => setFiltering(!filtering)}>
                <FilterList />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      )}

    </Toolbar>
  )
}