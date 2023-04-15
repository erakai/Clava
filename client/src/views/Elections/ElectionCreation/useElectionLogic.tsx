import moment from "moment"
import { Moment } from "moment"
import { useState } from "react"

/*
Hook to manage and abstract the various state required to
create/update an election. If not for this, the state would have
to exist in either ElectionForm or ElectionCreation. If it was in ElectionForm,
then there would be no way to clear it between each selection,
and it doesn't make sense for it to be in ElectionCreation.

Fireship told me this is good practice trust me i know what im doing
*/

/*
  New represents a new election being created, but if one is passed in
  then the form acts as a way to update it.
*/
export type ElectionSelect = Election | "new" 

const useElectionLogic = () => {
  const [selected, setSelected] = useState<ElectionSelect | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [start, setStart]= useState<Moment | null>(null)
  const [end, setEnd] = useState<Moment | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [questions, setQuestions] = useState<string[]>([])

  const updating = selected !== "new"

  const selectAndClear = (e: ElectionSelect | null) => {
    let clear = (e != null) && (e != "new")

    setName(clear ? (e as Election).name : "")
    setDescription(clear ? (e as Election).description : "")
    setStart(clear ? 
      ((e as Election).start ? moment((e as Election).start) : null)
      : null)
    setEnd(clear ? 
      ((e as Election).end ? moment((e as Election).end) : null)
      : null)
    setQuestions(clear ? 
      ((e as Election).questions ? (e as Election).questions as string[] : [])
      : [])
    setNewQuestion("")

    setSelected(e)
  }

  return {
    name, setName, description, setDescription,
    start, setStart, end, setEnd,
    newQuestion, setNewQuestion, questions, setQuestions,
    selected, setSelected,
    updating, selectAndClear
  }
}

export default useElectionLogic