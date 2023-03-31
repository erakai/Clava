import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { ClavaTable } from "../../components/ClavaTable";

type ActivityLogView = {
  isOwner : boolean
}

export default function ActivityLogView({isOwner} : ActivityLogView) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOwner) {
      navigate('/');
    }
  })

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%">
        <Typography variant="h4">Activity Log</Typography>
        <ClavaTable<Member> defaultOrder="name" tableName={"Activity Log"}
          data={filteredMembers} headerCells={headerCells} onDelete={onDelete}
          RowDisplay={({rowSelected, onClick, row}) => 
          <MemberRow rowSelected={rowSelected} onClick={onClick} row={row} allTags={tags} dense={dense}/>}          dense={dense} searchString={searchString} setSearchString={setSearchString}
          rowsPerPageOptions={[5, 10, 30, 100]} defaultRowsPerPage={10}
          onEdit={onEditClicked} AlternateSelectedToolbar={
            ({selected, setSelected}: AlternateSelectedToolbarProps<Member>) =>
            <MemberToolbarExtension selected={selected} setSelected={setSelected} 
              allTags={tags} members={members} setMembers={setMembers} forceUpdate={forceUpdate}/>
          }
        />
    </Box>
  )
}