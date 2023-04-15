import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { HeaderCell, RowDisplayProps } from "../../../../components/ClavaTable";
import { ElectionSelect } from "../useElectionLogic";

export const headerCells: HeaderCell<Election>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'start',
    numeric: false,
    disablePadding: false,
    label: 'Start'
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'End'
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: ''
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: ''
  }
]

interface ElectionRowProps extends RowDisplayProps<Election> {
  selectAndClear: (e: ElectionSelect | null) => void
}

export default function ElectionRow({
  rowSelected, onClick, row, selectAndClear
}: ElectionRowProps) {

  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="left">
        {(row.start) ? new Date(row.start).toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell align="left">
        {(row.end) ? new Date(row.end).toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell align="right">
        <Button variant="contained" onClick={(e) => {
          selectAndClear(row)
          e.stopPropagation()
        }}>
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={(e) => {
          e.stopPropagation()
        }}>
          Start
        </Button>
      </TableCell>
    </TableRow>
  )
}