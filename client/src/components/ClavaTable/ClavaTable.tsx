import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from "@mui/material";
import { ChangeEvent, useState, MouseEvent, Dispatch } from "react";
import EditMemberModal from "../../views/Members/EditMemberModal";
import TableHeader, { HeaderCell } from "./TableHeader";
import TableToolbar from "./TableToolbar";

// order=1 => ascending, order=-1 => descending
function getComparator<Key extends keyof any>(order: number, orderBy: Key): 
  ((a: any, b: any) => number) {
  return (a, b) => {
    let temp1 = a[orderBy]
    let temp2 = b[orderBy]
    if (typeof temp1 == 'string') {
      temp1 = temp1.toLowerCase()
      temp2 = temp2.toLowerCase()
    }

    if (temp2 < temp1) {
      return -1 * order;
    }
    if (temp2 > temp1) {
      return order;
    }
    return 0
  }
}

export type RowDisplayProps<T> = {
  rowSelected: boolean,
  onClick: (e: MouseEvent) => void,
  row: T,
  key: number,
}

/*
  - defaultOrder is the key that it will be ordered by by default
  - tableName is the name of the table
  - data is an array of type T to be displayed
  - RowDisplay is a react component that displays a row of data and takes RowDisplayProps
  - onDelete is called when data is deleted
  - dense is optional boolean control for compact rows

To see an example of using ClavaTable, look in views/Members

MUI Tutorial followed at https://codesandbox.io/s/78z9io?file=/demo.tsx
*/
type ClavaTableProps<T> = {
  defaultOrder: keyof T,
  tableName: string,
  data: T[]
  headerCells: HeaderCell<T>[]
  onDelete: (deleted: T[]) => void,
  onEdit?: (edited: T) => void
  searchString: string,
  setSearchString: Dispatch<React.SetStateAction<string>>,
  RowDisplay: (r: RowDisplayProps<T>) => React.ReactNode,
  rowsPerPageOptions?: number[],
  defaultRowsPerPage?: number,
  dense?: boolean,
}


export default function ClavaTable<T>({defaultOrder, tableName, 
  data, onDelete, searchString, setSearchString,
  headerCells, RowDisplay, dense, rowsPerPageOptions,
  defaultRowsPerPage, onEdit}: ClavaTableProps<T>) {
  const [order, setOrder] = useState(-1)
  const [orderBy, setOrderBy] = useState<keyof T>(defaultOrder)
  const [selected, setSelected] = useState<T[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 10)

  const handleRequestSort = (event: MouseEvent, property: keyof T) => {
    const isDesc = (orderBy === property && order === -1)
    setOrder(isDesc ? 1 : -1)
    setOrderBy(property)
  }

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(data)
    } else {
      setSelected([])
    }
  }

  const handleSelect = (event: MouseEvent, row: T) => {
    const alreadySelected = selected.indexOf(row)
    let newSelected: T[] = []

    if (alreadySelected === -1) {
      newSelected = newSelected.concat(selected, row)
    } else if (alreadySelected === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (alreadySelected === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (alreadySelected > 0) {
      newSelected = newSelected.concat( selected.slice(0, alreadySelected),
        selected.slice(alreadySelected + 1), );
    }

    setSelected(newSelected)
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  const onDeleteWrapper = () => {
    onDelete(selected)
    setSelected([]) 
  }

  const isSelected = (row: T) => selected.indexOf(row) !== -1
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <Box>
      <Box className='w-full items-center'>
        <Paper className='w-full mb-2' elevation={3}>
          <TableToolbar<T> numSelected={selected.length} tableName={tableName}
            searchString={searchString} setSearchString={setSearchString} onDelete={onDeleteWrapper}
            onEdit={onEdit} selected={selected}/>
          <TableContainer>
            <Table className='min-w-max' size={dense ? 'small' : 'medium'}>
              <TableHeader numSelected={selected.length}
                         onRequestSort={handleRequestSort}
                         onSelectAll={handleSelectAll}
                         order={order} orderBy={orderBy}
                         rowCount={data.length} headers={headerCells}/>
              <TableBody>
                {data.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const rowSelected = isSelected(row)
                    const onClick = (event: MouseEvent) => handleSelect(event, row)
                    return RowDisplay({rowSelected, onClick, row, key: index })
                  })
                }
                {emptyRows > 0 && (
                  <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                    <TableCell colSpan={headerCells.length + 1}/> 
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
            component="div" count={data.length} rowsPerPage={rowsPerPage}
            page={page} onPageChange={handleChangePage} 
            onRowsPerPageChange={handleChangeRowsPerPage}/>
        </Paper>
      </Box>

    </Box>
  )
}
