import axios from "axios";
import { getRefreshToken } from "./userApi";
import { intercepts } from "./config";

type GetElectionsResponse = { elections: Election[] }
type AddElectionResponse = { election: Election }
type UpdateElectionResponse = { election: Election }
type DeleteElectionsResponse = {}
type VoteResponse = {}
type NotifyMembersResponse = {}
type GetResultsResponse = { results: EleRes }

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
  return updateElection(election_id, { ended: true })
}

export const getElectionById = (election_id: string) => {
  return ElectionInstance.get<UpdateElectionResponse>('/id', { params: { election_id }})
}

export const getResults = (election_id: string) => {
  return ElectionInstance.get<GetResultsResponse>('/votes', { params: { election_id } })
}

export const vote = (election_id: string, candidate: string, amount: number) => {
  return ElectionInstance.post<VoteResponse>('/votes', { election_id, name: candidate, amount})
}

export const _notifyMembers = ({ message, club_id }: NotifyMembersElectionRequest) => {
  return ElectionInstance.post<NotifyMembersResponse>("/notifyMembers", { message, club_id })
}
