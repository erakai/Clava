import { alpha } from '@mui/material/styles'
import { Delete, FilterList } from '@mui/icons-material'
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material"

type ToolbarProps = {
  tableName: string,
  numSelected: number,
  onFilter: () => void,
  onDelete: () => void
}

export default function TableToolbar ({tableName, numSelected, onFilter, onDelete}: ToolbarProps) {
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
        <Tooltip title="Filter">
          <IconButton onClick={onFilter}>
            <FilterList />
          </IconButton>
        </Tooltip>
      )}

    </Toolbar>
  )
}