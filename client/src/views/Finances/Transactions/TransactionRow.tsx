import { Checkbox, TableCell, TableRow } from "@mui/material";
import { RowDisplayProps } from "../../../components/ClavaTable";

export default function TransactionRow({
  rowSelected, onClick, row
}: RowDisplayProps<Transaction>) {
  return (
    <TableRow hover onClick={onClick} selected={rowSelected} tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox color="primary" checked={rowSelected}/>
      </TableCell>
      <TableCell component="th" scope="row" padding="none">{row.source}</TableCell>
      <TableCell align="right">
        {new Date(row.date).toLocaleDateString()}
      </TableCell>
      <TableCell align="right" sx={{ 'color': (row.amount >= 0) ? 'green' : 'red' }}>
        {(row.amount > 0) ? "$" + (Math.round(row.amount * 100) / 100).toFixed(2) 
          : "$" + (Math.round(parseFloat(row.amount.toString().substring(1)) * 100) / 100).toFixed(2)}
      </TableCell>
    </TableRow>
  )
}