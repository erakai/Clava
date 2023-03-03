import { Checkbox, TableCell, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { RowDisplayProps } from "../../components/ClavaTable"

interface OfficerRowProps extends RowDisplayProps<Officer> {
  allRoles: Role[]
  dense: boolean
}

export default function OfficerRow(
  { rowSelected, onClick, row, allRoles, dense}: OfficerRowProps) {
    const [ officerRoles, setOfficerRoles ] = useState<Role[]>([])

    useEffect(() => {
      let myRoles: Role[] = []
      
      // O(n^2) heart eyes
      row.role_ids.forEach(id => {
        allRoles.forEach(role => {
          if (role._id == id) {
            myRoles.push(role)
          }
        })
      });

      setOfficerRoles(myRoles)
    }, [])

    const onDeleteRole = async (role: Role) => {
      let newRoles = officerRoles.filter(t => t != role)
      setOfficerRoles(newRoles)
    }

    const onAddRole = async (role: Role) => {
      setOfficerRoles([...officerRoles, role])
    }

    const roleRowStyle = {
      minWidth: 150,
      height: 60
    }

    return (
      <TableRow hover onClick={onClick} selected={rowSelected}
        tabIndex={-1}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" checked={rowSelected}/>
          </TableCell>
          <TableCell component="th" scope="row" padding="none">{row.name}</TableCell>
          <TableCell align="left" sx={(dense) ? {} : roleRowStyle}>
            {/* ROLE DISPLAY*/}
          </TableCell>
          <TableCell align="right">
            {(row.expiration) ? 
              ((Date.parse(row.expiration as unknown as string).valueOf() != 0) ? 
              new Date(row.expiration).toLocaleDateString() : 'N/A')
            : "N/A"}
          </TableCell>
      </TableRow>
    )
}

