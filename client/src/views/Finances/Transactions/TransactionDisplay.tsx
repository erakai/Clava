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
}

export default function TransactionDisplay(props: TransactionDisplayProps) {
  const [searchString, setSearchString] = useState('')
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editing, setEditing] = useState<Transaction>(props.transactions[0])

  const filteredTrans = props.transactions.filter(trans => {
    if (trans.source.includes(searchString)) return true
    if (trans.amount.toString().includes(searchString)) return true
    if (new Date(trans.date).toLocaleString().includes(searchString)) return true
    return false
  })
  
  const onDelete = async (deleted: Transaction[]) => {

  }

  const onEdit = async (edited: Transaction) => {

  }

  const onEditClicked = (edited: Transaction) => {

  }

  return <>
    <ClavaTable<Transaction> defaultOrder="date" tableName={props.title}
      data={filteredTrans} headerCells={headerCells} onDelete={onDelete}
      RowDisplay={TransactionRow} dense={(props.settings) ? props.settings.dense : false} 
      searchString={searchString} setSearchString={setSearchString} 
      rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10} 
      onEdit={onEditClicked} defaultOrderDirection={1}/>
  </>
}