import { useState } from "react"
import { ClavaTable } from "../../../../components/ClavaTable"
import ElectionRow, { headerCells } from "./ElectionRow"
import { ElectionSelect } from "../useElectionLogic"

type ElectionDisplayProps = {
  settings: Settings | null
  elections: Election[]
  onDelete: (e: Election[]) => void
  selectAndClear: (e: ElectionSelect | null) => void
}

export default function ElectionDisplay(props: ElectionDisplayProps) {
  const [searchString, setSearchString] = useState('')

  const filteredEvents = props.elections.filter(elec => {
    if (elec.name.includes(searchString)) return true
    if (elec.description.includes(searchString)) return true
    if (elec.start && new Date(elec.start).toLocaleDateString().includes(searchString)) return true
    if (elec.end && new Date(elec.end).toLocaleDateString().includes(searchString)) return true
    return false
  })

  return <>
    <ClavaTable<Election> defaultOrder="start" tableName="Elections"
      data={filteredEvents} headerCells={headerCells} onDelete={props.onDelete}
      RowDisplay={({rowSelected, onClick, row}) => 
        <ElectionRow rowSelected={rowSelected} onClick={onClick} row={row} selectAndClear={props.selectAndClear}/>} 
      dense={(props.settings) ? props.settings.dense : false}
      searchString={searchString} setSearchString={setSearchString}
      rowsPerPageOptions={[5, 10, 20, 100]} defaultRowsPerPage={5}
      defaultOrderDirection={1}/>
  </>
}