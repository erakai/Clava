import { useState } from "react"
import { ClavaTable, HeaderCell } from "../../../components/ClavaTable"
import TransactionRow from "./TransactionRow"

const headerCells: HeaderCell<Transaction>[] = [
  {
    id: 'source',
    numeric: false,
    disablePadding: true,
    label: 'Source'
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Transaction Date'
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount'
  }
]

type TransactionDisplayProps = {
  transactions: Transaction[]
  title: string
  settings: Settings | null
  onDelete: (d: Transaction[]) => void
}

export default function TransactionDisplay(props: TransactionDisplayProps) {
  const [searchString, setSearchString] = useState('')

  const filteredTrans = props.transactions.filter(trans => {
    if (trans.source.includes(searchString)) return true
    if (trans.amount.toString().includes(searchString)) return true
    if (new Date(trans.date).toLocaleString().includes(searchString)) return true
    return false
  })
 

  return <>
    <ClavaTable<Transaction> defaultOrder="date" tableName={props.title}
      data={filteredTrans} headerCells={headerCells} onDelete={props.onDelete}
      RowDisplay={TransactionRow} dense={(props.settings) ? props.settings.dense : false} 
      searchString={searchString} setSearchString={setSearchString} 
      rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10} 
      defaultOrderDirection={1}/>
  </>
}