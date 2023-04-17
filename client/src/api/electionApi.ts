import axios from "axios";
import { getRefreshToken } from "./userApi";
import { intercepts } from "./config";

type GetElectionsResponse = { elections: Election[] }
type AddElectionResponse = { election: Election }
type UpdateElectionResponse = { election: Election }
type DeleteElectionsResponse = {}

const ElectionInstance = axios.create({
  baseURL: `http://localhost:8080/elections`,
  timeout: 1000,
  withCredentials: true,
})

intercepts(ElectionInstance, getRefreshToken)

export const getElections = (club_id: string) => {
  return ElectionInstance.get<GetElectionsResponse>('/', { params: { club_id: club_id }})
}

export const addElection = (election: Election) => {
  return ElectionInstance.post<AddElectionResponse>('/', { election })
}

export const updateElection = (election_id: string, election: ElectionUpdateRequest) => {
  return ElectionInstance.post<UpdateElectionResponse>('/', { election_id, election})
}

export const deleteElections = (election_ids: string[]) => {
  return ElectionInstance.delete<DeleteElectionsResponse>('/', { data: { election_ids }})
}

export const startElection = (election_id: string) => {
  return updateElection(election_id, { running: true })
}

export const endElection = (election_id: string) => {
  return updateElection(election_id, { running: false, ended: true })
}
