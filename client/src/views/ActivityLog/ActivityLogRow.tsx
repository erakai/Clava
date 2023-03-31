import { Checkbox, TableCell, TableRow } from "@mui/material";
import { RowDisplayProps } from "../../components/ClavaTable";

export default function ActivityLogRow({
  rowSelected, onClick, row
}: RowDisplayProps<Log>) {
  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{row.method}</TableCell>
      <TableCell component="th" scope="row" padding="none">{row.route}</TableCell>
      <TableCell component="th" scope="row" padding="none">{row.user_id}</TableCell>
      <TableCell align="right">
        {new Date(row.date).toLocaleDateString()}
      </TableCell>
    </TableRow>
  )
}