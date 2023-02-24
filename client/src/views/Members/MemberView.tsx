import { useEffect, useState } from "react"
import MemberDisplay from "./MemberDisplay"
import ClavaNavbar from "../../components/Navigation"

const tempMembers: Member[] = [
  {
    member_id: "63f553996a2ef9da8a85e69c",
    name: "Kai Tinkess",
    expiration: Date.parse("1995-12-17T08:24:00.000Z"),
    club_id: "5e1a0651741b255ddda996c4",
    tag_ids: [],
  },
  {
    member_id: "63f553bd1484c7c696f5e35b",
    name: "Kai Tinkeasdfss",
    expiration: Date.parse("1997-12-17T08:24:00.000Z"),
    club_id: "5e1a0651741b255ddda996c4",
    tag_ids: [],
  },
  {
    member_id: "63f553cb1484c7c696f5e35e",
    name: "Alex Hunton",
    expiration: Date.parse("1997-12-17T08:24:00.000Z"),
    club_id: "5e1a0651741b255ddda996c4",
    tag_ids: [],
  }
]

export default function MemberView() {
  const [members, setMembers] = useState<Member[]>([])
  const [dense, setDense] = useState(false)

  useEffect(() => {
    setMembers(tempMembers)

    return () => {
      setMembers([])
    }
  }, [])


  return (
    <div className="p-2 items-center">
      <ClavaNavbar currentRoute="Members"/>
      <MemberDisplay members={members} setMembers={setMembers}/>
    </div>
  )
}