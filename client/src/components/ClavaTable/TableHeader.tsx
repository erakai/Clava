import { TableCell, TableHead, TableRow, Checkbox, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import React, { ChangeEvent, MouseEvent } from "react"

interface HeaderCell<T> {
  id: keyof T,
  disablePadding: boolean,
  numeric: boolean,
  label: string,
}

interface TableHeaderProps<T> {
  numSelected: number,
  onRequestSort: (event: MouseEvent, property: keyof T) => void,
  onSelectAll: (event: ChangeEvent<HTMLInputElement>) => void,
  order: number,
  orderBy: keyof T,
  rowCount: number,
  headers: HeaderCell<T>[]
}

export default function TableHeader<T>({ numSelected, 
  onRequestSort, onSelectAll, order, orderBy, rowCount, headers }: TableHeaderProps<T>) {

  const createSortHandler = (property: keyof T) => (event: MouseEvent) => {
      onRequestSort(event, property);
    };
  
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox color="primary" indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected == rowCount} onChange={onSelectAll}/>
        </TableCell>
        {headers.map((header) => (
          <TableCell key={header.id as React.Key} align={header.numeric ? 'right' : 'left'}
            padding={header.disablePadding ? 'none' : 'normal'} >
              <TableSortLabel active={orderBy==header.id} 
                direction={orderBy == header.id ? (order == 1 ? 'asc' : 'desc') : 'desc'} 
                onClick={createSortHandler(header.id)} sx={{ fontWeight: 'bold'}} >
                  {header.label}
              </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export type { HeaderCell };