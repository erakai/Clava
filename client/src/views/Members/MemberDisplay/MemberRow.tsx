import { Checkbox, TableCell, TableRow } from "@mui/material"
import to from "await-to-js"
import moment from "moment"
import { useEffect, useState } from "react"
import { deleteTagFromMember } from "../../../api/memberApi"
import { RowDisplayProps } from "../../../components/ClavaTable"
import { TagRowDisplay } from "../TagsEditor"

interface MemberRowProps extends RowDisplayProps<Member> {
  allTags: Tag[]
  dense: boolean
}

export default function MemberRow(
  { rowSelected, onClick, row, allTags, dense}: MemberRowProps) {
    const [ memberTags, setMemberTags ] = useState<Tag[]>([])

    useEffect(() => {
      let myTags: Tag[] = []
      
      // O(n^2) heart eyes
      row.tag_ids.forEach(id => {
        allTags.forEach(tag => {
          if (tag._id == id) {
            myTags.push(tag)
          }
        })
      });

      setMemberTags(myTags)
    }, [])

    const onDeleteTag = async (tag: Tag) => {
      let newTags = memberTags.filter(t => t != tag)
      setMemberTags(newTags)

      const [err, res] = await to(deleteTagFromMember({tag_id: tag._id, member_id: row._id}))
    }

    const onAddTag = async (tag: Tag) => {
      setMemberTags([...memberTags, tag])
    }

    const tagRowStyle = {
      minWidth: 150,
      height: 60
    }

    const style = (date: number | undefined) => {
      if (date?.valueOf()) return {}
      return { color: (moment(date).isAfter(moment()) && moment(date).isBefore(moment().add(1, 'w')) ? 'red' : (moment(date).isBefore(moment()) ? '#7a2828' : 'black')) }
    }

    return (
      <TableRow hover onClick={onClick} selected={rowSelected}
        tabIndex={-1}>
          <TableCell padding="checkbox">
            <Checkbox color="primary" checked={rowSelected}/>
          </TableCell>
          <TableCell component="th" scope="row" padding="none" style={style(row.expiration)}>{row.name}</TableCell>
          <TableCell align="left" style={style(row.expiration)}>{row.email}</TableCell>
          <TableCell align="left" sx={(dense) ? {} : tagRowStyle}>
            <TagRowDisplay dense={dense} tags={memberTags} allTags={allTags} onDelete={onDeleteTag} onAdd={onAddTag} />
          </TableCell>
          <TableCell align="right" style={style(row.expiration)}>
            {(row.expiration) ? 
             ((Date.parse(row.expiration as unknown as string).valueOf() != 0) ?
              (moment(row.expiration).isBefore(moment()) ? "EXPIRED" : new Date(row.expiration).toLocaleDateString())
              : "N/A") : "N/A"}
          </TableCell>
      </TableRow>
    )
}
