import { Checkbox, TableCell, TableRow } from "@mui/material";
import { RowDisplayProps } from "components/ClavaTable";

export default function MemberRow(
  { rowSelected, onClick, row, key}: RowDisplayProps<Member>) {
    return (
      <TableRow key={key} hover onClick={onClick} selected={rowSelected}
        tabIndex={-1}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" checked={rowSelected}/>
          </TableCell>
          <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
          <TableCell align="right">{new Date(row.expiration).toLocaleDateString()}</TableCell>
      </TableRow>
    )
}