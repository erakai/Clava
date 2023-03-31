import { Box, Typography } from "@mui/material";
import to from "await-to-js";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { getLogs } from "../../api/logApi";
import { ClavaTable, HeaderCell } from "../../components/ClavaTable";
import ActivityLogRow from "./ActivityLogRow";

type ActivityLogView = {
  isOwner : boolean
  club_id : string
}

const headerCells: HeaderCell<Log>[] = [
  {
    id: 'method',
    numeric: false,
    disablePadding: true,
    label: 'Method'
  },
  {
    id: 'route',
    numeric: false,
    disablePadding: false,
    label: 'Route'
  },
  {
    id: 'user_id',
    numeric: false,
    disablePadding: false,
    label: 'User'
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date'
  }
]

export default function ActivityLogView({isOwner, club_id} : ActivityLogView) {
  const navigate = useNavigate();

  const [logs, setLogs] = useState<Log[]>([])
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    if (!isOwner) {
      navigate('/');
    }
    const fetchLogs = async () => {
      if (!club_id) {
        return;
      }
      const [err, res] = await to(getLogs(club_id))
      if (err) {
        console.log(err)
        return;
      }

      if (!res) {
        return;
      }

      setLogs(res.data.logs)
      return
    }

    fetchLogs()
  }, [])


  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%">
        <ClavaTable<Log> defaultOrder="date" tableName={"Activity Log"}
          data={logs} headerCells={headerCells} onDelete={() => {}}
          RowDisplay={({rowSelected, onClick, row}) => 
          <ActivityLogRow rowSelected={rowSelected} onClick={onClick} row={row}/>}          
          dense={false} searchString={searchString} setSearchString={setSearchString}
          rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}
        />
    </Box>

  )
}