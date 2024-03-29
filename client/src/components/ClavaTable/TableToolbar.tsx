import { alpha } from '@mui/material/styles'
import { Delete, FilterList } from '@mui/icons-material'
import { Box, Collapse, Grid, IconButton, TextField, Toolbar, Tooltip, Typography } from "@mui/material"
import { Dispatch, ReactElement, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';

import { ConfirmationModal } from '../Modal';

export type AlternateSelectedToolbarProps<T> = {
  selected: T[]
  setSelected: Dispatch<React.SetStateAction<T[]>>
}

type ToolbarProps<T> = {
  tableName: string,
  numSelected: number,
  searchString: string,
  setSearchString: Dispatch<React.SetStateAction<string>>
  onDelete: () => void,
  disableDelete?: boolean,
  disableEdit?: boolean,
  selected: T[],
  setSelected: Dispatch<React.SetStateAction<T[]>>
  onEdit?: (edited: T) => void
  AlternateSelectedToolbar?: (props: AlternateSelectedToolbarProps<T>) => JSX.Element
}

export default function TableToolbar<T>({
  tableName, numSelected, searchString, setSearchString, 
  onDelete, onEdit, selected, AlternateSelectedToolbar,
  setSelected, disableDelete, disableEdit}: ToolbarProps<T>)
{
  const [filtering, setFiltering] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen ] = useState(false);
  const handleDeleteModalOpen = () => setDeleteModalOpen(true);
  const handleDeleteModalClose = () => setDeleteModalOpen(false);

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
      {(numSelected > 0) ? (
        <Grid container spacing={2} direction="row" alignItems={"right"} justifyContent={"right"}>
          {AlternateSelectedToolbar ? 
            <Grid item xs={6} lg={8}>
              <AlternateSelectedToolbar selected={selected} setSelected={setSelected}/>
            </Grid> : <></>
          }
          {onEdit && numSelected == 1 ?
            <Grid item xs={2} lg={1}>
              <Tooltip title="Edit">
                <IconButton disabled={disableEdit} onClick={() => onEdit(selected[0])}>
                  <EditIcon />
                </IconButton>
              </Tooltip> 
            </Grid> :<></> 
          }
          <Grid item xs={2} lg={2}>
            <Tooltip title="Delete">
              <IconButton disabled={disableDelete} onClick={handleDeleteModalOpen}>
                <Delete />
              </IconButton>
            </Tooltip>
            <ConfirmationModal
                open={deleteModalOpen}
                handleClose={handleDeleteModalClose}
                handleConfirmation={onDelete}
                question={"Delete? This cannot be undone."}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2} direction="row" alignItems={"right"} justifyContent={"right"}>
          <Grid item xs={10} md={8} xl={10}>
            <Collapse in={filtering} orientation="vertical" className='w-full'>
                <TextField size="small" label="Search" fullWidth
                  value={searchString} onChange={(e) => setSearchString(e.target.value)}></TextField>
            </Collapse> 
          </Grid>
          <Grid item xs={2} md={4} xl={2}>
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