import { Checkbox, TableCell, TableRow } from "@mui/material";
import { RowDisplayProps } from "../../../components/ClavaTable";

export default function EventRow({
                                         rowSelected, onClick, row
                                       }: RowDisplayProps<Event>) {
  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
      <TableCell component="th" scope="row" padding="none">{row.description}</TableCell>
      <TableCell align="right">
        {new Date(row.date).toLocaleDateString()}
      </TableCell>
    </TableRow>
  )
}