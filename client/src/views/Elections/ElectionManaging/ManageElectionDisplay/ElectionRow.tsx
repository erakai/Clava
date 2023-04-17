import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { HeaderCell, RowDisplayProps } from "../../../../components/ClavaTable";
import moment from "moment";

export const headerCells: HeaderCell<Election>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'end',
    numeric: false,
    disablePadding: false,
    label: 'End'
  },
  {
    id: 'candidates',
    numeric: false,
    disablePadding: false,
    label: 'Candidates'
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'Generate Link'
  },
  {
    id: 'ended',
    numeric: false,
    disablePadding: false,
    label: ''
  }
]

interface ElectionRowProps extends RowDisplayProps<Election> {
  generate: (e: Election) => void
}

export default function ElectionRow({
  rowSelected, onClick, row, generate
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
        {(row.end) ? new Date(row.end).toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell align="left">
        {(row.candidates) ? row.candidates.length : 0} 
      </TableCell>
      <TableCell>
        {
          (row.end && moment(row.end).isBefore(moment())) ?
            "Ended"
          :
            <Button variant="contained" onClick={(e) => {
              generate(row)
              e.stopPropagation()
            }}>
              Share
            </Button>
        }
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={(e) => {
          e.stopPropagation()
        }}>
          End
        </Button>
      </TableCell>
    </TableRow>
  )

}