/*
Hook to manage and abstract the various state required to
create/update an election. If not for this, the state would have
to exist in either ElectionForm or ElectionCreation. If it was in ElectionForm,
then there would be no way to clear it between each selection,
and it doesn't make sense for it to be in ElectionCreation.

Fireship told me this is good practice in a react video trust me i know what im doing
*/
export type ElectionSelect = Election | "new" 

const useElectionLogic = () => {

  const selectAndClear = (e: ElectionSelect) => {

  }
}

export default useElectionLogic