import { useState } from "react"
import { ClavaTable, HeaderCell } from "../../../components/ClavaTable"
import EventRow from "./EventRow"

const headerCells: HeaderCell<Event>[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Event'
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description'
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Start Date'
  },
  {
    id: '_id',
    numeric: false,
    disablePadding: false,
    label: 'Attendance QR'
  },
  {
    id: 'attendance',
    numeric: false,
    disablePadding: false,
    label: 'Statistics'
  }
]

type EventDisplayProps = {
  events: Event[]
  title: string
  settings: Settings | null
  onDelete: (d: Event[]) => void
}

export default function TransactionDisplay(props: EventDisplayProps) {
  const [searchString, setSearchString] = useState('')

  const filteredEvents = props.events.filter(event => {
    if (event.name.includes(searchString)) return true
    if (event.description.includes(searchString)) return true
    if (new Date(event.date).toLocaleString().includes(searchString)) return true
    return false
  })
 

  return <>
    <ClavaTable<Event> defaultOrder="date" tableName={props.title}
      data={filteredEvents} headerCells={headerCells} onDelete={props.onDelete}
      RowDisplay={EventRow} dense={(props.settings) ? props.settings.dense : false}
      searchString={searchString} setSearchString={setSearchString} 
      rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10} 
      defaultOrderDirection={1}/>
  </>
}