import { Button, Checkbox, TableCell, TableRow } from "@mui/material"
import { HeaderCell, RowDisplayProps } from "../../../../components/ClavaTable"

export const headerCells: HeaderCell<Election>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'ended',
    numeric: false,
    disablePadding: false,
    label: 'Results'
  }
]

interface ElectionRowProps extends RowDisplayProps<Election> {
}

export default function ElectionRow({
  rowSelected, onClick, row
}: ElectionRowProps) {
  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        {row.name}
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={(e) => {
          e.stopPropagation()
        }}>
          View Results
        </Button>
      </TableCell>
    </TableRow>
  )

}