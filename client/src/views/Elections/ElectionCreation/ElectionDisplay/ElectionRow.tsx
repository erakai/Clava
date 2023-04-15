import { Button, Checkbox, TableCell, TableRow } from "@mui/material";
import { HeaderCell, RowDisplayProps } from "../../../../components/ClavaTable";

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

export default function ElectionRow({
  rowSelected, onClick, row
}: RowDisplayProps<Election>) {
  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell align="right">
        {(row.start) ? row.start?.toLocaleDateString() : "N/A"}
      </TableCell>
      <TableCell>
        <Button variant="contained">
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button variant="contained">
          Start
        </Button>
      </TableCell>
    </TableRow>
  )
}